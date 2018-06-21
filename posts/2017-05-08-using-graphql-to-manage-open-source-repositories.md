---
title: Using GraphQL to manage open source repositories
author: Brian Douglas
image: /img/blog/og_image.png
format: blog
short_title: GraphQL open source starter project
tags:
  - graphql
  - open source
  - how-to
  - tutorial
description: >-
  GraphQL is a query language for APIs and a runtime for fulfilling those
  queries with your existing data. I will walk through setting up GraphQL in a
  React project that saves notes on interesting open source projects using
  Graphcool as a GraphQL backend as a service and Apollo as a front-end GrpahQL
  client. 
date: 2017-05-16T21:37:08.000Z
---
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. The best way to learn about GraphQL is by using GraphQL, which is why I put together starter project to follow and take notes on open source projects on GitHub.

At anytime you can see the finished [project](https://github.com/bdougie/open-sauced) on GitHub or live at [open-sauced.netlify.com/](http://open-sauced.netlify.com/).

![open-sauced](/img/blog/open-sauced.png)

## The Project

Netlify [loves open source](https://www.netlify.com/open-source/) and contributing back to the open source community by providing tools and free hosting. However, getting into open source projects can be a daunting process, leaving the uninitiated a bit [lost in the sauce](http://onlineslangdictionary.com/meaning-definition-of/lost-in-the-sauce). There are a lot of existing tools out there to assist in getting your first open source pull request including [Code Triage](https://www.codetriage.com/), [IssueHub](http://issuehub.io/), and of course [firstpr.me](http://firstpr.me/). Open Sauced is one more tool to help and it is the subject of this GraphQL explorations.

## Step 1 - Setup GraphQL Backend

There are a handful of options to get a back-end GraphQL server, including some that tie into the [Apollo ecosystem](http://dev.apollodata.com/tools/graphql-server/) very well. I opted for a solution that does not require managing my own server and that is [Graphcool](https://www.graph.cool/). Graphcool gives developers a highly extensible, production-ready, serverless GraphQL backend.

I have created and implemented a simple [GraphQL schema](https://github.com/bdougie/open-sauced/blob/master/open-sauced.schema) in Graphcool and made it available through their super cool is [graphql-up](https://www.graph.cool/graphql-up/) tool. This allows me to provide a simple 1-click solution for deploying your Open Sauced backend that can save repository data and attach notes.

Go ahead and give it a try by clicking the graphql-up button below.

👉🏾 [![graphql-up](http://static.graph.cool/images/graphql-up.svg)](https://www.graph.cool/graphql-up/new?source=https://raw.githubusercontent.com/bdougie/open-sauced/master/open-sauced.schema)

Be sure to save your simple Graphcool endpoint so you can use in step 3 below.

## Step 2 - Accessing the GitHub GraphQL API

GitHub introduced the alpha release of their new GraphQL API at the [GitHub Universe](https://github.com/universe-2016) conference. It’s written in Facebook's [GraphQL,](http://graphql.org/) a query language that allows for self-service API contracts. The GitHub team wrote in their [engineering blog](http://githubengineering.com/the-github-graphql-api/) their main reason for switching API paradigms is the lack of scalability with their existing RESTful contracts. REST is unable to provide the flexibility they need to cater to all of their many distinct consumers simultaneously while maintaining a low maintenance overhead.

I leverage this GraphQL API to retrieve repo data for the Open Sauced project. The beauty of this is that I do not need to open up the vast GitHub API documentation. I can actually leverage tools like [GraphiQL](https://github.com/graphql/graphiql) to view the documentation while building queries (as shown below).

![graphqiql-example](/img/blog/graphiql-example.gif)

You will need a GitHub access token to access the repository data fetching Open sauce feature. You can find [instructions on how to retrieve one](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) on GitHub.

![token-example](http://i.imgur.com/TAvrse9.png)

Be sure to allow access to your user information when creating your token. Also, save your token to use in the next step.

![token-options](http://i.imgur.com/WefKl5c.png)

## Step 3 - Deploy to Netlify

To get your final version of the Open Sauce project you can use the 1-click Deploy to Netlify button to clone and deploy the project.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bdougie/open-sauced)

Click the deploy to Netlify button and add your GitHub access token and Graphcool Endpoint. You now have a live version on Netlify as well as a cloned version of the repo in your GitHub.

![netlify-deploy](http://i.imgur.com/Ew8G2z8.png)

## Step 4 - Contribute

The entirety of this project is open sourced, so pull requests and issues are welcomed.

The React Apollo client is used to consume the GraphQL endpoint and I already have [plans](https://github.com/bdougie/open-sauced/issues/18) to improve the usability with features like Algolia's [Instant Search](https://www.algolia.com/lp/index.html) for traversing issues and a better [CSS in JS](https://github.com/bdougie/open-sauced/issues/3) solution. If you have experience in those technologies, feel free to stop by.

I hope this project creates a good foundation for an exploration into GraphQL and assist in reducing the chance of getting lost in the sauce.

[There is a translation of this article to Russian](http://softdroid.net/ispolzovanie-graphql-dlya-upravleniya-hranilishchami) by [Softdroid](http://softdroid.net/).



