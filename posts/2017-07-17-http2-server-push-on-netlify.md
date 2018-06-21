---
title: HTTP/2 Server Push on Netlify
author: David Calavera
image: /img/blog/netlify-traffic-graph.png
short_title: HTTP/2 Server Push on Netlify
tags:
  - performance
  - cdn
  - http/2
format: blog
description: >-
  HTTP/2 server push is a performance optimization included in version 2 of the
  HTTP protocol. Today, we’re enabling HTTP/2 server push for all our customers
  who use encrypted connections on their websites.
date: 2017-07-18T20:52:05.000Z
draft: false
---
HTTP/2 server push is a performance optimization included in version 2 of the HTTP protocol. All secure traffic through Netlify’s servers has been using HTTP/2 since early 2016. It’s important to understand that HTTP/2 requires secure connectivity. Only websites with HTTPS enabled can take advantage of HTTP/2 and its performance optimizations, like server push and header compression.

Currently, 60% of the traffic on Netlify uses HTTPS. HTTPS is enabled by default to all websites on Netlify that use our subdomains. Just change “http” to “https” in your browser bar the next time you see a URL like <http://kathleen-booth.netlify.com>. We also encourage everyone with their own custom domains to [enable HTTPS](https://www.netlify.com/docs/ssl/) which we offer by using free certificates with Let's Encrypt.

![](/img/blog/netlify-traffic-graph.png)

Today, we’re enabling HTTP/2 server push for all our customers who use encrypted connections on their websites. You don’t have to do anything to enable it, but you do need to tell us which content to push to the browser. To do that, you have to set [HTTP link headers](https://www.w3.org/wiki/LinkHeader) using our [Custom HTTP Headers integration](https://www.netlify.com/docs/headers-and-basic-auth/#multi-key-header-rules). For example, if you want to push assets to the browser when someone loads your website’s homepage, you’ll have to add rules like these to your project's `_headers` file:

```
/server-push-path
  Link: </js/example-script.js>; rel=preload; as=script
  Link: </css/example-style.css>; rel=preload; as=style
```

*Note that server push is not compatible with Netlify's Asset Optimization. If you use server push on your site, you'll need to disable CSS and JS minifcation and bundling (under Settings > Build & Deploy > Post processing > Asset optimization).*

You can debug if this link works with your favorite browser’s developer tools. When your website is not using server push, you’ll see that resources are loaded in a waterfall, like in this screenshot:

![](/img/blog/inspector-server-push-disabled.png)

You can also see that each cell in the “Initiator” column says “Other”.

However, once you configure your site to use HTTP/2 server push, you’ll see that the timeline to load all the resources in your page is much shorter. The “Initiator” also changes for the content that was pushed to “Push / Other”, like in the screenshot below:

![](/img/blog/inspector-server-push-enabled.png)

If want to learn more about HTTP/2 Server Push, our friends at Smashing Magazine wrote a fantastic guide with everything you need to know about it. You can [read this article](https://next.smashingmagazine.com/2017/04/guide-http2-server-push/) in the next version of Smashing Magazine, completely hosted on Netlify.

In our commitment to open source, we decided to extract this feature from our core edge cache and make it available as an [independent plugin](https://github.com/apache/trafficserver/tree/master/plugins/experimental/server_push_preload) for Apache Traffic Server, the cache proxying server that powers our CDN.

If you want to help us solve interesting challenges like this one, we’d love to hear from you. Check out [our Careers page](/careers) and don’t hesitate to email us at <mailto:careers@netlify.com>.






