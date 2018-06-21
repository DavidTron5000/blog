---
title: Netlify Plus Hugo 0.20 and Beyond
author: David Calavera
image: /img/blog/hugo.png
short_title: Hugo 0.20 and beyond
tags:
  - hugo
  - build
  - deploy
format: blog
description: Upgrading and testing Hugo 0.20 and any future release.
date: 2017-04-11T15:59:17.219Z
draft: false
---

[Hugo 0.20](https://github.com/gohugoio/hugo/releases) was released yesterday with an amazing new set of features. We're super fans of Hugo at Netlify and we always like to make new releases available on our platform as soon as we can.

This blog post explains how you can start using Hugo 0.20 today, how to test that your site is working with the new version using [Deploy Contexts](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts), and the changes we’ve made so you can install any future new version of Hugo without having to wait for us to make it available.

*Until yesterday,* if you wanted to use a new version of Hugo on Netlify, you had two options. The first one was to wait for us to install it on our build servers and work around name collisions. Although it was not complicated, you can see by reading this [blog post](https://www.adamwills.io/blog/hugo-version-issues-netlify/), it's not very sustainable. The second option was to add the version of the Hugo binary you wanted to use to your repository. Since Hugo is a static binary, this is a very convenient solution if you want to manage it yourself.

*Starting today,* if you want to use a specific new version of Hugo on Netlify, you only need to set the environment variable `HUGO_VERSION` with the version number you want to use. If it's a valid release number, we'll install it for you and use that version. You don't have to wait for us, or manage binaries yourself. For example, if you want to use Hugo 0.20 right now, you can go to your site's settings (Build and Deploy, Build Environment Variables section) and set `HUGO_VERSION` to `0.20`   in your environment.

This change will apply to your production site, so I don't recommend you to do this right away. 

This is one of the times where our Deploy Contexts come very handy. We can use them to tell Netlify to use a new version of Hugo only for testing. To do that, open the `netlify.toml` file in your repository, or create it if you don't have it already and add the following section:

    [context.deploy-preview.environment]
      HUGO_VERSION = "0.20"

Create a new pull request for this change in your repository, and Netlify will use this specific version of Hugo only for its preview. Once you are confident that your site is working as expected, you can promote this version to production. 

You can also do this in the configuration file directly. Replace the previous section with a new production section:

    [context.production.environment]
      HUGO_VERSION = "0.20"

As part of our commitment to Open Source, we thought it could be interesting for other people to know how we made this work. We wrote a very small program called [Binrc](https://github.com/netlify/binrc) that downloads release files from GitHub. We use it in our build servers to detect version numbers for projects using GitHub releases, and pull the specific binaries. We're planning on extending this program to support other binaries, but it was a great MVP to test with Hugo.

With this change, we're giving you total control on when and how to use new releases of Hugo. Let us know if you have feedback, we'd love to hear from you. 
