---
title: What build tools can do for you
author: Brian Douglas
tweet: >-
  Understanding how to reach build tool enlightenment and the some features they
  provide. 
image: /img/press/logos/logomark-light.png
short_title: Why you should use a build tools
tags:
  - buil tools
  - webpack
  - gulp
  - npm
format: blog
description: >-
  There are build tools like webpack, gulp, and browserify, but no one knows how
  to really use them. The confusion to how these tools work prevents users from
  doing a deep dive and understanding build tools. I am looking answer the why
  behind build tools by revealing the key features you can do with them,
  scripting, automation, and outsourcing build complexity. Understanding these
  will lead to build tool enlightenment and the confidence to manage and create
  your own build scripts.
date: 2017-11-15T21:43:10.000Z
draft: false
---
The rise of modern development practices has brought significant improvements to speed, security, and scalability. It has also made building websites somewhat more complex. The promise of front-end workflow automation tools is stripping away the complexity involved in optimizing your site’s size, speed, and streamlining the management of 3rd party dependencies. These same tools can be incredibly dense and challenging to learn. But there’s hope! Most build tools stem from a few core concepts, and understanding them can give you the confidence to set up and maintain your own site’s build tool and embrace the process. 

## Scripting

There are a number of build tools that focus on improving the scripting and automation of your workflow. Scripts become more powerful with the ability to chain multiple scripts to run one after the other.  One of the more common tools to accomplish this is Gulp, which provides a syntax for running commands synchronously or asynchronously to achieve a goal. Gulp’s true power comes through taking advantage of community-created plugins. For example a Gulp script that includes [gulp-css-scss](https://www.npmjs.com/package/gulp-css-scss) can help automate the process of converting CSS to SCSS at build time. 

```
const cssScss = require('gulp-css-scss');
 
gulp.task('css-scss', () => {
  return gulp.src('my-file.css')
    .pipe(cssScss())
    .pipe(gulp.dest('scss'));
});
```

Some more plugin examples for improving scripting include leveraging Gulp to automate the process of [transpiling](https://teamtreehouse.com/library/what-is-transpiling) the latest features of [ESNext](https://esnext.github.io/esnext/) into JavaScript through the use of the [gulp-babel](https://github.com/babel/gulp-babel) plugin.

Below is an example that uses the [gulp-replace](https://www.npmjs.com/package/gulp-replace) plugin to replace all image paths with a 3rd-party image hosting service.

```
gulp.task("use-cloudinary-images", ["upload-images-to-cloudinary"], function() {
  var cloudinaryURL = "https://res.cloudinary.com/netlify/image/upload/w_auto,c_scale/";

  // replaces paths in build with cloudinary path
  return gulp.src("dist/**/*.{html,css}")
    .pipe(gulpReplace(/\/?img\//g, function(match) {
      return "/img/";
    }))
    .pipe(gulp.dest("dist"));
}); 
```

My Cloudinary image task can now be run as part of my build script and leveraged for my production bundle. 

I can’t talk about scripting without at least mentioning npm as a solution. Though npm is is a package manger, it also comes with a feature to run predefined JavaScript files as scripts. npm is useful for developers looking to run a few commands synchronously. Their new npx feature is even more useful for checking to see if there is a package installed and running as a 1-line script too. 

```
npx netlify-cli deploy
```

I tend to use npm for things that are outside my bundle or more peripheral to the development workflow. For example, I use [eslint](https://eslint.org/) to ensure my code is consistent across all JavaScript files. 

```
// example package.json scripts
scripts: {
  start: "gulp server",
  build: "gulp build",
  lint: "eslint .",
  test: "node test.js --env=jsdom"
}
```

**npm run lint** can be run to ensure linting is enforced from the command line, but I can chain npm scripts together to ensure that my build does not run if linting or testing fails.

```
npm run lint && npm run test && npm run build 
```

## Automation

Once you have a few scripts in your project utility belt, you can try an automation tool like [CircleCi](https://circleci.com/), [Travis](https://travis-ci.com), or [Jenkins](https://jenkins.io/) to run your JavaScript tests using gulp test or npm test. You also might want to run through your site images and replace them with the equivalent version host on Cloudinary as I have shown before, but you don’t want to build locally on your machine.

There are a number of tools that can leverage continuous integration (CI), so when you push to your code to GitHub a build script is started for deployment to your CDN. This is core to what Netlify  provides for you, the automation through scripts that run only in production or deploy previews. You are able to distinguish between deploy preview commands and production commands using our netlify.toml and [deploy contexts](https://jenkins.io/).

```
[build]
  command = "npm run build"
  SECRET_KEY = 123456
  
[context.deploy-preview.environment]
  command = "npm run build-preview"
  DEV_SECRET_KEY = 234567
```

Using this feature, I don’t need change specify keys or builds per environment. 

## Outsourcing Complexity

Build tools and their communities have solved some of the most common problems around optimizations and reducing JavaScript bloat. A developer has the knowledge base of other developers to solve even some of the harder problems like module bundling, tree shaking, minification, and removing duplicated dependencies. No need to solve these problems over and over with hand-rolled [abstract syntax trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST) and complicated bash scripting. Leverage the open sourced code available through plugins and node modules.

**Module Bundling**

Bunde is another term for build and commonly used synonymously. In most cases it refers to module bundling within the context of webpack or rollup. Bundling is the process of taking multiple JavaScript or CSS files and concatenating them into one or multiple chunks. Smaller bundles are preferred over multiple large files because they require fewer resources for hosting and cut down on the look up time to reference JavaScript or CSS. 

In an ideal world, bundled assets would like this:

![clean chunks](/img/blog/clean-chunks.png)

In the real world bundles look like this:

![messy chunks](/img/blog/messy-chunks.png)

There are number of ways to bundle and concatenating files together and it takes a bit of trial and error. If you care to use a common tool with a built-in plugin, take a look at webpack’s [CommonChunksPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to start.

```
// webpack.config.js

entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"
    // (Give the chunk a different name)

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  })
]

// index.html
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

If you prefer not to fiddle, Netlify offers a feature that create bundles for you. This is great if you don’t have the time or you have yet to optimize your own build. This feature is free for all sites and available with a click of few checkboxes in your site settings. 

![asset optimization box](/img/blog/asset-optimization-boxes.png)

This feature will optimize your bundle through the use of concatenation and minification (explained below), but nothing else. In most cases this is all you need, but of course, you can always take it further. 

**Minification**

Minification is a term for the removal of white space, it can also be called Ugliyfing because it is nearly impossible to read. Minification makes your file size smaller and still readable by robots. Removing space is easier than ever now with build tools and usually turned on easily as a option in your build config. 

```
// regular code
function hardcoding() {
  console.log("hello world")
}

// minified
"use strict";function hardcoding(){console.log("hello world")}
```

If you are jealous of the robot’s ability to read minified code, Chrome and other browsers provide the [ability to pretty print](https://developers.google.com/web/tools/chrome-devtools/javascript/pretty-print) the contents of a minified file. 

```
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

**De-duplication**

If I want to display a parsed date in my project I include a the [Moment.js](https://momentjs.com/) library to leverage some of the common date complexities I might run into to. Moment.js is a library that comes up a lot as a large project and takes up a lot of space. Not only is it a large project, it is also used a lot in different projects which can be a concern for de-duplication. Build tools provide assistance in identifying the duplication of libraries and removing that duplication. Similar to minification this is can be activated using a plugin. 

```
// webpack.config.js
module.exports = {
  plugins: [
    ...
    new webpack.optimize.DedupePlugin()  
  ]
}
```

**Tree shaking**

Something really cool about build tools today is the process of tree shaking. Tree shaking is the practice of removing unused or “dead code”. Projects that have a long life can grow in dark places, where no developer wants to go. It is common for the invocation of code to get removed, but the definition of the variable or function to get unknowingly orphaned. The webpack tool has included tree-shaking as a built-in feature. When you build using webpack 2.0 or later it will mark unused code with comments. 

```
// webpack build marking unused function with tree-shaking

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}
```

This arguably doesn’t do much by itself, but if you are using the Uglify plugin, all comments are removed. [Rollup](https://rollupjs.org/#tree-shaking) is another build tool that has this built-in feature, and just works by relying on minifiers to remove dead code. 

```
// Examples setting up tree shaking in webpack.config.js
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
}
```

A nice bonus for including tree shaking is that you can include only the code that you use from libraries. Similar to Moment.js, Lodash is another large library that is included a lot in other projects. Because I am already using tree shaking, I have the confidence that only the find function and no other functions from the library will be included in the bundled version of the example that I lifted straight from the [Lodash documentation](https://lodash.com/docs/4.17.4#find). 

```
// importing only the find function from lodash 
import { find } from 'lodash'

const users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
find(users, function(o) { return o.age < 40; });
```

Look into the [lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin) for to further optimize your webpack + Lodash usage. 

## Now you know, now go forth and build

Now that I have gone through a few of the legitimate reasons for why you should be using a build tool, I hope you have a better understanding that build tools are not meant to add more complexity but rather to remove it. I have barely scratched the surface, as I did not even cover build [compression](https://github.com/webpack-contrib/compression-webpack-plugin), [code transformation](https://github.com/babel/babel-loader), or [polyfills](https://www.npmjs.com/package/webpack-polyfills-plugin). If you are looking for a place to start digging in, checkout this egghead course from Kent C. Dodds - [Using Webpack for Production JavaScript Applications](https://egghead.io/courses/using-webpack-for-production-javascript-applications).
