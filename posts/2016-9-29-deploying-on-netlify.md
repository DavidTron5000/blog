---

title: "A Step-by-Step Guide: Deploying on Netlify"
author: Eli Williamson
image: /img/blog/collabocats.jpg
format: blog
short_title: Deploying on Netlify
description: A step-by-step guide on how to deploy a site on Netlify.
cmsUserSlug: ""
date: 2016-09-29
tags:
  - deploy
  - tutorial
---

Today, let's take a look at how to host a static website on Netlify, including setting up continuous deployment.

TL;DR _"Just set it and forget it."_

![set it and forget it](http://i.makeagif.com/media/11-03-2014/MW73rc.gif)

## Getting started on Netlify

In this section, we will show you how easy it is to launch your site on Netlify. If you are not already a Netlify user, go ahead and sign up for free [here](https://app.netlify.com/signup) first.

## Step 1: Add Your New Site

![step 1 - add](/img/blog/add-new-project.png)

Creating a new site on Netlify is simple. Once you've logged in, you'll be taken to https://app.netlify.com. If you're just starting out, there's only one option, Click the **Add A New Project** button shown above.

## Step 2: Link to Your GitHub (or supported version-control tool of choice)

Clicking "Add A New Project" brings you to this screen:

![step 2 - link](/img/blog/step-2-hugo.png)

Be sure to push your repo to GitHub, so that all we'll need to do is link Netlify to GitHub. Click the **GitHub** button as illustrated in the screenshot above.

## Step 3: Authorize Netlify
![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the **Authorize Application** button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit.

[https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/)

## Step 4: Select Your Repo
![step 4 - repo](https://cloud.githubusercontent.com/assets/6520639/9897552/b9ea7f7c-5bfe-11e5-94a0-f957a7d1986e.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos.

## Step 5: Configure Your Settings
![step 5 - configure](/img/blog/config-your-repo.png)

Here you can configure your options. Make sure your Directory is `dist/` and your build command is `npm run build`. Then click the **Build your site** button to continue.

## Step 6: Build Your Site

![step 6 - build](/img/blog/building-site.png)

Now it's time to sit back and relax. You did your part let Netlify take care of the rest - it'll only take a minute.

## Step 7: All Done

![step 7 - done](/img/blog/done-1.png)

Netlify went ahead and gave your site a temporary name. Let's quickly update that to make it look a little prettier:

![step 8 - pretty](/img/blog/done-2.png)

There, that's better. Looks pretty good, huh? Wasn't that easy? Take it a step further and setup your custom domain (Learn how to do that [here](https://www.netlify.com/blog/2016/03/14/setting-up-your-custom-domain/)). Congratulations, and thanks for using Netlify!
