---

title: Interview with Geoff Kimball of ZURB Foundation
author: Aaron Autrand
image: /img/blog/zurb-foundation.svg
image_caption: null
format: blog
short_title: Interview with Geoff Kimball
description: "ZURB's Geoff Kimball talks Foundation 6, Panini and Gulp"
thumbnail: thumbnails/geoffzurb.jpg
cmsUserSlug: foundation-6-geoff-kimball
date: 2016-03-03T00:00:00.000Z
tags:
  - interview
  - swt
  - foundation
  - zurb
  - panini
  - gulp
  - grunt
  - geoff kimball
  - nodejs
  - design
---

Foundation hit the scene in 2011 when interaction design company ZURB decided to create a responsive front-end framework for development.

Fast forward to today, and one open-source project is now three: Foundation for Sites, Foundation for Apps, and Foundation for Email. With the release of Foundation 6 and the static site generator Panini, ZURB designer Geoff Kimball presented the new iteration at the [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/), and took time to talk to Netlify about his preference for streamlining the build process, Gulp vs. Grunt, and the problem with following the zeitgeist.

<!-- excerpt -->

---

**Aaron:** **Can you talk a little bit about how all of these different static web build tools have developed over the last couple of years?**

**Geoff Kimball:** People found that they were very interested in deploying sites that were entirely static--they had needs that were simple enough that they could just do all that on their computer, they could compile the pages once and then upload those flat files to the server.

The trend there is finding more ways to integrate the things that people are used to having, like PHP or Rails or Django or any typical kind of MVC framework or any primary language template on the server side, and then finding ways we can do that on the client’s side to generate static files. Ruby and Node have a lot of that big stuff.

I’ll bias myself towards Node. You have the full power of JavaScript to generate static sites, so you still have the backing of the full programming language, but you are compiling all those pages in your development environment versus compiling them on the fly on the server; that means that the pages you deliver on the server are much faster because they’ve been pre-compiled by you.

A lot of the evolution comes from creating more tools that work client side. You have things like Jekyll, which gives you a lot of the bells and whistles of a typical server-side framework to generate flat pages, and the same thing with Node with tools like Wintersmith and Metalsmith.

**Based on your experience with all these tools and the various different things that you use in your daily life at ZURB, where do you see this kind of stuff going in the near to mid-term future?**

Right now people in the JavaScript ecosystem are doing a lot of hemming and hawing about JavaScript fatigue or JavaScript fragmentation; you may have read some of those Medium think pieces at the end of last year. The Node system is built on this concept of modularity in small tools, but small tools become annoying when you have to glue them all together; the React.js ecosystem has this problem right now where there are a lot of React boilerplates.

---

> Small tools become annoying when you have to glue them all together

---

I think in the Node ecosystem in general, people are going to try to focus more on maybe being more opinionated on things; that’s a problem that people don’t really quite know how to solve yet. There are so many different ways to do things in JavaScript and Node, there are so many different ideas floating around and that exchange of ideas is very positive but it can really confuse new developers. I think JavaScript developers are going to find a way to make those ideas more accessible.

Instead of having fifteen different build systems, maybe two or three will emerge as the ones which are popular. You can say the same thing about a static site generator or any tool like that has a lot of options; maybe people will focus their ideas and they will focus on the handful of tools that do those things very well.

**Along the same lines, where do you see stuff like Gulp going?**

I hope Gulp has a bright future. Gulp is entering the same phase that Grunt did when Gulp showed up. Grunt was a thing for like a year and a half, two years. Then Gulp came along in early 2014 and the mantra became like “nah man, you can’t use Grunt, you’ve got to move to Gulp.” And then last year the mantra became “nah man, you don’t have to use a build system at all; you use NPM scripts your package.json.

Once again, that’s one of the things with the exchange of ideas. The node ecosystem likes to move around a lot, people like to look at the new ideas and say that the old ideas are bad.

---

> The node ecosystem likes to move around a lot. People like to look at the new ideas and say that the old ideas are bad

---

For ZURB’s part we are going to stay committed to Gulp; Gulp 4 brings a lot of really interesting ideas and it kind of fixes a lot of problems that people had with that build system and ultimately since it’s a task runner and it is designed to basically do anything, we’re hoping it eventually just kind of have a good future ahead of it. It is designed to just run other plug-ins, which means that it should be suitable for pretty much any situation.

**Netlify: With the amount of Gulp tools in existence now and the ones that are being built every day, what does that mean for front end developers?**

Gulp’s initial problem was that they had to catch up to Grunt’s ecosystem. There was a metric a few years ago - Grunt has a hundred thousand plug-ins to pick from and Gulp has twenty thousand. Any way you looked at it, Gulp was less feature-rich because it just had less plug-ins.

I believe now its plug-in ecosystem has evolved to the point where you can do pretty much anything you want, and actually writing Gulp plug-ins is not even that hard – just writing your own functions. I’m hoping that plug-in ecosystem continue to thrive, I hope that the developers of Gulp continue to iterate on it past Gulp 4.

Gulp 4 is not actually out yet but it is stable enough for production and it has a lot of really good ideas. I hope that the Gulp developers do not cave to the pressure of newer and trendier tools, trying to outdo them. I hope they can stick around with that thing and continue to develop it, because I think that it is a good idea for how a build system should be structured.

**Finally, we're giving you a soapbox: when it comes to static web development or various build tools or stuff like that, what are the kind of things that you want to see? If you could have your way and everything would be exactly how Geoff Kimball decided that it should be?**

I would like to see less boilerplate. There are tools that try to solve this like Yeoman, but it’s a common thing where you can spend an hour or two just setting up a project and not actually working on it because you’re trying to get your build system working to do whatever you want to do.

If there can come a future where Grunt build systems or Gulp build systems become more composable on a macro level – that would be really nice. They’re composable on a micro level – you can combine plug-ins any way you want them, like you can combine SASS with auto-prefix or with post-CCS with a CCS minifier and you can do that just fine. But on a macro level when you’re talking about tasking or common things people use build systems for – you often still end up writing that stuff yourself and cobbling the plugins together by hand.

If there’s a way that people can make that boilerplate faster to put together, that would be fantastic. It’s this paradox choice issue where people see all the choices in front of them and that can prevent them from actually getting work done, because they just have to stress about how their build system works.

That's also why we’re sticking with Gulp at ZURB, because it’s not worth our time to stress about what could be better. Gulp works extremely well for us so we’re very happy to stick with it.

In general, I would like to see faster set-up for projects or if people can take that modularity and find a way to streamline it a little bit more, that would be nice. Find a balance there between, being super opinionated and being super modular.

**Alright, cool; anything else you want to add?**

No, I believe that was my soapbox.

**Thanks for your time, and thank you very much for your presentation tonight!**

---

_The [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/) is a monthly gathering of developers and tech forward-thinkers who want to learn and share their insight about the technology that will power tomorrow's internet. Join us at our next event by connecting with us on [Meetup](http://www.meetup.com/sf-static-web-tech/)!_
