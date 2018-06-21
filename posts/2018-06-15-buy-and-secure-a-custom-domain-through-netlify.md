---
title: Buy and secure a custom domain through Netlify
author: Bret Comnes
tweet: >-
  You now have the option purchase a custom domain directly in your Netlify
  workflow. As a bonus, we'll automatically configure DNS + HTTPS for you!
image: /img/press/logos/logomark-light.png
no_overlay: false
short_title: Buy and secure a custom domain through Netlify
tags:
  - domains
  - DNS
  - HTTPS
format: blog
description: >-
  Purchase a custom domain through Netlify and we'll automatically configure
  your site with DNS and HTTPS.
date: '2018-06-19'
draft: false
---
We love that you can deploy a new site to Netlify in about 30 seconds, but there’s something that’s been bugging us. While most Netlify users [add a custom domain](/docs/custom-domains/) and [secure their site with HTTPS](/docs/ssl/), there’s a lot that can be tricky in that process. Users are sent away from Netlify to change settings in their DNS and domain providers and are often left wondering if they got their settings right or if their DNS even propagated. Plus, they have to wait until that process finishes in order to set up HTTPS. We see the results of this complicated process firsthand: about 30 percent of all new user support issues are related to DNS and HTTPS set up. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/cD91ojka1uU?rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

To improve site set up, we’re releasing a series of improvements to Domains. You can now purchase a new custom domain directly through Netlify — skipping the complicated DNS setup entirely and automatically requesting a wildcard Let’s Encrypt certificate so your site will be HTTPS enabled. 

## How it works

You’ll no longer need to manage your domains and DNS across multiple tools and accounts, plus we’ll keep an eye on DNS propagation for you and issue a Let's Encrypt certificate automatically as soon as propagation is complete.  The custom domain setup process for new sites is faster, simpler, and secure by default. 

The flow is pretty straightforward. Start from either your account’s domains settings or within a specific site, and enter the domain you’d like to add. If it’s available, you can buy it and we’ll take care of the rest. What’s the rest? When your new domain records have propagated to all of the other DNS servers across the globe, we’ll automatically provision a Let’s Encrypt certificate for your site to make sure that all of your sites’ visitors can connect via HTTPS. 

We hope that abstracting away a bit of the administrative nonsense gives you more time to spend in your code and less stress when you’re deploying a new site. Let us know what you think of this update on [Twitter](https://twitter.com/netlify), [Gitter](https://gitter.im/netlify/community), and through our support team. In the meantime, we’re putting our heads back down to work on more ways to simplify the site setup process and (coming soon!) make it even more secure.

## A few notes of thanks

Let's Encrypt is a non-profit organization that keeps your site, and thousands of other Netlify sites, secure for free. You can [donate directly on their site](https://letsencrypt.org/donate/). 

Finally, we want to send a special hat tip to [Peter](https://twitter.com/petervangrieken/status/968525636494135298) and [Dan](https://twitter.com/danseethaler/status/944681312861999104) who were among the many developers to suggest this feature a while back. It's always extra special when we release a feature that you tell us us will make your work a bit easier.
