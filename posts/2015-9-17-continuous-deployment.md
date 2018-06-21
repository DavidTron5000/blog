---

title: Continuous Deployment
author: Chris Bach
image: /img/blog/modern_times_gears.jpg
format: blog
short_title: Continuous Deployment
description: Automatically build and deploy every time you push to git. All part of Netlify.
thumbnail: thumbnails/softwareupdate-icon.png
cmsUserSlug: ""
date: 2015-09-17
tags:
  - netlify
  - features
  - builds
---

Continuous Deployment is one of the key features that sets Netlify apart.

With all other hosting services you need to build this yourself or pay for and install 3rd party software.

**What is it?**

Basically it means that we build, configure and deploy your site every time you push to git (be it a self-hosted repo, GitLabs, Bitbucket or of course GitHub). So you don’t have to do anything manually.

 _A sidenote:_
Many people confuse Continuous Deployment with Continuous Integration. So just to clarify, the latter refers to making merges in your repository and to running a test server that makes sure an automatic test is run every time you update that repository.

<!-- excerpt -->

**So how does it work?**

You can setup continuous deployment in just a few seconds via Netlify's web UI or CLI tool. Pick the repository you want Netlify to deploy and just set your build command and the directory you want to deploy after the build is done. In most cases though, Netlify will simply guess your configuration once you select the repository.

 Netlify will then install all your dependencies, run your build command of choice and deploy the result. And from then on, Netlify builds and deploys your site every time you push to git.

**What else can we tell you?**

* Webhooks &amp; notifications
Whether you need to trigger a build &amp; deploy through a webhook or receive notifications on new deploys, Netlify has got you covered.

* Cached Dependencies
  Dependencies (rubygems, npm, etc) are automatically installed and cached between builds to keep build time down.

* Secure Environment
   We never store any GitHub tokens on our servers and your builds are run in a completely locked down environment.


**Is everyone else using it?**

All our agency clients and the more heavy weight web developers tend use continuous deployment, as it regulates and eases the workflow a ton.

**Questions?**

Write them in the comments below, or [ask](https://www.netlify.com/support) and we’ll do our best to answer.
