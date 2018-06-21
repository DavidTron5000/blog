---
title: Smashing Magazine just got 10x faster
author: Chris Bach
image: /img/blog/logomark.jpg
format: blog
short_title: Learn why Smashing left WordPress and chose the JAMstack instead.
tags:
  - JAMstack
  - Design
  - CMS
  - APIs
  - Performance
description: >-
  There was a modern web renaissance taking place and Smashing planned to be a
  part of it. After learning their site could be 6x faster if they took
  advantage of a global CDN, Smashing made the decision to choose the JAMstack
  and partnered with Netlify to get the job done.
date: 2017-03-16T21:11:27.000Z
---

## Listen to our journey with Smashing Magazine

<iframe width="560" height="315" src="https://www.youtube.com/embed/rB4Cl5LSe2c?cc_load_policy=1" frameborder="0" allowfullscreen></iframe>

Smashing Magazine has always been a platform developers trust. They provide a place to go to find the best practices for web development. We’ve long put our trust in them since, Matt Biilmann, my co-founder and CEO of Netlify, personally used Smashing Magazine as he began his journey as a self-taught programmer years ago.

In November 2015, Matt wrote”'[Why Static Website Generators Are The Next Big Thing”](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) it was one of the most performant articles Smashing Magazine had seen. In this article we conducted some interesting research. We did a comparison to see how much faster Smashing Mag would be if it was put on Netlify which uses the power of global CDN …the preliminary results said that it would be **6x faster**!

In April 2016, Matt spoke at SmashingConf in San Francisco where he discussed [the JAMstack](https://jamstack.org/), a modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.

The JAMstack has many core practices that makes it ideal for modern web development:

* JAMstack sites use the power of a CDN to unlock speed and performance that can't be beat.
* It’s all in Git, so it uses no databases to clone and has no complex installs.
* JAMstack markup is prebuilt, it uses automated builds, meaning content changes won’t go live until you run another build..and that’s just a few examples.

This is a new way of building websites and apps that deliver better performance, higher security, lower cost of scaling, and a better developer experience.

There was a modern web renaissance taking place and Smashing was planning to be part of it.  But first, they would implement it themselves. By doing this Smashing further solidifies that they ‘practice what they preach’ and are pioneers in modern web development. We are honored they choose the JAMstack and Netlify to bring their vision home.

## **A seriously big job.**

Smashing Magazine made a decision last year to redesign their site because they faced a variety of issues with their former setup. They were using various tools and platforms to manage everything from subscriptions to content which was resulting in frustration over where to go to for what.

WordPress was causing major headaches and Smashing was no longer happy with what it had to offer.  Even with using most of the caching plugins available, it was clear that WordPress was not working since they had issues with *every single caching plugin*.

![undefined](/img/blog/gif_1.gif)

*If* Netlify was going to take this on we had to understand that the top priorities for Smashing were:

* Access to a **unified platform** - somewhere to unite the variety of technical tools they utilize to manage their site


* The freedom to build **a design** they loved without limitations presented to them with WordPress and other tools.
* The **most performant** site possible with a focus on reliability and speed.

...and they needed this **within months**.

Is that all? After a few discussions and a team pow-wow Netlify decided that this was too big of an opportunity to miss.  Smashing magazine would provide us the perfect use case to prove that JAMstack sites were **the** way to develop sites.

![undefined](/img/blog/gif_4.gif)

This meant we had needed multiple assets for Smashing. We needed to create a build tool for the magazine itself, a content management system for their thousands of blogs posts, a comments engine (over 200,000 comments!), an eCommerce platform for purchases, a subscription service, and a member login.

We don’t always believe in re-inventing the wheel, so we did go out and research for current tools that would suit Smashing’s robust needs. Unfortunately quickly realized we had to start from scratch.

**Thus our open source dreams were born.**

We wanted to deliver every single tool, detail, and functionality that Smashing Magazine desired. However, it was equally important to us that we made our efforts worthwhile for the community at large. We had the opportunity to show the JAMstack is the future of web development while building tools that could be used by the community growing around it. That is why everything we built for smashing is **open source.**

Per Smashing’s needs; the beginning of our technical roadmap was to build the following open source APIs:

* **GoTell** - an API and build tool for handling large amounts of comments.
* **GoCommerce** - a small Go based API for e-commerce sites that handles orders and payments.
* **GoJoin** -  an API that wraps Stripes subscriptions for Single Page Apps and sites.
* **GoTrue** - a small open-source API written in golang that can act as a self-standing API service for handling user registration and authentication for projects. It’s based on OAuth2 and JWT and will handle user signup, authentication and custom user data.

You can find a list of those APIs on our [open source page](https://www.netlify.com/open-source/). There’s a whole technical journey behind these decisions and we will be sharing the details of that as well in a future post.

***Our Open Source CMS***

By far, one of the biggest projects that came out of the Smashing job was the content management system open source project **[Netlify CMS](https://www.netlifycms.org/)**.

![undefined](/img/blog/netlifycms.svg)

Far from it’s bloated, monolithic cousins like WordPress, we wanted to bring Netlify CMS to the modern, Git-centric world by integrating content editors into a Git workflow. In addition, Netlify CMS is platform agnostic and works with (almost) all static site generators and sites stored in Github.  It’s fast, easy, flexible, and we are very proud of it.

*Special shout out to these technologies used:*

To [Algolia](https://www.algolia.com/), super fast real-time search. And to static site generator, [Hugo](http://gohugo.io/), combined with a modern asset pipeline built with Gulp and Webpack, all based on the open-source [Victor Hugo](https://github.com/netlify/victor-hugo) boilerplate.

**Holy crap, we did it!**

A few months later, here we are... Smashing announced a beta site today, [next.smashingmagazine.com](https://next.smashingmagazine.com/), and although there’s still some work to be done, there were many wins...

SmashingMagazine.com is now much faster, they went from 800 ms time to first load to 80 ms. Smashing’s users will have a smoother experience due to the easier integrations, speed, and better performance.

![undefined](/img/blog/gif_2.gif)

Smashing now has the unified platform they were dreaming of. They go to **one** place for the robust needs of their site. With Netlify, our open source projects, and a more efficient way of managing content there’s no longer confusion about which buttons to push or which tool to go to for what.

They were able to have full control of the design they wanted, resulting in a beautiful site. (small image of site homepage below)

...and JAMstack has proven it is the captain of the modern web renaissance and we were able to do a lot of work in providing an open source toolset for the community.

## 