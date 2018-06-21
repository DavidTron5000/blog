---

title: Netlify News No. 8
author: Chris Bach
image: /img/blog/new-york-times-newsroom.jpg
format: blog
short_title: Our Eighth Newsletter
description: "Netlify is now on Zapier, please check out the beta app. We're also introducing smarter redirects + more control over your postprocessing."
thumbnail: thumbnails/165674556.jpg
cmsUserSlug: ""
date: 2015-12-02
tags:
  - netlify
  - news
---

Hi there.

Hope you are having a great week.

We've got lot's of news, so we will get right to it!

## Zapier

We just added Netlify to Zapier and would love for you to [help test the beta](https://zapier.com/developer/invite/27442/6c1b6a3bbcf86c07c0a0f7dfe2d0327c/).

Zapier lets you integrate form submissions or deploy notifications from Netlify to hundreds of external services like MailChimp, Hipchat, Google Docs, etc,.

<!-- excerpt -->


In a few easy steps you can set up the app to send you a notification whenever a new form is submitted, or a deploy is finished and pushed live. The notification could be a mail, a message in slack or hipchat, or almost anywhere else.

If we get enough users of the service we can go from beta to global app, so hope that you will [give it a try](https://zapier.com/developer/invite/27442/6c1b6a3bbcf86c07c0a0f7dfe2d0327c/?utm_source=Netlify+and+BitBalloon&amp;utm_campaign=7897bcd976-Netlify_Newsletter_8_Zapier&amp;utm_medium=email&amp;utm_term=0_200b533eb5-7897bcd976-).

## Smarter Redirects

We just made Netlify’s redirect engine smarter, to avoid chained redirects.

Before if you had a site on [www.example.com](http://www.example.com/) with a redirect from /blog to /news, with https enabled, then going to [http://example.com/blog](http://example.com/blog) would trigger a chain of redirects:

[http://example.com/blog](http://example.com/blog) -&gt; [https://example.com/blog](https://example.com/blog) -&gt; [https://www.example.com/blog](https://www.example.com/blog) -&gt; [https://www.example.com/news](https://www.example.com/news)

Now our redirect engine is smart enough to detect that chain and redirect straight from [http://example.com/blog](http://example.com/blog) to [https://www.example.com/news](https://www.example.com/news)

## Post processing settings

Now Netlify gives you detailed control over the post processing we do to your sites.

You can completely disable post processing for sites where you mainly want to share HTML/CSS and don’t care about performance, pretty URLs, form processing or snippet injection.

Apart from that you can control Pretty URLs, bundling and minification of CSS and JavaScript and lossless image compressions.


All for now. Have a great day, and come and hang out in our [gitter channel](http://gitter.im/netlify/community?utm_source=Netlify+and+BitBalloon&amp;utm_campaign=7897bcd976-Netlify_Newsletter_8_Zapier&amp;utm_medium=email&amp;utm_term=0_200b533eb5-7897bcd976-) if you wanna talk shop, or need help with anything!

<br>
All the best,

Matt &amp; Chris

co-founders of Netlify

twt. @biilmann &amp; @chr_bach
