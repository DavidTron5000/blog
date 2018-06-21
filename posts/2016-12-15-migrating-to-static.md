---
title: Migrating to a Static Site with JAMstack & Netlify
author: Eli Williamson
image: /img/blog/old-is-dead.png
short_title: Migrating to a Static Site with JAMstack
tags:
  - migration
  - drupal
  - wordpress
  - heroku
format: blog
description: >-
  Escape the constant admin and update cycles of those bulky server-dependent
  softwares such as Wordpress, Drupal, and Heroku. Make your site faster with
  virtually no maintenance so you can spend more time doing what you love (and
  let us take care of the grunt work).
date: 2016-12-15T00:00:00.000Z
draft: false
---
Everyone is fed up with the constant admin and update cycles of bulky server-dependent softwares such as Wordpress, Drupal, and Heroku. It's time to take the headaches and monotony out of developing (at the same time, making your site faster and more secure). [JAMstack](https://jamstack.org/) on Netlify is the obvious solution and this article is aimed at helping you step into the light much like [Jeremy](https://www.tenfourty.com/2015/11/16/moving-from-wordpress-to-a-static-site-using-hugo-and-netlify/) (and many others) have.

Tip: Regardless of where you're coming from (Wordpress, Drupal, Heroku, etc.), Netlify has you covered with [great boiler-plate templates](https://templates.netlify.com) to get your new site up and running before you can say "pump up the jam" ten times, fast.

![Pump up the Jam](/img/blog/pump-up-the-jam.png)

## Why JAMstack? Why Netlify?

Not only are Wordpress and other platforms like it cumbersome, annoying, and tedious to maintain but they also effect your site's speed and security immensely. Let's break your site's performance and security down into seven simple factors.

### 1. The time it takes for a full download of your HTML

Additional components, javascript and events won’t load before this happens, which affects your page load speed significantly. Not only does it frustrate the hell out of users but it also negatively affects your Google search ranking as well as increases user bounce rates (can you blame them?) and ultimately lowers conversions.

When using JAMstack site on Netlify, you significantly reduce your full download time because the assets are there already (don't have to be dynamically loaded in from a sluggish server on the other side of the world).

### 2. The Time To First Byte (TTFT)

The time it takes for the user’s browser to begin receiving your website also affects your page load speed significantly. Congruently this too negatively affects your Google search ranking as well as increases user bounce rates and ultimately lowers conversions.

Netlify mitigates this by using smart CDN technology that finds the nearest server to the user and determines (based on speed, downtime, and a magnitude of other factors) which instance of your site is fastest for the user/browser viewing your site.

### 3. HTTPS

Google has (for a while now) been pushing for a more secure web. In this effort, [Google is now demoting HTTP sites in favor of more secure HTTPS sites](https://nakedsecurity.sophos.com/2016/09/09/google-to-slap-warnings-on-non-https-sites/). Technically speaking, Google's search index gives preferential ranking to sites secured with HTTPs, and takes it a step further by marking standard HTTP sites as insecure.

In addition to the SEO benefits:

* You get better analytics with "Referer" permissions
* Additional security with all traffic being sent over an encrypted connection (no more [adware popping up in your browser when using that public Wi-Fi](http://arstechnica.com/tech-policy/2014/09/why-comcasts-javascript-ad-injections-threaten-security-net-neutrality/))
* Happy hack-free users who are protected from man-in-the-middle attacks
* Ability to leverage bleeding-edge technologies safely (geolocation, webcams, microphones, local data, etc.)
* Be an upstanding developer (HTTPS is best practice when hosting a site these days)

### 4. HTTP2

HTTP2 is an update to the HTTP protocol engineered to improve performance of the web with consideration for how modern web applications are built. To put it simply, enabling HTTP2 will make your site load faster - better yet, it comes standard for all builds on Netlify.

### 5. DNS lookup time

This is the time it takes to lookup your DNS and discover your site’s IP address. Much like your Time to Full Download and TTFB, this also negatively affects your Google search ranking as well as increases user bounce rates (can you blame them?) and ultimately lowers conversions.

### 6. HTTPS handshake time

This is the time to negotiate the encrypted connection between the browser and the secure site server. Netlify carefully optimizes this handshake to avoid effecting your sites page load speed (unlike some other hosting services).

### 7. Valid SSL certificate

To test if the SHA certificate is up-to-date, some servers use an old encryption mechanism that’s no longer secure when using HTTPS (benefits listed above). An obsolete or broken certificate means your users will get warnings in certain browsers. Avoid these blockers and bad experiences for your users with Netlify (don't worry, it's standard).

## How does your site perform?

Check out [testmysite.io](https://testmysite.io/) to see just how fast your site can be when you're done migrating to Netlify - not to mention, all those security holes you'll lock down after switching.

Now that we have cleared up why going static is a no-brainer, let's discuss the elephant in the room - the seemingly overbearing process of migrating your data/content.

## Gradual Migration

First off, _take a deep breath_ – it's not as hard as it seems; just take it in strides. Lets begin with the awful truth - static sites are awesome but there are some things that are quite hard to run without a back-end server (client records, payment processing, etc.) or so you think...

To address this, we must first identify where our back-end dependencies are. From here we can evaluate if something like [Firebase](https://firebase.google.com/) (an API-based database solution) can host any necessary dynamic data. You may determine that you have to rebuild your antiquated database to function in the 21st century, in which case I'm sorry. However, our friend Sam Deere had this issue and wrote a [killer article](https://www.netlify.com/blog/2016/03/10/go-static-without-losing-your-server/) on how he transitioned [Giving What We Can](https://www.givingwhatwecan.org/)'s database in phases using Netlify's proxying feature to use the old server until the rebuilt one was ready for prime-time – a great example of gradual migration.

I must note that using proxying rules indefinitely is not an ideal solution. However, it is a great interim solution that breaks your migration into digestible phases without having to spread development time across a single massive project around redesign your server.

Now, Sam's Drupal site might be a bit overkill for those of you running a simple Wordpress site. You likely have just one database and tools like [Wordpress to Hugo Exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter) can help automate this migration in minutes.

## Spread the Jam

The benefits of Gradual Migration and decoupling the front-end from the back-end are virtually endless but to name a few:

* You spread the risk of switching with Gradual Migration
* Your site will load much, MUCH faster (test how much faster [here](http://testmysite.io))
* Enjoy much simpler and less-frequent maintenance
* Easily add features without fighting complex and bloated syntax
* Never have your front-end go down with your back-end does (only happens when pigs fly if it is API-based)

Here at Netlify, we believe in progress and community. With that, we are always trying to _spread_ the good news about [JAMstack](https://jamstack.org/) and its many benefits. Do the same and share this article with a friend still fighting their antiquated infrastructure.

_Spread the JAM!_
