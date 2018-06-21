---

title: Netlify vs Amazon S3
author: Mathias Biilmann
image: /img/blog/apple-orange.jpg
format: blog
short_title: Netlify vs Amazon S3
description: How Amazon S3 and Netlify compares as static site hosting platforms.
thumbnail: /img/posts/thumbnails/apple-orange.jpg
cmsUserSlug: netlify-vs-amazon-s3
date: 2015-03-06
tags:
  - netlify
  - s3
  - comparisons
  - features
---

How do Amazon S3 and Netlify compare as static site hosting platforms

Today pretty much every front-end developer is familiar with Amazon's amazing Simple Storage Service, or S3. Some use it for hosting their front-end projects, so I thought I would take the opportunity to do a proper writeup about the differences between Netlify's static hosting service and S3.

In short: S3 manages files. Netlify manages sites.

<!-- excerpt -->

## Level of Abstraction

S3, as it's name implies, is a low-level utility. Beyond the "bucket" you upload files to, S3 makes no assumptions about files you upload to it and the role they play in composing an actual website.

Netlify is the other way around. It solves specific challenges around publishing and managing actual static sites by dealing with files you upload to it in a "site aware" manner.

If you’re looking to add static site publishing component into a SaaS web authoring tool, it's possible to do with S3, but there's a surprising number of gotchas you have to work around.

The first one is that Amazon by default limits you to 100 Buckets per account, and each site uses one up. For a few sites this obviously won’t be a problem, but if you’re looking to build a tool that publishes websites at a large scale, this could spell trouble.


## Latency

On it's own, S3 will give you poor latency, since it's not optimized for that. So if you use S3 for static hosting you should always combine it with Cloudfront (or another CDN). Setting this up correctly can be quite a bit of work and often you'll end up having to wait from the moment you deploy a change to your site till it actually shows up on the CDN backed page. With Netlify all changes are instant.

Here's Pingdoms performance test running against the exact same site folder uploaded to S3 and Netlify:

* <a href="http://tools.pingdom.com/fpt/#!/bfDfyO/http://speedtestsite.s3-website-us-east-1.amazonaws.com/" target="_blank">The test site on S3</a>
* <a href="http://tools.pingdom.com/fpt/#!/d5XcVQ/http://speedtest.netlify.com/" target="_blank">The test site on Netlify</a>

## HTTPS

If you want HTTPS support for an S3 hosted site you'll need to configure Cloudfront for your site as well. Then you can supply your own certificate and go for one of two options:

* SNI based HTTPS. Cheap, but won't work in IE on Windows XP, older Android browsers and some feedreaders, crawlers, etc
* Dedicated IP SSL. Costs $600/month.

Netlify also offers SNI based SSL, but our pro plan offers HTTPS that always works in all browsers by using a hybrid model. When you activate HTTPS for a Netlify pro site, we'll provision and install a certificate for your domain and use this for all browsers that support SNI. Browsers with no SNI support will fall back to a certificate shared between multiple customers.


## Atomic Deploys

S3 doesn’t do atomic deploys. So typically if you deploy a new version of the site there'll be a time where the site is in a half-deployed state with old and new assets mixed together. If you run into a connection issue in the middle of a deploy, your site can end up in an inconsistent state. With Netlify no part of a deploy ever goes live before all the files in the deploy have been uploaded and processed.


## Vary: Accept-Encoding HTTP header

S3 also does not provide proper support for the Vary: Accept-Encoding HTTP header. So for mobile sites (or sites supporting older browsers) you might find that serving gzipped content in that setting is more trouble than it's worth.

Netlify automatically creates a gzipped version of everything and supports this header, so a path like /my-large-js-app.js will return either the gzipped version of the file or the plain text version of the file depending on whether or not the browser supports gzip compressed content.

When using S3 for static sites, you’ll have to decide whether to serve gzipped or plain text content to all browsers, regardless of gzip support. You’ll also have to do the gzipping up front if you chose to serve the compressed version.


## Build Automation

Netlify comes with integrated build automation. With just a click you can configure Netlify to listen to your GitHub or BitBucket repository and do a build and deploy each time you push to git. It works with all common build tools like Grunt, Gulp, Jekyll, Middleman, Roots, etc...

Netlify will also process all your assets during each deploy and create unique urls for each piece of content, set far future caching headers and update the HTML to refer to the CDN URLs of the new bundled, minified and cache-optimized assets. We also run all images through lossless image optimization.

Often sites deployed to Netlify will get close to 100/100 score on Pingdom Speed Test tool because of all those web performance optimizations. Obviously if you want to achieve a similar result on S3/Cloudfront, it takes quite a bit of work to get it all right.

## Redirect and Rewrite Rules

S3 does let you configure basic redirects, but there's limited flexibility and the XML syntax for specifying the rewrite rules is not the most intuitive. There's currently no way to do the kind rewrite rules you would need to get history pushstate to work for an Angular or Ember app.

Netlify lets you add a simple [_rewrites](/docs/redirects) file to your site folder. It's an easy to read list of redirects and rewrites and it's powerful enough to setup even complex redirects with placeholders or matches on query parameters. It also lets you do rewrites and you can easily make single page history pushstate based apps work.

You can even setup rewrite rules that'll let you proxy through parts of your site to external servers &mdash; straight from our CDN nodes.

## Form processing

Netlify has built-in support for form submissions. Any form with a 'netlify' attribute will be processed when the HTML is uploaded and Netlify automatically connects them up to an API-accessible database. All the other HTML tags work on static sites, forms should work too! There's nothing like this for S3.

## Versioning

S3 can enable versioning for individual files. Netlify automatically stores a complete version for each deploy, so you can always review or rollback to a earlier version. You can even download a zip with all the files from any historic deploy you've uploaded.

## Stay tuned for more

We have lots more features on the roadmap as well and we're always open to your suggestions for what else we can do to create the ultimate platform for static site hosting.
