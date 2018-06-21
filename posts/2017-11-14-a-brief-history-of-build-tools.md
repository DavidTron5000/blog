---
title: A brief history of build tools
author: Brian Douglas
tweet: >-
  Build tools assist in the deployment of your project. Find out where these
  tools came from and why they are an integral part of modern web development
  today.
image: /img/press/logos/logomark-light.png
short_title: A brief history of build tools
tags:
  - build tools
  - webpack
  - static
format: blog
description: >
  At Netlify we ask our users to leverage build tools so we may assist in the
  deployment of your project and this post will provide the context of what we
  actually mean by this. These tools package your project into a bundle that’s
  ready for deployment. They not only create a production-grade bundle for your
  site, they also provide scriptable ways to enhance those bundles into smaller
  modules for lazy loading and optimizations of speed.  
date: 2017-11-20T21:57:57.000Z
draft: false
---
## What is a build tool?

Build tools make modern web frameworks like React and Angular more approachable by simplifying the process through bundling. The dynamic JavaScript version of your site can be transformed into statically-bundled content through the use of build commands. But how exactly do they do it? These tools package your project into a bundle that’s ready for deployment. They not only create a production-grade bundle for your site, they also provide scriptable ways to enhance those bundles into smaller modules for lazy loading and optimizations of speed.  

In 1976 Stuart Feldman was inspired to write [Make](https://en.wikipedia.org/wiki/Make_(software)) after witnessing a coworker unsuccessfully debug a program of he wrote. Feldman created Make to automate the process of building programs through the use of Make config files and automation. 

In recent years, as JavaScript grew into a language that demanded to be taken seriously, old concepts like scripting and build automation similar to Make came along for the ride. You can now inject node (server-side JavaScript) packages using tools like yarn and npm. You can also minify your JavaScript by removing white space using tools like webpack or gulp. These are features that make the packaging of your websites much easier to maintain.

## How did we get here?

In the internet of the 1990s, all content was delivered from a series folders containing HTML and CSS files. JavaScript was optional through the use of script tags. 

![static folder structure](/img/blog/static-folder-structure.png)

These were great days because we didn’t need to have heaps of JavaScript knowledge to render web content. Plus, the web was fast, secure, and could render anywhere you could get a dial-up connection. Years later in the 2000’s, the web got more complicated. Broadband internet brought huge speed improvements and dynamic frameworks like Wordpress and Drupal gave us tons of flexibility and functionality. The amount of JavaScript included on the page grew tremendously; we could no longer rely just on a few JavaScript snippets to get the job done. JavaScript frameworks like [Angular](https://en.wikipedia.org/wiki/AngularJS) introduced better organization into our projects which made wide adoption much easier. 

```
// Angular music player clone folder structure
app
- controllers
  - AlbumCtrl.js
  - CollectionCtrl.js
  - LandingCtrl.js
- services
  - fixtures.js
- pages
  - index.html
- templates
  - album.html
  - collection.html
  - player_bar.html
  - landing.html
```

Angular did a lot to [help with code organization and development speed](http://www.angularjswiki.com/angularjs/history-of-angularjs/) in the early 2010s, natural made project sizes smaller through code reuse, but performance and page speed are still issues. While many of us can navigate these complex web projects with nothing more than an iPhone and an unlimited bandwidth plan, we still risk leaving much of the world behind and ultimately compromising the security and scalability of the web.

We moved from a world where you could FTP an index.html to the cloud to now needing node to deliver a server-rendered experience at all times. Luckily the dream of the 90s is still alive today because build tools are making what was once very complex in static content leveraging dynamically placed script tags. 

That’s where build tools come in, they take our dynamically-rendered content and render it into static assets. Building static assets tremendously improves the speed and size of your site. It also adds an extra layer of security by abstracting the client databases or other sensitive information. Best practices like minification (whitespace removal) and module bundling can now be completed from CLI commands and automated from your build scripts. 

## Build tools are making static relevant again

As websites became more complicated to build, build tools became a necessity to handle that complexity. The original interaction for JavaScript was through the use of script tags. By embedding script tags you can gain access to an array of JavaScript features like triggering animations and manipulating content through DOM manipulation. 

```
<--! index.html -->
  ...
  <script src="/js/jquery-2.2.4.min.js"></script>
  <script src="/js/segment.js"></script>
  <script src="/js/jquery.scrollTo.min.js"></script>
  <script src="/js/jquery.localScroll.min.js"></script>
  <script src="/js/cloudinary-core-shrinkwrap.min.js"></script>
  <script src="/js/modernizr.js"></script>
  <script src="/js/ease.js"></script>
  <script src="/js/mobilemenu.js"></script>
  <script src="/js/jquery.matchHeight.js"></script>
  <script src="/js/prism.js"></script>
  <script src="/js/requestAnimationFramePolyfill.js"></script>
  <script src="/js/equalizeHeights.js"></script>
  <script src="/js/algoliasearch.js"></script>
  <script src="/js/liveSearch.js"></script>
  <script src="/js/clipboard.min.js"></script>
  <script src="/js/interactiveFeatures.js"></script>
  <script src="/app.js"></script>
  </body>
</html>
```

Script tags can become an orchestration nightmare trying to rely too much on the order of which script tags are placed, as well as, whether you loaded the script tag in the <head/> or just above the </body>. The solution for this came from tools like npm, making dependency management much easier through the use of their CDN. You can leverage npm to install JavaScript node modules for use throughout your project and a build tool like webpack to bundle all your JavaScript into a single script tag on your index.html

```
<--! index.html bundled from a build tool -->
  ...
  <script src="/bundle.js"></script>
  </body>
</html>
```

That same JavaScript that got out of hand in frameworks can now be bundled into a static index.html. No matter how complicated the framework or how fancy we get with the JavaScript, the build tool removes the complexity and provides static assets ready for deployments. The build process introduces solutions for making sure the output of your site is optimized to render on any screen and on any connection.

![bundled static](/img/blog/bundled-static.png)

## Where can I learn more?

JavaScript build tools are not all roses and butterfly wings. The rise of build tools drove [JavaScript fatigue](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f), much of which emerged due to the rapid development of JavaScript build tools and frameworks. There are a number of build tools to choose from, some which that have been around for some time and some that are just now making waves. There will no doubt be new ones to come. Research a few to see which one is right for you and be sure to understand the main concepts and feature each one has to offer. 

To get started, I suggest checking informations and examples for tools like, [Gulp](https://gulpjs.com/) or [webpack](https://webpack.js.org/). Both tools have strong communities and do a great job taking large JavaScript applications and bundling them into manageable static content.
