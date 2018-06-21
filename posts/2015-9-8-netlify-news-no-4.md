---

"title": "Netlify News No. 4"
"author": "Christian Bach"
format: blog
image: /img/blog/overwhelmed-postman.jpg
"short_title": "Our Fourth Newsletter"
"description": "Support for automatic builds with Clojure & Leiningen. Gitlab & self-hosted Git repo support & more."
"thumbnail": "thumbnails/download-1.jpeg"
"cmsUserSlug": ""
"date": 2015-09-08
"tags":
  - netlify
  - news
  - clojure
  - leiningen
  - gitlab
  - git
---

Hi Everyone

Welcome to our fourth newsletter.

Hope you’ve all been enjoying summer. We’ve been keeping real busy.

Lot’s of stuff going on. Working on our CMS. It will support all (!!) static site generators, no matter what programming language they’re written in. We can’t wait to open-source it!

Our hosting service had tons of work done under the hood as well.

Here is a selection of what’s new!

<!-- excerpt -->

## Clojure support

We now support Clojure on our build image and will automatically install and cache dependencies with Leiningen if your repository has a 'project.clj'

Clojure is a really exciting functional programming language running on Java's virtual machine.


## Gitlab and self-hosted Git repositories

As you may know we support continuous deployment straight to both GitHub and Bitbucket: Simply push to Git, and we make sure that your site is automatically updated, code and headers optimised and all.

Now some of you have been asking for GitLab and self-hosted repositories as well. Well you got it!

When setting up continuous deployment from our [CLI tool](http://netlify.us2.list-manage.com/track/click?u=3ca88a0cd26d026e590224d67&amp;id=990c45cb15&amp;e=c4ca3f6603) we now support any public available Git repository, as long as you can setup a webhook and give access to an SSH key.



<br>

We will be back next week, with big CDN news.

Till then, keep smiling.

Have an awesome day.

/Matt & Chris
