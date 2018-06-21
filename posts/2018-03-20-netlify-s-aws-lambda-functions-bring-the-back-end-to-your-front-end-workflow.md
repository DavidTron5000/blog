---
title: Netlify's AWS Lambda functions bring the backend to your frontend workflow
author: Matt Biilmann & Chris Bach
tweet: >-
  All the power and complexity of the backend, now auto-magically handled for
  you by Netlify. Deploy AWS Lambda functions along with your frontend.
image: /img/blog/blog-cover@1x.svg
no_overlay: true
short_title: Netlify now handles your AWS Lambda functions so you don't have to
tags:
  - Launch
  - Product
  - Functions
format: blog
description: >-
  Netlify now handles your AWS Lambda functions so you don't have to. Bring all
  the power of microservices to your site without setting up servers, writing
  server-side code, or managing multiple accounts. 
date: '2018-03-20'
draft: false
---
Today we’re officially releasing Functions, which make deploying AWS Lambda functions on Netlify as simple as adding a file to your Git repository. We’re also officially releasing Identity and Forms out of beta, so now you can add dynamic functionality to your site without setting up servers, writing server-side code, or managing multiple accounts. 

Since adding these components is as easy as `git push` and manageable without a DevOps or a backend team, you no longer have to choose between a highly-performant static site or a flexible, dynamic architecture. You can have both.

## The promise of the JAMstack and the reality of the modern web

When we first launched the Netlify core workflow, we wanted to help developers build and deploy sites without the added overhead of managing infrastructure and the disparate pieces that come along with it. We did that by collapsing hosting and deployment infrastructure into a single workflow (and in the process we added some really cool stuff like a custom global CDN, deploy previews and one-click HTTPS). 

Since then, the way we build websites has considerably evolved. With the explosion of interest the JAMstack and static site generators, there’s also been a massive uptick in the availability and sophistication of microservices and API-driven tools to extend the functionality of those sites. 

Yet, despite the growing maturity of the ecosystem and community, many developers, including us, have still felt that something was missing. Lots more pieces, but still no obvious or simplified approach to gluing them together. The process of connecting microservices, API gateways, functions, and servers is a pretty huge hassle, often preventing teams from building projects on the JAMstack.

We hope this release can change that. 

## Dynamic functionality, as easy as `git push`

With [Functions](https://www.netlify.com/docs/functions), [Identity](https://www.netlify.com/docs/identity/), and [Forms](https://www.netlify.com/docs/form-handling/) built into the Netlify core workflow, deploying dynamic functionality simply happens at the same time you deploy your site. You’ll write code where it makes sense and Netlify will handle the integration points.

## Functions

You can now deploy AWS Lambda functions on Netlify without configuring API gateways, coordinating deployments, or setting up an AWS account. Just add each function as a file in your Git repository and Netlify will take care of the rest. 

Your functions are version-controlled, built, and deployed along with the rest of your Netlify site, and the Netlify API gateway automatically handles service discovery. Plus, your functions benefit from the power of Deploy Previews and rollbacks.

Not sure if or how to use Functions? There are some pretty awesome examples in the wild, like [this tutorial](https://macarthur.me/posts/building-a-lambda-function-with-netlify/) that uses Netlify’s Functions to process a payment with Stripe and [this overview](/blog/2018/03/19/create-your-own-url-shortener-with-netlifys-forms-and-functions/) of how to create a URL shortener that uses your own custom domain. 

## Identity

Netlify’s [Identity](https://www.netlify.com/docs/identity/) feature is a JSON web token (JWT)-based user authentication service that allows you to manage signups, logins, password recovery, and more — all without rolling your own authentication service. The service is backed by Netlify’s open source [GoTrue API](https://github.com/netlify/gotrue) and can integrate with any service that understands JWTs. 

You can use Identity to register and authenticate visitors to your site, gate content, enable CMS functionality, make authenticated calls to outside services, and more. It’s as simple as turning on the service and adding some JavaScript to your site.  If you want an even faster way to get started, there’s a [standalone login widget](https://identity.netlify.com/) and [pre-built CMS template](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/one-click-hugo-cms&stack=cms#_ga=2.109621189.1985692033.1520268158-1359106690.1505249588).

## Forms

HTML5 was supposed to make everything easy, but that didn’t quite extend to form handling. Still, forms are the most frequently used bit of dynamic functionality on the web. We wanted to make it drop dead simple to manage forms and submissions on your site without any server-side code or JavaScript calls to third-party APIs. 

To use [Forms](https://www.netlify.com/docs/form-handling/) with Netlify, simply add an HTML form into any page on your site, add a `netlify` attribute to the `<form>` tag, and receive submissions in your Netlify dashboard. With Forms, you can export submissions in bulk, receive notifications and trigger webhooks. And they get even more exciting when integrated with Functions (check out [this tutorial](https://www.netlify.com/blog/2018/03/19/create-your-own-url-shortener-with-netlifys-forms-and-functions/) for building a URL shortener with Forms and Functions). 

HTML files are parsed directly at deploy time, so there’s no need for you to make an API call, include extra JavaScript on your site, or set up a server. 

## Try it out!

**Deploy your code, or try some of ours**

If you’re not already using Netlify, you can get started by signing up and connecting your Git repository, which takes about 30 seconds. Access to all of the features we released today is included with the free Netlify core workflow. [Pricing is metered](https://www.netlify.com/pricing/), so we’ll only charge you when your site goes over the limits of the free tier (hint: there’s plenty of room on those free tiers to find out whether these add-ons are useful tools for your site).

If you’re not quite ready to try Netlify with your own site, you can use [one of](http://templates.netlify.com/) [these templates](http://templates.netlify.com/) that includes functionality like a Git-centric CMS. 

**A smarter way to pay for Netlify**

We fundamentally believe that the [JAMstack](http://www.jamstack.org) is a better way to build web projects, and we want to make it simple and free for developers everywhere to try it. But many of you have asked how Netlify can offer our core features for free — like a global CDN, continuous deployment, Deploy Previews, and HTTPS. While Netlify’s core infrastructure is opinionated, purpose-built, and powerful, we think the really exciting things happen when you start building on top of it. 

When we [released Teams](https://www.netlify.com/blog/2017/06/28/introducing-teams-new-features-and-an-update-to-our-plans/) we saw that Netlify became more powerful as people could collaborate and add roles and permissions. But collaboration is only one part of what makes Netlify special. It also becomes more powerful when you incorporate dynamic functionality that allows people to interact with your site in new ways, or allows your site to use, access, and store data differently. With this release to general availability, Identity, Functions, and Forms will now be priced based on what you use. As your project grows, your tier will automatically scale up, so you only pay for what you need. If this release affects your existing plan, you’ll hear from us directly today. 

So go build something and tell us what you think of the new workflow. We’ll be listening in on [Twitter](https://twitter.com/netlify), [Gitter](https://gitter.im/netlify/community), and through our support team.
