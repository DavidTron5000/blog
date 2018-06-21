---
title: Replacing our search with Algolia
author: Brian Douglas
image: /img/blog/algolia-logo-light.png
short_title: Using Aloglia for search
tags:
  - algolia
  - search
  - hugo
format: blog
description: >-
  Netlify has been using Algolia for search on our public marketing page for a
  few months and we've seen some noticeable improvements.
date: 2017-10-10T17:10:16.000Z
draft: false
---
Almost a year ago we [announced](/blog/2016/09/22/making-netlifys-website-fully-searchable/) that we made the Netlify site fully searchable. We hinted at sharing how we did it and today we are ready to do just that. Let me take some time to unravel this mystery before I explain our search expedition towards [Algolia](https://www.algolia.com/).

## Before

In order to get search working on the [Netlify home page](https://www.netlify.com) we created a [gulp](https://gulpjs.com/) task to index specified pages to a JSON file save to the build directory (dist). After that content is collected it is converted into a PagesIndex.json file and placed into a lunr/js folder inside that build directory.

```
// gulpfile.babel.js

gulp.task("index-site", (cb) => {

  var pagesIndex = [];

  return gulp.src("dist/**/*.html")
    .pipe(reduce(function(memo, content, file, cb) {

      var section      = S(file.path).chompLeft(file.cwd + "/dist").between("/", "/").s,
          title        = S(content).between("<title>", "</title").collapseWhitespace().chompRight(" | Netlify").s,
          pageContent  = S(content).collapseWhitespace().between('search-results">', '<footer class="footer').stripTags().collapseWhitespace().s,
          href         = S(file.path).chompLeft(file.cwd + "/dist").s,
          pageInfo     = new Object(),
          isRestricted = false,
          blacklist    = [
            "/thanks",
            "404"
          ];

        ...

        pageInfo["section"] = section;
        pageInfo["title"]   = title;
        pageInfo["href"]    = href;

        pageInfo["content"] = pageContent;

        pagesIndex.push(pageInfo);
      }

      cb(null, JSON.stringify(pagesIndex));
    }, "{}"))
    .pipe(rename("PagesIndex.json"))
    .pipe(gulp.dest("./dist/js/lunr"));
});
```

The indexed JSON is placed in the build output to be consumed by [lunr.js](https://lunrjs.com/), a Solr like search solution written in JavaScript. This solution made applying search to the JAMstack site very approachable (see the code below). We created a file to handle search queries through a `search` function and leverage lunr's searching to fan through the existing PagesIndex.json and it was great.

```
// liveSearch.js

function initLunr() {
  $.getJSON("/js/lunr/PagesIndex.json").done(function(index) {
    pagesIndex = index;

    lunrIndex = lunr(function() {
      this.field("title", {
          boost: 10
      });
      this.field("content");
      this.ref("href");
    });

    var pagesProcessed = 0;
    pagesIndex.forEach(function(page, index, array) {
      pagesProcessed++;
      lunrIndex.add(page);
    });
  })
}

function search(query) {
  return lunrIndex.search(query).map(function(result) {
    return pagesIndex.filter(function(page) {
      return page.href === result.ref;
    })[0];
  });
}
```

The markup is being render using  [Hugo](http://gohugo.io/), and it gives us the ability to create and use partial HTML files. Below is the [search.html partial](https://github.com/bdougie/kaldi-hugo-search-template/blob/master/site/layouts/partials/search.html) that gets rendered on the page in another [head.html partial](https://github.com/bdougie/kaldi-hugo-search-template/blob/master/site/layouts/partials/head.html#L23).

```
<--! src/layouts/partials/search.html -->

<div id="search-overlay" class="search-overlay">
	<div class="container">
		<input id="search" class="search-input" type="search" placeholder="Type to Search">
		<span id="clear-search" class="clear-search">×</span>
		<span class="search-bar"></span>
		<span class="esc-note">press <strong>ESC</strong> to close</span>
		<div id="results" class="search-results">
		</div>
	</div>
</div>

<--! src/layouts/partials/head.html -->
<body>
  {{ partial "search" . }}
  …
```

![search website](/img/blog/search-website.gif)

This worked well until we started noticing the build size growing with the **1.3MB** PagesIndex.json file. The search index was not the only issue, it seemed unnecessary to host our own search solution after I learned more about the hosted search-as-a-service, Algolia. It is always nice when there is a service that has built a solution for a common problem, alleviating the pain of building and maintaining a custom solution.

The Algolia team joined [episode 15](/blog/2017/06/27/the-out-of-box-search-experience/) of JAMstack Radio, and we chatted about how developers could obtain faster search by using their hosted solution. For example, since we at Netlify had already indexed our own JSON, we could easily send that data to Algolia to host and return search results faster than our own hosted solution. Aside from the potential for faster search speed, there was an obvious clear for removing the large growth of the PagesIndex.json from our build and directly lowering the bundle size.

## Now with Algolia

We are now using Algolia in production for search on the entire Netlify public site. After some light investigation, it seemed trivial to replace the existing lunr.js solution with Algolia.

Algolia has an SDK called [algoliasearch](https://www.npmjs.com/package/algoliasearch) and is available to interact with your Algolia account for sending and receiving indexes. This SDK is available in a wide [range of frameworks and languages](https://www.algolia.com/integrations). Rather than send the results of the local indexing to the `dist/lunr/` directory, I can send that output directly to Algolia. This is what I am doing below in the new **send-index-to-algolia** task.

```
// gulpfile.babel.js

gulp.task("send-index-to-algolia", ["index-site"], function() {
  const index = JSON.parse(fs.readFileSync("./PagesIndex.json", "utf8"));
    return algoliaIndex.addObjects(index);
  }
});
```

Inside liveSearch.js I am now leveraging Algolia instead of lunr.js for searching and using the existing HTML/CSS I already had in place to display the results. To re-iterate this, Algolia does search really well, which is host search index and return filtered results from that really quickly.

```
// liveSearch.js
const algoliaIndex = algolia.initIndex("netlify");

function search(query, downSelected, clearSelected) {
  return algoliaIndex.search(query, function(err, content) {
    renderResults(content.hits, query, downSelected, clearSelected);
  });
}
```

The [netlify.com](https://www.netlify.com/) repository is private, so I added the [gulp indexing](https://github.com/bdougie/kaldi-hugo-search-template/blob/6a5230f9b81e1f876bc41973678b0691f61ab8d1/gulpfile.babel.js#L125-L184) task and [liveSearch.js](https://github.com/bdougie/kaldi-hugo-search-template/blob/master/site/static/js/liveSearch.js) to the [Kaldi template](https://kaldi-algolia.netlify.com/), which you can view using the same gulp index task where you can take a closer look at the code I mentioned above. The site is doing a little bit of jQuery to show and hide the search-overlay and animate.

[![kaldi search example site](/img/blog/kaldi-search.gif)](https://kaldi-algolia.netlify.com/)

Some of the cooler AlgoIia examples use text highlight to enhance search results, which I have plans to do in a similar way.

[![jam-search](/img/blog/jam-search.gif)](https://community.algolia.com/instantsearch.js/examples/media/)

Algolia provides a faster experience by milliseconds and we are living in an age where [Milliseconds Matter](https://blog.algolia.com/). 

Our search results are now returning to the user at less than **10ms** on average. Lunr.js was actually a great solution but comparable with the speed at which Algolia delivers content it was not nearly as fast and lacked the cool features like [Typo-Tolerance ](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/)and [Synonym Matching](https://www.algolia.com/doc/guides/textual-relevance/synonyms/).

The switch to Algolia was trivial and came with other features like search analytics, where I can see the most common searches that return 0 results, a cool metric that lets us know how if there is content that the site is not providing that users expect. I can also see the top searches and now see there is indeed a need for more Hugo content ;)

![search-analytics](/img/blog/search-analytics.png)

If you are interested in trying our Algolia search on a project or simply looking to take a closer look, check out their InstantSearch.js [examples](https://community.algolia.com/instantsearch.js/examples/). You can also clone your own version of our gulp indexing solution with my [Kaldi template to get the full experience](https://app.netlify.com/start/deploy?repository=https://github.com/bdougie/kaldi-hugo-search-template).

Also use the Netlify home page search and let us know what you think!
