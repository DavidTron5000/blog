---
title: "A Step-by-Step Guide: Deploying A Static Site or Single-page App"
author: Eli Williamson
image: /img/blog/cdns.png
format: blog
short_title: Deploying A Static Site or Single-page App
description: Make your site blazing fast with this step-by-step guide on how to deploy a static site or single-page app on Netlify.
cmsUserSlug: ""
date: 2016-10-27
tags:
  - deploy
  - static
  - app
  - single-page
  - tutorial
---

Do you have a static site or a single-page app that is slow or vulnerable? (Don't know? Test your site at [testmysite.io](http://testmysite.io).) Lets fix that up with a quick and easy tutorial on how to take these [JAMstack](http://jamstack.org) projects and host them on Netlify (where smart CDNs maintain high-octane speeds and impenetrable security for you).

In this tutorial, we will be reviewing how to set up your existing Github repo on Netlify for continuous deployment (that means all you have to do is push your code and Netlify will do the rest of your publishing tasks for you). If you haven't quite discovered the amazing power of version control with Github you can always drag and drop your static files [here](https://app.netlify.com) (just drop your zipped files in the dashed box).

## Getting started on Netlify

In this section, we will show you how easy it is to launch your site on Netlify. If you are not already a Netlify user, go ahead and sign up for free [here](https://app.netlify.com/signup) first.

### Step 1: Add Your New Site

![step 1 - add](/img/blog/add-new-project.png)

Creating a new site on Netlify is simple. Once you've logged in, you'll be taken to https://app.netlify.com. If you're just starting out, there's only one option, Click the **Add A New Project** button shown above.

### Step 2: Link to Your GitHub (or supported version-control tool of choice)

Clicking "Add A New Project" brings you to this screen:

![step 2 - link](/img/blog/step-2-hugo.png)

Be sure to push your repo to GitHub, so that all we'll need to do is link Netlify to GitHub. Click the **GitHub** button as illustrated in the screenshot above.

### Step 3: Authorize Netlify
![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the **Authorize Application** button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit.

[https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/)

### Step 4: Select Your Repo
![step 4 - repo](https://cloud.githubusercontent.com/assets/6520639/9897552/b9ea7f7c-5bfe-11e5-94a0-f957a7d1986e.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. Select your static site or single-page app.

### Step 5: Configure Your Settings
![step 5 - configure](/img/blog/config-your-repo.png)

Here you can configure your options (if necessary). For example, if we were using the [Victor Hugo](https://github.com/netlify/victor-hugo) boilerplate when building our static site, we would need to set our build directory to `dist/` and our build command to `npm run build`. If your site is not using any preprocessors or compiling software then just set the directory to `/` and leave the build command blank.

When your satisfied with your configurations, click the **Build your site** button to continue.

### Step 6: Build Your Site

![step 6 - build](/img/blog/building-site.png)

Now it's time to sit back and relax. You did your part let Netlify take care of the rest - it'll only take a minute.

### Step 7: All Done

![step 7 - done](/img/blog/done-1.png)

Netlify went ahead and gave your site a temporary name. Let's quickly update that to make it look a little prettier:

![step 8 - pretty](/img/blog/done-2.png)

BOOM! You now have your site hosted on Netlify with blazing fast speeds, powerful CDNs, simple management, and ironclad security. Wasn't that easy? Take it a step further and setup your custom domain (Learn how to do that [here](https://www.netlify.com/blog/2016/03/14/setting-up-your-custom-domain/)). Congratulations, and thanks for using Netlify!
