---
title: Adding Algolia DocSearch to Netlify CMS
author: Brian Douglas
image: /img/blog/algolia_1_1.jpg
format: blog
short_title: Algolia's DocSearch
tags:
  - search
description: >
  Adding search to JAMstack sites is a new thing for me but not a new thing for
  Algolia. Algolia is a hosted search tool that provides lightning fast search
  results. I decided to give Algolia a try for our new Netlify CMS documentation
  and discovered their DocSearch solution. 
date: 2017-04-25T22:53:46.000Z
---
The [netlifycms.org](https://netlifycms.org) page has been live for about a month now and launched with a missing feature, the ability to search. 

![netlifycms](/img/blog/Screenshot 2017-04-24 15.24.52.png)

Adding search to JAMstack sites is a new thing for me but not a new thing for Algolia. Algolia is a hosted search tool that provides lightning fast search results. I decided to give Algolia a try for our new Netlify CMS documentation and discovered their DocSearch solution.

![how-do-i-docsearch](/img/blog/Screenshot 2017-04-24 15.28.06.png)

DocSearch started as a way for the Algolia Search team to scratch their own itch, which is providing a truly easy way to add search to documentation. Learning new tools and frameworks can be a challenge when it is unclear how to find what you are looking for. Getting started with DocSearch simply requires you to fill out the two fields on the [community DocSearch](https://community.algolia.com/docsearch/) page. Algolia will do the scraping of your documentation data for you and provide a [script tag](https://github.com/netlify/netlify-cms-www/blob/master/site/layouts/partials/footer.html#L12-L19) that wraps the returned content in a JSON. Once submitted, it took less than 12 hours to complete and return (most of that time, I was sleeping).

![docsearch-form](/img/blog/Screenshot 2017-04-24 15.40.15.png)

I had a great experience integrating the return search script and spent minimal time with my designer to make sure it integrated with our existing design as well. I did have two small issues but got resolutions rather quickly thanks to DocSearch being an open source project supported by Algolia engineers and the community. I was able to get resolutions for issues [#175](https://github.com/algolia/docsearch/issues/175) & [#178](https://github.com/algolia/docsearch/issues/178) in record time.

There are other options for implementing search solutions, but I have found none are as simple as the Algolia's hosted solutions, including our implementation on [netlify.com](https://www.netlify.com/blog/2016/09/22/making-netlifys-website-fully-searchable/) which uses [gulp](http://gulpjs.com/) and [lunar](https://lunrjs.com/). I hope to provide a follow-up post on how we upgraded that to Algolia's [Instant Search](https://community.algolia.com/instantsearch.js/).

I’m proud to say Netlify CMS is onboard with other open-source projects like React, Babel, and Stripe who all use DocSearch as their search solution. I recommend Algolia for all search needs and encourage you to try it out in our new [Netlify CMS](https://www.netlifycms.org) documentation page.


