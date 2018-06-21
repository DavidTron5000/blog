---
title: Why You Don't Need Cloudflare with Netlify
author: Brian Douglas
image: /img/blog/cloudflare.png
format: blog
short_title: Cloudflare is redundant with Netlify
tags:
  - JAMstack
  - SSL
  - CDN
  - DNS
description: >-
  Cloudflare can do lots of great things for websites, but Netlify's features
  can make a pairing of the two redundant.
date: 2017-03-28T17:11:51.000Z
---

Cloudflare is a service to speed up and protect millions of websites, APIs, SaaS services, and other properties connected to the Internet.

*What does that mean?*

Cloudflare enables any site with a custom domain the ability to handle SSL, DNS load balancing, and protection against DDoS attacks. This is a great way for sites that are still running on server-based web hosts to get some easy integrations by using the Cloudflare service.

## Why you don’t need Cloudflare with Netlify

Netlify is a strong believer in the [JAMstack](https://jamstack.org), which encourages the use of a build tool that will compile your app. When you choose to use a static site generator, you already get a fast and light-weight site by default. What you serve with Netlify is the static output of your build, improving all aspects of page speed and ability compared to a site requiring a server-based web host.

***SSL***

We believe in security. We generate, deploy and manage unique SSL certificates for each site with just one click, free for all. We also automatically renew and deploy your new SSL certificates, taking the pain out of certificate management.

And if you already have a certificate for your domain and prefer that instead of Netlify’s domain-validated certificate, you can [install your own](https://www.netlify.com/docs/ssl/#custom-certificates) using our dashboard UI.

***Advanced CDN, load balancing techniques, and DDoS protection***

When a user visits your site, their browser will look up the DNS record for `www.example.com`, and it will receive a CNAME telling it to look up `example.netlify.com` instead. When it looks up `example.netlify.com`, it connects to our advanced traffic director, that returns an A record with an IP address of the server from our pool of currently available CDN nodes, choosing the node that's geographically closest to the end user.

The cool thing is that we also provide a load balancer, and if our system has detected that our main load balancer is currently being hit by a large DDoS attack and is slow or unresponsive, we’ll simply route around that on the DNS level. Since we cache content at our edge nodes around the world, end users also experience extremely fast page load times because of this.

As a bonus, our global, multilayered CDN is set up to catch slow or failing nodes and seamlessly remove them. Top to bottom, our infrastructure redundancies make sure we keep traffic flowing, so there's no need to add more redundancy with Cloudflare.

Our intelligent deployment process also allows us to completely change the state of your site in \~1 sec. Releasing or rolling back a site we host eliminates caching problems.

***Managed DNS***

Dealing with different DNS providers and custom configurations can sometimes be difficult, which is why Netlify also offers the option to hand over DNS configuration to Netlify with our Domain Dashboard feature. This feature is available on our [Pro Plan](https://www.netlify.com/pricing/) and above.

![domain-walk](/img/blog/domain-walk.gif)

## You don't need Cloudflare when you use Netlify

As you can see, we already offer what Cloudflare does, and more. If your site is ***not*** on Netlify, perhaps consider us for your one stop solution for hosting, SSL, DDoS protection, DNS load balancing, and continuous deployments.