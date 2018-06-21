---
title: 'Saving with Serverless '
author: Brian Douglas
tweet: >-
  A real-life application of saving money using the @goserverless framework to
  find out when there is a sporting event potentially going to ruin your
  commute.
image: /img/press/logos/logomark-light.png
short_title: 'Saving with Serverless '
tags:
  - serverless
format: blog
description: >+
  Side projects are especially awesome when they help you solve a real-life
  problem. During a recent problem-solving expedition I encountered a roadblock
  that I’d bet prevents a lot of us developers from finishing our side projects:
  just because a solution is possible, doesn’t mean it’s affordable. If this is
  sounding familiar, you probably know that infrastructure can be pretty cost
  prohibitive, both in time and money. Here’s a look at how I used the
  serverless framework to ship my side project without any additional cost. 

date: '2017-12-20'
draft: false
---
Side projects are especially awesome when they help you solve a real life problem. During a recent problem-solving expedition I encountered a road block that I’d bet prevents a lot of us developers from finishing our side projects: just because a solution is possible, doesn’t mean it’s affordable. If this is sounding familiar, you probably know that infrastructure can be pretty cost prohibitive, both in time and money. Here’s a look at how I used the serverless framework to ship my side project without any additional cost. 

## The Problem

When I first to moved to the San Francisco bay area I ran into an interesting issue: people here actually go to baseball games (I’m from Tampa, Florida, where people only attend baseball games when the home team plays a better team). On game days, my commute between San Francisco and Oakland was nuts. Things were even crazier when the Oakland Athletics and the San Francisco Giants played against each other in the Battle of the Bay series. During those weeks, public transportation newbs rode the train system all day acting confused while taking up as much space as possible. 

I realized I could make my commute easier by answering the question, ‘When is baseball?’

## So, when is baseball?

I built an app called [Hustlin](http://hustlin.netlify.com/) that knows when there is a home game and sends notifications at the start and anticipated end times.  I generated the project really quickly using Ruby on Rails and deployed to production using Heroku. 

![hustlin-preview-image](/img/blog/hustlin.png)

This was amazing until I realized I had to pay $7 a month to keep the thing up and running during the 7-month long season. I give the app some love every new baseball season, so I eventually rebuilt it to use the [JAMstack](https://jamstack.org/), separating the API from the markup. The front-end was easily hosted on Netlify for free as a React application, but I wanted to find something just as free to host my API. The solutions I came across were going to either cost more in money or time to set up and maintain. The API was costing too much just to optimize my commute. 

![jamstack vs severless cost](/img/blog/jam-servlerss-cost.png)

I hosted David Wells from Serverless team on [an episode of JAMstack Radio](/blog/2016/10/28/the-serverless-framework--aws-lambda/) and discovered everything I did could be done with Serverless and hosted for free on AWS. Plus, AWS’s Lambda gives you 1 million invocations of functions for free.

If you are not familiar with the server-less, or Functions-as-a-service(FaaS), they are functions that execute on-demand and in a matter milliseconds. Their use can vary from small [automated tasks](https://hackernoon.com/serverless-is-about-automation-not-functions-3f816c90ce61) to replacing large process in a [devops pipeline](https://serverless.com/blog/going-serverless-at-bandlab/) with very few [limitations](https://serverlesscode.com/post/aws-lambda-limitations/).

## The switch to Serverless

AWS is one of the [providers](https://serverless.com/framework/docs/providers/) the Serverless Framework works with out of the box and the CLI made it easy to try out. My simple JSON for home baseball games fits nicely in an AWS-provided DynamoDB table. To get started I used the CLI to deploy the node templates.

```sh
# Create a new Serverless Service/Project
$ serverless create --template aws-nodejs --path serverless-hustl
# Change into the newly created directory
$ cd serverless-hustl
```

After creating the boilerplate I created a seed function to move my existing JSON to a DynamoDB table. This was significantly less code than my previous version of Hustlin, it was [102 lines of code](https://github.com/bdougie/serverless-hustl/blob/master/handler.js) to be exact. 

```js
// function that seed the DynamoDB table
module.exports.seed = (event, context, callback) => {
  baseballs.forEach((data) => {
    const {name, start_time, end_time, started, standard_start_time} = data;
    const item = {
      id: `${data.id}`,
      name,
      start_time,
      end_time,
      started: `${started}`,
      standard_start_time
    };

    dynamodb.put({TableName: 'slshustl', Item: item}, (err) => {
      if (err) {
        callback(err);
      }
      const response = {
        statusCode: 201,
        headers,
      }

      callback(null, response);
    });
  })
}
```

I created a second function, called **today**, that returns all the games happening that today with start time and location information. 

```js
// function that returns all games happening today

module.exports.today = (event, context, callback) => {
  const params = {
    TableName: 'slshustl',
  }

  dynamodb.scan(params, (err, data) => {
    if (err) {
      callback(err);
    }

    const todaysGames = data.Items.filter(isToday)
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        count: todaysGames.length,
        data: todaysGames
      })
    };

    callback(null, response);
  });

  function isToday(game) {
    const today = new Date();
    const gameTime = new Date(game.start_time);
    return (today.toDateString() == gameTime.toDateString());
  }
}
```

After creating my seed and today functions I exposed them as endpoints in the serverless.yml. The original version cost me $7/month for the convenience of simple deployments, that same simplicity is why I never attempted to host my project elsewhere until now. The Serverless framework handles all the complication of setting up API Gateway, Updating DynamoDB, and deploying my Lambda functions.

```js
// serverless.yml
service: slshustl

provider:
  name: aws
  runtime: nodejs6.10
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "dynamodb:*"
      Resource: "arn:aws:dynamodb:*:*:table/slshustl"

functions:
  seed:
    handler: handler.seed
    description: seed dynanomodb table with baseball games
    events:
      - http:
          path: seed
          method: post
  today:
    handler: handler.today
    description: return just baseball games today
    events:
      - http:
          path: today
          method: get
          cors: true

resources:
  Resources:
    DynamoDbTable:
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
        TableName: slshustl
```

If you are interested in taking a closer look at the code check out[ bdougie/serverless-hustl](https://github.com/bdougie/serverless-hustl).

![json hustlin api](/img/blog/json-hustlin-example.png)

I have completely switched to DynamoDB to store my baseball game JSON data. I also used cron jobs to send notifications. I leveraged the [aws-node-scheduled-cron](https://github.com/serverless/examples/tree/master/aws-node-scheduled-cron) example repo to trigger my notifications, which is live at [bdougie/scheduled-hustlin-notifications](https://github.com/bdougie/scheduled-hustlin-notifications). After reading through the [Serverless documentation](https://serverless.com/framework/docs/providers/aws/examples/hello-world/node/) as well some heavy copy and pasting, I was able mirror what I was getting from my expensive Postgres database with simple JSON in a DynamoDB table.  

## Profit

This switch has saved me 100% of the $84 a year I was paying previously. Now that I am saving on time and money, I can start working on making this project provide real time notifications during baseball games and really see if that 1 million invocations can be achieved. If you have interest in this project, please keep an eye open for notifications at [hustlin.netlify.com](http://hustlin.netlify.com/) for the 2018 season.
