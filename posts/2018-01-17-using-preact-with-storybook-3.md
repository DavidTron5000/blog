---
title: Using Preact with Storybook 3
author: Mathias Biilmann
tweet: >-
  We're using both Preact and Storybook 3 over here at Netlify, so @biilmann put
  together a quick tutorial on how to make sure they play nicely together. 
image: /img/press/logos/logomark-light.png
short_title: 'Tutorial: how to use Preact and Storybook 3'
tags:
  - Tutorial
  - React
  - Preact
format: blog
description: >-
  Storybook is built for React, so if you're using Preact you'll need to do a
  bit of configuration to get it going. This tutorial will help you get up and
  running with Storybook 3 and Preact. 
date: '2018-01-17'
draft: false
---
## Using Preact with Storybook 3

[Preact](https://preactjs.com) works wonders for projects where we want the component architecture from React, but need a very small bundle footprint. One good example of this is our [identity-widget](https://identity.netlify.com/). Since it’s an embeddable widget, the full bundle weight of a typical single page application would be way too much and would harm performance on sites using it.

Another library we use heavily at Netlify is [Storybook](https://storybook.js.org). Being able to work on the UI of components in isolation from application state is liberating, and makes it much easier to take things like error paths, validations, and edge cases into account when building and testing UI components. We use it religiously for our [main web app](https://storybook.netlify.com).

Storybook is built for React, however. So what if we wanted to use it for our Preact-based widgets?


![Modal component from Netlify’s Identity widget running in Storybook](https://d2mxuefqeaa7sj.cloudfront.net/s_91C9ECABC188FFB4BB5C0EE98FD298AB39FEE096F0A26D48C52D1B699DF4552C_1516081768647_widget.png)

## Preact / React compatibility

The key to making this work is a library called `preact-compat` that offers a wrapper around Preact that mimics the API of the `react` and `react-dom` libraries.

The way to use it, is to tell webpack to cheat, and import `preact-compat` whenever a file is trying to import either `react` or `react-dom`.

You can read more about `preact-compat` and how to generally use it with webpack in [their documentation](https://www.npmjs.com/package/preact-compat#usage-with-webpack). 

## Getting Storybook to use preact-compat

How do you get webpack set up with this? I’m going to assume you have an existing project based on Preact and webpack, and then show the steps to set up Storybook from scratch.

Start by installing `storybook` and `preact-compat`:


    yarn add -D @storybook/react preact-compat

Once the dependencies are in place, create a `.storybook/config.js` file with the standard storybook config:


    import { configure } from '@storybook/react';
    
    function loadStories() {
      require('../stories/index.js');
      // You can require as many stories as you need.
    }
    
    configure(loadStories, module);

Now you need to extend storybook’s config to use the Preact based loader. Storybook lets you do this by defining a `.storybook/webpack.config.js` file and export an object with overwrites of their base config.

Our goal by customizing the webpack config, is to inject the resolver so `react` and `react-dom` gets replaced with `preact-compat` when building our stories.

To do that, create this file and save it as `.storybook/webpack.config.js`:


    module.exports = {
      resolve: {
        extensions: [".js", "jsx"],
        alias: {
          react: "preact-compat",
          "react-dom": "preact-compat"
        }
      }
    };


## Writing Stories

All that’s left to do now is write stories and run your storybook.

To get started with this, create a file `stories/index.js`:


    import { h } from "preact";
    import { storiesOf } from "@storybook/react";
    
    storiesOf("Storybook With Preact", module)
        .add("render some text", () => <h1>Hello, Preact World!</h1>)

And add a storybook script in the `"``scripts``"` section of your `package.json`:


    "scripts": {
      "storybook": "start-storybook -p 9001 -c .storybook"
    }

Now you can run `yarn storybook` and visit `localhost:9001` to view your Preact based stories.


  
