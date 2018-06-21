---

title: Netlify News No. 3
author: Christian Bach
image: /img/blog/summer-vintage.jpg
format: blog
short_title: Our Third Newsletter
description: "Form handling, open-sourced build image and much more!"
thumbnail: /img/posts/thumbnails/newsletter-3.jpg
date: 2015-06-02
tags:
  - netlify
  - news
  - builds
  - forms
  - static web tech
  - meetup
  - video
  - prerendering
---

Hi everyone

Summer is here (or should be) and we’re celebrating that with a quick recap of what’s new at Netlify, the premium hosting service for modern static websites.

 **Form handling**

First of all we’ve added built-in form handling as you may have known it from Bitballoon.

Just add a "netlify" attribute to any HTML form and we'll start processing it. You can setup email, slack or webhook notifications from the admin panel!

<!-- excerpt -->

Read all about it [here](http://netlify.us2.list-manage1.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=2900a67c30&amp;e=c456464faf)

 **Prerender**

Next up. While Google has gotten better at crawling JavaScript, you'll still need a prerender service if you're running a large content driven single page app that needs to be indexed.

 Which is why we are excited to announce that Netlify now integrates with various prerender services for single page apps!

 With Netlify's prerender service, requests from crawlers get sent straight from our CDN nodes to your prerender backend of choice. In our initial tests we've seen very fast response time to search engines from the combination of Netlify and prerender.io, which is really important since slow response times will hurt your ranking in Google.

 **Open-Source Build Image**

Netlify uses a Docker container to isolate your builds and guarantee a clean build environment when we run your build tools.

 We’ve open-sourced our official Docker build image at [https://github.com/netlify/build-image](https://github.com/netlify/build-image) :)

 **Specify your ruby / node version**

Locking down the exact version of all your dependencies is really important if you want to guarantee reliable builds. Now Netlify enables you to lock down the exact version of the programming language used to build your site!

 If you're using Ruby, just add a .ruby-version file to the root of your repository with the version of Ruby you're using. We currently only support version 2.1.2 and 2.2.1, but we'll add more versions to our [build image](http://netlify.us2.list-manage.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=87b38a4e88&amp;e=c456464faf) on request.

 If you're using Node, you can control the version of Node with an .nvmrc file with the version number. We currently support 0.10.29, 0.10.36 and 0.12.2. More versions can be made available by request!

 Lastly don’t forget that if you want to know more about static websites, you can see Matt giving a great intro speech on the subject matter right here; [www.staticwebtech.com](http://netlify.us2.list-manage2.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=73bf6cbdf5&amp;e=c456464faf)

 All for now.

May all your websites enjoy ultra performance.

 Best regards

 Matt &amp; Chris from Netlify
