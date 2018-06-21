---

title: Our conversion from Angular to React
author: Brian Douglas
image: /img/blog/pokemon-dance.gif
format: blog
short_title: Netlify's conversion to React
description: We quietly shipped our new React UI and it went relatively unnoticed
thumbnail: thumbnails/raising-both-hands-in-celebration.png
cmsUserSlug: ""
date: 2016-07-26
tags:
  - react
  - angular
  - popular
---

Did you notice we switched all our code from Angular to React last week?

_*This the first post of 3 part series on how we converted on site to React._

Angular has gained a large amount of popularity in the JavaScript
ecosystem in the last few years. The original version of Netlify.com was
actually released as an Angular 1.3 app. Angular has gone through a number of
changes in the last year including the release of a new Angular 2.0, which was quite
different from the version we were using. We made the decision internaly to try React rather than attempt the migration path towards Angular 2.

## Why React?
It's no secret that React has dominated the JavaScript framework conversation in the past year. React itself is a library that enables developers to work with individual components. React also brings into light ideas that haven't been popular for awhile, like markup with JSX.

At Netlify we have already noticed a benefit in development time and design collaborations, thanks to React.

```js
// jsx sample

render() {
  return (
    <Form>
      <FormRow>
        <FormLabel />
        <FormInput />
      </FormRow>
    </Form>
  );
)
```
We unveiled our newly converted React UI **last week** and it went
mostly unnoticed by our users, which is ideal.

This is the first time I have personally been on a team that has successful
converted towards a new framework and here are steps we took to be successful
with that.

## 1. Don’t Attempt Until Ready
If you are considering converting your code from Angular to React, I recommend
you to wait until you are ready to slow down development. Remember - you'll need to
convert large amounts of code. This means no further upgrades to features
and prioritizing bug fixes until the conversion is complete.

For a few months we rolled out some new features, including <a href="/blog/2016/07/18/shiny-slack-notifications-from-netlify/">Slack
Notifications</a> and <a href="/blog/2016/07/20/introducing-deploy-previews-in-netlify/">Deploy Previews</a>, but
only on the new React app. We were able to do this because we hid our new React
UI behind an subdomain, which allowed us to constantly test out the UI in
production without affecting the current user base.

The main thing that helped us during this transition is creating our app with the JAM
stack philosophy (no more servers, host all your front-end on a CDN and use APIs
    for any moving parts). The functionality of our API never changed and
allowed us to iterate on the UI while still staying open for business.

## 2. We Started New
The Netlify API is mature enough that it gave us the ability to start a brand new repo with brand new code.

The idea of updating code inline with your current repo is not ideal, so we avoided that all together. Nothing is scarier than using cutting edge technology while trying figure out bugs in different frameworks and syntaxes.

We were also able to grant access to specific users for testing out the new UI and receive immediate feedback on new changes and features without the worry of sending new bugs to production. This enabled us to really think through some changes and take advantage and change things we really didn’t like in the Angular app (i.e. the new [Sign Up flow](https://app.netlify.com/signup)).

## 3. Invest in Learning
Set some time to not write code and just learn React. The library is generally small but ecosystem comes with the requirement to learn all, but not limited to Webpack, Mocha, Redux, etc.

Netlify even opted to send some of our developers to [ReactJS training](https://reactjs-training.com/). In addtition to training we even hired the author of [Pro React](http://www.apress.com/9781484212615) during the transition to React. Investing in knowledge helped save us from some new code spaghetti and gave us the confindence to work in a new framework.

## So What’s New?
There are some more small changes we will be rolling out in the next few weeks that we are excited to announce, now that we have completed this upgrade.

Netlify is still the same place where you can deploy modern static websites with continuous deployment from a single click. Stay tuned for more posts on more specific new features and how we approached this conversion in code. Though this seems like a near perfect transition, there might be bugs hidden in the walls of our new app. If you see something, say something -- If you find a bug please report it in the platform.

Find out how to convert your <a href="/blog/2016/07/27/our-conversion-from-angular-to-react-part-2">Angular Controllers to React Components</a>
