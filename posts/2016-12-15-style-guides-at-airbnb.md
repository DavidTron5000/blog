---
format: podcast
episodenumber: 6
author: Brian Douglas
audiolink: https://media.blubrry.com/heavybit/p/d3aeja1uqhkije.cloudfront.net/podcasts/jamstack-radio/20160907-jamstack-radio-005.mp3
date: 2016-12-16T10:55:47-08:00
short_title: Style Guides at Airbnb
title: Style Guides at Airbnb
tags:
  - jamstack
  - podcast
  - airbnb
  - eslint
image: /img/blog/jamstack.png
guests:
  - name: Harrison Shoff
    bio: >-
      Harrison has been a Front-End Engineer for Airbnb since 2010 where he
      helped build developer-based projects including airbnb.io. Shoff currently
      works on the People & Culture team where he uses technology to strengthen
      employee connections throughout the Airbnb workplace.
minuteslong: 28
description: >-
  In the sixth episode of JAMstack Radio, Netlify’s Brian Douglas and Cassandra
  Salisbury are joined by Airbnb Frontend Engineer Harrison Shoff for a
  discussion on linters, what makes for a good style guide and why they are so
  important for growing engineering teams.
---

I have been working programming professional for about 3 years now and
only been working in JavaScript for half that time. So when I made the
jump into the JavaScript ecosystem I needed help keepting my syntax consistent, which is how
I stumbled upon the [Airbnb Style Guide](http://airbnb.io/javascript/).

```js
// excerpt from the Airbnb style guide.

// bad
const items = new Array();

// good
const items = [];
```

I chat with Harrison about what makes for a good style guide and why they are so
important for growing engineering teams.

*After the recording of this episode we created a eslint-config-plugin that uses Airbnb's style guide as the backbone. Check it out on
[GitHub](https://github.com/netlify/eslint-config-netlify) and let us
know what you think.*
