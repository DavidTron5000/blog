---

title: Prerendering Explained
author: Brian Douglas
image: /img/blog/
format: blog
short_title: Prerendering Explained
description: Prerendering is a process to preload all elements on the page in preparation for a web crawler to see it. This is very important tool for Single Page JavaScript applications where SEO is needed.
cmsUserSlug: ""
date: 2016-11-22
tags:
- seo
- prerender
---
If you’re using a [Single Page Application](http://adamsilver.io/articles/the-disadvantages-of-single-page-applications/) (SPA) for a site that’s not behind a login, SEO is an important concern. [Google recommends](https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html) you use their built-in capacity for interpreting JavaScript applications, but our recommendation is not to trust Google on this. In our experience that’s often still not enough and prerendering is often still a necessity.

SPAs are a flavor of the [JAMstack](https://jamstack.org/) and a fast way for building apps. It doesn’t require a server to host all your front-end on a CDN and you can actually use JavaScript and APIs for any moving parts. SPAs relying on JavaScript tend to not serve all necessary information when it's time for the Web Bots to read, the problem is sometimes everything on the page is not loaded and ready to consume. Instead of seeing the content of your page, they are met with the JavaScript tags and blocked from viewing your site correctly. You want to avoid showing a screen filled without scripts so Google can view through your pages at ease.

JavaScript is becoming the predominant language to build the web. Presenting all your content is important since [Page Ranking](http://pr.efactory.de/e-pagerank-algorithm.shtml) not only includes relevance and quality of content but also considers whether or not the content is viewable in a reasonable amount of time.

## What is Prerendering?

Prerendering is a process to preload all elements on the page in preparation for a [web crawler](http://www.googleguide.com/google_works.html) to see it. A prerender service will intercept a page request to see if the user-agent viewing your site is a bot and if the user-agent is a bot, the prerender middleware will send a cached version of you site to show with all JavaScript, Images, etc are rendered statically. If the user-agent is anything but a bot, then everything is loaded as normal, prerendering is only used to optimize the experience for bots only.

To better understand this here is an image:

![robot-example-meme](/img/blog/prerender-robot.jpg)

*Photo courtesy of knowyourmeme.com*

Services like [Prerender.io](https://prerender.io/) uses a headless browser to perform the action of loading all your assets into a static HTML for the bots to enjoy. This approach allows you to continue to build your site using the latest JavaScript frameworks like React, Ember, and Angular and not have to rely on a server render solution.

## What type of Bots are we talking about here?
Google’s web crawler is a bot that checks out the content and navigation of your site. The Google bot will make sure all links work and lead places and that your site has a decent time first byte or initial page load. Web crawlers are also trained to read HTML, but not trained to read JavaScript Single Page app as something more than just one HTML page. The entry point to your page tends to be the only `index.html` which is the only page provide when crawling through your page, despite extra routes and templates providing through your JavaScript framework.

```html
// index.html
<!doctype html>
<html lang="en" ng-app>
  <head>
    <meta charset="utf-8">
    <title>One HTML File</title>
    <script src="bower_components/angular/angular.js"></script>
  </head>
  <body>

    <p>Nothing here {{'yet' + '!'}}</p>

  </body>
</html>
```

Social network bots, i.e. Twitter, Facebook, etc, showcase links to your website also use bots the [Open Graph](http://ogp.me/) data from the site's metadata will load instead of a pre-cached version from prerendering.

![prerender example](/img/blog/prerender-example.png)

## Should I Prerender all the things?

The short answer is no. However, I would definitely use prerendering if my site is a SPA and needs to be available for bots to crawl it. When the content lives behind a login screen, prerendering becomes uneccesary, since bots won't ever make it through the first login screen. It is also not necessary to prerender your site if all your content is already a static HTML page and not a JavaScript enabled SPA.

I hope this brief introduction provides enough information on prerendering and you now have an idea of when to use prerendering in the wild. If you maintain a JavaScript SPA and interested in adding prerendering to your page, you can do so on all paid and open source plans. This feature is one click away through Netlify, find it on your site's settings page to enable and make those bots happy.



