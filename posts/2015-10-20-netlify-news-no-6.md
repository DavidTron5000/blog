---

title: Netlify News No. 6
author: Chris Bach
image: /img/blog/michael-caine-newspaper.jpg
format: blog
short_title: Our Sixth Newsletter
description: "HTTP2.0 supported! Also new CDN PoPs, Canonical URLs & more!"
thumbnail: thumbnails/http2-1.png
cmsUserSlug: ""
date: 2015-10-20
tags:
  - netlify
  - news
  - https
  - ssl
  - cdn
  - urls
---

Hi Everyone

Hope you’re having a great week.

We'll get right to it.

## HTTP2.0
As one of the very first CDNs to roll this out to all clients Netlify CDN now supports HTTP 2.0 out of the box!! HTTP2 is enabled for all sites using HTTPS.

## New CDN Points of Presence

At Netlify we have a multi layered CDN strategy: all assets, JavaScript, images, CSS, font files, etc., we serve out of Akamais CDN.

<!-- excerpt -->

They have by far the most widespread infrastructure with PoPs (Points of Presence) all over the World. This is great for distributing files that never change (like finger-printed assets with far future cache headers), but really bad for rapid invalidation.

 This is why we make sure that ALL HTML files goes straight out of our own CDN. It's optimised for a super high cache hit-rate and instant cache invalidation. (This means that immediately after you update your site, you can see the changes live. No having to wait 10 minutes or more as with the other services!).

 Last week we rolled out new PoPs in South America, Australia and Asia, giving you much better time-to-first-byte in those regions!

 Here's a small speedtest that shows just how fast this makes a Netlify site:

 [https://performance.sucuri.net/domain/speedtest.netlify.com](https://performance.sucuri.net/domain/speedtest.netlify.com)

## Canonical URLs

Netlify now automatically sets up redirects to handle pretty, canonical URLs.

 If your source file is called /about.html, Netlify will rewrite internal links in your HTML files to /about and automatically redirect /about/ to /about

 If your source file is /about/index.html, then we’ll rewrite internal links to /about/ and automatically redirect /about to /about/

## Jekyll 3.0

In other news in the World of modern static web tech, Jekyll 3.0 is being launched next Monday! If you are in San Francisco, we urge you to attend the launch, you can sign up for free [here](http://netlify.us2.list-manage.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=a963250994&amp;e=892365411d).

Jekyll is the most popular static site generator around right now, and this latest version contains huge updates.

## Picking up Speed

We’re super stoked that so far we’ve been able to keep true to our promise to you of being the fastest and most full featured static site hosting service on the market.

 And we’re just as stoked that y’all chosen to come along for the ride.

 And if you haven’t already, do give us a [try today](http://netlify.us2.list-manage.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=e38b9ef1dc&amp;e=892365411d) and make up your own mind of what’s what.

## What's Next

We have great news for our Enterprise features as well. However that’s a story for another newsletter.

   Till then,

 Have an awesome day.

 /Matt &amp; Chris
