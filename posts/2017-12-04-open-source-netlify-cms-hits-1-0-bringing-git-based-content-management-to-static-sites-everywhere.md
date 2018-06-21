---
title: >-
  Open source Netlify CMS hits 1.0, bringing Git-based content management to
  static sites everywhere 
author: Shawn Erquhart
tweet: >-
  Today the open source Netlify CMS hits 1.0, making Git-centric content
  management easier for static sites. 
image: /img/press/logos/logomark-light.png
short_title: Open source Netlify CMS hits 1.0 with editor-friendly UI
tags:
  - CMS
  - open source
  - jamstack
format: blog
description: >-
  The open source Netlify CMS has hit 1.0, with the release of an
  editor-friendly UI and general improvements that yield greater stability and
  usability. 
date: '2017-12-07'
draft: false
hacker_news_id: ''
---
Today we shipped [Netlify CMS 1.0](https://github.com/netlify/netlify-cms), the production-ready update to our open source project that allows developers to implement Git-based content management for static sites and single page apps. The project now features a fully-redesigned user interface, rewritten markdown editor, and media library. 

![In-post view for editors](/img/blog/editor view flavbor wheel.png)

## The Road to 1.0

### The promise of static becomes a reality

In the last few years developers have increasingly embraced both static development and the [JAMstack](https://jamstack.org/), a methodology that uses JavaScript, reusable APIs, and markup to build sites. Plenty of awesome, headless content management options surfaced, too. But we saw a gap. The modern web development tool landscape needed an open source, community-driven option that enabled static content management for Git workflows.

Netlify CMS is that contribution. Since JAMstack sites can handle functionality like commenting and e-commerce through separate APIs, a CMS can focus on just one thing: managing content. Netlify CMS provides an intuitive interface for managing content, stored as persistent data in a Git repository. This means editors can create and publish while developers build faster, more scalable, and more secure sites. 

### A CMS that works where you do — in Git

Nearly [70 percent of developers are using Git](https://insights.stackoverflow.com/survey/2017#technology), a workflow that can be at odds with traditional content management systems that impose specific tool and infrastructure choices. But with this paradigm shift in web development, your CMS doesn’t need to dictate your workflow.

Netlify CMS interacts directly with your Git repository via API, and every content change is a commit. You can also bring your own tool chain, so you can use your preferred build tool, site generator, and CDN. Plus, the CMS itself can live in your Git repository as a standalone page. 

### Open sourced with love by a growing community

We believe that a healthier, more scalable web depends on development methodologies like the JAMstack, which need to include a Git-friendly, decoupled way to manage content. While there are some good proprietary options, a healthy open source project can drive stability, feature growth, and user adoption — hastening the emergence of a new standard. 

Since launch, Netlify CMS has garnered more than 3,500 stars on GitHub thanks to the earnest and thoughtful work of 60 fantastic contributors. A special thanks goes to [Caleb](https://github.com/tech4him1), one of the maintainers who volunteers his time on the project, who has been great at leading us through code review, issue triage, and several other vital projects. 

### The hackable and extensible CMS

Netlify CMS is built as a single-page React app. Once you add two files to your site, include or link to the JavaScript, and add your configuration, it’s yours to customize. You can create custom-styled previews, UI widgets, and editor plugins or add backends to support different Git platform APIs.

## What’s new in 1.0

Netlify CMS 1.0 adds a rewritten markdown editor, new media library, and completely redesigned user interface that combine with bug fixes and general improvements to fill in all major product gaps. 

Because these features make the CMS a more welcoming experience for content editors, we also wanted to ensure they had an easy way to access it. Another new feature, the [Git Gateway](https://www.netlifycms.org/docs/authentication-backends/#git-gateway-with-netlify-identity), allows the CMS to be used with a GitHub backend without requiring users to have a GitHub account. It can also can be combined with OAuth services like Netlify Identity for user management, so editors can log in with an email and password.

## What’s next for Netlify CMS

Hitting 1.0 puts us on a path to build a richer and more extensible ecosystem around Netlify CMS. In the coming months you can expect to see improvements to the 1.0 UI, config UI, interactions, and other fundamentals. We also plan to build templates, tutorials, migration tools, and partnerships that will make it easier for different types of projects to use Netlify CMS. And you can help us drive the roadmap. Join our next weekly planning call to lend your voice. 

Ready to give Netlify CMS a try? Deploy a pre-configured template that uses [Hugo](https://github.com/netlify-templates/one-click-hugo-cms) or [Gatsby](https://github.com/AustinGreen/gatsby-starter-netlify-cms). You can also head over to [Netlifycms.org](https://www.netlifycms.org) to read more about the project.
