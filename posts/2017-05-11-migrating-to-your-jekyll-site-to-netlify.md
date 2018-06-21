---
title: Migrating your Jekyll site to Netlify
author: Brian Douglas
image: /img/blog/jekyll.png
short_title: Migrating your Jekyll site to Netlify
tags:
  - jekyll
  - how-to
  - tutorial
format: blog
description: |+
  Move your Jekyll site from GitHub Pages to Netlify in just a few steps!

date: 2017-05-11T13:51:41.196Z
draft: false
---
**This guide was most recently updated on Thu, Dec 7th, 2017. Below are the package versions used:**
```
Ruby: 2.4.2

Jekyll: 3.5.2

Note: screenshots may be outdated.
```

This post will cover how to move your Jekyll site from GitHub Pages to Netlify in just a few steps.

If you have generated your Jekyll site using GitHub pages or forked a template there is a good chance you do not have a Gemfile. This is because GitHub pages will infer dependencies for you. If you would like to build your project outside of GitHub a Gemfile is needed and simple to create.

In your GitHub repo create a new file with the name `Gemfile` and add the following content to it:

    source "https://rubygems.org"
    
    gem 'jekyll', '~> 3.5.2'

Since Netlify also needs to know what version of Ruby to run, put your version string in a file called `/.ruby-version` and we'll use that version! If you don't know, use version `2.4.2`.

Once you have a Gemfile and a .ruby-version file, you can now connect your site to Netlify without issue.

[Adding a new site with Git](https://app.netlify.com/start) is not a requirement for adding a site, but it’s strongly recommend to take advantage of all of Netlify's continuous deployment features.

![connect-git](/img/blog/Screenshot 2017-05-11 07.10.17.png)

Once your site is connected, you can find your Repository from the list GitHub repos. There is also a convenient search box in case you have more repositories than the page can fit.

![repo-search](/img/blog/Screenshot 2017-05-11 07.10.39.png)

Finally, you will just need to add the Jekyll build command and build location. For Jekyll that is `jekyll build` for the command and `_site` for the location.

![build-settings](/img/blog/Screenshot 2017-05-11 07.10.04.png)

You now have your Jekyll site on Netlify and can take advantage of some great features, like [deploy previews](https://www.youtube.com/watch?v=s_4UL9oAcVE) and free [custom domains](https://www.netlify.com/docs/custom-domains/) with [SSL](https://www.netlify.com/docs/ssl/).

[This article](https://www.netlify.com/blog/2017/01/31/best-practices-getting-started-with-netlify/) has a good list of things to configure after you deploy your site.

If you made it this far and do not have a Jekyll site to try this out with, you can try out [my Jekyll template](https://app.netlify.com/start/deploy?repository=https://github.com/bdougie/portfolio-template).
