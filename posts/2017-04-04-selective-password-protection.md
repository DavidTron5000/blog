---
title: Selective Password Protection
author: Chris McCraw
image: /img/blog/lockedunlocked.jpg
format: blog
short_title: Selective Password Protection
tags:
  - deploys
description: How to set up Password protection for specific deploys
date: 2017-04-07T07:00:00.000Z
---

We recognize that one size does not fit all.  Sometimes you need to password protect some or all of your deploy previews so that curious minds don't get the jump on your new product or announcement.  Let's walk through a way to protect specific deploys on any paid account (password protection is a paid feature).

This example will apply to all deploy previews for branches other than your main branch.  So, we'll still build and deploy the main branch and PR's against it as usual with this configuration. If you need to limit it to just some branches but want others unprotected, you should be able to extrapolate this example but if that is problematic [please contact support](/support) and we can advise further.

You will almost certainly want to adapt this to tooling that you otherwise use (unless you, like me, are a bit old-school and still use make and Makefiles :) )

In this setup, you'll use deploy contexts to perform different behavior on selected deploys, as documented here:

https://www.netlify.com/blog/2016/08/30/introducing-deploy-contexts-in-netlify/

What we're doing:  creating an `_headers` file (see https://www.netlify.com/docs/headers-and-basic-auth for more info) that we will use only for deploy previews on your specified branches.  This will be copied into place for previews (that is, anything not a commit or PR on master), and thereby cause Basic HTTP Authentication to be enforced for the entire site in those previews.

Note that there are 3 different files here.  The `Makefile` directs the build process to do different things depending on which target is selected;  the `netlify.toml` will select the target automatically based on the deploy type (master or not), and the `_headers` (copied into place from someplace it won't be used accidentally on master!) contains the authentication forcing function.

Makefile:

    
    ​production:
        middleman contentful && middleman build
    ​
    deploy_preview:
        middleman contentful && middleman build && cp netlify_headers _site/_headers
    
    
netlify.toml:
    
    [context.production]
      command = "make production"
    [context.branch-deploy]
      command = "make deploy_preview"
    ​
netlify_headers:
    
    /*
            Basic-Auth: login:password
