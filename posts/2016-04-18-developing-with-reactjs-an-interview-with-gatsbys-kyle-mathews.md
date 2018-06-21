---

title: "Developing with ReactJS: An Interview with Gatsby's Kyle Mathews"
author: Aaron Autrand
image: /img/blog/null
image_caption: ""
format: blog
short_title: "React & Gatsby: Kyle Mathews"
description: GatsbyJS creator Kyle Mathews talks about his love for developing with ReactJS
thumbnail: thumbnails/kyle.jpg
cmsUserSlug: ""
date: 2016-04-18
tags:
  - interview
  - swt
  - gatsby
  - react
  - kyle mathews
---

With the backing of Facebook, the React programming language has made a huge splash in the last few years.

React is used by Netflix, Imgur, Feedly, AirBnB and more. It exploded in popularity when Facebook open-sourced its Android- and iOS-focused kin React Native in March of 2015. One developer who has taken advantage of the toolkit on offer is Kyle Mathews, the creator of GatsbyJS. Mathews spoke to Netlify after the most recent Static Web Tech Meetup about the benefits of Gatsby, his love for development with React and the idea of JavaScript fatigue.

<!-- excerpt -->

Aaron Autrand: **What made you decide to go with the React toolkit?**

Kyle Mathews: I used Backbone.js to build JavaScript web apps for several years, starting around 2011. Backbone's great, but it uses jQuery for doing all the DOM manipulation. The more complex your site got, the more tricky that got. One of ReactJS's biggest innovations is that they have a declarative model for generating DOM where you just say this is what I want my DOM to be and then ReactJS reconciles that declaration with the existing state of your DOM and then just changes it automatically. And that immediately got my attention because with Backbone, there's a lot of tedious moving. Manipulating the DOM and all that just immediately went away once I switched to React, so that was a huge win.

---
> I think in JavaScript, you have to have a willingness to adapt to new stuff. There's a huge advantage to that, because new stuff is often significantly better than what you're doing now.

---

I'm a huge fan of React's component model because it allows you to encapsulate really neatly some pretty complex functionality and reuse that in multiple places. You can have a button component which does all sorts of sophisticated stuff and it wraps it all up in this neat little button component that you can import it and use it all across your site. Anyway, that's a very neat model that's proved very scalable and very powerful in a lot of stuff I've done.

**So working in Backbone was what led you into React?**

Yeah. I knew I really liked building JavaScript web apps. As a developer in the web everything changes so quickly, you have to keep one eye out for any new innovations. When I started doing stuff, it was super primitive compared to what it is now. Compared to what some other application ecosystems have - it's still primitive in a lot of ways. I think in JavaScript, you have to have a willingness to adapt to new stuff. There's a huge advantage to that, because new stuff is often significantly better than what you're doing now. So it's worth it, even though it's painful at times.

**In the time that you've been developing, what kind of changes have you seen and what kind of changes do you foresee?**

The sophistication of what you can do, the power and speed that is available now. The whole idea of "JavaScript fatigue" has been this big topic of discussion over the last six months or so. A lot of people--either new to the front-end world or who have been ignoring it for awhile--are coming back to it for whatever reason, and saying "Oh my word, it's so incredibly complex now!" Before, JavaScript was this simple thing--drop a script tag in my HTML page and start doing some stuff--and now it's just this seemingly vertical cliff before you can start doing stuff.

In one sense I sympathize with that, on the other hand, I remember how hard it was three or four years ago to do stuff that now takes me hours or even minutes.

Just today I built this AJAX driven search tool with complex faceting and tomorrow morning I'm going to add bulk editing and so forth. I built this all from scratch including the back end. The back end was all done from scratch too, and I did it all in like five hours. And that's really complex stuff and it's working really well, it's fast and super performant. There's no bugs as far as I know and I don't anticipate much maintenance cost in the future. And it's funny, because I built this three years ago with Backbone and it took me literally weeks. It was this huge undertaking to figure all this stuff out and it was this tedious tricky code, and React and some other tools that I'm using like Graft QL and Relay just make it pretty trivial to do. It's awesome, just the power that you have.

**Most of the sites that I've seen built in Gatsby have been closer to - and I believe you even describe this on the GitHub page for Gatsby - is it's more for things that fall on the blog side of the blog to app spectrum. What was your decision-making process in creating a tool to build blogs that function like single page apps.**

The big thing is, I really like React and I don't want to use anything else. Everything else I've used just pales in comparison. So that was one big motivation. And just the developer experience is so powerful.

The other big motivation is having no page transition is really kind of transformative. It's not like, change the world, but it's pretty significantly better. It's almost jarring now when I'm looking at other sites. You have this half to second-and-a-half lag, and a lot of times when the page comes in there's a little jostling around. It's not a clean settling down sometimes, depending on how the CSS or JavaScript is loaded. With Gatsby it's this rock solid, very clean, very fast transition and I think that's pretty transformative that you can do that really easily with Gatsby. Nothing else can do that.

**Who would be the typical user or the ideal user of Gatsby? Somebody who wanted to make the most out of what they were doing and wanted to push Gatsby to its logical limits. What kinds of things would people be doing with that?**

The bleeding edge of Gatsby would be really interesting, kind of like a blended static and dynamic site where, imagine you had a marketing site, a doc site and a Sass app, but they're all one Gatsby program. The static stuff is statically generated, loads super fast and is public to everyone, and then dynamic stuff is password protected and loading information dynamically from the API. I would be really interested to see somebody explore that because I don't see any reason why that couldn't work. I think it could be really powerful, you could hit the home page, log in and immediately get dropped into the app and it'd all be a frictionless experience. That'd be really interesting.

**Finally, I always like to give people kind of a soapbox moment. If everything in the world of web development going forward was decreed by you, if people needed to do stuff the Kyle Mathews way, what kinds of developments would you want to see?**

I think static sites are amazing, they're just an incredible experience for both developer and user, so I would love more static sites. For that to really take off though we really need static site CMS, which you guys are working on ...

So React and then ReactJS is just an amazing ecosystem, like ReactJS webpack, PostCSS, there's just a lot of amazing tools being built and I kind of see Gatsby as a way of integrating all these tools together and I'd love for there just to be lots and lots of activity around Gatsby, a really big community built up around it and lots of boiler plates and Gatsby apps and people who want to put sites on the internet. It's just a very straightforward way to build powerful sites that work really well.

--

_The [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/) is a monthly gathering of developers and tech forward-thinkers who want to learn and share their insight about the technology that will power tomorrow's internet. Join us at our next event by connecting with us on [Meetup](http://www.meetup.com/sf-static-web-tech/)!_
