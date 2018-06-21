---

title: Serverless JAM - A Serverless Framework Tutorial (Part 2)
author: Cassio Zen
image: /img/blog/sls-beer-header.jpg
format: blog
short_title: Serverless JAM Tutorial Part 2
description: This is part two of a tutorial about the Serverless Framework - In this part we will create custom lambda functions for “Serverless Beer”, a (fictitious) craft beer company.
thumbnail: /img/posts/thumbnails/serverless.png
cmsUserSlug: ""
date: 2016-10-13
tags:
  - hugo
  - serverless
  - jamstack
---

In the last years, browsers have become powerful platforms to develop web projects. We don't need dynamic pages delivered by application servers to create user interaction, and with the explosion of anything-as-a-service, you can integrate anything, from form handling to shopping carts using service APIs (This is what we call the “JAMstack” - short for JavaScript, APIs and Markup).

Sometimes, though, we still need some custom tailored piece of backend functionality, which can now be build on a serverless architecture. This is part two of a tutorial about the Serverless Framework - an open-source, command line tool and standard syntax to easily orchestrate AWS services and build AWS Lambda Functions. [Part one](https://www.netlify.com/blog/2016/09/15/serverless-jam---a-serverless-framework-tutorial/) covered installation & configuration as well as the basic structure of a project.

In part two we will create two custom functions for the “Serverless Beer” site. Serverless Beer is a (fictitious) craft beer company. There is already a JAMstack site in place but we want to add a rating feature using AWS Lambda - users will be able to rate the products and the site will display the average rating for each.

![Serverless Beer site](/img/blog/sls-site.gif)



# DynamoDB

To get started, we are going to need a database to store the ratings for each beer, and in this example we’re going to use DynamoDB, a NoSQL database service.

## DynamoDB provisioning in the Serverless framework

We need to provision a DynamoDB table for this project, as well as setup the appropriate access roles so the Lambda functions can read and write to the table. This is when the Serverless framework really helps, as all these can be configured on the serverless.yml file.

Open the serverless.yml file and scroll down. Near the end of the file you should see something like this:

```yaml
# you can add CloudFormation resource templates here
#resources:
#  Resources:
#    NewResource:
#      Type: AWS::S3::Bucket
#      Properties:
#        BucketName: my-new-bucket
```

Notice the commented out code, it’s an example of how to add CloudFormation templates. CloudFormation is an AWS service that allows you to provision services and infrastructure based on a template file. Let’s edit this section to create a new DynamoDB table:

```yaml
# you can add CloudFormation resource templates here
resources:
  Resources:
    BeerDynamo:
      Type: 'AWS::DynamoDB::Table'
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: slsbeer
```

A few things to notice here:

- This template will provision a new DynamoDB table called “slsbeer”
- The DynamoDB table will have a required “id” attribute.
- The template also defines a provisioned throughput. Your can learn more about DynamoDB throughput pricing on the AWS [documentation](https://aws.amazon.com/dynamodb/pricing/).

Remember that Amazon employs a very strict access policy in it’s services - which means that so far you’ve created a DynamoDB table but (by default) your Lambda functions won’t have permission to read or write on this table.

You need to add IAM (Identity and Access Management) role to your project, and fortunately this can also be done in the serverless.yml file. Scroll up to the `provider` section on the yaml file. You should see something like this:

```yaml
provider:
  name: aws
  runtime: nodejs4.3
# you can add statements to the Lambda function's IAM Role here
#  iamRoleStatements:
#    - Effect: "Allow"
#      Action:
#        - "s3:ListBucket"
#        ...
```

The commented out lines are a sample IAM Role statement. Let’s add one that gives the project access to the DynamoDB table we configured:

```yaml
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "dynamodb:*"
      Resource: "arn:aws:dynamodb:*:*:table/slsbeer"
```

(Notice the Resource field: It’s pointing to the custom table name we defined.

After these changes, your complete serverless.yml file should look like this:

```yaml
service: serverlessbeer

provider:
  name: aws
  runtime: nodejs4.3
# Lambda function's IAM Role Statements
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "dynamodb:*"
      Resource: "arn:aws:dynamodb:*:*:table/slsbeer"

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: beer/hello
          method: get

# CloudFormation resource templates
resources:
  Resources:
    BeerDynamo:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: slsbeer
```


# JavaScript NPM Modules

Now that the DynamoDB table provision & access are setup, there is one last preparation step before we can get our attentions back to writing the actual Lambda Functions. We will need to install some npm modules:

- `aws-sdk` - So we can, among other things, make DynamoDB operations in the Lambda functions
- `uuid`  - DynamoDB ID’s are not auto-generated. We will need this library to generate unique identifiers.

You can install both using:

```bash
npm install --save aws-sdk uuid
```

Finally, require both modules on the beginning of the `handler.js` file:

```javascript
'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');
```


# “addRating” lambda.

As described earlier in this article, the user will be able “perform” two actions: See the average rating for a given beer and Add his own rating for a given beer. This will translate into two lambda functions:

- `addRating` : Receives a beer name AND a rating value as params and persists on the database.
- `getRating` : Receives the beer name as a parameter and return this beer’s ratings.

Both will be defined on the `handler.js` file and configured in the serverless.yml file. Let’s get started with the easiest one to implement: addRating.


## Function Handler

The first step is create a new exported function in the handler.js file. To begin, it only creates an instance of DynamoDB DocumentClient (an abstraction to read and write data to the DynamoDB table):

```javascript
module.exports.addRating = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();
}
```

Next, let’s create the JavaScript object we want to persist on the DynamoDB table. The object will contain three keys: id, beer and rating. The `id`  value will be generated using the UUID module, and the `beer` and `rating` values will be received via parameters.

Lambda functions have access to passed params through the `event` object:

- Query string parameters are available in `event.queryStringParameters`
- Post data is available in `event.body`

since we expect to receive a posted JSON, we will also need to parse it. At the end, our Item will look like this:

```javascript
var params = JSON.parse(event.body);
var Item = {
    id: uuid.v4(),
    beer: params.beer,
    rating: Number(params.rating)
};
```

Notice that we’re using the Number function to make sure the rating value will be always stored as a numeric value.

Finally, let’s store this object in the DynamoDB table using the DocumentClient’s instance `put` method:

```javascript
docClient.put({TableName: 'slsbeers', Item: Item}, (error) => {
  if (error) {
    callback(error);
  }

  callback(null, { statusCode: 201 });
});

```

The put method returns an error object if something didn't went as expected.

Remember (from part one of this tutorial) that the Lambda receives a callback function to be invoked when it’s done. The callback can receive two parameters, an error object, and a success object. In our case, the callback is invoked after the put operation with either the error object (in case there is an error) or with just a plain empty 201 response (201 is the http status code for “request fulfilled and new resource created”).

## “addRating” function configuration (on the serverless.yml)

Now that the actual function handler is defined, go ahead and configure the function in the serverless.yml file, attaching an HTTP event:

```yaml
functions:
  hello:
    handler: handler.hello
    events: ... # Ommited for brevity
  addRating:
    handler: handler.addRating
    events:
      - http:
          path: beer/rating
          method: post
```

An important thing to notice is that although the function is called `addRating`, we are exposing it as `beer/rating` (via post).

## Deploy and Test

We are now ready to test your function. Deploy the project with the command:

```bash
sls deploy
```

(Note that `sls` is a shorthand for the `serverless` command)

The first time you do a deploy after changing the cloudFormation template will take a while - that’s because Amazon is provisioning the new services.
After the process completes, our function will be available through an URL. You can test the URL with your preferred HTTP tool (postman, hurl.it, etc) - Here’s an example using cURL:

```bash
▸ curl -i \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST --data '{"beer":"bock", "rating": 5}' \
  https://[your-url]/beer/rating
```

Note: Be sure to change the URL above for your endpoint url.

If everything goes right, you should see something like this:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 0
...
```

## CORS
CORS stand for Cross-Origin Resource Sharing - a security mechanism that specifies whether an URL endpoint can be requested by a web page from another domain outside the domain from which the resource originated.

In other words it means that the Serverless website (which is hosted on a different domain) won't be able fetch the rating HTTP url. That is, unless we explicitly return an “Access-Control-Allow-Origin” header in the addRating response.

To do this, edit the last callback invocation in the `addRating` function to include a header:

```javascript
    callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
```

In the end, your `handler.js` file should look like this:

```javascript
'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');

// Your first function handler
module.exports.hello = ... // Ommited for brevity

module.exports.addRating = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = JSON.parse(event.body);
  var Item = {
      id: uuid.v4(),
      beer: params.beer,
      rating: Number(params.rating)
  };

  docClient.put({TableName: 'slsbeer', Item: Item}, (error) => {
    if (error) {
      callback(error);
    }

    callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  });
}
```

# “getRating” lambda.

## handler source code:

Next, let’s create and configure the getRating lambda. Starting with the exported function on `handler.js`. The source code is shown below, and explained in sequence:

```javascript
module.exports.getRating = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'slsbeer',
    FilterExpression : 'beer = :beer_name',
    ExpressionAttributeValues : {':beer_name' : event.queryStringParameters.beer}
  }

  docClient.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }

    var sum = data.Items.reduce((accumulated, current) => {
      return accumulated + current.rating}
    , 0);

    var average = sum/data.Items.length;

    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ averageRating: average }),
    })

  });
}
```

As in the previous function, we start by creating an instance of DynamoDB’s DocumentClient.
Now, since this operation will require more parameters that simply the TableName, we created a separate params object for better organizing our code. Besides TableName, the params object contains a filter expression (we only want to show ratings for the specific beer).

Next, we call docClient.scan - scan returns one or more items by accessing every item in a table. In this case, it will return all ratings for the given beer.

On lines 15-17, we take the returned data and sum all the ratings using the reduce method.
On the following line, we calculate the average rating by dividing the summed value by the amount of ratings.

Finally, we invoke the lambda callback, returning a response object with statusCode 200, an “Access-Control-Allow-Origin” header and, finally, the averageRating as body.

It is important to notice that fetching all data and summing it on the Lambda function doesn’t scale well. We used in this example for simplicity - and it will work up to a few thousand records, but other than that it will reach the execution time limit. One alternative would be calculating partial averages and persisting those on addRating.  For doing map/reduce on large scale, take a look at AWS MapReduce.


## serverless.yml configuration:

With the function handler created, let’s add the getRating configuration in the serverless.yml file:

```yaml
functions:
  hello:
    handler: handler.hello
  addRating:
    handler: handler.addRating
    events:
      - http:
          path: beer/rating
          method: post
  getRating:
    handler: handler.getRating
    events:
      - http:
          path: beer/rating
          method: get
