---

title: An Interview with Wade Warren
author: Aaron Autrand
image: /img/blog/wade.jpg
image_caption: null
format: blog
short_title: Interviewing Wade Warren
description: "An interview about the value of static sites and CDN hosting with VP of Platform Engineering @ Wikia that serves 36,000 http requests per second."
thumbnail: thumbnails/performance.jpg
cmsUserSlug: ""
date: 2016-02-24T00:00:00.000Z
tags:
  - interview
  - wikia
  - wade warren
  - swt

---

Wade Warren is a central figure when it comes to…well, the internet.

Over 30 years in the technology world he's been a part of 4 IPOs, more than 20 mergers and acquisitions, involved in the creation of what became the Apache webserver at Organic, kicking ass at LoudCloud building the foundation for OpsWare, scaling the infrastructure at Netflix to a massive percentage of all broadband usage, heading operations at VeriSign, and now at [Wikia](http://www.wikia.com/), where he serves as the Vice President of Platform Engineering.

His confidence in the benefits and bright future of the new stack of modern static web tech has led to Wikia both using Netlify, and co-sponsoring the [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/) with Netlify. At a recent meetup (where we got to be in the room for the launch of [Jekyll 3.0](https://jekyllrb.com/)!!) Wade took some time to talk to us about the role of static web technology in Wikia's world.

<!-- excerpt -->

---

**Aaron:** **Could you talk about the ways you guys here at Wikia use modern static sites to better your process?**

**Wade Warren:** Absolutely! The way Netlify has instrumented static site generation, makes it really easy to federate the creation of the sites amongst a large group of people, especially distributed around the world like we are. It ties into whatever code management system you want to use.

For us, the advantage is purely performance based. We measure dollars in milliseconds. Every millisecond costs us money. When you are running a large site at scale…

**And when you say large, how big are we talking?**

We actually do 1.7 billion page views a month, but with API calls it’s another 1.3 billion, so we’re right at 3 billion total.

**Do you have any idea of what kind of improvement you guys have seen using static Netlify?**

A big part of it is that we’ve actually been able to divorce ourselves from the complexities of our dynamic site and generate custom implementations of pages very quickly. So the cycle time in order to generate a site or a special page went from literally days or weeks trying to work within the MediaWiki framework–and then our very heavily-forked version of it, which is heavily customized, mostly for performance reasons–we were able to pull ourselves out of the MediaWiki framework, which can be very confining at times, and allow the marketing team to be much more involved.

It used to be that the marketing team would come up with an idea or the design team would come up with an idea that would require engineering iterations to make MediaWiki do a thing that's completely unnatural for that application. Now, we've been able to federate that to the extent that they can come up with their idea and then they can build it themselves, in their preferred authoring tool and then pump out the html, and upload it to their GitHub repo with the webhooks tied in to Netlify to generate the site.

Now it’s public and it’s literally within hours. We can go from concept to release in hours, where it used to take days to weeks depending on the complexity of the requirements and how many constraints we had to overcome within the MediaWiki platform itself.

It's really interesting how back in the old days, when I started–you know, vi is my editor of choice because I've been using it for way more years than I'm willing to admit in public–everything was a static site. Back in the 90s there was no dynamic site generation. The pendulum has swung all the way to the other side where we're actually making static sites with dynamic site tools, which is completely the wrong way to think about it.

When you look at security vulnerabilities and site performance issues–especially at load and at scale–nothing beats the speed, the performance and the load capacity of a properly setup modern static site.

**Thanks!**

---
_The [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/) is a monthly gathering of developers and tech forward-thinkers who want to learn and share their insight about the technology that will power tomorrow's internet. Join us at our next event by connecting with us on [Meetup](http://www.meetup.com/sf-static-web-tech/)!_
