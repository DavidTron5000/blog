---
title: "Serverless File Uploads"
author: Cassio Zen
image: /img/blog/upload.jpg
format: blog
short_title: "Serverless, Direct-to-S3 File Uploads"
description: This tutorial demonstrates how to create a Serverless project that uploads files directly to S3.
cmsUserSlug: ""
date: 2016-11-17
tags:
  - serverless
  - jamstack
---

Web applications often require the ability to allow users to upload files such as images, but ever so often, this is the only functionality on the project that required an application server - Thousands of sites on the Internet could benefit from a CDN infrastructure, but are currently hosted on slower and less secure infrastructure because of things like consumer pictures for a product page, resume uploads for the jobs page etc...
In this tutorial, you will learn how to build a secure, serverless file upload system using the "serverless framework". If you're new to the serverless framework, check out our "Serverless Framework Tutorial": [Part one](https://www.netlify.com/blog/2016/09/15/serverless-jam---a-serverless-framework-tutorial/) and [Part two](https://www.netlify.com/blog/2016/10/13/serverless-jam---a-serverless-framework-tutorial-part-2/).

# Direct-to-S3 File Uploads

The ideal scenario from the point of view of performance and scalability would be to allow your users to upload files directly to S3 (Simple Storage Service - a cloud storage service from AWS). It would be a highly scalable, reliable and fast solution that wouldn’t consume any application server resources. Well, for obvious security reasons we can’t just leave a S3 bucket wide open for anyone to upload anything on it - but what if we introduce in intermediary step, an API endpoint that our client application can call asking for "permission" for each new file upload? The API can validate the request (Is the request coming from our site? What type of file does it want to upload?) and then respond with a signed URL for a direct-to-s3 upload. Each returned URL is unique and valid for a single usage, under the specified conditions.

# The Serverless Project

Having everything installed and setup, let's start by creating a new project:

    serverless create --template aws-nodejs --path imageupload`

If everything goes right, you should see the usual success message, and your base project files will be created.

```
Serverless: Creating new Serverless service...
Serverless: Creating the service in "/Users/cassiozen/Desktop/imageupload"
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.0.2
 -------'


Serverless: Successfully created service with template: "aws-nodejs"
```

## Provisioning the Upload S3 Bucket

Let's start by provisioning the S3 bucket that will be used for the image uploads. Edit the serverless.yml configuration and add a new resource. You need to whitelist the allowed CORS methods and origins. For this tutorial we will also let the files be publicly accessible (READ):

```yaml
# you can add CloudFormation resource templates here
resources:
  Resources:
    UploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: slsupload
        AccessControl: PublicRead
        CorsConfiguration:
          CorsRules:
          - AllowedMethods:
            - GET
            - PUT
            - POST
            - HEAD
            AllowedOrigins:
            - "*"
            AllowedHeaders:
            - "*"
```

Remember that Amazon employs a very strict access policy in it’s services - by default your Lambda functions won’t have permission to do anything with this S3 bucket. So, scroll up the serverless.yml file to add a new IAM role in the `provider` section:

```yaml
provider:
  name: aws
  runtime: nodejs4.3
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "s3:*"
      Resource: "arn:aws:s3:::slsupload/*"
```

Your complete serverless.yml file should look like this:

```yaml
service: imageupload

provider:
  name: aws
  runtime: nodejs4.3
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "s3:*"
      Resource: "arn:aws:s3:::slsupload/*"


functions:
  hello:
    handler: handler.hello

resources:
  Resources:
    UploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: slsupload
        AccessControl: PublicRead
        CorsConfiguration:
          CorsRules:
          - AllowedMethods:
            - GET
            - PUT
            - POST
            - HEAD
            AllowedOrigins:
            - "*"
            AllowedHeaders:
            - "*"
```

## `requestUploadURL` lambda function

Now we'll create and configure the actual lambda function and API endpoint.
To begin with, we will need to install the aws-sdk package:

    npm install --save aws-sdk

Next, open the handler.js file and require the module:

```javascript
'use strict';