```

Great, we have both functions created and configured. And although they have different names, they will be accessible in the same URL, via different HTTP methods.

## Deploy and test:

Trigger a new deploy with:

```bash
sls deploy
```

Testing this URL with cURL:

```bash
▸ curl https://[your-url]/beer/rating?beer=bock
{"averageRating":4.25}
```



# What’s next?

Now that the lambda functions are done, let's focus on the web application to power the serverless beer site.

The Serverless beer site uses [Hugo](https://gohugo.io), a site generator, to generate the scaffolding for the web project.
In this structure, the content for all beers are rendered using a single template file - which means we can add common pieces of content on the template file instead of repeating the same code for every beer.
This is what the beer template look like:

```html
<div class="content-section-a">
    <div class="container">
        <div class="row">
            <div class="col-lg-5 col-sm-6">
                <hr class="section-heading-spacer">
                <div class="clearfix"></div>
                <h2 class="section-heading">{{ .Title }}</h2>
                {{ .Content }}
            </div>
            {{ with .Params.img }}
            <div class="col-lg-5 col-lg-offset-2 col-sm-6">
                <img class="img-responsive" src="img/{{ . }}" alt="">
            </div>
            {{ end }}
        </div>
    </div>
</div>
```

In this template, we will add a select field with five options (whose values range from 1 to 5):

```html
Rating: <select id="{{ .Params.id }}">
  <option></option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
