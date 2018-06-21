---
author: David Calavera
cmsUserSlug: ''
date: 2016-10-25T00:00:00.000Z
image_style: contained
title: 'Netlify Playground, our first Elm application in production'
image: /img/blog/elm-logo.svg
format: blog
short_title: 'Netlify Playground, our first Elm application in production.'
tags:
  - deploy
  - playground
  - redirects
  - configuration
  - elm-lang
description: >-
  Netlify Playground will help you validate Netlify configuration files to
  deploy them with confidence.
---
Did you know that Netlify allows users to set [redirection rules](https://www.netlify.com/docs/redirects/) and [response headers](https://www.netlify.com/docs/headers-and-basic-auth/) for their sites? We don’t only redirect requests to places you point to, our CDN can act as a proxy for external requests for all sites on Netlify.

Although setting those rules in individual files seems straight forward, it can be hard to know when those rules don’t work and why. Those rules are applied every time you deploy on Netlify, which means that you don’t know if they really work until you put them in production. For a long time, we’ve wanted to give people tools to validate those rules to be able to deploy them with confidence. That’s why we built the [Netlify Playground](https://play.netlify.com).

Netlify Playground is a single page application where people can test configuration rules for their sites. For now, it only supports redirect rules, but we’re planning on extending its features to evaluate response headers and other deploy contexts. We were inspired by Rust’s playground when we built this new application, and we use the same text editor for our playground.

Netlify Playground is also the first [Elm](http://elm-lang.org) application we put in production. We had been looking for a reason to try Elm for a while, and we’ve been greatly pleased with the language. Its strong type system works around all the type pitfalls you can find in Javascript, and its architecture structure is easy to understand for beginners. It also integrates very well with other frontend tools, like Webpack, making it super easy to deploy this application, and any Elm project, on Netlify. We use [Elm Webpack loadder](https://github.com/rtfeldman/elm-webpack-loader) to put the application together, [building on Netlify](https://github.com/netlify/netlify-playground/blob/master/netlify.toml) is just a matter of invoking `webpack`.

We’ve also decided to open source this application. Feel free to leave us [feedback on GitHub](https://github.com/netlify/netlify-playground) and dive into the code if your interested in seen how we use Elm.