var AWS = require('aws-sdk');
```

## Function Handler

On the requestUploadURL function handler, all we need to do is get an instance of `AWS.S3` and call `getSignedUrl` to generate the signed upload URL. The `getSignedUrl` method accepts two parameters:

- An **operation**, for which the URL will used for. The operation for uploading files is `putObject`.
- A **params** object, specific for the operation you want to perform. The `putObject` operation requires two parameters:
  - Bucket: The name of the bucket where the file will be uploaded to.
  - key: The name of the file you want to upload. You can assign a completely new name if you want.

You can check the complete list of available parameters for the `putObject` operation on the [official documentation page](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property).

Only these two parameters are required, but in our example we will require the client to pass the name and type of the file they want to upload. We will then generate an upload URL valid only for that specific file type. It’s also very common to ask for file size to decide whether or not to allow for the upload, but for simplicity we will skip this in our example.

Assuming the user will post a JSON with the file’s name and type, here are the corresponding parameters for our `putObject` operation:

```javascript
var s3 = new AWS.S3();
var params = JSON.parse(event.body);

var s3Params = {
  Bucket: 'slsupload',
  Key:  params.name,
  ContentType: params.type,
  ACL: 'public-read',
};
```

Next, we will call `s3.getSignedUrl` and store the returned upload url on a variable:

```javascript
var uploadURL = s3.getSignedUrl('putObject', s3Params);
```

Finally, we will invoke the function callback returning the signed upload URL:

```javascript
callback(null, {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': 'https://www.my-site.com'
  },
  body: JSON.stringify({ uploadURL: uploadURL }),
})
```

Notice that we're restricting the service to requested only by "https://www.my-site.com". This is an additional safety measure, as modern browsers won't let anyone initiate uploads originated on other domains.
(If you want, though, you can use "*" to allow requests from any domain).

The complete source code [(Gist)](https://gist.github.com/cassiozen/9e5f98812f44e0acf0b3ec011869e394):

```javascript
module.exports.requestUploadURL = (event, context, callback) => {
  var s3 = new AWS.S3();
  var params = JSON.parse(event.body);

  var s3Params = {
    Bucket: 'slsupload',
    Key:  params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };

  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.my-site.com'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
```

## Function event configuration.

The last step is setting up your function with an HTTP endpoint. Back on serverless.yml, add this to your `functions` section:

```yaml
functions:
  requestUploadURL:
    handler: handler.requestUploadURL
    events:
      - http:
          path: requestUploadURL
          method: post
          cors: true
```


# The sample client file.

Now, to upload a file directly to S3, all your client code needs to to is first ask for an upload URL then submit the blob directly to S3. For example, let’s create a bare-bones drag-n-drop file share:

<video autoplay="autoplay" loop="loop" width="480" height="312">
  <source src="/img/blog/slsupload.mp4" type="video/mp4" />
  <img src="/img/blog/slsupload.gif" width="480" height="312" />
</video>



That's exactly what the sample code bellow does [(Gist)](https://gist.github.com/cassiozen/f79d13bc6a79549690a817da13a8b377):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>A File Upload Demo</title>
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .aligner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    #drop {
      height: 200px;
      width: 200px;
      border-radius: 100px;
      color: #fff;
      background-color: #baf;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="aligner">
    <div id="drop">Drop files here.</div>
    <div id="list">
      <h1>Uploaded Files:</h1>
    </div>
  </div>

  <script type="text/javascript">
    var drop = document.getElementById('drop');
    var list = document.getElementById('list');
    var apiBaseURL = "https://74t3vol55c.execute-api.us-east-1.amazonaws.com/dev";

    function cancel(e) {
      e.preventDefault();
      return false;
    }

    function handleDrop(e){
      e.preventDefault();
      var dt    = e.dataTransfer;
      var files = dt.files;
      for (var i=0; i<files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.addEventListener('loadend', function(e){
          fetch(apiBaseURL+"/requestUploadURL", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: file.name,
              type: file.type
            })
          })
          .then(function(response){
            return response.json();
          })
          .then(function(json){
            return fetch(json.uploadURL, {
              method: "PUT",
              body: new Blob([reader.result], {type: file.type})
            })
          })
          .then(function(){
            var uploadedFileNode = document.createElement('div');
            uploadedFileNode.innerHTML = '<a href="//s3.amazonaws.com/slsupload/'+ file.name +'">'+ file.name +'</a>';
            list.appendChild(uploadedFileNode);
          });
        });
        reader.readAsArrayBuffer(file);
      }
      return false;
    }

    // Tells the browser that we *can* drop on this target
    drop.addEventListener('dragenter', cancel);
    drop.addEventListener('dragover', cancel);
    drop.addEventListener('drop', handleDrop);

  </script>
</body>
</html>
```

There it is: A highly scalable, serverless image upload service. This is just a basic implementation of the direct-to-s3 concept, but you can use it as a base and further extend and customize to your needs (like saving all upload file names on database, for example).
