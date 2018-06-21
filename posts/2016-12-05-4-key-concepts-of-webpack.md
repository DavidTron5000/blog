---
author: Brian Douglas
date: 2017-01-03T15:49:04.000Z
format: blog
short_title: 4 Key Concepts of Webpack
title: 4 Key Concepts of Webpack
image: /img/blog/null
description: >-
  Webpack is JavaScript module bundler that has taken the world by storm, but a
  lack of great docs and wealth of boilerplates have led to many people using
  it, but not understand it.
tags:
  - webpack
---

[Webpack](https://webpack.github.io/) is JavaScript module bundler that has taken the world by storm, but a lack of great docs and wealth of boilerplates have led to many people using it, but not understand it.

Sean T. Larkin from the Webpack core team spoke at a recent [JAMstack SF meetup](https://www.meetup.com/jamstack-sf/events/235162031/) on the subject.

<iframe width="560" height="315" src="https://www.youtube.com/embed/CAAH_ZH5niM" frameborder="0" allowfullscreen></iframe>

Webpack is a static build tool and there are 4 key concepts to understand how it works.

## Entry

Webpack creates a graph of all of your application's dependencies. The starting point of this graph is known as an entry point. The entry point tells Webpack where to start and follows the graph of dependencies to know what to bundle. You can think of your application's entry point as the contextual root or the first file to kick off your app.

In Webpack we define entry points using the entry property in our Webpack configuration object.

The simplest example is seen below:

    // webpack.config.js

    module.exports = {
     entry: './path/to/my/entry/file.js'
    };

## Output

Once you've bundled all of your assets together, we still need to tell Webpack where to bundle our application. The webpack `output` property describes to Webpack how to treat bundled code.

```js
// webpack.config.js

module.exports ={
  entry:'./path/to/my/entry/file.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'my-first-webpack.bundle.js'}};
```

## Loaders

The goal is to have all of the assets in your project to be Webpack's concern and not the browser's. (This doesn't mean that they all have to be bundled together). Webpack treats [every file \(.css, .html, .scss, .jpg, etc.\) as a module](https://webpack.js.org/concepts/modules). However, Webpack only understands JavaScript.

Loaders in webpack_transform these files into modules_as they are added to your dependency graph.

    // webpack.config.js

    const config ={
      entry:'./path/to/my/entry/file.js',
      output:{
        path: path.resolve(__dirname,'dist'),
        filename:'my-first-webpack.bundle.js'},
      module:{
        rules:[{test:/\.(js|jsx)$/, use:'babel-loader'}]}};

## Plugins

Since Loaders only execute transforms on a per-file basis, `plugins` are most commonly used (but not limited to) performing actions and custom functionality on "compilations" or "chunks" of your bundled modules [(and so much more)](https://webpack.js.org/concepts/plugins). The Webpack Plugin system is [extremely powerful and customizable](https://webpack.js.org/api/plugins).

In order to use a plugin, you just need to `require()` it and add it to the `plugins` array. Most plugins are customizable via options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with `new`.

    // webpack.config.js

    const HtmlWebpackPlugin =require('html-webpack-plugin');//installed via npmconst webpack =require('webpack');//to access built-in pluginsconst config ={
      entry:'./path/to/my/entry/file.js',
      output:{
        filename:'my-first-webpack.bundle.js',
        path:'./dist'},
      module:{
        rules:[{test:/\.(js|jsx)$/, use:'babel-loader'}]},
      plugins:[newwebpack.optimize.UglifyJsPlugin(),newHtmlWebpackPlugin({template:'./src/index.html'})]};

    module.exports = config;

Thanks to Sean and the Webpack team for their hard work on the build tool and the recent v2 [documentation](https://webpack.js.org/concepts/) updates.
