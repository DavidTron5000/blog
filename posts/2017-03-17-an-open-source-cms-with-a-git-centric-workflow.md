---
title: An Open Source CMS with a Git-Centric Workflow
author: Matt Biilmann
image: /img/blog/netlifycmslogo.svg
format: blog
short_title: Netlify CMS - the introduction to our open source CMS
tags:
  - CMS
  - Git
  - React
description: >-
  A CMS that is open-source but fully-featured and production-ready, that’s as
  easy to customize as it is to use, and that developers and content editors can
  build a community around.
date: 2017-03-17T15:43:17.832Z
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/IbNvjNtL1Oo" frameborder="0" allowfullscreen></iframe>

**The Rise of a New Kind of CMS**

Traditionally CMSs have been large, bloated monolithic applications that gobble up more and more functionality as they evolve. Most CMSs enable content writers to create and update site content, and most of them provide tools for editorial collaboration, review, and approvals. The idea of this is great. However, it often comes at a cost of having to maintaining application servers and databases, with complex interwoven layers of cache—not to mention the possible security vulnerabilities.

Alternatively, site generators make use of APIs and recent browser features to be highly interactive, but updating content is usually a combination of Git and a Continuous Deployment tools… so you need to know (and use) Git. As a **developer**, this maybe not be a problem, but it’s not necessarily what you want to focus on when all you want is to add or edit content. Nor is it ideal for content managers, marketers, bloggers, journalists etc.

![null](/img/blog/Screen Shot 2017-03-17 at 8.48.25 AM.png)

We built [Netlify CMS](https://netlifycms.org) to bridge this gap. It’s an open-source React.js app that acts as a wrapper for the Git workflow, using the GitHub API. This allows collaborators to create, edit, review, and publish content without writing code or dealing with version control, and it allows developers to manage this content with familiar build tools and the convenience of Git. You can integrate it with any build tool and plug in to any static site generator.

However, we aren’t working in a vacuum. There are other CMS solutions for site generators, and they will continue to serve their use cases. Proprietary services like Contentful and DatoCMS provide the ease and polish of a concierge provider, while simple open source projects like Prose and Google Drive CMS provide basic functionality for more limited applications. We believe there will always be a place for them in the JAMstack ecosystem.

## The More the Merrier

Our vision for Netlify CMS was to carve a different niche. We aim to do for the JAMstack what WordPress did for dynamic sites back in the day. In other words, we want to build a CMS that is open-source but fully-featured and production-ready, that’s as easy to customize as it is to use, and that developers and content editors can build a community around.

![null](/img/blog/Screen Shot 2017-03-17 at 9.00.42 AM.png)

Expect to see more about our technical experience creating the CMS—it was a long journey. We encourage you to check out our [contributors guide](https://www.netlifycms.org/docs/contributor-guide/) and join the project. Have questions, want to chat with the team?[ Join our Gitter Community!](https://gitter.im/netlify/NetlifyCMS)