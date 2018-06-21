---
title: Top Ten Static Site Generators of 2017
author: Eli Williamson
image: /img/blog/411518_3552981989871_102544901_o.jpg
format: blog
short_title: Top Ten Site Generators
tags:
  - popular
  - jamstack
  - generators
  - countdown
description: >-
  In this countdown, we will review the top ten static website generators of
  2017 so far.
date: 2017-05-25T15:31:23.000Z
---
We're progressively seeing the [JAMstack](https://jamstack.org/) (Javascript, APIs, and Markup) gain momentum in modern web development; with static site generators at the epicenter.

In this article, we are reporting on the most popular and best-supported static-site generators so far. These rankings are based on GitHub's top starred repositories, this fluctuates daily so for the latest numbers check out [staticgen.com](https://www.staticgen.com/) (the world's most popular public directory of open-source site generators).

## Why go static?

Amongst many reasons, **speed** and **security** rise above all others.

Static sites see substantially less database vulnerabilities. It seems like every other day we are hearing about an attack on old-style monolithic sites. By nature, static is safer; sites are prebuilt and served without any server code running directly on your site. This isolation removes the opportunity for hackers to infiltrate your pipeline. Hence why developers, agencies and producers of web content are increasingly embracing static website generators.

With modern browsers, sites built with JavaScript, APIs and Markup offer the ability to serve highly dynamic content without the shackles of the standard, painfully-slow (and expensive) backend (database and servers). According to the [NY Times](http://www.nytimes.com/2012/03/01/technology/impatient-web-users-flee-slow-loading-sites.html?pagewanted=all), a site that takes more than 400 milliseconds may cause the user to bounce before they even see the page.

Monolithic apps run server-side code each time a visitor makes a request. This wastes valuable time and opens up holes in your site's security. With Netlify, flat files are served from CDNs around the world, increasing both speed and uptime; not to mention, easily leveraging version control systems like Git means the process of creating and updating sites is much more integrated with the developer workflow.

Of course, if you are looking to make the switch, the myriad choices can seem daunting. We hope to clear the air while we take a look at a lineup of the most popular static website generators and what they’re best suited for.

![jekyllrb.png](https://cdn.netlify.com/473a594f32d61d5eb57c9e76930e3ee3617ee04d/4d198/img/blog/jekyllrb.png)

**1. Jekyll - [jekyllrb.com](http://jekyllrb.com/)**

Jekyll holds it's position at #1 as the most popular static site generator. That’s no surprise, considering it was created and fantastically supported by none other than GitHub.

Jekyll is built in Ruby and typically used for blogs or personal projects. Jekyll takes a directory filled with text files, renders that content with Markdown and Liquid templates, and generates a publish-ready static website. Its large community and wide array of plugins makes it a great jumping off place for bloggers coming from the world of WordPress and Drupal, making it easy to import content from those formats and more.

*Try it out with one click now on Netlify:*

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/jekyll-base" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![hugologo.png](https://cdn.netlify.com/13dc05b7af6c04ba9c128e6793628264786681e2/dea0e/img/blog/hugologo.png)

**2. Hugo - [gohugo.io](https://gohugo.io/)**

Since we last reported on the top ten static site generators back in 2016, Hugo has jumped up the list to #2. Built around Google’s Go programming language, it's blazing fast. This is no accident, it was engineered for speed (massive Hugo sites can be built in milliseconds) - even Smashing Magazine, with a seemingly endless well of articles and knowledge, recently switched to Hugo and experienced incredible reduction in build times and fantastic increases in flexibility. [Learn more about their switch here](https://www.netlify.com/case-studies/smashing/).

Hugo takes a directory of content and renders it based on a directory of layouts - this is quite handy for a site made with a variety of content types and landing pages. We have noticed popularity in use on blogs and documentation but really the possibilities are endless. Content can be written in Markdown, organized however you want with any URL structure, and metadata can be defined in YAML, TOML or JSON. All of this is done with almost no configuration, meaning with Hugo, you can just get straight to work.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify/victor-hugo" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![hexo.jpg](https://cdn.netlify.com/ca8dac1dae98c2c399d888c4dd31a52e00f29670/44051/img/blog/hexo.jpg)

**3. Hexo - [hexo.io](https://hexo.io/)**

Hexo is a build tool created with Node.js, which allows for super speedy rendering, even with extremely large sites. Hexo focuses on being a blog framework that is highly extensible, with full support for Octopress plugins out of the box, and many Jekyll plugins with minor adjustments.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/hexojs/site" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![GitBook](/img/blog/Screen Shot 2017-05-16 at 11.13.33 AM.png)

**4. GitBook - [gitbook.com](http://gitbook.com/)**

GitBook is a bit different than your standard static web tool, it that is specializes in documentation (and boy, does it do it well). GitBook helps your team write, collaborate and publish content for your documentation.

With an editor reminiscent of Google Docs, it is easy to to create and format content quickly. Beyond documentation, GitBook is also great for knowledge bases and manuals.

![octopress.png](https://cdn.netlify.com/52d189f2a45cad4144d10df58da9f1d96df9cc7d/abae7/img/blog/octopress.png)

**5. Octopress - [octopress.org](http://octopress.org/)**

Octopress is Jekyll blogging at its finest (if your a developer). As a self-proclaimed "blogging framework for hackers", Octopress allows users to easily embed their code directly into posts from gists, jsFiddle or their own filesystems, all with Solarized styling. It features a handy library of integrations (inboard, Delicious, GitHub Repositories, Disqus Comments and Google Analytics, to name a few). With handy rake tasks and plug-ins, Octopress is a must for the blogging hacker.

![Gastby](/img/blog/gastby-logo.png)

**6. Gatsby -
[github.com/gatsbyjs](https://github.com/gatsbyjs)**

We proudly welcome Gatsby to this year's Top 10. If you recall, last year we noted it as an honorable mention - since then, it has matured exponentially and risen in the ranks to reflect this. Gatsby takes Markdown and other static data sources and turns them into dynamic blogs and websites using ReactJS. By supporting the component-driven development model of React, Gatsby is able to re-use components across a site, adding consistency and speed. Blogs developed in Gatsby function as a single-page app, with JS bundles preloaded, so page transitions are instantaneous.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/brianstone/gatsby-starter-clean" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![pelican.png](https://cdn.netlify.com/5c8e8aa21a2b6abb2bac40ee5d7faeae816950b6/e7e48/img/blog/pelican.png)

**7. Pelican - [getpelican.com](http://blog.getpelican.com/)**

Pelican is a static site generator written in Python. Content can be written in Markdown or reStructuredText formats, and can be published in multiple languages.

Jinja2 templates allow users to customize the them, and Pelican supports neat features such as code syntax highlighting, Atom and RSS feeds, social media integration, external commenting tools (like Disqus) and analytics (via Google Analytics). Content that lives elsewhere can be imported from Wordpress, Dotclear or RSS feeds.

![brunch.jpg](https://cdn.netlify.com/f08ded8400c2cfb691255a88bfa9898b675b900c/5f048/img/blog/brunch.jpg)

**8. Brunch - [brunch.io](http://brunch.io/)**

Brunch is an ultra-fast HTML5 assembler and build pipeline. Brunch compiles scripts, templates and style sheets, lints them, wraps them in Common.js or AMD modules, and concatenates the result.

Brunch uses skeletons to get users up and running. It is better suited for users planning on building something closer to an app on the app/blog static site spectrum.

Brunch is more comparable to Grunt or Gulp than to a blogging framework like Jekyll or Hugo. It is agnostic of programming languages, frameworks or libraries, which makes it quite flexible.

![metalsmith.png](https://cdn.netlify.com/1b2094ff1ee70501c822355fc365e50bf5b8dba8/222e7/img/blog/metalsmith.png)

**9. Metalsmith - [metalsmith.io](http://www.metalsmith.io/)**

With Metalsmith, the sky’s the limit. That’s because Metalsmith is extremely simple - it’s a collection of user-defined plugins. Because of that, Metalsmith can build just about anything, from blogs to documentation to webapps and just about anything in between.

It’s worth noting that Metalsmith’s structure means that users should have a fairly high level of technical proficiency before trying to tackle a project. Beginners would be better served by one of the other tools on this list. But if you want something infinitely flexible, Metalsmith could be the tool of choice for you.

![Middleman](/img/blog/Screen Shot 2017-05-08 at 1.49.12 PM.png)

**10. Middleman - [middlemanapp.com](https://middlemanapp.com/)**

As a veteran in the space, it is no surprise that Middleman landed a spot in the countdown again. This framework was built for advanced marketing and documentation websites, instead of a static blogging engine. It has since grown to become one of the most widely used static build tools for enterprise sites, with companies like MailChimp, Sequoia Capital and Vox Media creating their sites in Middleman.

Middleman is a command-line tool that uses Ruby and Ruby Gems to build web applications with CoffeeScript, asset management solutions like Sprockets, and uses ERB and HAML for dynamic pages and simplified HTML syntax. Additionally, Middleman’s powerful API allows extension authors to hook in to the toolchain at different points.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/wallin/middleman-template" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

## Honorable Mentions:

Unfortunately there's just not enough room for all the great generators so we wanted to make special note of some that didn't quite make it.

![Nuxt](/img/blog/Screen Shot 2017-05-08 at 1.28.47 PM.png)

**Nuxt - [nuxtjs.org](https://nuxtjs.org/)**

Inspired by [Next.js](https://github.com/zeit/next.js), Nuxt.js is a framework for server-rendered Vue applications. This minimalistic framework for going serverless is straight forward and simple but is arguably geared more toward programmatic implementation instead of a traditional DOM scaffolding.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/bdougie/nuxt-starter" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![MkDocs](/img/blog/Screen Shot 2017-05-08 at 1.39.29 PM.png)

**MkDocs - [mkdocs.org](http://www.mkdocs.org/)**

MkDocs is not your typical static site generator in that it essentially does just one thing (and does it quite well). MkDocs helps you create project documentation with speed, simplicity, and style.

Simply write your docs in Markdown and let MkDocs do the rest.

*Try it out with one click now on Netlify:*

<a class="deploy-btn" href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/mkdocs-base" alt="Deploy to Netlify" title="Deploy to Netlify">![Deploy to Netlify](/img/blog/svg\+xml.svg)</a>

![StaticGen](/img/blog/Screen Shot 2017-05-08 at 4.41.37 PM.png)

**StaticGen - [staticgen.com](https://www.staticgen.com/)**

Lastly but certainly not least is staticGen.com - this, of course, is not a static site generator itself but without it, this list would be uninformed.

StaticGen lists all of the open-source site generators and ranks them by popularity. As developers on the bleeding edge, we check this site almost daily to see what is leading the industry in the static-web space. We  enjoy seeing what is gaining traction, receiving regular maintenance, and ensuring longevity in an ever-evolving landscape of open-source.

---

If you haven't already utilized one of those handy one-click deploy buttons above for your static site generator of choice, you can always use [Netlify](https://app.netlify.com/signup) to host and deploy your static site or app.

We provides built-in performance optimizations,  out-of-the-box security features (like free automated SSL and HTTP2 default),  developer flexibility and supports every generator above plus countless more.
