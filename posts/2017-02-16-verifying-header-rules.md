---
title: "Verifying your header rules configuration"
author: David Calavera
image: /img/blog/headers-playground.png
format: blog
short_title: Verifying your header rules configuration
description: Learn how to use Netlify's Playground to test your header rules.
thumbnail:
cmsUserSlug: ""
date: 2017-02-16
tags:
  - elm-lang
  - debugging
  - header rules
  - playground
  - cdn
---

According to our metrics, we've processed more than one hundred thousand deploys with [custom header rules](/docs/headers-and-basic-auth). It turns out, that being able to customize the headers your site sends to a browser is very useful. You can configure CORS rules, specify security policies and even change the cache rules for those assets you know that never change. However, until now, it was hard to be sure if your headers were correct. The only way people had to test them, was to push them to their sites and check the browser's responses looking for them.

Today, I'd like to tell you about two improvements we just released to help you verify your header rules configuration.

First, we've started to log invalid rules in your deploys log. If you don't see a header in your site responses, you can check the log and you'll probably find why this rule is not being applied.

Second, we've added a new Header section to [Netlify's Playground](https://play.netlify.com/headers). There, you'll be able to paste the content of your header rules file and get an immediate validation for all your rules. That way, you won't have to verify your header rules after deploying your site ever again.

![](/img/docs/headers-playground.png)

Netlify's Playground is Open Source, if you want to help us make it better, don't hesitate to stop by the [Git repository](https://github.com/netlify/netlify-playground).
