---

title: Introducing Smarter Redirects
author: Matt Biilmann
image: /img/blog/signs.jpg
format: blog
short_title: Smarter Redirects
description: "We just made Netlify’s redirect engine smarter, to avoid chained redirects."
thumbnail: thumbnails/301-redirect-sign.png
cmsUserSlug: ""
date: 2015-10-26
tags:
  - netlify
  - news
  - features
---

We just made Netlify’s redirect engine smarter.

Now redirect rules that would lead to a chain of subsequent redirects will always be flattened into one efficient redirect rule.

<!-- excerpt -->

Before if you had a site on [www.example.com](http://www.example.com) with a redirect from /blog to /news, with https enabled, then going to [http://example.com/blog](http://example.com/blog) would trigger a chain of redirects:

[http://example.com/blog](http://example.com/blog) -&gt; [https://example.com/blog](https://example.com/blog) -&gt; [https://www.example.com/blog](https://www.example.com/blog) -&gt; [https://www.example.com/news](https://www.example.com/news)

Now our redirect engine is smart enough to detect that chain and redirect straight from [http://example.com/blog](http://example.com/blog) to [https://www.example.com/news](https://www.example.com/news)

All this happens straight on our CDN nodes, so the extra roundtrip time when people get redirected is as low as possible.
