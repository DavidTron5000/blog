---
title: 'How To Shave time Off Of Your Load Time (It’s Really, Really Easy)'
author: Matt Biilmann
image: /img/blog/traffic-car-vehicle-speed.jpg
format: blog
short_title: Shave 73% off your load time
description: >-
  Taking the right steps during the start of web development can result in
  faster, less bloated, scalable and more secure sites.
date: 2017-02-15T21:55:24.000Z
---

Every few months, somebody posts [this motherfucking website](http://motherfuckingwebsite.com/) to Hacker News.

And each and every time, it seems to head straight to the front page.

![](https://lh3.googleusercontent.com/449T54bifZrHXIqmfo5aP3UKK4HoLjtAur8PpLNs-49wtDUEDC_Wwb88bGHEHB8B4LVFhRceNLyu_LHYeIbn5z2W2acxmukTCLHlIiCKoFFx0V5vkXaD04ntAq2mn6r77ftB9dg3)

The project is a joke, and opinions in the comments tend to be split, but it addresses an important point: bloat is still a huge issue, despite the fact that the developer community has been talking about it for 20\+ years.

In fact, it’s getting worse. The average web page these days is over 2MB in size:

![](https://lh4.googleusercontent.com/SOytf9NGmBhhxXtRg5N2fu6PA47_iEsDPLnfhRmUZaFP5i0ac8wi-j1gWgX_rrMVDzq0rxDo8HYFyWkf_hTLK1dgFhpyEPzz0VPzqHFZpoHkGOR_pE3Rr0rpXAtyngz-LDZjza99)*(Source: [Soasta](https://www.soasta.com/blog/page-bloat-average-web-page-2-mb/))*

I know, I know: I’m beating a dead horse. There’s no shortage of people complaining about load time in developer communities.

But that’s the problem: complaining isn’t going to do anything about it. We hide behind arguments like “I just build what my clients/bosses tell me to.”

If that means filling a page up with enough JavaScript to choke a horse, well, so be it, right?

And while it’s promising that marketers **are** beginning to care about load times and their impact on the bottom line -- [which is massive, by the way](https://blog.kissmetrics.com/loading-time/) - we need to do our part in moving things along, too.

## **Developers Should Give A Damn, Too**

Developers should give a damn about making decisions that make our sites (and the web, in general) faster, more powerful and more pleasant to use.

And not just when our bosses and clients give a damn.

If you’re just learning web development and building side projects, you probably don’t care about performance. But caring about it now will prepare you for when it truly becomes important.

And if you’re a seasoned veteran, it’s **especially** your responsibility to keep the web clean, so that others can learn from your example.

[Maciej Cegłowski](http://idlewords.com/talks/website_obesity.htm) puts it well: *“Keeping the Web simple keeps it awesome.”*

The good news is, it’s probably easier to beat back bloat than you think.

**Beating Back Site Bloat Doesn’t Have To Be A Pain In The Ass**

Look, I’m not going to preach to you about the “best practices” you’ve heard a million times.

Instead, I want to talk about something that you can do *in a few minutes* that will shave seconds off of your load times, without having to spend half a day debugging PHP to figure out why your Wordpress site is slow.

I’m talking about modern static sites. Sites built on the [JAMstack](https://jamstack.org/) (short for JavaScript, API’s and Markup).

In full disclosure, as the CEO of [Netlify](https://www.netlify.com/), I’m obviously biased here. But my goal with this post isn’t to get you to use Netlify. It’s to convince you that *it’s not that hard* to move away from slow and expensive legacy dynamic sites and web apps; ones that have to be built each time a visitor loads them. Sites that have to be built *somewhere*, so if they’re built on a server in New York, they’ll load fast in Manhattan, but slower elsewhere (being in Tokyo, for example, might add several seconds of extra latency).

There are tools that will take nearly all of the work out of the process for you.

Generators like [Hugo](https://gohugo.io/), [Hexo](https://hexo.io/) and [Jekyll](https://jekyllrb.com/) (dozens more options [here](https://www.staticgen.com/)) are used by hobbyists and large commercial developers alike to easily generate sites that load *multiple times faster* than they would with more traditional approaches.

To give you an example of the difference, I grabbed a copy of [HBR.org](https://hbr.org/), the Harvard Business Review site, which runs on Wordpress, and deployed the static version to Netlify using the [speedtest tool](https://testmysite.io) we built.

With 441ms to fully download the HTML, HBR.org is** already **much, much faster than the average site. Just testing out [testmysite.io](http://testmysite.io) we found tons of commercial sites build with old fashioned tooling that had TTFB and HTML download north of 3000ms. But still, even here the difference is huge:

![Screen Shot 2017-02-07 at 2.21.32 PM.png](https://lh3.googleusercontent.com/3W2SPu2Y2G_zHVAh1Kt6lL0yeBpgz1OmPMpwgGKAlWhVASTYWXmGL2OXecR3cZU9msh0hoRSdB2HteeG9R9ecdFtz6T6snspIiDcvM_Iq9Sxakcnvk4eGvVRdZClWwB39TztiXp1)

These aren’t just vanity differences. They have very real implications.

[Google found](http://www.svennerberg.com/2008/12/page-load-times-vs-conversion-rates/) that a 500ms difference in load time impacted revenue by a full 20%. Hence why speed **is** a ranking factor in site performance.

At Amazon, every [100 ms](http://blog.gigaspaces.com/amazon-found-every-100ms-of-latency-cost-them-1-in-sales/) increase in load times decreased sales with 1%. And even on much, much smaller sites, we’re seeing similar results when comparing bounce rates, engagement and conversions.

 [Walmart ](http://www.globaldots.com/how-website-speed-affects-conversion-rates/)decided to attempt to increase the competitive nature of their retail site, during their research they discovered: 

![null](/img/blog/Screen Shot 2017-02-14 at 4.07.30 PM.png)

This kind of data reflects the struggle that development teams face trying to optimize these metrics. Sometimes spending years trying to achieve as shaving off seconds on a legacy stack is both hard and costly.

But as the new wave of JAMstack development grows, these are gains that will be accessible simply by choosing the right initial setup. And these modern sites that don’t have to build on the fly are way faster, carry much less bloat, much safer and  more scalable.

And that’s a very good thing for us developers, businesses, users and the entire web.

## *Want to take our new speedtest tool for a spin?*

*We spent a lot of time looking for a comprehensive speed test that measured that focused on Initial global loadtimes and security settings. When we couldn’t find one, we decided to build it ourselves. [Try it out here](https://testmysite.io) it’s totally free.*
