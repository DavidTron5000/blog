---
title: JAMstack vs Isomorphic Server Side Rendering
author: Brian Douglas
image: /img/blog/jamstack logo.png
format: blog
short_title: JAMstack vs Isomorphic Server-side Rendering
tags:
  - comparison
  - jamstack
  - server-side rendering
description: >
  The JAMstack runs against all that is Isomorphic JavaScript. It encourages the
  separation of code between your client and your API while leveraging the use
  of microservices. At the core, if your site is serving static content, it is
  exposing your site to fewer vulnerabilities. Sites are much more portable when
  not tightly coupled to a server and served from a CDN. 
date: 2017-06-06T17:15:33.000Z
---
The JAMstack runs against all that is Isomorphic JavaScript. The JAMstack pushes for a separation between your client and server code. Allowing different consumers to leverage the API independently; the API shouldn’t decide how its data is consumed. At the core, the JAMstack has [fewer threat vectors](/blog/2017/02/03/why-your-next-site-should-be-built-with-jam/) while serving static content. Sites are also much more portable when not tightly coupled to a server and served from a [CDN](http://www.webopedia.com/TERM/C/CDN.html).

This was a huge benefit when [converting our code base](/blog/2016/07/26/our-conversion-from-angular-to-react/) from Angular to React last summer. Content can still be generated at build-time and requested on demand through APIs while developing a new application in tandem with the current.

## Isomorphic server-side rendering

In recent years, there has been a trend towards isomorphic-rendered applications in the JavaScript community. **Isomorphic** in the context of web development means rendering pages on both the server and client side. This also implies the use of JavaScript and Node.js for the sole purpose of the code re-use of libraries, allowing browser JavaScript code to be run in the Node.js environment with very little modification.

Node.js opened the door to a wide variety of isomorphic-enabled frameworks, including React and Angular, and introduced this exploration of isomorphism in JavaScript. This has been the catalyst fueling development into new JavaScript technologies for server-side rendering.

Isomorphic server-side JavaScript rendering has reached a pinnacle where now companies you have heard of are starting to have the “[should we be isomorphic](https://medium.com/airbnb-engineering/isomorphic-javascript-the-future-of-web-apps-10882b7a2ebc)” conversation. IMHO, this is the wrong approach, and it comes down to using isomorphism to solve the wrong problem.

## You probably don’t need SEO

I usually hear SEO cited as a big reason for server-side rendering. This has always been a problem with client-side JavaScript rendering, mainly because historically, search engine crawlers did not support it. Your site would not show up for search engines due to the initial blank page the crawler sees before the JavaScript kicks in. The infamous Googlebot has actually been executing JavaScript and reading the DOM since early 2015. Bing, who mimics the Googlebot, has not officially announced whether or not this is on their roadmap, but I would not hold your breath on this as Google search discovery should be your main focus anyhow.

[Fetch as Google ](https://support.google.com/webmasters/answer/6066468?hl=en)is a tool to check if Google has found your rendered app. The directions for using this tool are in [Google support](https://support.google.com/webmasters/answer/6066468?hl=en), but before they will work, you need to sign up to access Google's [Search Console](https://www.google.com/webmasters/). Once you get into Fetch as Google, be sure to use the Fetch and Render button to get a visual indication of whether or not Google is seeing your content.

If this is too many steps, Netlify offers [prerendering](https://www.netlify.com/docs/prerendering/) as a 1-click feature. **Prerendering** is a process to preload all elements on the page in preparation for a [web crawler](http://www.googleguide.com/google_works.html) to see it. A prerender service will intercept a page request to see if the user-agent viewing your site is a bot and if so, the prerender middleware will send a pre-cached version of your site with all JavaScript, images, etc. rendered as a static page. If the user-agent is anything but a bot, then everything is loaded as normal, prerendering is used to optimize the experience for bots only.

To better understand this, here is an image:

![prerender-robot](/img/blog/prerender-robot.png)

\*Image courtesy of [Saturday Morning Breakfast Cereal](http://www.smbc-comics.com/?id=2999)

Services like [Prerender.io](https://prerender.io/) uses a headless browser to perform the action of loading all your assets into a static HTML version for the bots to enjoy. This approach allows you to continue to build your site using the latest JavaScript frameworks like React, Ember, and Angular, and not have to rely on a server-rendered solution. Another plus is that you can use this service is free for up to 250 pages and can be self-hosted using the [open sourced code](https://github.com/prerender/prerender) available on GitHub.

Another project worth looking to is [Graphcool’s Prep](https://github.com/graphcool/prep), which provides prerendering that can be setup via the command line and open source as well.

## Render at build time, not at runtime

In order to do server-side rendering correctly, you need not just one but two routers, one for the client and one for the server. You also introduce a level complexity when developing your application that’s not needed in most cases. Every time a new route is created on the client, it needs to be mirrored on the server. In addition to all this, you have to have a server running at all times to provide the benefits needed to perform server-side rendering.

Why wait for pages to build on the fly when you can generate them at build time? In recent years, the cost of hosting static files has dropped tremendously trivial to host. When it comes to minimizing the time to first byte, nothing beats pre-built files served over a CDN. You can move server-side processes into microservice APIs which greatly reduces the surface area for attacks. You can also leverage [service workers to perform caching](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and pre-caching data.

The JAMstack ecosystem provides a number of different options via [static site generators](https://staticgen.com) that render content statically. But if React is needed over everything else, you might also consider the lesser known [renderToStaticMarkup](https://facebook.github.io/react/docs/react-dom-server.html#rendertostaticmarkup). Though this function is not right in all use cases, it is a pretty nice method available in the standard ReactDOMServer and can be called after data is fetched from the API to be rendered at build time. This gives you another way to get a React rendered a static site without the need for server-side rendering.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RfqLD4DqUYo" frameborder="0" allowfullscreen></iframe>

The [Webpack](https://webpack.js.org/) ecosystem provides the [Static Site Generator Plugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin) solution as well to provide a minimal, un-opinionated static site generator directly in your webpack.config. This plugin brings the world of server rendering to your static build process and is the backbone of a few React static generators. You can either provide an array of paths to be rendered, or crawl your site automatically, and a matching set of index.html files will be rendered in your output directory by executing your own custom, webpack-compiled render function. You can read more about this in the project’s [README](https://github.com/markdalgleish/static-site-generator-webpack-plugin/blob/master/README.md).

*Note on Progressive Web Apps (PWA)*

Progressive Web Apps will be mentioned a lot after this point in the article. PWAs are a new way to deliver amazing user experiences on the web and based on there [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) pattern. This is a focus on the minimum time-to-interactivity, maximum caching efficiency, and simplicity of development and deployment.

## Are you really gaining those performance benefits server-side rendering is claiming?

Addy Osmani recently tweeted a new version of the TodoMVC, which is the [Hacker News clone](https://hnpwa.com/). You can view some example projects cloning the Hacker News Progressive Web Apps using a number of technologies while getting optimal performance using the PRPL pattern. I thought this was a great idea and decided to build my own to prove a point about JAMstack vs Isomorphic Server-side Rendering.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Introducing the new <a href="https://t.co/qYKvbv6pFS">https://t.co/qYKvbv6pFS</a>: Hacker News Progressive Web Apps in <a href="https://twitter.com/reactjs">@reactjs</a> <a href="https://twitter.com/preactjs">@preactjs</a> <a href="https://twitter.com/polymer">@polymer</a> <a href="https://twitter.com/vuejs">@vuejs</a> <a href="https://twitter.com/sveltejs">@sveltejs</a> <a href="https://twitter.com/angular">@angular</a> 🔥 <a href="https://t.co/100ql1rdxv">pic.twitter.com/100ql1rdxv</a></p>— Addy Osmani (@addyosmani) <a href="https://twitter.com/addyosmani/status/869238811376590848">May 29, 2017</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I did some testing myself and compared 2 server-side rendered Hacker News apps to my client-side only and the results are below. The data is fetched the same way in all cases through the [Official Hacker News](https://github.com/HackerNews/API) open API. Now consider that these metrics are from sites built by 3 different people using completely techniques, so your mileage may vary. I just am just trying to see if server-side rendering is actually beneficial. Also, please consider that I am not taking into consideration the time for data fetch from the Hacker News API(\~70-80ms), my testing is just focusing on first byte, first connection, and full HTML download. I am not focusing on PWA requirements, though I did include the data since it was nice to look at.

Just for reference, these are the performance numbers for the existing [news.ycombinator.com](https://news.ycombinator.com/) below. I used [testmysite.io](https://testmysite.io/) and [performance.sucuri.net](https://performance.sucuri.net/). These are both great sites for testing how fast your project is delivered to the end user. I also added [Google’s Lighthouse](https://developers.google.com/web/tools/lighthouse/), which has a strong emphasis on PWA, not the gold standard yet but interesting to look at.

![ycom-sucuri-test](/img/blog/ycom-sucuri.png)
![ycom-testmysiteio](/img/blog/ycom-test.png)
![ycom-lighouse-perf](/img/blog/ycom-lighthouse-perf.png)

I am not sure of how Hacker News is built, and for this argument, I can assume they are not using JAMstack but indeed using a CDN.

**Hacker News clone wth server-side rendering**([site](https://next-news.now.sh/), [code](https://github.com/now-examples/next-news)):

This is a Hacker News clone using a boilerplate:

![next-sucuri-test](/img/blog/next-sucuri.png)
![nest-testmysiteio](/img/blog/next-test.png)
![next-lighthouse-perf](/img/blog/next-lighthouse-perf.png)

It appears that this clone of Hacker News is not performing well outside the US. This is not due to the code itself but actually, the CDN not being global-ready. I am sure switching that will improve the TTFB. I also notice the full download of the HTML is a bit long,  most likely due to the initial round trip to the server to fetch the rendered HTML. This is a downside to server-side rendering—a lot of optimization is needed to improve that TTFB. On the contrary this site performs really with the lighthouse performance score, show

**PWA Hacker News clone with server-side rendering **([site](https://react-hn.appspot.com), [code](https://github.com/insin/react-hn)): This is a server-side rendered application. I did notice there are a few [commits](https://github.com/insin/react-hn/commits?author=addyosmani) from Addy himself improving on the PWA aspect of the project to make this site PWA compatible.

![reacthn-sucuri](/img/blog/reacthn-sucuri.png)
![reacthn-testmysiteio](/img/blog/reacthn-test.png)
![reacthn-sucuri-perf](/img/blog/reacthn-lighthouse-perf.png)

This page is also clearly on a global CDN and checks all the boxes for performance in regards to the TTFB. There is not much bad to say about this setup, some of the techniques use for caching are pretty cool to look at.

\*Disclosure: I mentioned above all the sites were using the same API and this site is not when the service work is caching the content. They are using a clever work around getting past a slow initial connection. You can read up on that here in this [merged commit](https://github.com/insin/react-hn/commit/f05849d003719279ec760b054bde1fef38ee7f48), I  plan to study this technique in the near future.

**Client-side only Hacker News clone with no server-side rendering **([site](http://engraver-sonya-32257.netlify.com/), [code)](https://github.com/bdougie/pwa-hn-app): This is my Hacker News clone. I pulled most of the code from [this repo](https://github.com/alvarowolfx/react-hacker-news) and made very few changes. I am also not taking advantage of any prefetching with service workers, but just relying on Netlify’s CDN and what comes standard from the new [create-pwa-app](https://github.com/jeffposnick/create-react-pwa) CLI.

![hnjam-sucuri](/img/blog/hnjam-sucuri.png)
![hnjam-testmysiteio](/img/blog/hnjam-testmysite.png)
![hnjam-lighthouse-perf](/img/blog/hnjam-lighouse-perf.png)

Just looking at the numbers, hosting a JAMstack site on a CDN gets you the best time to the first byte even without consideration for isomorphic rendering. As mentioned above I have plans to improve my Google Lighthouse score by including some of the tricks used in the React-HN app above, but for now, I think this performance will suffice.

It is clear that with little effort and leaving out the consideration to server render anything, I was able to get a site that performs better than most just about as good as the best. This is because I have access to a global CDN that serves content much faster when the request is coming from the same place of origin as the server. If you are not familiar with how CDNs work, I highly recommend this post on the [Optimizing Your CDN Strategy for the Ever-Changing Online World](/blog/2017/05/10/optimizing-your-cdn-strategy-for-the-ever-changing-online-world/).

I also noticed, while improving my Lighthouse score for the PWA rating, my performance went up 4 points on that scale just by complying with Best Practices and [optimizing attributes](https://github.com/bdougie/pwa-hn-app/commit/538afe73a0b6b72637de42a5c1b45ca1b144083e).

## How are much are you paying to keep that server running?

The biggest benefit to choosing JAMstack over server-side rendering is hands down the cost. I mentioned above that you will not lose out on revenue with missed SEO because there are a number of ways to test that the Googlebots can see your site. But what is the point of saving on SEO cost when you are spending to keep servers running?

![jam-rules](https://d2mxuefqeaa7sj.cloudfront.net/s_334A198E239FDD838D93D78766B9E5919FC07EA3EE8B640EC53DE743CCA3E463_1496262014534_Screenshot\+2017-05-31\+13.19.45.png)

When your deployment amounts to a stack of files that can be served anywhere, scaling is a matter of serving those files in more places. CDNs are perfect for this and often include scaling in all of their plans. Most CDNs, including Netlify, can offer this for free or for pennies on the dollar.

Stop paying for seconds used or bandwidth—switch to a model where you can ship without pulling out the abacus.

## What if I really need Isomorphism?

There have been a few companies I know, like [Pinterest](https://medium.com/@Pinterest_Engineering/how-we-switched-our-template-rendering-engine-to-react-a799a3d540b0) and [Eventbrite](https://www.youtube.com/watch?v=_bfZHCSkT3Q), who recently made the switch to React and server-side rendering their Python applications. The talks always leave me baffled by the complexity of a task like this, again not something everybody needs, but what if I told you can put isomorphism and JAMstack all in the same cake batter?

I highly recommend Phil Hawksworth’s talk on achieving Easy Isomorphic Rendering on the JAMstack. He breaks downs his needs for maintaining a cost-effective solution with fewer points of failure.

<iframe width="560" height="315" src="https://www.youtube.com/embed/lRg99MH6rhw" frameborder="0" allowfullscreen></iframe>

## Summary

One company to follow on this subject is Twitter. They originally got on the JavaScript only client-side application train early in 2010, and reverted all that back to a Full-Stack Server-rendered app in 2012, citing the need to reduce the time to first tweet([documented here](https://blog.twitter.com/engineering/en_us/a/2012/improving-performance-on-twittercom.html)).

Twitter is a Global company focused on providing the best experience to all users worldwide and which is why 5 years later that released [Twitter-lite](https://blog.twitter.com/en_us/topics/product/2017/introducing-twitter-lite.html), a progressive web app with absolutely no server-side rendering. The focus is on time to first interaction and getting the first tweet on the screen as soon as possible no matter how slow the network.

![twitter-lite-screenshot](https://d2mxuefqeaa7sj.cloudfront.net/s_334A198E239FDD838D93D78766B9E5919FC07EA3EE8B640EC53DE743CCA3E463_1496338755462_Screenshot\+2017-06-01\+10.39.00.png)

In Nicolas Gallagher’s [React Europe talk](https://www.youtube.com/watch?v=cc3rdiXl5eY) he mentions that most users of Twitter are repeat visitors and user a PWA enabled browser that leverage the browser cache and does need a running server to deliver content.

Though isomorphic server-side rendering is a popular choice, but it might not be the right choice for you. Be sure you are solving the right problems and getting the best speed, performance, and lowest cost for your site. With the JAMstack you have the chance for all three of those being met. Consider moving towards a PWA to get  better results without the need of an always-on server and be sure to consider whether or not you actually need server-side rendering, you might benefit more from the JAM.




