---
title: How to use split tests to give users access to private features
author: Phil Hawksworth
tweet: >-
  Want to give your site visitors a way to opt-in to the beta of your next cool
  feature? Try this crafty trick using @Netlify's split testing feature.
image: /img/press/logos/logomark-light.png
short_title: Using split testing for beta programs
tags:
  - Features
  - tutorial
format: blog
description: >-
  [Video] Did you know that you can use Netlify's split testing (beta) feature
  to give your users the ability to opt-in to private betas and version of your
  site. 
date: '2018-03-02'
draft: false
---
Netlify's [Split Testing (beta) ](https://www.netlify.com/docs/split-testing/)allows you to direct your site visitors to different versions of your site. It does this invisibly, by shaping the traffic at the CDN level and serving different branches to your visitors without changing the URL.

With just a few clicks you can specify what percentage of your traffic is served by each branch, and Netlify's intelligent CDN will do the rest, including things like _version affinity_ to ensure that repeat visitors are returned to the same version that they were shown previously.

## A handy trick

This ability to ensure that returning users always gain access to the same branch is managed by a simple cookie provided by the CDN. But it also has a useful side effect that you can use to let visitors opt into a new feature or version of your site.

We use this technique at Netlify when trialling new features and running betas.

The short video below shows how to do this, including setting up a split test and providing a UI to allow your site visitors to gain access to your new version.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q5-QTaAOSrY?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

For more information on running split tests and measuring the results, take a look at the [Split Testing documentation](https://www.netlify.com/docs/split-testing/).