```

This would be enough to see the current rating and select a custom rating for a beer - but for the sake of a better presentation we will use a jQuery plugin to render a “Star Rating” instead of a boring select field. (In this example, we will use the jQueryBarRating plugin).

Time to wire up our JavaScript. There are a few things we need to do:

- Add jQuery and jQueryBarRating plugin to the page
- For each beer:
  1. Enable the jQueryBarRating on the rating select menu
  2. Fetch the “getRating” lambda and display the average rating.
  3. When the user clicks on the rating, post to the “addRating” lambda to persist his rate.

The site generator provides all the templates we need to bootstrap the content. Even the JavaScript files are placed in a template, which will make easy to add code for every beer. Let’s start simply by loading jQuery and jQueryBarRating plugins:

```html
<!-- jQuery Version 1.11.0 -->
<script src="/js/jquery-1.11.0.js"></script>

<!-- jQuery Rating Plugin -->
<script src="/js/jquery.barrating.min.js"></script>
```

In sequence, let’s use some templating scripts to loop the next scripts for every beer:

```html
<script>
{{ range $index, $element :=  .Data.Pages }}
  {{ if (eq .Section "beers")}}
    // Our beer specific code will go here
  {{ end }}
{{ end }}
</script>
```

Now, let’s enable the jQueryBarRating plugin and fetch the “getRating” lambda for each beer:

```html
<script>
var apiURL = "https://[your-url]/beer/rating";
{{ range $index, $element :=  .Data.Pages }}
  {{ if (eq .Section "beers")}}
    $(function() {
      var element = $('#{{ .Params.id }}');
      // Initialize the Star Rating System
      element.barrating({
        theme: 'fontawesome-stars',
        allowEmpty: true,
      });
      // Load the Rating from the server
      $.getJSON(apiURL + "?beer={{ .Params.id }}", function( data ) {
        element.barrating('set', Math.round(data.averageRating));
      });
    });
  {{ end }}
{{ end }}
</script>
```

Great, we are already displaying the average rating for each beer:

![Beer with description and star rating](/img/blog/sls-beer-bock.png)

Finally, let’s handle the user input and save his own rating:

```html
<!-- jQuery Version 1.11.0 -->
<script src="/js/jquery-1.11.0.js"></script>

