---

title: Instant Cache Invalidation
author: Chris Bach
image: /img/blog/instant-cache-thumb.jpg
format: blog
short_title: Instant Cache Invalidation
description: "Instant Cache Invalidation is definitively part of Netlify's rocketjuice. Learn all about it here."
thumbnail: instant-cache-thumb.jpg
cmsUserSlug: ""
date: 2015-09-11
tags:
  - netlify
  - features
  - cdn
  - cache invalidation
---

> "There are only two hard problems in Computer Science: Cache Invalidation and naming things."
> _– Phil Karlton_

While we’d rate our ability to name things to be fairly average, Instant Cache Invalidation is definitely part of Netlify’s rocketjuice.

Here is a bit about what it actually means, and why it’s important.

![cache-invalidation-quote.png](/img/blog/cache-invalidation-quote.png)
*See what I did there?..*

<!-- excerpt -->

## Cache Invalidation

One of the spectacularly good reasons for making a modern static website instead of a traditional dynamic site, is that a modern static site can be hosted exclusively on a CDN (Content Delivery Network). That means instead of having your site on one limited server, you have your site on nodes all over the World.

So, your site doesn’t actually need to be on a server as such, but can simply be distributed in Local Caches everywhere.

This makes it lighting fast, and on average the Time to First Byte - as in the time it takes to start loading - is 10 times (!!!) less than with a fully optimised Dynamic site.

However, this great speed opens the issue of cache invalidation. On the CDN your site is stored in the local cache (again, this is awesome, it’s what makes it so fast). But when you upload a change to your site, the files affected need to be invalidated.

So you (or the hosting service / build tool you use) tell the CDN servers, that they have to discard the old files, and pick up new ones instead.

This is what is called Cache Invalidation: Clearing a cache, replacing the old files with the new ones…

## The problem

Except for Netlify, all CDN hosting services for static sites (that actually cache sites) make you wait anywhere from 10 minutes to several hours for your changes to be invalidated. So in other words, once you publish a change in your site, you have to wait to see it live.

Many find this to be a dealbreaker. They need to make sure that the changes they’ve made look like they’re supposed to right away. Which is fair enough. A marketing employee doesn’t really want to wait an hour to find out they have a logo (in the wrong color) covering half of the dropdown menu when the site is viewed in Chrome…

The slow cache invalidation is one of the major issues for static sites, and a main reason that many choose to stick with traditional dynamic sites. They are build on the server every time so they don’t have to worry about cache invalidation in the same way…

But building on the server every - single - time someone visits is the exact same reason as why we want to make modern static sites instead as they DON’T have to be build every time - it’s because of this that they can be hosted exclusively on a CDN and be so much faster, safer and cheaper to scale.

A “half-solution” can be to rewrite the URL of each file every time it changes:

For assets (files) like CSS files, JavaScript or images, you can work around cache invalidation by rewriting the URL for the file each time the content changes (this practice is also called asset fingerprinting). This can solve the cache-invalidation issue for your supporting assets, but you can't use this technique on the HTML files themselves. And setting this up yourself can be quite the task, and you would still have to update the headers of your files.

Most CDN services will have you choose between caching aggressively and having to wait for updates to go live, or do no caching on your HTML files which mean you're not benefitting from the CDN layer at all for those files.

— So either wait, or miss out on the promised speed of the modern static site…

![choose-your-poison.gif](/img/blog/choose-your-poison.gif)

## The solution

With Netlify you get the best of both Worlds.

Netlify is the only CDN hosting service that provides INSTANT cache invalidation

Once your build is uploaded, we flip the switch and it goes live and the changes in your build are instantly pushed to our global CDN.

In order to give the lowest time-to first byte, the highest cache hit-rate, but with true instant cache invalidation, we’ve developed a multilayered CDN.

What it means is simply that when you update your site you don’t have to wait to see the changes live, but can see them as soon as your site is updated!

So, you get a highly cached site which makes it load ultra fast. But at the same time you see your changes when you update, instantly.

![instant-cache-invalidation-joy.gif](/img/blog/instant-cache-invalidation-joy.gif)
*If the above didn’t register, laughing cute animal / baby + Betty White should leave no doubt. Instant Cache Invalidation is a great thing.*


## The tech part

When you deploy a site, **Netlify** fingerprints all links to assets like CSS files, images, font files or your JavaScript, and serve them straight out of Akamai with caching headers that tells both browsers and Akamai to cache them forever. Akamai have the largest CDN infrastructure in the world, and can serve these kind of assets with incredible performance, from servers as close as possible to the end-users.

The actual HTML files however are hosted on our own special-purpose CDN. It's highly optimised for a super high cache-hit rate, and for getting the best possible time to first byte, while being able to instantly invalidate all HTML files that changed after an update to a site.

So there you have it.
