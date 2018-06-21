---
title: Migrate GitHub Pages to Netlify
author: Ryan Neal
image: /img/blog/gh_to_nfp.png
short_title: Migrate GitHub Pages to Netlify
tags:
  - github
  - walkthrough
format: blog
description: How to migrate a GitHub Page to Netlify using the CLI
date: 2016-08-02T00:00:00.000Z
---

Move from GitHub Pages to Netlify in with just a few commands!  This will work immediately to deploy your existing site.

For more details about how to complete the migration such as enabling your site to build in our CI system, [check out this newer article that has more details](/blog/2017/05/11/migrating-your-jekyll-site-to-netlify/).

In this post I’ll show you how easy it is to migrate your GitHub page to Netlify. I’ll be using my personal project ([GitHub Pages](https://rybit.github.io) & [Netlify](https://rybit.netlify.com)) as an example. The project is a simple site that has no build necessary, the markup is all just in the root directory.

These steps assume that you have `node` and `npm` installed on your machine already. If you haven’t used the Netlify CLI before, it will open a browser page to login and set the credentials.


    npm install -g netlify-cli # install the cli
    netlify create --name rybit  # create your site, giving it the name 'rybit'
    netlify deploy               # deploy the site
    netlify open                 # view the site

The deploy site will ask you some simple questions and then push up the site to your url. Your site is now live!

If you want to setup [continuous delivery](https://www.netlify.com/docs/continuous-deployment), every push to your git repo will update your site automatically, it is a single command.


    netlify init               # adds webhooks for github

It’s just that easy. Your site is now live on our global CDN and tied in to git. Watch below to see it in action!

![](/img/blog/github-to-netlify.gif)

Don’t worry if you missed any flags, want to setup a custom domain or do any other number of useful tasks, you can always [log in to the app](https://app.netlify.com) and tweak the settings.
