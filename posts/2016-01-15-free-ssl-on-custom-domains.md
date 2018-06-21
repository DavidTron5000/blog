---

title: A World’s First. Free SSL with Let’s Encrypt
slug: free-ssl-on-custom-domains
author: Matt Biilmann
image: /img/blog/system-lock-by-yuri-samoilov.jpg
image_caption: "Photo credit: [Yuri Samoilov](https://www.flickr.com/photos/yusamoilov/13334048894)  \n"
format: blog
short_title: Announcing Free SSL
description: A World’s First. Free SSL with Let’s Encrypt. From today HTTPS is a free one-click setup on all our plans
thumbnail: thumbnails/padlock.png
cmsUserSlug: ""
date: 2016-01-15T00:00:00.000Z
tags:
  - netlify
  - news
  - features
  - https
  - ssl
  - popular
---

Here’s some news we’re really excited about!

**Starting today**, we’re offering Free SSL to all our users.

As the first hosting service in the world, Netlify offers full integration with [Let’s Encrypt](https://letsencrypt.org).

With one click install, HTTPS will instantly be available for your sites on all our CDN nodes, and Netlify automatically handles renewals.

Promoting security as a default is really important to us, and SSL has become a must for a [number of reasons](/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site), like improvement of SEO, better analytics, and of course protection of both users and content. But until now, costs, implementation difficulties, and legacy APIs have stood in the way for many users.

<!-- excerpt -->

## Let’s Encrypt

Until now most certificate authorities have been making a huge business of charging for each certificate they issue, even when issuing is a completely automated action with almost no associated cost.

Back in 2012 two Mozilla employees got fed up with this, and started the Let’s Encrypt project to turn the certificate business on its head and make free SSL certificates available to everybody.

After years of hard work, Let’s Encrypt is now ready and has already issued more than 300,000 free SSL certificates during their period of public beta.

## A certificate isn’t enough

Let’s Encrypt has finally made the process of obtaining a free, trusted certificate completely automatic and has paved the way for a big push to encrypt the majority of the web’s traffic.

However, one thing is obtaining a certificate, another thing is making good use of it.

Since HTTPS requires an initial handshake between the browser and a web server, request latency is even more important for HTTPS-enabled sites than for plain HTTP traffic (since both the initial handshake and the normal HTTP connection are affected).

Having your site on a CDN is the most important step to lower the time to first byte and can drastically speed up the initial SSL handshake. However, on most CDNs getting your own unique certificate or uploading a custom certificate is very expensive.

## Technical Challenges

CDN based SSL has traditionally been expensive, because managing large volumes of certificates on a global distributed network is far more tricky than managing a simple server.

At Netlify we’ve been working for a long time on building an efficient and secure infrastructure to distribute and rotate SSL certificates across our global network.

This has required working on patches to the open-source cache servers that power our CDN and implementing a new system for securely transferring certificates and keys over encrypted connections, without ever storing sensitive keys on the disks of our CDN edge nodes.

All in order to be able to give all of our users easy access to free, automated SSL and to push the new category of static web tech forward.

Big kudos to the team behind Let’s Encrypt for lowering the barriers to secure communication over the internet and we hope you’ll all enjoy this new Netlify integration.

## Getting Started

To get started with Let’s Encrypt powered SSL on Netlify, first create a new site in Netlify, either via our [cli tool](/docs/cli) or via our [web UI](https://app.netlify.com/sites) and [configure a custom domain](/docs/custom-domains).

Once your custom domain has been configured, you can head over to the `ssl` tab for your site.

![screen-shot-2016-01-15-at-10.02.59-pm.png](/img/blog/screen-shot-2016-01-15-at-10.02.59-pm.png)

Click on **Let’s Encrypt Certificate** and Netlify will instantly provision and install a certificate for your site. The whole process takes seconds, and Netlify will renew your certificate automatically.
