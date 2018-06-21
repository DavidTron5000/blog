---

title: "Angular to React: Gradual Migration vs Rewrite From Scratch"
image: /img/blog/react-dark-logo.svg
author: Mathias Biilmann
format: blog
short_title: Angular to React
description: "When migrating from Angular to React, should you do a gradual migration vs a complete rewrite?"
date: 2016-10-04T00:00:00.000Z
tags:
  - angular
  - react
  - netlify
---

Arik Fraimovich (creator of the [excellent Redash tool](http://redash.io/)), asked some good questions about our migration from Angular 1 to React (covered in or our 3 part article series on [Converting from Angular to React](https://www.netlify.com/blog/2016/07/26/our-conversion-from-angular-to-react/)) on Twitter:

{{< tweet 782662944685449216 >}}

I made a quick reply on Twitter, but obviously this is a big enough subject that doing a full retrospective on the process definitely doesn't fit in a tweet. So here's a (way) longer series of thoughts on this.

## Why Migrate in the first place?

Lets start with the major point behind this migration: Why did we feel the need to migrate at all?

When we setup to do the rewrite of our web UI, we had just [closed our funding round](https://www.netlify.com/blog/2016/08/16/netlify-raises-2.1m-from-the-founders-of-github-heroku-and-rackspace-cloud/) and started to grow our team. We had (and still have!) a long product roadmap ahead of us that would mean lots of new features added in the web ui, and wanted to make sure we had a really good foundation to build on.

Angular 1 was (and still is) a great framework for quickly getting an MVP live, but never had it strength in terms of enforcing a solid architecture or guaranteeing great performance; and the announcement of Angular 2 essentially killed the future prospects of the framework and dealt a death-blow to the ecosystem around it, so we strongly felt that it would not be a solid based for for our future efforts.

## Why React?

The major alternatives were Ember and React. Angular 2 was still not out of beta and ready for production sites, and apart from that: "fool me once, shame on you, etc...".

Our open-source CMS project, [netlify-cms](https://github.com/netlify/netlify-cms), started out as an Ember project, so I personally had quite a bit of experience with that framework, while I had to do some spikes to experiment with different React project architectures to get a better feel for how that would work out.

As a [fan of functional programming](http://mathias-biilmann.net/posts/2011/10/03/is-haskell-the-cure) I was immediately attracted to the combination of Redux, Immutable.js and React as a stack that potentially makes it much easier to reason about your application.

Ember is a really solid framework and would have been a great base as well, but I think most people building projects in Ember have tried getting into spots where data-bindings, caching layers between the different components and program flow gets really hairy to reason about. The idea of our whole UI being a clear tree where data always flows top down from an immutable data store, was really, really appealing to me, and one of the main reasons we ended up picking React.

The other big reason is the ecosystem. While the speed things move at in the React world can sometimes seem daunting, there's no doubt React has created a vibrant community with a lot of energy and a huge network of contributors.

## Big Rewrite vs Gradual Migration

I've been a fan of Joel Spolsky's [great rant against big rewrites](http://www.joelonsoftware.com/articles/fog0000000069.html) and almost always tend to favor painful gradual migrations over catastrophic "rewrite everything" failures, but to all rules there are exceptions...

Arik shared a [really sensible plan](https://github.com/getredash/redash/issues/1125) for a gradual migration path from Angular to React:

1. Upgrade to Angular 1.5 (we're on 1.2 at the moment...).
2. Switch to using npm and Webpack instead of Bower & Gulp. We can consider using SystemJS, but looks like Webpack is industry standard, so probably better to stick to it.
3. Implement latest style guide -- mainly rewrite all our directives as components, remove controllers, etc.
4. Reduce dependency on Angular specific stuff (angular.module, service, etc) by using regular Javascript modules.
5. ... significant time later ... Rewrite all components as React components 😝 .

Our path could have looked very similar since we were also using Angular 1.2, gulp and bower, but instead we went for the full rewrite against my typical instincts.

Here's our main reasons:

## The Change in Architecture was more important than the Change in Component Style

**Directives** in Angular and **Components** in React have a similar feel to them and in some ways it's not too hard to imagine mostly just switching the view layer from Angular style templates to React style components when doing a rewrite.

However, what really attracted me to the idea of moving to Redux + React had much more to do with making it easier to reason about code, to start making data immutable by default and to get a clear flow of data through the application.

The rewrite started with a ton of work on figuring out the best way to handle things like asynchronous action creators (mainly exploring thunks vs promises vs sagas), how to structure the application (containers vs components), setting up routing and figuring out the ideal structure of our Redux store (handling pagination vs entity maps, etc).

After a few weeks of learning React and Redux in depths as well as building out the architectural base of the app, the next major step was similar to Arik's step 5; Slavishly migrating all the components from Angular to React based templates. This was by far the most time consuming part.

The advantage of the gradual approach would theoretically have been that it would have allowed us to do the most time consuming part of the journey while still doing new work on the application. As it was, all new work had to go into the major release of the new app.

This would have been less nerve wrecking in many ways, but I also think it would have made the transition period where we would be operating in a weird mashup of Angular + React last too long. More gravely, I think it would have made the migration more of decorative change; the existing architecture would be too sticky. We would risk ending up with a more muddled and hard to reason about architecture, than the one we got by fundamentally rethinking how state should flow through our app.

## Decoupling makes rewrites less of a deal

Netlify is built with Netlify and we're taking the [JAMstack](https://jamstack.org) approach to building our apps and sites. This means that our web UI lives in it's own repo and is just a self-standing app talking to different API's (our own API, our streaming endpoint, GitHub, GitLab, Bitbucket, etc).

This decoupled architecture where the web UI is just another API client makes a big rewrite much less of a deal than in Spolsky's famous Netscape example. Just like a micro service based architecture makes it much less of a deal to replace one service with a new one, this approach to UIs also makes it less of a deal to replace one with a new one.

During the whole process we could run the two UIs side by side on different .netlify.com subdomains and we even gave some of our early adopters access to the React UI during the process so they could start testing the new screens as we rolled them out and give feedback.

In a similar wein, right now we're experimenting with an open-api based [golang version of our CLI](https://github.com/netlify/netlifyctl), and obviously there's no risk of building this out alongside our existing node-cli while figuring out if it's a better path to take. We would never consider some kind of gradual migration to go.

With the [JAMstack](https://jamstack.org) architecture the case is exactly the same with changing our web UI. It's just another API client and we can easily run multiple different ones side by side if that makes sense to us...

## It was the right time

While the rewrite was painful and we were getting evermore impatient to launch the features that had gotten stuck behind it and show the world what had been brewing, it also didn't take that long considering the size of the task and the resources dedicated to it.

And considering that this was just at the time where we started to grow Netlify's team, bring on new people, get more hands and eyes on the web UI and accelerate development, it made little sense to have to train anyone new coming in on how to navigate a weird mixture of Angular and React that would no doubt seem hacky off the bat and get us started on a wrong track.

Being able to onboard everybody straight off into a clear Redux + React based architecture that has a logical structure and a clean modern build pipeline was definitively much much better than onboarding everything into a muddled project in the middle of a migration.

## The End Result

Looking back I'm generally really happy with how the rewrite went and where it positions us now.

The redux devtools makes is super easy to understand the application state, webpack + npm is miles ahead of bower and (albeit much more painful to setup) also ahead of ember-cli (broccoli is a great tool, but webpack has gotten ahead simply in terms of traction and ecosystem).

I'm still slightly conflicted on CSS modules. I've been writing CSS in their own files for too long to completely embrace the change without some weird gut-feeling that something's wrong. However,  the power of self-contained pure UI components that never know anything about the global state of the app and that can always be composed however you like, is awesome.

We ended up settling on redux-thunk for our asynchronous action dispatchers like API requests and once we figure out the right pattern for handling things like loading indicators and error messages (they are better handled as component state in the containers than as global state in the redux store), it's been very pleasant and robust (if a little verbose) to work with.

The architecture we have now feels like a great base to build upon and while not as convention driven as Ember, it's still enough of a standard that I would expect any developer with react/redux experience to jump straight into the code and hit the ground running.
