---

title: Top Ten Static Website Generators
author: Aaron Autrand
image: /img/blog/04-static-site-generator-trends-opt.png
image_caption: ""
format: blog
short_title: Top Ten Static Generators
description: A list of the top ten static generators for building your next website
thumbnail: thumbnails/staticwebsite.png
cmsUserSlug: ""
date: 2016-05-02T00:00:00.000Z
tags:
  - popular
---

These days, speed and security is the name of the game.

Website visitors abandon sites after just a second or two of delay, and database hacks have become commonplace. Just look at the news to see the latest scandal laid bare by hackers who gained access to sensitive information due to poorly maintained WordPress or Drupal installs.

That's why developers, agencies and producers of web content are turning to static website generators. With modern browsers, sites built with JavaScript, APIs and Markup offer the ability to serve highly dynamic content without the shackles of the standard, painfully slow (and expensive) backend database and a server building a site each time a visitor makes a request. Flat files can be served from CDNs around the world, increasing both speed and uptime, and managing static sites with version control systems like Git means the process of creating and updating sites is highly efficient.

<!-- excerpt -->

Of course, if you are looking to make the switch, the myriad choices can seem daunting. That's why we're here. We'll take a look at a lineup of the most popular static website generators and what they're best suited for.

To decide what to cover, we are using [StaticGen.com](https://www.staticgen.com), a leaderboard of the top open-source static site generators (full disclosure: Netlify runs staticgen.com). We're letting the community decide by covering the tools with the greatest number of stars on GitHub.

Before we start, you'll probably notice that ReactJS isn't on this list. You can't talk about front end development in 2016 without talking about React, but React is more rightly a set of tools that can be used for many things, including static site and single page app development. React has been used to create some of the SSBs on this list, and will undoubtedly continue to have a hand in the future of the modern web, but for the purposes of this article, we're looking at tools that can build entire sites and apps, not just components.

![jekyllrb.png](/img/blog/jekyllrb.png)

**1. Jekyll**

  Jekyll is far and away the most popular static site generator. That's no surprise, considering it underpins GitHub Pages and was created by GitHub co-founder Tom Preston-Werner.

  Jekyll is built with Ruby, and is most often used for blogs and personal projects, due to its close integration with GitHub. Jekyll takes a directory filled with text files, renders that content with Markdown and Liquid templates, and generates a publish-ready static website. Its large community and wide array of plugins makes it a great jumping off place for bloggers coming from the world of WordPress and Drupal, making it easy to import content from those formats and more.

  [jekyllrb.com](http://jekyllrb.com)

![hexo.jpg](/img/blog/hexo.jpg)

**2. Hexo**

  Hexo is a build tool created with nodeJS, which allows for super speedy rendering, even with extremely large sites. Hexo focuses on being a blog framework that is highly extensible, with full support for Octopress plugins out of the box, and many Jekyll plugins with a minimum of tweaking.

  [hexo.io](https://hexo.io)

![hugologo.png](/img/blog/hugologo.png)

**3. Hugo**

  Hugo is a consistently namechecked static site generator built around Google's Go programming language. It is optimized for speed (Hugo sites can be built in milliseconds) and easy to use. With no dependencies, Hugo is easy to install and update...all you need is the binary.

  Hugo takes a directory with content and templates and renders them into a full html website. It's a great choice for blogs and documentation. Content can be written in Markdown, oganized however you want with any URL structure, and metadata can be definied in YAML, TOML or JSON. All this is done with almost no configuration, meaning with Hugo, you can just get straight to work.

  [gohugo.io](https://gohugo.io)

![octopress.png](/img/blog/octopress.png)

**4. Octopress**

  Octopress began its life as a modified version of Jekyll, but it has taken on a life and a community of its own. Octopress' theme is written in Semantic HTML5 and is easy to read on mobile devices. Users of Jekyll will find themselves right at home, as many Octopress plugins can be used with minimal modification, and its out of the box framework means users can get up and running in seconds.

  Octopress self-identifies as a blogging framework for hackers. It allows users to easily embed code into their posts from gists, jsFiddle or their own file systems, all with Solarized styling. It features built-in third-party integration, supporting Twitter, Pinboard, Google Analytics, Disqus comments and more.

  [octopress.org](http://octopress.org/)

![pelican.png](/img/blog/pelican.png)

**5. Pelican**

  Pelican is a static site generator written in Python. Content can be written in Markdown or reStructuredText formats, and can be published in multiple languages.

  Jinja2 templates allow users to customize the them, and Pelican supports code syntax highlighting. Pelican can also support Atom and RSS feeds, integrates social media accounts, external commenting tools like Disqus and Google Analytics. Content that lives elsewhere can be imported from Wordpress, Dotclear or RSS feeds.

  [getpelican.com](http://blog.getpelican.com/)

![brunch.jpg](/img/blog/brunch.jpg)

**6. Brunch**

  Brunch is an ultra-fast HTML5 assembler and build pipeline. Brunch compiles scripts, templates and style sheets, lints them, wraps them in Common.js or AMD modules, and concatenates the result.

  Brunch uses skeletons to get users up and running. Brunch is better suited for users planning on building something closer to an app on the app/blog static site spectrum.

  Brunch is actually better compared to Grunt or Gulp than to a blogging framework like Jekyll or Hugo. It doesn't care about programming languages, frameworks or libraries. It just builds stuff.

  [brunch.io](http://brunch.io/)

![middleman.jpg](/img/blog/middleman.jpg)

**7. Middleman**

  Middleman was built as a framework for advanced marketing and documentation websites, instead of a static blogging engine. It's grown to become one of the most widely used static build tools for enterprise sites, with companies like MailChimp, Sequoia Capital and Vox Media creating their sites in Middleman.

  Middleman is a command-line tool that uses Ruby and Ruby Gems to build web applications with CoffeeScript, asset management solutions like Sprockets, and uses ERB and HAML for dynamic pages and simplified HTML syntax. Additionally, Middleman's powerful API allows extension authors to hook in to the toolchain at different points.

  [middlemanapp.com](https://middlemanapp.com/)

![metalsmith.png](/img/blog/metalsmith.png)

**8. Metalsmith**

  With Metalsmith, the sky's the limit. That's because Metalsmith is extremely simple - it's a collection of user-defined plugins. Because of that, Metalsmith can build just about anything, from blogs to documentation to webapps and just about anything in between.

  It's worth noting that Metalsmith's structure means that users should have a fairly high level of technical proficiency before trying to tackle a project. Beginners would be better served by one of the other tools on this list. But if you want something infinitely flexible, Metalsmith could be the tool of choice for you.

  [metalsmith.io](http://www.metalsmith.io)

![harplogo.png](/img/blog/harplogo.png)

**9. Harp**

  Harp is a static web server that also serves Jade, Markdown, EJS, Less, Stylus, Sass, and CoffeeScript as HTML, CSS, and JavaScript without any configuration. Harp allows you to reuse partials and common elements, so that you can preserve consistency across design and layouts. It compiles assets on an as-needed basis, so changes can be displayed with just a simple save and refresh.

  [harpjs.com/](http://harpjs.com/)

![expose.png](/img/blog/expose.png)

**10. Exposé**

  Exposé is quite a bit different than the other offerings on this list. It's actually just a Bash script that turns images and videos into beautiful photoessays. It's best experienced, rather than explained, so do yourself a favor and look at the personal blogs of Expose's creator, located at [jack.ventures](http://jack.ventures) and [jack.works](http://jack.works).

  [github.com/Jack000/Expose](https://github.com/Jack000/Expose)

## Honorable Mentions:

There's always a few favorites that get left out of any top ten list, and this one is no different. We decided to add a few of our personal favorites to the list, just because we like 'em.

![gatsby.png](/img/blog/gatsby.png)

**Gatsby**

  Gatsby takes Markdown and other static data sources and turns them into dynamic blogs and websites using ReactJS. By supporting the component-driven development model of React, Gatsby is able to re-use components across a site, adding consistency and speed. Blogs developed in Gatsby function as a single-page app, with JS bundles preloaded, so page transitions are instantaneous.

  [github.com/gatsbyjs](https://github.com/gatsbyjs)

![roots.png](/img/blog/roots.png)

**Roots**

  Roots is a static site compiler built in NodeJS, that generates static HTML, CSS and JavaScript files. A product of digital agency Carrot Creative, Roots is streamlined for use by freelancers and agencies to make highly variable builds quicker and easier. Roots comes in the form of a static site build tool by default, but also includes templates and plugins for Express and Rails. Roots comes with out of the box support for Jade, CoffeeScript and Stylus, with an easily extensible asset pipeline.

  [roots.netlify.com](https://roots.netlify.com/)

![gitbook.png](/img/blog/gitbook.png)

**GitBook**

  GitBook is quite a bit different than your standard static web tool, but follows one of the cardinal rules of the static site toolchain: Do one thing and do it well. In the case of GitBook, that one thing is eBooks.

  With GitBook, you can write your book in Markdown or AsciiDoc format, and publish by pushing to GitHub. If you aren't comfortable working in the command line, you also have the option of using a web UI or a desktop editor. And once you are done, you can output your book as a website or an eBook in pdf, epub or mobi format.

  [gitbook.com](http://gitbook.com)

![cactusformac.png](/img/blog/cactusformac.png)

**Cactus**

  Cactus sets itself apart from the crowd by being a little more beginner-friendly than some of the other options listed above, due to the existence of the Cactus [Mac app](http://www.cactusformac.com/). The application allows for simple setup of frameworks for blogs, portfolios and profiles, with built in deploy for Amazon S3. Underpinning all that is a modern build tool that runs on Python and uses Django's templating language.

  [github.com/koenbok/Cactus/](https://github.com/koenbok/Cactus/)

----

Once you've chosen a static site generator, you can use [Netlify](https://app.netlify.com/signup) to host and deploy your static site or app. Although there are many static site hosting services, only Netlify gives you built-in performance, security, and flexibility. And of course, it supports every generator listed here and many more.
