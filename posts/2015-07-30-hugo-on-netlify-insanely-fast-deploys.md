---

title: Hosting Hugo on Netlify–Insanely Fast Deploys
author: Mathias Biilmann
image: /img/blog/hugo-speed.jpg
format: blog
short_title: Hugo Available on Netlify
description: "From push to GitHub, until a new deploy is live on our CDN in 6 seconds for our test project!"
thumbnail: thumbnails/hugo-logo-small.png
cmsUserSlug: hugo-on-netlify-insanely-fast-deploys
date: 2015-07-30
tags:
  - news
  - hugo
  - go
---

There are those who describe Netlify as “GitHub Pages on Steroids”. If that’s the case then Hugo on Netlify must be digging into Lance Armstrong's stash.

Starting today you can easily run [Hugo](https://gohugo.io/) based builds with Netlify. Use `hugo` as your build command to run the latest version of Hugo, or use `hugo_0.14` to run your build with a specific version of Hugo.

<!-- excerpt -->

## Killer Performance

[Hugo](https://gohugo.io/) is a really exciting static site generator written in Go. For a while now it's been surging up the rankings at StaticGen, [the leading directory of top open-source static site generators](https://www.staticgen.com/).

Go is a compiled language that produces statically compiled binaries that tend to be significantly (!) faster than any of the common interpreted languages. It has great support for high performance async IO operations, and since static site generators often spend a long time reading and writing files, this can make a world of difference in performance.

That shows, when you compare Hugo with just about any other static site generator. The [Hugo Homepage](http://gohugo.io/overview/introduction/) claims ~1ms per page, and that's consistent with what we've seen in our tests.

## Our Tests

The average time from push to eg. GitHub, until a new deploy is live on our CDN was around 6 seconds for our test project!

Setting up continuous deployment for a Hugo project is straight forward, here's the settings for our test site:

![Hugo Netlify Configuration](/img/blog/hugo-configuration.png)

We've simply set the build command to `hugo` to track the latest `hugo` release, but if you want to make sure future `hugo` releases won't cause problems for your build, just choose `hugo_0.14` as your build command.

That's it — now you're ready to go from Push to Deploy in 6 seconds!

So if you dig modern static websites, but want to cut time of your build process, make sure to check out Hugo. On Netlify :)
