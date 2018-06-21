---
title: Introducing Our Domain Dashboard
author: Brian Douglas
cmsUserSlug: ''
image: /img/blog/netlify-wallpaper-27.png
format: blog
short_title: Introducing Our Domain Dashboard
tags:
  - custom domains
  - dns
description: >-
  Buying a domain is easy, but when it comes connecting your DNS, things can get
  confusing. Netlify prides itself in being a tool that offers one-click
  continuous deploys and are unveiling a new feature today which makes the DNS
  connection just as simple.
date: 2016-10-06T00:00:00.000Z
---
At Netlify, we believe in enabling people to build and deploy modern websites in the most simple way. <a href="/docs/continuous-deployment/" target="_blank">Continuous delivery</a> and <a href="https://www.netlify.com/docs/ssl/#https-on-custom-domains" target="_blank">one-click setup of TLS</a> certificates were two big steps forward our mission. However, there are still things people struggle with, especially around configuring DNS records.

Understanding [how DNS works](https://howdns.works/ep1/) is fundamental to understanding how the Internet works and sequential to how to setup any website. Unfortunately, dealing with different DNS providers and custom configurations is still a problem for a lot of people.

Today, we're very excited to announce our new Domain Dashboard with DNS integration. 

![domain dashboard](/img/blog/domain-dashboard.png)

You no longer need to dig through GoDaddy documentation to figure out where to place Netlify IPs and custom DNS records. Netlify can setup all that for you with one single click, and still give you the flexibility to add new records if you want to keep doing it "the hard way".

## One Click DNS Connections

The first step starts with you entering your domain into our form. Click the button allowing us to manage your domain needs.

![domain-walkthrough](/img/blog/domain-walk.gif)

Once you have connected your Domain, the final step is to switch your domain host’s name servers to our custom NS1 names servers, we provide in the instructions section of the panel.

![domain-instructions](/img/blog/highlighted-instructions.png)

*Your Domain Host Nameservers - This could be different for your host,  but check our docs for examples on where to find this.*

![nameservers](/img/blog/domain-nameservers.png)

## Custom DNS Records

In addition to managing your DNS setup, we are also are giving you the ability to add custom DNS records, and Domain aliases.

![dns-records](/img/blog/dnsrecords.png)

## Branch Subdomains

Netlify can now automatically turn your deployed branches into its own subdomains. So if you have a branch named staging, you can view it at staging.briandouglas.me.

We noticed a large amount of Netlify users are creating separate sites to manage staging branches. Now with the combination of <a href="/blog/2016/08/30/introducing-deploy-contexts-in-netlify/">Deploy Previews</a>, Deploy Contexts, and Branch Subdomains you can what you accomplished in multiple sites, with just one.

![subdomain](/img/blog/subdomain.png)

Take a look at our [documentation](https://www.netlify.com/docs/custom-domains/#domain-dashboard) and visit your site dashboard to enter a world with less DNS confusion. We are excited to managed your DNS and Domain connections and are happy to get your feedback as well.
