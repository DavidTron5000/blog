---
title: Get full control over your deployed branches
author: David Calavera
tweet: ''
image: /img/press/logos/logomark-light.png
short_title: Get full control over your deployed branches
tags:
  - continuous deploys
  - builds
  - deploy previews
format: blog
description: >-
  Netlify now gives you control over which branches in your Git repository you
  deploy as well as how you use Deploy Previews, a snapshot of what your site
  will look like when its merged.
date: 2017-11-16T13:25:42-08:00
draft: false
---
Branch Deploys and [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) are two of Netlify’s most popular features. Branch Deploys build every branch published in your repository every time you push to it while Deploy Previews give you an instant view of how your site will look once you merge. While both features are powerful on their own, it can be cumbersome to deploy all your branches just to use Deploy Previews. 

So today, we’re introducing a fundamental change to how Branch Deploys are activated that gives you significantly more control.

We’ve added a new setting to Netlify’s build and deploy pipeline that allows you to customize what you want to deploy. You now have the ability to select any of the following options: 

* Deploy all branches and all Deploy Previews on them
* Deploy only your production branch and all Deploy Previews on that branch
* Deploy your production branch, the additional branches you specify, and all their Deploy Previews

![allowed branches](/img/blog/allowed_branches.png)

All your current sites will remain as they are, building and deploying everything, however, we’re making a change to how new sites behave by default. Starting today, any new site you add won’t have Branch Deploys enabled by default. We will deploy the production branch and all Deploy Previews on that branch, but we won’t deploy branches under their own subdomain unless you add them the list of additional branches.

If you have questions or feedback about these changes, give us a shout on [Twitter](https://twitter.com/Netlify), [Gitter](https://gitter.im/netlify/home), or [through support](https://paper.dropbox.com/support).
