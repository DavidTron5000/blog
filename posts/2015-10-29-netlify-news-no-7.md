---

title: Netlify News No. 7
author: Chris Bach
image: /img/blog/radio-club-1920.jpg
format: blog
short_title: Our Seventh Newsletter
description: "Netlify now 1 stop for all your prerendering needs, multiple domain aliases supported & testing your build locally easier than ever!"
thumbnail: thumbnails/dog-riders-harness-halloween-costume-mailman-3664.jpg
cmsUserSlug: ""
date: 2015-10-29
tags:
  - netlify
  - news
  - prerendering
  - domains
  - builds
---

Hi there.

Hope you are having a great week.

We've got lot's of big news, so we will get right to it!


## Prerendering
If you’re using a single page app for a site that’s not behind a login, SEO is an important concern. Pre-rendering is the answer, and Netlify has supported external prerendering services like prerender.io for a while.

Now we’re proud to announce that Netlify has this feature built-in!

<!-- excerpt -->

If you’re on a plan that supports prerendering, just check the “Prerender” checkbox from your site settings and click save. Netlify will start proxying requests to our prerendering servers if they have the _escaped_fragment_ query parameter set, or come from known crawlers (like Facebook’s or Twitter’s crawler used when fetching og metatags or similar page data).

Prerendered pages are cached for 24 hours.

Read all about it [here](https://www.netlify.com/docs/prerendering).


## Test your builds locally
Our [open source build image](https://github.com/netlify/build-image) now comes with a small build script that makes it super easy to test your build setup locally under the exact same conditions as on our build machines!


## Domain Aliases
Sometimes you have more than one domain that needs to resolve to the same website. Most other static hosts can only handle 1 domain per website, but with Netlify’s new domain alias feature, you can easily point several domains or subdomains to the same site. Our flexible rewrite rules also makes it so you can handle different subdomains as folders within the same site!

 All for now. Have a great day, and come and hang out in our [gitter channel](http://gitter.im/netlify/community) if you wanna talk shop, or need help with anything!


<br>
All the best,

Matt &amp; Chris

co-founders of Netlify

@biilmann &amp; @chr_bach
