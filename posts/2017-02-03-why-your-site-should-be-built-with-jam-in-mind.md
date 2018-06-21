---
title: Why your next site should be built with JAM
author: Brian Douglas
image: /img/blog/jamstack_logo.png
format: blog
short_title: Spread the JAM
description: >-
  There’s no reason to have a massive, unwieldy CMS with a database or a fancy
  isomorphic monolith when you could have a fast, secure and beautiful static
  site. But how can you decide if a new site is right for you?
date: 2017-02-03T22:27:08.023Z
---

There’s no reason to have a massive, unwieldy CMS with a database or a fancy isomorphic monolith when you could have a fast, secure and beautiful static site. But how can you decide if a new site is right for you? No matter what tools you prefer to develop in, whether it be Node, Ruby, Python or something else, there’s a site generator for you(staticgen.com), the best source for information on static website generators on the internet.

Nowadays the tooling around JavaScript evolved a lot — Grunt, Gulp, and Webpack, just to name a few. You can build functional sites and web-apps that bundle into deployable static files. Couple this with Continuous Deployment through Git and you have the JAMstack.

## You Value Security

With a static site, you don’t have to worry about malicious code being injected into your site when users visit it. Static sites are built on a production machine (probably the machine you are reading this on) by static site generators, which take your code and spit out flat HTML files with CSS and JavaScript. When a user requests a page from your site, the server just sends them the file for that page, instead of building that page from various assets each time. No build process means standard hacking attacks like scripting or database security exploits just don’t work.

## You Value Speed

What does a browser do? It renders HTML, CSS and JavaScript into a human-viewable format. No matter what type of site you use, a legacy dynamic site or a modern static one, what gets sent from the server to your browser is HTML, CSS and JavaScript. So why take the time and resources to render your site every single time someone visits when you can have a pre-built version ready to go? There’s a reason that a normal static site hosted on a CDN is often 10 times faster time-to-first-byte than a site built with a legacy CMS. Additionally, by hosting your static site on a CDN, you can serve it from whichever node is closest to your users. Someone viewing your site in a coffee shop in Vienna pulls from a European server, not a server farm in the Silicon Valley. The same goes for your Japanese visitors, or a user just down the street.

## Flexibility

With a static site, you can get lean and mean, with a tool that does exactly what you need it to. Like to blog? Try out Jekyll or Hugo. Want a high-performance marketing site? Check out the pros and use Middleman or Roots. Trying to showcase your visual portfolio? Maybe Cactus is right for you. And if you want something so finely tuned and streamlined to your complete specifications, Metalsmith is definitely the way to go.

## Smaller Footprint

A static site, when generated, is capable of being hosted on any web server that can return HTML files (which gives you a whole bunch of options). Of course, you’ll want to take advantage of the possibilities afforded to you with a static site by finding a host that allows for things like continuous deployment, instant cache invalidation, automated deploys and more. However, you can leave that to somebody else, and instead of installing, managing and updating your CMS, you can focus on developing your site.

## Reliability

The beauty of serving up flat HTML files is that they can be hosted anywhere and everywhere, like on a CDN. Let’s say there’s a DDoS attack on the server where your legacy site is hosted. Sorry, but you might just be screwed for a few hours (or days). That same attack hits a node where your static site is hosted? Your site just gets served up from the next closest node. Your visitors never even notice that there’s a problem.

## Developer Experience

The beauty of using a static website generator is in the developer experience. Build tools will output your HTML to a particular directory on your build machine, and nearly all tools include a local web server, which allows you to check and double check your progress as you go. You have the security of knowing that your site will look exactly the same to your visitors as it does to you as a developer.

## Scalability

You’ve hit it big! Your site has gone viral, and you are seeing absolutely massive response and increased visits thanks to getting namechecked across the social media spectrum. Did you anticipate that this might happen? Did you overprovision massively, just in case this happened? Are you paying for huge chunks of bandwidth monthly, hoping for (and fearing) an explosion of traffic.

Or are you making frantic calls to your service provider to get back up online after you made it to Reddit’s front page? Your plan couldn’t handle that kind of attention, and now you are down (and got dragged out of bed or away from the dinner table to try and resurrect things).

And when your traffic means that you have to scale, it means that you are paying for all that complex code to run on your server at every page request. And that’s going to hit you right where it hurts: the wallet. With static, scalability is barely an issue. Of course it scales! Increased requests mean increased pages served, but no extra work in building those pages. With some providers, scale is built in, while with others like Amazon’s S3, all you have to pay for is the increased bandwidth.

## Hosting & Price

If all the heavy lifting of building a static site is done on your production machine, then what exactly is it that you are paying for with hosting? Asset storage, basically. Your static HTML files take up next to no space, and so your service is usually priced accordingly. Instead, you can spend your money where it really matters, on the features that make your site faster and your life easier, features like atomic deploys and asset fingerprinting to make sure your site is always globally consistent, or git integration and automated builds, so your site is always up to date with your latest changes, and snapshot versioning and instant rollbacks (in case your latest changes break something).

There’s never been a better time to take advantage of the speed, security and reliability of static web generators and the modern web development environment around them. So what are you waiting for? If you’re ready check out the most popular site generators [here.](https://www.staticgen.com)