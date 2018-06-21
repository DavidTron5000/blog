---

title: "Interview with Thomas Reynolds, Creator of Middleman"
author: Aaron Autrand
image: /img/blog/thomas-reynolds-mm.jpg
image_caption: null
format: blog
short_title: Middleman Interview
description: "Thomas Reynolds talks to Netlify about Middleman, Git and developing with modern web tools."
thumbnail: thumbnails/thomasreynolds.jpeg
cmsUserSlug: ""
date: 2016-04-01T00:00:00.000Z
tags:
  - interview
  - swt
  - middleman
  - thomas reynolds
---

Thomas Reynolds is the Technical Director at famed Portland digital agency Instrument.

He’s also the creator of Middleman, one of the most widely used static site generators for large enterprise sites like MailChimp, Sequoia Capitol and Vox Media.

Reynolds recently did a massive overhaul for Middleman v4.0, and presented his changes and thoughts on the category at this month's SF Static Web Tech Meetup. Following the meetup, Reynolds took a few minutes to talk to Netlify about Middleman's humble beginnings, the benefits of a git-centric workflow, and why he prefers developing with modern web technologies.

<!-- excerpt -->

Aaron Autrand: **For lack of a better word, you and Middleman are kind of one of the elders of this new version of modern static sites. What are some of the trends that you have seen come and go and some of the things that you've seen bubble up over the course of your time with Middleman?**

Thomas Reynolds: I started Middleman basically to make my life building email templates a little more simple and dry. And that is not what people are using it for now, to put it bluntly. In the last couple years as we have needed more programmers, everyone's moved to the front-end or has found the front-end a little easier to learn. Even back-end people are able to build complex front-end apps. You know, basically don't bet against Javascript, because Javascript is now winning and has won. I think that might be driving some of the static stuff, because if that's your environment, you don't necessarily want to go back to generating Java server pages or spinning up a rails instance just to have a back-end.

Git as a means of running an entire project from a development side has become really important. Heroku kind of pioneered the whole “just commit it and you get your website out.” So having tools that allow you to do that means you don’t have to run database migrations or spin up a new server in the cloud just to get your little update back to the website when you do a git command. I think that’s also something that's super nice with static sites.

---
> Git as a means of running an entire project from a development side has become really important

---

And then, for me... It just feels safer. You can see what your site is doing by what's on the server. I still remember opening up Transmit and going on to the FTP and being like, "The site is broken. Hack Hack Hack. Save. The site is fixed now." Having an actual file that represents what people are seeing is nice and it's not just this, "Well if you did the form correctly with these inputs then maybe you got to this form that you can never get back to." And knowing what went wrong when you have to do bugs makes it easier as well.

**You spoke about git. What has been the big benefit that you've seen of this more git-centric workflow that developers have adopted?**

You don't have two people editing the file on the server at the exact same time. At Instrument we do double pull request reviews for all code going into anything and that alone...even outside of git that's amazing. Being able to have someone look at your code in a nonjudgmental way and being able to see what other people are putting into your code base. You check it out for two seconds and move on. Git and GitHub, in particular, gives us nice tools that let us have that oversight. It's great because then you can have some new features and some new redesign just sitting up in a git branch, if the pull request has not merged yet, the tools we use let us have staging servers for all pull requests. You can just pop over, do your visual QA on whatever has changed and merge it all in one.  We've also moved all of our producers and QA people into the git as well.

So if we are not using something like Contentful, if we are just using raw data files or markdown files, then we actually have our content people just clicking the edit button in github and using that as a ghetto CMS, so they can make their own pull requests that we can then double check before it goes in.

**Where do you see the development in static sites and in the modern stack moving in the short and middle term?**

We are down to two back-end developers out of thirty-something engineers. It's becoming a more niche talent I think. I did back-end for years. I don't want to discount it in anyway, but clients are paying for something they can see and back-end is like the glue that makes it all work.

So we want people to either be front-end or full-stack, but it's harder to support full-time back-end developers, I think. Having platforms that allow those full-stack or front-end people to build a site by themselves without needing anyone else is huge. If you didn't know what static sites were, I don't know how you would approach the problem. If someone told you how to build a website, it's going to have three pages, it's going to be in forty locales, like what as a front-end developer are you supposed to do? I don't know. You'd probably start googling; you'd get rails or something and then you'd get really confused and run away. With Middleman you can do that with like four lines. It just lets you move on and write some html.

**I like to give people a soapbox. When it comes to development with modern web build tools, if you could have things the Thomas Reynolds way, if you could sit there and make a decree, "this is how things work from now on," what would that be?**

I've been slowly learning since I dropped out of college that a lot of things that they taught me about Java were actually pretty smart. So I would have decent type systems in everything, everywhere. We are using typescript of all Javascript. I've added contracts to ruby for all my Middleman. Swift and objective-c onto iOS side, of course those, Java on the Android side. I would just want nice stable systems that aren't like the wild wild west like Ruby and Javascript can be.

--

_The [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/) is a monthly gathering of developers and tech forward-thinkers who want to learn and share their insight about the technology that will power tomorrow's internet. Join us at our next event by connecting with us on [Meetup](http://www.meetup.com/sf-static-web-tech/)!_
