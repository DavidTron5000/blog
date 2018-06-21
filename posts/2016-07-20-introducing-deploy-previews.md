---
title: Introducing Deploy Previews in Netlify
author: David Calavera
image: /img/blog/deploy-preview-banner.png
short_title: Deploy Previews
tags:
  - deploy previews
  - git
  - pull request
  - continuous delivery
format: blog
description: Deploy every pull request from your git repository to a unique URL.
date: 2016-07-20T00:00:00.000Z
---
There is a better way to build for the web and collaborate with your team.

For years, developers have enjoyed the benefits of practices like Continuous Integration and Continuous Delivery in their workflows. Unfortunately, traditional hosting platforms only allow you to deploy your sites to the same URL every time. You need to manually create new sites to allocate new URLs if you test and verify changes before putting them into production. These limitations make CI and CD tedious and hard to implement for websites and front-end applications.

Today, we’re very excited to introduce our solution to these problems, Deploy Previews. This will allow you and your team to see what changes will look like in production, without having to deploy them in your existing site.

For instance, last Monday, we published a blog about [Slack notifications](/blog/2016/07/18/shiny-slack-notifications-from-netlify/). Prior to posting, I had a deploy preview URL available for my team to review, make improvements and comment. This can be done with any page on any site using Deploy Previews on Netlify.

Deploy Previews work by deploying every pull request from your git repository to a unique URL; completely different from the one your main site uses. You and your team can see how those changes look before they’re merged into the main branch and deployed to production.

To help you discover Deploy Previews, we put those links where it helps your team the most, directly in the pull request as commit statuses:

![](/img/blog/deploy-preview-success.png)

We keep this preview up to date as you continue to work, committing new changes to the same branch. Our CDN takes care of invalidating the cache every time for you.

![](/img/blog/deploy-preview-workflow.gif)

Deploy Previews work with most git hosting supported by Netlify, currently GitHub and Gitlab. They are available for all our pricing plans, including free sites. You only need to [add commit hooks to your Netlify sites](/docs/webhooks#outgoing-webhooks), we take care of the rest. We’ve also integrated Deploy Previews with other notifications, like Slack’s incoming webhooks:

![](/img/blog/deploy-preview-slack.png)

We’ve been using Deploy Previews internally for some time and they’ve already improved the way we develop and release all our front-end applications significantly. We hope you find them as useful as we do and start enjoying the benefits of Continuous Delivery for all your projects on Netlify.
