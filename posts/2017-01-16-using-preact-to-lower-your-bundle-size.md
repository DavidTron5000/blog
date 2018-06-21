---
title: Exploring Preact with React
author: Brian Douglas
image: /img/blog/preact-logo.png
format: blog
short_title: Using Preact with React
description: >-
  Progressive Web Apps have everyone interested in improving React's performance
  and footprint.
date: 2017-01-26T18:46:46.000Z
---

The new [Progressive Web App classification](https://developers.google.com/web/progressive-web-apps/) has everyone interested in their bundle sizes. I create apps using the create-react-app CLI all the time, because I don’t want to have to think about configuration and set up when starting a new app. My choice for convention over configuration has now got me considering the trade-offs, the create-react-app CLI is enough to build an application quickly but is is also necessary to have a fast and reliable application that loads on 2G networks.

My trade-off has me considering options in my configuration to improve my webpack config for a better bundle size, however I've also considered the need to use *all* of React. Starting a create-react-app already starts you at 45KB, without Redux, or react-router. Knowing this I have been researching using Preact as a smaller alternative.

## What is Preact?

Preact is a 3KB alternative to native React. This is accomplished mostly in part to [lightening up](https://github.com/developit/preact/wiki/Differences-to-React) the original React API and removing the [Synthetic Events](https://facebook.github.io/react/docs/events.html), [PropType](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) validations, and the ability call [React.Children](https://facebook.github.io/react/docs/react-api.html#react.children). React provides an optional add-on called, [preact-compat](https://github.com/developit/preact-compat) if any of the before mentioned features are needed.

## Set up Preact

Setting up Preact is simple and only requires a few steps, first of which is installing Preact via npm (of course you can use yarn as well).

    npm i preact preact-compat

If you are adding Preact to an existing library, you will need to add preact-compat, which includes the bare minimum to mirror the ReactDOM. This comes with some weight and will increase the original Preact 3KB bundle by an additional 2KB (total 5KB).

You will also need to add a Preact alias to your webpack, basically stating everywhere you are importing React, you are actually importing Preact. This is some clever trickery and works rather well.

    // webpack.config.js

    resolve: {
      alias: {
        "react":"preact-compat",
        "react-dom":"preact-compat"
      }
    }

## Compare bundle sizes with Preact

Starting an app with create-react-app already starts you at 45.91KB, React by itself is 39KB. I personally checked out the [netlify-ui](https://app.netlify.com/) and it is **5.31MB** w/Preact added it is **4.6MB** — that’s a significant decrease!

*As of January 2017, we have not switched to Preact, but it is tempting.*

## Performance

Performance is a weird moving target, so I only picked one metric to compare the Netlify application and that was the [Perceptual Speed Index (PSI).](https://www.instartlogic.com/blog/perceptual-speed-index-psi-measuring-above-fold-visual-performance-web-pages) Using the [lighthouse tool](https://developers.google.com/web/tools/lighthouse/), I was able to the Netlify React application’s PSI from almost **5800ms** to the Preact’s **301ms**.

## Preact trade-offs

To keep the bundle size small, there are obvious things missing like ReactCSStransitionGroup (note: [there is a fix](https://github.com/developit/preact-compat/issues/14) for this).

It is also fair to consider that Preact is an offshoot of the main React project and not managed by any of Facebook's open source groups. Preact is an open source project that needs to keep up with changes with React and there is a chance it may not be able to do that consistently. With that being said, you can always drop into the repository on GitHub to help keep the project up to date.

Facebook is also actively working on the [Fiber](https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber) update, which is a project to make React a lower level API as an effort to removed the cruft and decrease its build size. You can keep track of that project at [isfiberreadyyet.com](http://isfiberreadyyet.com/).

## Try it today

With that being said Preact gives you a lot of quick wins to build a small, fast, web app. Preact also has an [official boilerplate](https://github.com/developit/preact-boilerplate) to help you get started rather quickly, I recommend you consider using it to start your next project on Netlify.
