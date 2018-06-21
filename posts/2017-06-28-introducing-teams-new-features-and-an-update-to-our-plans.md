---
title: 'Introducing Teams, New Features and an Update to Our Plans'
author: Matt Biilmann & Chris Bach
image: /img/blog/teams-blog-post-header.jpg
format: blog
short_title: 'Intro to Teams, Features and New Plans'
tags:
  - plans
  - features
  - teams
  - ELRs
description: >-
  We are excited to announce new additions to our features, Teams functionality,
  and a new family of plans that include an (even more) awesome free tier!
date: 2017-06-28T00:01:08.000Z
---
## **Disclosure**: *Our pricing plans have changed.*

*For details on our current plans and pricing, please see our [Pricing page](https://www.netlify.com/pricing).*

One of the key things we've learned at Netlify is how empowering it can be for developers when they are enabled to find ways to extend their Git workflow and better accommodate the use of modern build tools.

Today we're introducing a series of changes we believe makes Netlify even more valuable for teams and companies. In addition to exciting new features, we’re making our free tier far more useful and permissive for solo developers, open source projects, and companies building production-quality websites.

**Better Collaboration: Meet Teams**

Until today, Netlify was based on individual accounts with pricing and collaboration tied to a single website. The *number one* request we’ve received from our 90,000\+ users is a **Teams** functionality and we’re thrilled to introduce it today.

Now you’re able to create as many teams as you like, with as many sites as you want! This means you can collaborate with other developers not just on a single site, but on all the sites that belong to a team.

See the whole flow in action here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/iCiV069UAzo?list=PLzlG0L9jlhEPMR8haUPkxj2hJ_3jh5qa6" frameborder="0" allowfullscreen></iframe>

**Getting to the Edge: Edge Logic Requests (ELRs)**

One approach to publishing sites that makes Netlify unique is our Intelligent CDN. The way we've built out our Content Delivery Network allows us to handle Edge Logic Requests (ELRs).

Our Intelligent CDN can process requests you’d normally have to run through your server or client-side via JavaScript. This means  we’re able to get much closer to the end user, without any performance loss over traditional static files served out of a CDN.

Today we're introducing two powerful new features based on functionalities we’ve built around ELRs:

**Branch-Based Split Testing**

When Netlify integrates with your Git repository, we don't just build and deploy a single branch, we integrate far deeper into your existing Git-centric workflow.

For example, when you create a pull request we deploy it to a unique subdomain. You can browse your entire site or app as if you   had already merged those changes in. For any branch you create, we'll give you a URL where you can follow that branch as it evolves.

Our new Branch-Based Split Testing allows you to divide traffic for your main domain between two or more branch deploys. Since this logic takes place on the CDN, as opposed to your server or client-side, you experience **zero performance loss**. Affinity tracking cookies ensure that each visitor gets a consistent experience every time. This frees you from the headaches of relying on traditional legacy approaches.

Split Testing is **free** on all our plans starting today.

We encourage you to take it for a spin. Start with gradual roll-outs of major redesigns, testing performance of variations on your site, or split test your next big feature.

See it in action here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/1FV96jp_Ii0" frameborder="0" allowfullscreen></iframe>

Check out [our documentation](https://www.netlify.com/docs/split-testing/) on how to enable your first Split Test.

**Visitor Access Control with JSON Web Tokens**

On Netlify your site content is prebuilt by using a site generator then deployed to our Intelligent CDN. We know that controlling the privacy of those sites is important for many of our clients. We've always offered global password control, but there are various cases where you might want to have more granular control of who gets access to the resources on your site.

Until now, clients that required that more granular level of control found themselves falling back to a  monolithic website with a dedicated backend, or deploying a full authentication API for their particular use case.

Netlify's new JWT-Based Access Control has changed that approach completely.

With this feature you enable granular role-based permissions by delegating authentication and user management to any service that can issue JSON Web Tokens (like [Auth0](https://auth0.com/) or our own open source [GoTrue microservice](https://github.com/netlify/gotrue).) All of this happens on the CDN level, eliminating the need for a cumbersome full-stack application of a fully deployed authentication API.

Check out  how to use JWT-Based Access Control in [our documentation](https://www.netlify.com/docs/visitor-access-control/).

**A Giant of a Free Plan**

In addition these new features, we've restructured our family of plans. We’ve made the free tier even more powerful, and aligned paid plans with the needs of our paying clients.

The new, free Bronze plan includes all the features that have historically made Netlify so powerful. This free plan can be used on personal **and** commercial projects (even with private code), as well as for any of your prototypes, experiments, open source projects, or one-off sites.

Check out some of the features included in the new, free Bronze plan:

* HTTPS with Custom Domains and Domain Aliases
* Let's Encrypt and Custom HTTPS certificates
* Continuous Deployment
* Instant Cache Invalidation and Atomic Deploys
* Deploy Previews and Deep Git Integration
* Branch-Based Split Testing
* CDN-Level Proxying
* GeoIP and Language-Based Redirects
* Integrated DNS hosting
* Prerendering
* Asset Acceleration
* JavaScript Snippet Injection
* Form Processing
* Redirect and Rewrite Rules
* Custom HTTP Headers
* Client-Side Routing Support
* Teams

Our new Platinum, Gold, Silver, and Bronze plans are based on the level of control you need over security, performance, and access. They’re no longer based on per-site pricing but on the *number of users* on your paid team.

After many discussions with our customers, the feedback has been consistent and we believe this change reflects how businesses, agencies, and startups are using Netlify to collaborate and make their publishing workflow significantly better.

See the full details on the new plans on our [Plans and Pricing page](/pricing).

**Onward and Upward**

It’s been exciting to roll out these changes and our team believes Netlify is now an **even better** platform for developers, open source projects, agencies, and businesses of any size.

Special thanks to everyone who's joined us so far on the journey to re-think the way web projects are built. This is an important step for us and we’re happy to share it with you and we appreciate you spreading the word.
