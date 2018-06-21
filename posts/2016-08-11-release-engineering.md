---

title: "From Unstable to Reliable: A Release Engineering Journey"
author: Ryan Neal
image: /img/blog/releng-dangerous-meme.png
format: blog
short_title: "A journey in Release Engineering"
description: Release engineering is hard, tedious, and error prone. We help.
thumbnail: thumbnails/releng-dangerous-meme-mini.png
cmsUserSlug: ""
date: 2016-08-11
tags:
- release engineering
- atomic deploys
- features
- caching
- cdn
---

Releasing software is treacherous - let us help.

As the saying goes there are only two real problems in computer science:

    - Naming Things
    - Cache Invalidation
    - Off-by-one errors

Caching keeps the internet from being painfully slow. It’s a requirement of any high performance site, the closer you can get the bits and bytes of a site to the user, the better the experience. And we all know better user experience [directly translates to more dollars](http://radar.oreilly.com/2008/08/radar-theme-web-ops.html). But, you also need to be updating your site (static doesn't really mean *static*), meaning you have to fight those powerful and necessary layers of caching (e.g. browser cache, CDN cache). Good release engineering practices will make sure that you can easily, rapidly, and safely update a site.

At Netlify we think that most people shouldn't think about caching; we’ll do that for you. With that in mind, we built in features that ease the whole release process:

    - atomic deploys
    - asset fingerprinting
    - instant cache invalidation
    - continuous deployment
    - instant rollback

The combination of these features let us give all the performance of a CDN and good release practices without any of the headache of doing it yourself. Good release engineering enables a developer to iterate quickly while operating in a sane and safe environment.

## Globally Consistent Version

In the ancient world of a few years ago, site creators and maintainers would FTP into production machines and modify the assets directly. The changes would be applied directly. It got a little better with some build tools that would log into the actual box for you, but it was fundamentally the same thing. You'd push your resources one at a time. This leads to a scary race condition around the consistency of the site.


    The rule of thumb is to always upload assets then markup.


Imagine you are updating the images on your site; super simple, right? You will have to modify the img tag and upload a new image. Easy. Well, if you modify the tag before you have the image in place you could have a user that gets a broken link. OK fine, just upload the image before the HTML. That works this time, but what about if you have hundreds of images and links? What if you have parts of the site that are no longer linked? This quickly become cumbersome to handle. The rule of thumb is to always upload assets then markup, but that is definitely something better left to a machine.

The more insidious case is that you want to just change the contents of the image, leaving the img tag intact. Here you upload the new image and it all just works, no broken images. But, you don't know what image a user loaded because the uploading takes time. So, if a user in Beijing looks at the site at one point, they might have a very different experience than someone in Australia. This is fine for _an_ image, but what if you need to simultaneously update all the images? You could easily end up in a state where a user gets the page and half the images are wrong. Eek! Your site is full-on broken a that point.

So we said "No more!" Netlify versions each asset according to its SHA1 and then burn that into the markup directly. This means that when asked "What image did they see?" we always know. We do the same with the markup, versioning its content by fingerprinting. By grouping the markup associated with a particular version of the site, we have created a snapshot of the whole site state; we call them deploys. They are very lightweight and let us keep a complete history of the site throughout time.

![](/img/blog/releng-side-by-side.png)

We call this an atomic deploy. Each deploy is a full snapshot of the site. We treat the site holistically, so we know exactly which assets and markup make up the site at any given time. We’re able to coordinate the release of the deploy all at once by following the convention of assets before markup. Removing the race from the race condition let’s Netlify guarantee a consistent version of the site globally.

## History and Rollback

![](/img/blog/releng-rollback.png)

If you’re familiar with git, you’ll recognize the way we structure a deploy. By using a composed tree of SHAs, we can minimize the uploads by uniquing the objects. What it also means is that we can easily store the history of a site.

Full history and atomic deploys gives us the capability to do something pretty amazing - instant rollbacks. We can restore a site to any version in its history in under a second. This dramatically lowers the risk involved in deploying and testing a new version of the site. Make a small typo? A large one? With just a click you can undo that while you fix it offline. Want to go 5 versions back? Same button. By having this safety net of instant rollbacks, you can enable developers to rapidly iterate on the site without fear of bringing down your corner of the web.

All we have to do is invalidate all the caching layers.

## Fighting the Caches

We have a network of nodes that make up our CDN. They cache the results of a request as close to a user as possible. That means that the next request for your site is like Greased Lightning. Not your next request, anyone's next request. However, all this performance comes at a cost - updating the version is difficult.

![](/img/blog/releng-meme.jpg)

In a web request there are a few layers of caching. Closest to the user is the browser cache, it is controlled by [E-Tag and cache control headers](http://dev.mobify.com/blog/beginners-guide-to-http-cache-headers/). By setting these to values which cause no caching, we can make sure that the user doesn't see old assets. Why have this cache layer at all? Well, when you set these headers properly, the browser will do a [conditional get](https://spaces.internet2.edu/display/InCFederation/HTTP+Conditional+GET) - meaning we tell the browser to check in with the origin server and only load assets if necessary. Usually the value won't have changed, and the browser cache will do exactly what it is supposed to. If the value has changed, then we’ll load the correct value.

The next layer is the CDN cache. This has the standard semantics of a cache - delegating cache misses to the origin server and then holding onto the results for as long as possible. The problem arises when you do a deploy; you don't want it to serve the ancient version. To handle this, we wrote some plugins for [ATS](https://trafficserver.apache.org/) that will let us selectively purge and prime the cache. This way, when we have a new deploy, we can clear out the old version across the world in less than a second. By clearing the cache concert with the deploy, we guarantee a consistent version of the site globally.

## Tying it All Together

Atomic deploys and instant cache invalidation really enable rapid iteration. But the real special sauce is in continuous deployment; removing the user from the act of deployment. Pull, branch, push are common verbs when you're working in a VCS, and git is no exception. We’ve tied into that workflow to be constantly rebuilding and deploying the site.

The initial version of this feature was first to build any time a user pushed to the main branch (e.g. master). By pushing to your repo from your terminal you can update the production site seamlessly. The Netlify robots and teacup pigs will then build the site and atomically deploy the new version.

The [next feature we built was one that will build all the different versions of the site](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews). That is to say, it will build any PR or any remote branch. If you have an idea for a change to the site, you can just branch, change and push. We’ll take the site and generate a deploy preview and you can actually see what the change would look like in production. Want to accept a PR but afraid of what it will do to the site? Now there is a link to actually see it live before merging it.

We also let you pin a version and then update on your schedule. You can keep iterating on your main site, but we won’t update the version that is live until you say so. This lets the CI system keep working for you, generating previewable versions, but gives you the control over what your production site looks like.

At Netlify we want to provide a platform that properly handles the release engineering practices that we’ve all craved, but never had the time to build. By tying instant cache invalidation, atomic deploys, and immediate rollback into a continuous delivery platform, we’ve made it possible for developers to rapidly iterate without being afraid of breaking too many things. Netlify empowers developers to focus on the rewarding part of development: actually building their site.
