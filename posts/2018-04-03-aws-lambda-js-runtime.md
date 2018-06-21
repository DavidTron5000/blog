---
title: "Node.js 8.10 now available in Netlify functions"
author: Phil Hawksworth
tweet: >-
  Netlify's AWS Lambda integration now includes support for Node.js 8.10. #serverless #awslambda
image: /img/press/logos/logomark-light.png
short_title: 'Netlify Functions get Node.js 8.10'
tags:
  - serverless
  - aws lambda
format: blog
description: >+
  Netlify's AWS Lambda integration now includes support for Node.js 8.10

date: '2018-04-03'
draft: false
---

Amazon recently announced the launch of support for [Node.js 8.10 in AWS Lambda](https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/).

This brings the much anticipated ability to use asynchronous development patterns in Lambda functions thanks to the support for Promises.

The ability to use the new handler types in AWS Lambda with `async`/`await` brings an escape from the so-called “callback hell” which frustrates many JavaScript developers. For more information on these new Lambda handler function types take a look at the [documentation on AWS](https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/).

In order for those developing Netlify Functions to also enjoy the benefits of Node.js 8.10 we are now supporting this version of Node.js by default for all new functions.

Pre-existing functions will continue to use the previous runtime (Node.JS 6.10) until they are deployed again, at which time they will adopt the new default runtime of Node.js 8.10.

If you want to stick with an older version, you can change your default runtime with an environment variable. For example:

`AWS_LAMBDA_JS_RUNTIME = nodejs6.10`

You can find more details [in the docs](/docs/functions/#javascript-runtime-settings).
