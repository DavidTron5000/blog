---
title: Introducing Built-in Identity Service to Streamline User Management
author: Matt Biilmann & Chris Bach
image: /img/blog/identity.jpg
format: blog
short_title: Introducing Built-in Identity Services
tags:
  - Features
  - how-to
description: >-
  Now use Netlify’s Identity service to manage and authenticate users without
  building your own solution or managing additional integrations.
date: 2017-09-07T16:09:30-07:00
---
Today Netlify is introducing two additions to our platform that make it easier for developers to connect people with their products and projects.

You can now use Netlify’s [Identity](http://netlify.com/docs/identity) service to manage and authenticate users without building your own solution or managing additional integrations. We’re also releasing [Git Gateway](https://www.netlify.com/docs/git-gateway), a feature built on our Identity service, to connect content contributors or managers without GitHub accounts to your [Netlify CMS ](https://www.netlifycms.org/)projects.

Although there is an overwhelming advantage of a microservice architecture, we know it can still be frustrating to stitch together disparate pieces. To mitigate the chaos, it’s necessary to make microservices aware of other parts of the system. These new features are the first of several steps toward streamlining and unifying the communication between microservices for your project.

## Identity service

Netlify’s [Identity](https://www.netlify.com/docs/identity) service is a plug-and-play microservice for handling site functionalities like signups, logins, password recovery, user metadata, and roles. The service is based on our open source authentication API, [GoTrue](https://gotrueapi.org). You can use it from single page apps instead of rolling your own, and integrate with any service that understands JSON Web Tokens (JWTs).

![](https://lh6.googleusercontent.com/xvFqUQ_KTA7iSxGYL8VNpSuODnZIcv0Mq88G7O_G4ZSccfBuqgaJUHtg8EgqWt0BRGk9wXaCC7TwJ4QDD4c2d3Y0rz4JUnQ5hmz6WE4zU-0DOlNJgamvqOUarIsKSfEGuzd0Glqf)Netlify’s Identity service can be combined with our [Role Based Access controls](https://www.netlify.com/docs/visitor-access-control/#role-based-access-controls-with-jwt-tokens) to build large, content-driven sites with private or logged-in areas that don’t require any custom backend.

Once you enable Identity services, a managed version of the GoTrue microservice lets you add user registration and management under `/.netlify/identity` for any Netlify site.

## Git Gateway

Today’s release also includes [Git Gateway](https://www.netlify.com/docs/git-gateway) which takes our Identity service one step further.  This microservice gives you a way to add contributors to site management even if those contributors don’t have GitHub accounts.

For example, we’ve plugged it into [Netlify CMS](https://www.netlifycms.org/), one of our largest open source projects. With Netlify CMS \+ Git Gateway content contributors and editors are able todwork in the same Git-centric workflow even if they don’t have a GitHub account.

## Get started with one click. Seriously.

If you’re wondering how this actually works, we built a ridiculously easy way for you to give it a try. Since the early days of Netlify we’ve focused on simplifying the web development process into [as few clicks as possible](https://www.netlify.com/docs/deploy-button/). When you click the Deploy to Netlify button below, you’ll instantly get a Netlify site with the Netlify CMS-powered Identity service and Git Gateway already built in (including over 70 other features).

**Try it out!**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/one-click-hugo-cms&stack=cms)

