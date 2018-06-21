---

title: "5 Bulls**t Reasons Not to Use a Static Generator"
author: Aaron Autrand
image: /img/blog/bull.jpg
image_caption: "Image courtesy: [Colin Brough](http://www.rgbstock.com/user/ColinBrough)"
format: blog
short_title: Bullshit Reasoning
description: Calling out arguments against static sites
thumbnail: thumbnails/poopemoji.jpg
cmsUserSlug: ""
date: 2016-05-24T00:00:00.000Z
tags: null
---

Often, when you read lists about [reasons to use a static website generator](https://www.netlify.com/blog/2016/05/18/9-reasons-your-site-should-be-static), they are followed by a list of reasons why you shouldn't.

Other times, when you are researching static vs. dynamic, you'll stumble across a grammatically challenged site where some WordPress developer is trying to convince you that using cutting-edge, modern build tools will somehow be the death knell of your site.

<!-- excerpt -->

For obvious reasons, we don't agree. But rather than stick our fingers in our ears and pretend we can't hear, let's take a look at the points most often raised against static web technology. It quickly becomes clear that these arguments just plain stink.

**1. But I want good SEO!**

There's a rumor going around that dynamic sites are better for SEO. They've got plugins! They've got updated content! Spiders!

If you've built a single page app with static technology, most of your site will be a bunch of javascript tags, something that doesn't do you much good when the webcrawlers come looking for content. That's why there are services that offer prerendering. Prerendering allows you to show the crawlers the content that users will actually see by rendering it in a browser, saving that static HTML, and then returning it to the crawler as HTML. Now your content will get indexed like a normal page. Check out prerendering services like [Prerender.io](https://prerender.io/), [Brombone](http://www.brombone.com/), [SEO.js](http://getseojs.com/) or [SEO4Ajax](http://www.seo4ajax.com/) to start.

Wordpress fanboys will often run in screaming at the top of their lungs "Updated Content! Updated Content!". Don't be fooled, they haven't cornered the market. Updated content can be added really easily on static websites: write your content, push it to your git repository, and boom: your content is updated. It's the power of continuous integration. Now all you have to do is actually create the content.

Beyond that, quality SEO is really all about structure, structure that is platform agnostic. The headmatter on your posts (that's what will be updated most often, right?) determines your metadata and URL structure. Build processes can specify Pretty URLs. Writing in an HTML friendly language like Markdown makes it easy to add links, images and alt text. Sites like [Google Keyword Planner](https://adwords.google.com/KeywordPlanner) and [Keyword Tool](http://www.keywordtool.io) can guide your keyword usage. Best practices for SEO are about the work and planning that you do, not a plugin.

**2. Updating content is too hard! I can't use a CMS!**

Actually, there are quite a few options for updating content on static sites. The first and most obvious is writing and saving your content as markdown files. The majority of static site generators support markdown out-of-the-box or with the simple installation of a plugin.

But is markdown a little too complicated for your users? No problem. There are a number of different static CMS options. Some are hosted, some are content APIs, and some live on your production machine. Here's a sampling:

[Contentful](https://www.contentful.com) - Contentful is a CMSaaS that uses a content API to deliver your content. They have integrations for static site generators including Jekyll, Roots, Middleman and Metalsmith. Carrot Creative, the creators of Roots, even outline how to use Contentful with Roots (and Netlify) to easily manage content.

[Webhook](http://www.webhook.com/) - Webhook is a hosted, highly flexible CMS that allows you to create content forms in a drag and drop interface on your production machine before you deploy to their hosting. The source is available on GitHub, so if you'd rather save on the monthly subscription fee and roll your own, you can do that, too.

[Prose.io](http://prose.io/) - Prose.io actually lets you navigate and create new content right on GitHub. Once you have a site up and running in a repository, you can create new posts, define URLs, write in Markdown or use their built in editor to write and format your posts.

[Netlify CMS](https://github.com/netlify/netlify-cms) - Oh, did we mention that Netlify has a CMS? It's what all our content (this article included) is written on. It's Markdown-friendly, allows for drag-and-drop of images and videos and more. It's in beta, but is open source, free to use and can be easily installed for use with Jekyll, Roots, Hexo and Pelican. If you are interested, you can test it out [here](https://cms.netlify.com).

**3. There's no way for users to interact with my content!**

Some people seem to think that sites built with static tools aren't interactive. They are informative, but you aren't going to build up a community around your site. Those people are dead wrong. With APIs, you can add just about any functionality you desire to your site.

Social sharing can be done with APIs from [Shareaholic](https://shareaholic.com/api) or [ShareThis](https://developer.sharethis.com). If you want to add comments, you can't go wrong with [Disqus](https://disqus.com/api/docs/) or [LiveFyre](http://answers.livefyre.com/developers). If you have something else in mind, a great place to start is [{API}Search](http://apis.io/). Why do the heavy lifting when someone else has already done it for you?

**4. There are too many choices!**

Oh no! How...horrible?!?

There are, admittedly, lots of choices when it comes to finding a static website generator. But that is the beauty of it. In fact, those choices are pruned significantly when you take into account exactly what you--the developer--want from your site, and how you want to make it happen.

First, let's talk about toolsets. While there are many different options, the majority of static site generators fall into three categories (with a fourth coming up strong): JavaScript, Ruby, and Python-based offerings. The popularity of [React](https://facebook.github.io/react/) means there are a handful of newer options built around it, and those will only grow in number. That's in addition to outliers like [Hugo](https://gohugo.io), which is built with Google's Go language. While you may be familiar with all the offerings, you no doubt have one that you prefer, so that narrows the field straight off the bat.

Then it's time to decide what kind of project you are launching. Do you want to create a blog? Well, my friend, you should check out [Jekyll](http://jekyllrb.com/), [Hexo](http://hexo.io/) or [Pelican](http://blog.getpelican.com/). Setting up your portfolio? Try out [Expose](https://github.com/Jack000/Expose) or [Cactus](https://github.com/koenbok/Cactus/). Need to set up a highly polished corporate or marketing site? Creative agencies love [Middleman](https://middlemanapp.com) and [Roots](https://roots.netlify.com/). [Gatsby](https://github.com/gatsbyjs/gatsby) and [Phenomic](https://phenomic.io/), both built with React, give you blogs that function like single page apps. Speaking of single page apps, build one with [Metalsmith](http://www.metalsmith.io/) or [Assemble](http://assemble.io/).

There's no need to be overwhelmed by the possibilities, and if you are, [staticgen.com](http://www.staticgen.com)--a leaderboard of top static web generators--can help you figure out the best tool for your project.

**5. It takes too long to set up!**

Says who? If they are talking about installs, [Hugo](https://gohugo.io) comes as a dependency-free binary file. Most static generators can be installed with one line in the terminal, thanks to npm and ruby gems.

If it's actually getting a site up and running, that's almost as easy. Most tools have a built-in boilerplate framework for projects, and others, like [Brunch](http://brunch.io/), maintain a repository of various skeletons to get you started.

Of course, you can do a deep-dive into your set up with tools like Metalsmith (which describes itself as a set of plugins) or Foundation, tweaking everything to your exact specifications, but that's only necessary if it's what you want. Just a few terminal commands will get you up, running and published.
