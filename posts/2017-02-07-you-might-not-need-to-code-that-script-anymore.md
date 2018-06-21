---
title: You might not need to build that script anymore
author: Brian Douglas
image: /img/blog/termnial-tools.jpg
format: blog
short_title: You don't need that build script
description: >-
  Regularly I see posts on Twitter and Medium about how a clever developer used
  a hand-built script to build and deploy their websites using git. I applaud
  the effort and determination but want to mention all others that this doesn't
  have to be the norm.
date: 2017-03-07T11:39:13-08:00
---

![rube-toilet-paper-machine](/img/blog/rube toliet paper.gif)

I often see individuals tweet about code showing they integrated into a complicated build script just to publish their website.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Got tired of manually deploying things to my website, so I just spent the last hour hooking it up to <a href="https://twitter.com/travisci">@travisci</a> to build and deploy it.</p>— Iheanyi 🇳🇬 Ekechukwu (@kwuchu) <a href="https://twitter.com/kwuchu/status/818235471985864704">January 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I applaud the effort in solving the problem of automating deployments for [static\*](https://jamstack.org) sites and actually have more respect for them in doing the hard work of perfecting continuous integration (CI). I just want to point out that this doesn't have to be a problem we solve every week -- git-centric deployment is a solved problem.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Achievement unlocked. Every PR to our <a href="https://twitter.com/seekjobs">@seekjobs</a> style guide now automatically deploys a preview of the static site to <a href="https://twitter.com/surge_sh">@surge_sh</a> 📦🚀</p>— Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/821533267220262912">January 18, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

At the time of writing this article, Netlify has 150k\+ deployed sites, most of which are connected via git providers. These repos are deploying like clockwork using Netlify's [seamless integration](https://www.netlify.com/docs/continuous-deployment/) to manage deployments. This means you can take your existing build scripts to kick start your CI without the need for hot-wiring code into place. The only requirement is providing your build command to Netlify when connecting your repo. This could be the build command from your static site generator, like `hugo build` or the production webpack config wrapped in your `npm run build`.

With Netlify, a new build will trigger every time you deploy to your staging, master, or even secret-feature branches. Netlify provides preview sites for each of the branches that you can share via CI and even manage using their [deploy context](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts) feature.

So next time your friends go off into the corner to start writing the ultimate script that triggers deploys on successful pushes to GitHub, tell them they don't have to anymore—[just use Netlify](https://app.netlify.com/signup).