<!-- jQuery Rating Plugin -->
<script src="/js/jquery.barrating.min.js"></script>

<script>
var apiURL = "https://[your-url]/beer/rating";
{{ range $index, $element :=  .Data.Pages }}
  {{ if (eq .Section "beers")}}
    $(function() {
      var element = $('#{{ .Params.id }}');
      // Initialize the Star Rating System
      element.barrating({
        theme: 'fontawesome-stars',
        allowEmpty: true,
        onSelect: function(value, text, event) {
          if(event) {
            $.post( apiURL, JSON.stringify({ beer: "{{ .Params.id }}", rating: value }));
          }
        }
      });
      // Load the Rating from the server
      $.getJSON(apiURL + "?beer={{ .Params.id }}", function( data ) {
        element.barrating('set', Math.round(data.averageRating));
      });
    });
  {{ end }}
{{ end }}
</script>
```

This is all the code we need to handling dynamic interactions between the web application and the Serverless functions.

To deploy this web project on Netlify we only need to link the GitHub repository with a new site. By using an [Open Source license](https://www.netlify.com/pricing/), we can get access to automatic [DNS configuration](https://www.netlify.com/docs/custom-domains/#domain-dashboard) besides taking advantage of [Netlify’s Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) and many other Professional features.

You can check the complete source code for the serverless beer site on [github](https://github.com/cassiozen/serverless-beer), or try it online at [serverlessbeer.com](https://serverlessbeer.com).
