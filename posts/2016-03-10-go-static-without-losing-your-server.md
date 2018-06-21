---

title: Go Static Without Losing Your Server
author: Sam Deere
image: /img/blog/migrating-birds.jpg
format: blog
short_title: Gradual Migration
description: "Sam Deere of Giving What We Can talks about the reasons behind the non-profit's switch to the static stack, and how they are using Netlify to do it in stages."
thumbnail: thumbnails/gwwc-logo.jpg
cmsUserSlug: ""
date: 2016-03-10T00:00:00.000Z
tags:
  - tutorial
  - migration
---

How we made Giving What We Can’s switch to Netlify really easy.

[Giving What We Can](https://www.givingwhatwecan.org/) is a charity that encourages people to give more, and give more effectively to charity. We’re part of the [effective altruism](http://www.effectivealtruism.org/) movement, using reason and evidence to find the best opportunities for giving. Our website is critical to our success — it’s how people learn about our work, and where they go to take [our pledge to give 10%](https://www.givingwhatwecan.org/get-involved/join/) of their income to the best charities in the world.

We’ve recently switched from a traditional PHP-based CMS to a static build on Netlify, and I couldn’t be happier with the results. But while making the change, we came up against a fairly thorny problem — what to do about our backend server.

<!-- excerpt -->

Static sites are awesome. But there are some things where it’s unavoidable to run a backend server — client records, payment processing, and so on. If you’re starting from scratch, you can use an API or cloud-based services to handle dynamic content on your static site via Javascript (say, through a single-page app). But having a legacy system means that it’s not always simple to make the switch. Taking a membership database that’s currently locked away in your old CMS and trying to open it up via a nice RESTful API can be a daunting task, especially for a small organisation like Giving What We Can.

However, there’s an easy way to have the best of both worlds — have an awesome static setup for your frontend content (taking advantage of Netlify’s automated builds, rock-solid CDN, and now [free SSL](https://www.netlify.com/blog/2016/01/15/free-ssl-on-custom-domains)), but keep your existing server running to handle the dynamic stuff. Using Netlify’s proxying feature, we’re able to serve static pages to most visitors, but haven’t had to wait until we’d rebuilt a server from scratch to make the change to static.

## Making the switch

To give some context, we’d been running our site on a Drupal backend and a VPS for a few years. The setup worked OK, but had some problems. Firstly, it was slooooow — despite two caching layers, response times were pretty poor. The server also had a nasty habit of crashing under load (or sometimes just at random…) — not only did this bring down our CRM, but also the frontend pages, which had basically nothing to do with the CRM but were tightly coupled to it.

I was sick of maintaining server infrastructure, and sick of being locked into the Drupal architecture, which doesn’t exactly make it easy to bolt on new features. We looked into upgrading the installation — moving to a managed host, and using a CDN — but the cost and complexity of switching was high, and would have meant a lot of work just to patch up a system I didn’t particularly want to keep. To top it off, at the time I was exploring options for upgrading, several people I knew had their Wordpress installations hacked. Let’s just say I wasn’t feeling particularly well-disposed towards old-school CMS platforms...

Clearly, something needed to be fixed. I was convinced that moving to a static site was the best option — fast, decoupled from the member database, and virtually unhackable. However, the cost of switching looked really high, because there were some server features we just couldn’t live without.

Our Drupal setup had two broad functions — our frontend site, with the usual array of essentially static pages, and some dynamic pages that handled features like payment processing for our charitable trust, and My Giving (which helps people track their donations).

All the static content could easily be transferred over (if you’re interested, I wrote a little script that [converted our Drupal pages and blog posts into Markdown](https://github.com/colophonemes/drupal-to-markdown)), and had a static version of the site up and running pretty quickly, using [Metalsmith](http://www.metalsmith.io/) as the generator, and [Contentful](https://www.contentful.com/) as our CMS.

However, we still needed the dynamic functionality of the server. But how to keep them running side-by-side? First we thought of moving the server to a subdomain, then having a complicated system of redirects going back and forth. But what if our redirection missed a critical URL (there were lots of endpoints to take into account), and our payment processing or customer records were affected?

## Using proxying to keep the server running without missing a beat (or any HTTP requests)

 It turns out that Netlify has a really simple solution.

First, we moved our server to a subdomain. Then, we used [Netlify’s proxying feature](https://www.netlify.com/docs/redirects#proxying) to send everything that doesn’t hit a page on the static site through to the old server.

The last line of our `_redirects` file looks like this:

```
/* https://server-subdomain.givingwhatwecan.org/:splat 200
```

This works because, by default, Netlify [doesn’t proxy requests for files that actually exist](https://www.netlify.com/docs/redirects#note-on-shadowing) on your static build. So, if the request points to something that really is on your static site, the visitor gets the static page. If it doesn’t exist, it gets proxied through.

Now, all our old URLs just work, because they’re transparently proxied through. So, we don’t have to do a browser redirect anyone to the server to do things like payment processing, and we also don’t have to rebuild the server functionality straight away.

## Bonus Feature: Redirection

Proxying all requests through is fine, but what if you actually want to redirect specific requests. This could be because your old site had its own redirection in place (say, from `/contact` to `/about/contact`) or because your new static site generator uses a different URL structure (say, moving from `/blog/YYYY-MM-DD/post-name` to `/post/YYYY/MM/post-name`)?

Easy — just add your redirects to the `_redirects` file as [per the Netlify Docs](https://www.netlify.com/docs/redirects), before the line that handles your proxying:

```
/get-involved/support /donate 301
/blog/2016/01/01/some-blog-post /posts/2016/01/some-blog-post 301
/* https://server-subodomain.givingwhatwecan.org/:splat 200
```

Now, if there isn’t a static page at that URL endpoint, Netlify will first check for a redirect, and if it can’t find one, _then_ it will proxy the request through.

To make this easy, I just scraped our Drupal database for the URL aliases of each node, and then added them to a `redirects` key in each Page or Post’s metadata. At build time we just check whether the new URL will be  different to the old one, and if so, add the rule to our `_redirects` file on the fly.

## Next step, get rid of Drupal!

Obviously the ideal solution would be to not have to run the old server, and in particular, not use Drupal to handle things that ideally should be handled by a robust API. However, using proxying is a really good interim solution. It means we’ve been able to make the changeover in separate phases  without having to spread development time (which is basically me working on the project part-time) across a huge, sprawling project to redesign our server.

First, we concentrated on getting our frontend rebuild right. Next up, we’ll move over to cloud-based systems for CRM, payment processing, and accounting, all linked together with a nice RESTful API.

But by being able to do it in steps, we’ve spread the risk of switching. Our website loads much, much faster, is way easier to maintain or add features to, and now, even if our backend goes down (which incidentally happens less frequently, because there’s less load on it) the front-facing pages aren’t affected.

I’m dreaming of the day when I don’t have to deal with Drupal. But for now, Netlify’s proxying features means that I can concentrate on one thing at a time

_Sam Deere is the President and Technical Director of [Giving What We Can](https://www.givingwhatwecan.org/). Check them out if you want to be donating more to charity, but want to be sure you’re actually going to have a big impact._
