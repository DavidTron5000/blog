---
title: Netlify CMS 0.5.0 released
author: Cassandra Salisbury
image: /img/blog/avatar-cms@2x.png
short_title: Netlify CMS 0.5.0
tags:
  - Netlify cms
format: blog
description: >-
  We are well on our way to 1.0. Learn the progress this open source project has
  been making and where you could help!
date: 2017-10-12T15:55:23.746Z
draft: false
---
Yesterday was a public, bi-weekly development [planning session](https://www.eventbrite.com/e/netlify-cms-planning-session-bi-weekly-tickets-35794058994) for Netlify CMS, an open source content management system for static site generators. 

In my [previous post](https://www.netlify.com/blog/2017/09/28/netlify-cms-planning-working-in-sprints/), I walked through how Netlify CMS is working in sprints to get to 1.0 in December of this year. The hope is to provide better visibility, easier access for new contributors, and clear outlines of where the project is going throughout the sprint process. 

Here's an update on what was completed in the last sprint, including the release of 0.5.0, and what's planned for the next sprint. I've added quotes from project lead, Shawn Erquhart, on why these issues were prioritized.

## Release 0.5.0

**New markdown editor**

→ _The old markdown editor used multiple, unrelated parsers for going between markdown, the editor, and the HTML preview, and reliability issues had been piling up. The new editor is built on [Slate](https://docs.slatejs.org/) and the [Unified](https://unifiedjs.github.io/) ecosystem (a.k.a [Remark](http://remark.js.org/) and friends), and brings major improvements in reliability, performance, and future growth potential. - Shawn_

* [PR 254](https://github.com/netlify/netlify-cms/pull/254) - Migrate editor to Slate backed by Unified
* [ISSUE 575](https://github.com/netlify/netlify-cms/issues/575) - Markdown editor fast fixes - 0.5.0 beta. 
* [ISSUE 436](https://github.com/netlify/netlify-cms/issues/436) - Editor scrolls to the top with every stroke under certain conditions.

**Upgraded slug handling**

→ _Our slugs didn't handle non-standard characters well in general, updated slug creation is based on URI/IRI spec research by one of our amazing maintainers, Caleb ([@tech4him1](https://github.com/tech4him1)) and allows much more robust and generally compatible slug handling. - Shawn_

* [ISSUE 607](https://github.com/netlify/netlify-cms/issues/607) - Switch to a smaller slugifier.
* [PR 640](https://github.com/netlify/netlify-cms/pull/640) - Support Unicode characters in slugs.

**Git Gateway support**

→ _Git gateway/Netlify Identity support fills a much needed gap - it allows Netlify CMS implementors to use Netlify's platform to enable email/password login and user management for the CMS, rather than requiring all users to log in with GitHub. This is a big improvement for teams of editors that are non-technical, or that don't have GitHub accounts. - Shawn_

* [PR 580](https://github.com/netlify/netlify-cms/pull/580) - Authentication with Netlify Identity and Git Gateway
* [PR 639](https://github.com/netlify/netlify-cms/pull/639) - Re-write Quick Start with Identity/Git Gateway
* [PR 672](https://github.com/netlify/netlify-cms/pull/672) - Add cachebuster to git-gateway API calls.
* [PR 626](https://github.com/netlify/netlify-cms/pull/626) - Update Test Drive docs with Identity.

## The Next Sprint

There's still a long[ road to 1.0](https://github.com/netlify/netlify-cms/milestone/1)! Here are the top priorities for the next two week sprint. 

1. Complete Sprint 2 work - merge media library and CSS migration.
2. Release 0.6.0  with more dependency upgrades, bugfixes and the media library.
3. Implement Global navigation and the Collections UI.

You can see more about this sprint on [our project board](https://github.com/netlify/netlify-cms/projects/5).

If you'd like to get involved, here are a few issues we need help with on our next sprint. They also have the[ Hacktoberfest label](https://www.netlify.com/blog/2017/10/03/how-to-get-involved-in-hacktoberfest/) and are great for new contributors!

* [ISSUE 286](https://github.com/netlify/netlify-cms/issues/286) - Prompt to save unsaved changes on browser close.
* [ISSUE 317](https://github.com/netlify/netlify-cms/issues/317) - Entries with .markdown extension don't work.
* [ISSUE 529](https://github.com/netlify/netlify-cms/issues/529) - Datetime widget format is not respected.

And so many [more...](https://github.com/netlify/netlify-cms/projects/5)

We'd love to hear from you! Feel free to [join our Gitter channel](https://gitter.im/netlify/NetlifyCMS) or show up for our next [planning session](https://www.eventbrite.com/e/netlify-cms-planning-session-bi-weekly-tickets-35794058994).
