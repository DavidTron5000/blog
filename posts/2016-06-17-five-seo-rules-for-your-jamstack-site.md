---

title: Five SEO Rules for Your JAMstack Site
author: Aaron Autrand
image: /img/blog/starfield2.jpg
image_caption: Does your site stand out in a field of stars?
format: blog
short_title: SEO for JAMstack
description: How to ensure quality SEO for your JAMstack site.
thumbnail: thumbnails/seo.jpg
cmsUserSlug: ""
date: 2016-06-17
tags:
- jamstack
- SEO
- responsive images
- speed
---

One of the first arguments thrown around about sites built with static site generators is that they aren't SEO friendly.

But don't worry, that doesn't have to be the case. Let's look at ways to make sure your JAMstack site is at the top of its SEO game.

<!-- excerpt -->

The biggest draw for SEO in 2016 is high quality content, specifically long-form content that meets the needs of your users. Unfortunately (or maybe fortunately for those of you who make your living as content creators) static site generators and modern build tools can't write your content for you. What they can do, however, is take care of all the things you need to make your content shine.

## 1. Ensure Proper Content Structure

Making sure that your site is well put together is key, both for user experience and for search engine results. A high clickthrough rate (CTR) and an extended time-on-site measurement can have an effect on search engine ranking, and both are a direct result of your user's experience on the site. A well-formatted site that's easy to navigate gives your users the opportunity to explore multiple sections of your site and can eliminate the frustration of being unable to find what they are looking for. There are a few different ways to craft your site hierarchy:

### Sitemaps

To make the most of your search engine presence, you'll want to make sure you have an sitemap, which will tell search engines which pages to crawl for content.

Depending on the static site generator you are using, there's probably a plugin that will create a sitemap for you during the build process. As a general rule, plugins for site generators will run in the order they are listed in whatever document your build command references (`package.json`, `gemfile`, `requirements.txt`), so be sure the sitemap plugin falls after any plugins that generate your content.

### URL Structure

Consistently, keywords are the absolute biggest focus for good SEO. Even on the URL level, keywords can make a huge difference, both for your search engine ranking, and just by being able to convince users to click your link.

You've seen the two basic types of URLs. Pretty URLs like this one **_www.example.com/your-topic_** are called static URLs. Ugly URLs like this **_www.example.com/?p=578342_** are dynamic URLs. Static URLs are significantly more user- and SEO-friendly, since they contain your keywords and it's easy to tell what the page is about, just by looking at the URL's name.

Since the whole point of a JAMstack site is to build once and deploy everywhere, your URLs will automatically be static, but that doesn't mean you can't polish them up. For blog posts, it's as easy as inserting relevant keywords in the name of your text file, so `/posts/teacup-pigs-playing-sports.md` can be served up at **_www.example.com/posts/teacup-pigs-playing-sports_**.

Different site generators will have different ways of outputting the final URL. Consult the documentation of your favorite tool to see how to set up your URL template variables. Search for `URLs` or `permalinks` to get started.

## 2. Offer Fast Loading Times

With static HTML files served from a CDN, your site will be blazing fast. But you can make it even faster by tweaking a few things:

*Minify Your Assets* - Whether via plugin or as a part of your build tool, make sure to minify your HTML and CSS and compress your JavaScript.

*Responsive Images* - All modern browsers support the new `srcset` attribute on img tags, to some degree. The plethora of options this offers can quickly overwhelm, but the most basic usage can give still give you a lot of mileage. Just add a `srcset` attribute to your img, specifying an image to use for 1x pixel density, 2x pixel density and 3x pixel density, and then let the browser worry about picking the best image. So your `img src` would look like this:

```
<img src="images/space-needle.jpg"
srcset="images/space-needle.jpg 1x, images/space-needle-2x.jpg 2x,
images/space-needle-hd.jpg 3x">
```

There are lots of other options out there for responsive images. Smashing Magazine's article [Simple Responsive Images With CSS Background Images](https://www.smashingmagazine.com/2013/07/simple-responsive-images-with-css-background-images/) outlines another great option. Consult your preferred static site generator's documentation for options that play nice.


## 3. Have a Mobile-friendly Site

A mobile responsive site is an absolute necessity. Mobile usage of the internet surpassed desktop usage in 2014. Last year, Google expanded its use of mobile-friendliness as a ranking signal. Neglecting mobile consumers is a surefire way to damage your brand.

Many static site generators are set up to practice [Responsive Web Design](http://en.wikipedia.org/wiki/Responsive_web_design) out of the box. To verify that, look in your layouts or templates, and make sure the following line is in your `<head>` HTML tag:

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

If it's not there, you should add it.

You can then define rules for various screen sizes using CSS media queries, which are part of the standard CSS library and work on all modern browsers. Here's an example:

```
body {
  max-width: 700px;
  padding: 12px;
  padding-bottom: 0;
}

@media only screen and (min-width: 481px) {
  body {
    padding-top: 24px;
    padding-right: 24px;
    padding-left: 24px;
  }
}
```

This will allow your site to easily conform to devices with a number of different screen sizes, whether they be mobile phones, tablets or desktops.

## 4. Enable Social Sharing

What good is your award-worthy content if no one is reading it? Search engines aren't the only place where people can find your content. That's why, while presently Google doesn't look at social signals when determining pagerank, it's still assumed that links from social media do have a major impact on your rankings.

Adding basic social sharing is as easy and tweaking your page templates or partials (whichever you prefer). Using your favorite templating language and some CSS, you can create social sharing buttons that will appear wherever you specify in your page templates, without any extra work on your part. This example from [SuperDevResources](https://superdevresources.com/share-buttons-jekyll/) shows how to create these links for a Jekyll partial using the Liquid templating language.

```
<div class="share-page">
    Share this on &rarr;
    <a href="https://twitter.com/intent/tweet?text={{ page.title }}&url={{ site.url }}{{ page.url }}&via={{ site.twitter_username }}&related={{ site.twitter_username }}" rel="nofollow" target="_blank" title="Share on Twitter">Twitter</a>
    <a href="https://facebook.com/sharer.php?u={{ site.url }}{{ page.url }}" rel="nofollow" target="_blank" title="Share on Facebook">Facebook</a>
    <a href="https://plus.google.com/share?url={{ site.url }}{{ page.url }}" rel="nofollow" target="_blank" title="Share on Google+">Google+</a>
</div>
```

Depending on the tools you use, you may need to tweak a few things. You can also use [Simple Sharing Buttons](https://simplesharingbuttons.com/) to do most of the code for you, and then swap out the titles and URLs for your templating language values.

## 5. Use HTTPS

In late 2014, Google announced they would [give a rankings boost](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) to secure HTTPS/SSL sites. Thanks to [Let’s Encrypt](https://letsencrypt.org/), now anyone can get free SSL. In fact, Netlify users can set it up with just [one click](https://www.youtube.com/watch?v=k-9T0FYd-QU). If you still aren’t convinced, here’s [Five Reasons You Want HTTPS for Your Static Site](https://www.netlify.com/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site).

Now that your site is optimized for SEO, it’s time to start creating content. Remember that the key to high SEO rankings is to provide quality content that meets the needs of your users. Forbes has outlined questions to ask yourself to determine if you are [producing high quality content](http://www.forbes.com/sites/jaysondemers/2014/08/25/the-12-essential-elements-of-high-quality-content/#73c93ae13323). So go out there and wow everyone!
