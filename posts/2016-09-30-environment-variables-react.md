---
author: Brian Douglas
cmsUserSlug: ''
format: blog
short_title: Accessing ENV Variables in Webpack
date: 2016-10-04T00:00:00.000Z
thumbnail: null
title: Access Local Environment Variables using Webpack
image: /img/blog/
tags:
  - react
  - jamstack
description: >-
  Building a Frontend JavaScript application in any framework will most like
  have you using a modern build tool like Gulp or Webpack. At Netlify we built
  our application and site dashboard using React as our frontend framework and
  Webpack as our build tool.
---

Building a Frontend JavaScript application in any framework will most like
have you using a modern build tool like Gulp or [Webpack](https://webpack.github.io/).

Netlify allows you to add [environment variables](https://www.netlify.com/docs/continuous-deployment/) to your build so you can define the way your site is built. In addition to the variables you choose to define, Netlify has a number of pre-defined variables saved in our own UI:

![script example](/img/blog/env_variables.png)

The only downside to this UI only approach is that you are unable to access those variables in your local development environment.

At Netlify we built our application and site dashboard using <a href="/blog/2016/07/26/our-conversion-from-angular-to-react/">React</a> as our frontend framework and Webpack as our build tool.

Webpack has a useful plugin called the [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin) and grants the use the ability to storing sensitive information, like secret keys in the Webpack build server.

The DefinePlugin allows you to create global constants which can be configured at compile time. This can be very useful for allowing different behaviour between development builds and production builds. For example, you might use a global constant to determine whether logging takes place; perhaps you perform logging in your development build but not in the production build.

To access these variables for our local environment, we store them in the `[environment_name].config.js` which is simple a JavaScript Object.

```js
module.exports = {
  apiId: "...",
  apiBase: "...",,
  braintreeMerchantId: "...",
  braintreeKey: "...",
};
```

We then load these environment file using Webpack

```
new webpack.DefinePlugin({
  // Dynamically access local environment variables based on the environment
  ENV: JSON.stringify(require(path.join(__dirname, "src", "config", env))),
  "process.env": {
    // defaults the environment to development if not specified
    "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
  }
})
```
We are now able to test our site locally using different variables based on the environment config files, i.e. **development.config.js** or **production.config.js**.

I should note the ability to bypass the need for the Webpack config by passing variables directly through the `npm start` command:

```
npm start NODE_ENV=development
```

We also set the **NODE_ENV** in our production uild script as well.

```js
 "scripts": {
    ...
    "build:prod": "NODE_ENV=production webpack -p --config webpack.config.js",
  },

```

This post provides a brief intro into one plugin Webpack has to
offer, to find out more about Webpack, check out their documentation
or the egghead.io [Webpack intro](https://egghead.io/lessons/javascript-intro-to-webpack).

