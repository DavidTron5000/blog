---

title: "Make Your Site Faster with Netlify's Intelligent CDN"
author: Aaron Autrand
image: /img/blog/world-communications-by-eric-fischer.jpg
image_caption: "Photo credit: [Eric Fischer](https://www.flickr.com/photos/walkingsf/6635655755)"
format: blog
short_title: "CDNs: Netlify's Secret Sauce"
description: "Why Netlify uses a dual-CDN setup, and why you should, too."
thumbnail: thumbnails/world.png
cmsUserSlug: ""
date: 2016-04-15T00:00:00.000Z
tags:
  - netlify
  - features
  - cdn
---

At Netlify, we make a very big deal about speed.

Sites on Netlify are extremely fast, no matter where you are. Part of that is the tools used to build those sites, but an even bigger part is our CDN--or to be more precise, our CDNs, plural.

<!-- excerpt -->

Content Delivery Networks (CDNs) are pretty simple - they function as local asset dumps. You pay for some bandwidth, and your images, videos and downloadable content sit there, in multiple places around the globe, taking the load off the server that serves up your page. The CDN nodes are geographically aware, and make sure that if you are working from a coffee shop in Tokyo, that [He-Man video](https://www.youtube.com/watch?v=ZZ5LpwO-An4) your laptop is requesting is coming from the server just up the street, not being pushed from a server farm in San Francisco. The whole purpose of a CDN is to put that video as close to users as possible to avoid latency issues.

To put it bluntly, CDN = faster internet.

Netlify takes that to the next level, putting your entire site on CDN. We use a special dual-CDN setup to further optimize the serving of sites and assets. Your assets that would normally live on a huge, standard CDN do just that. But your site--the HTML, CSS, JS, etc--lives on our intelligent CDN, spread across the globe, just like your visitors.

We call it intelligent because we add logic layers to a standard CDN setup. Those logic layers give us a significant amount of control. That control allows us to do things like instant cache invalidation, do traffic shaping through custom rewrite, redirect, and proxy rules, create and catalog build snapshots, allow instant rollbacks, and make sure your site is always in a consistent state with atomic deploys. Without our dedicated CDN, the features that make Netlify **Netlify** just wouldn't be possible.

Our intelligent CDN also has the benefits of a regular CDN--it allows for much higher uptime. If one CDN server goes down, traffic just gets rerouted to the next closest server. Things like DDoS attacks are much less effective against a CDN than they are against a single server. And because we utilize multiple asset CDN providers, if one is attacked or suffers some sort of shutdown (like when Rackspace was accidentally labeled as a phishing domain by Google and was unreachable for four days), we automatically route traffic to the next closest node.

What does all this mean for you? It means, in addition to the speed and uptime benefits that are provided, our CDN edge nodes can make decisions normally made on the origin server. Requests for passwords, redirects and proxies don't bounce through server relays, they happen as close to your users as possible. When studies show that page abandonment hits 25% after four seconds, those milliseconds matter.

So why does Netlify's intelligent CDN matter? Because the world is annoyingly large, and the speed of light is annoyingly slow.
