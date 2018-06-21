---
title: 'A Step-by-Step Guide: Middleman on Netlify'
author: Aaron Autrand
image: /img/blog/middleman-screenshot.png
short_title: Middleman with Netlify
tags:
  - middleman
  - ruby
  - tutorial
format: blog
description: >-
  A step-by-step guide on how to host a website built with static site generator
  Middleman.
date: 2015-10-01T00:00:00.000Z
draft: false
---

**This guide was most recently updated on Oct 17th 2017. Below are the package versions used:**

    Ruby: 2.3.1
    Middleman: 4.2.1
    Note: screenshots may be outdated.


Let's take a look at how to host [Middleman](https://middlemanapp.com/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have a Middleman site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

<!-- excerpt -->

## Installing Middleman

This guide assumes you have [Ruby](https://www.ruby-lang.org) and [RubyGems](https://rubygems.org/) installed.

Open your terminal, and enter the following commands:

```
gem install middleman
middleman init my-site
```

Once everything is installed, it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "middleman".

Change the current working directory to your local project.

```
$ cd ./my-site
```

Initialize the local directory as a Git repository.
```
$ git init
```
Add the files in your new local repository. This stages them for the first commit.
```
$ git add .
```
Commit the files that you've staged in your local repository.
```
git commit -m 'First commit'
```

At the top of your GitHub repository's Quick Setup page, click the clipboard icon to copy the remote repository URL.

In Terminal, add the URL for the remote repository where your local repository will be pushed.
```
git remote add origin Git_Repository_URL
```
Verify your URL
```
git remote -v
```
Now, it's time to push the changes in your local repository to GitHub.
```
git push origin master
```

Now that your assets are up and running on GitHub, let's connect them to Netlify.

<a id="netlifystart"></a>

## **Configuring some prerequisites for Netlify**

Netlify will, unless told otherwise, use some default versions of build tools, and our build environment is fairly bare.  So, let's set things to match your local versions and get dependencies installed.

- set a Ruby version.  Commit a `/.ruby-version` file to your repository containing the version closest to your local.  Versions available in the build environment are [listed in this documentation](https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version)
- commit a Gemfile and Gemfile.lock.  What you'll want in there and how to create it is [listed in this post]( https://www.netlify.com/docs/build-settings/) (specifically you need `gem "middleman"` in your Gemfile and then to run `bundle install` and commit the resulting files).

## **Connecting to Netlify**

### Step 1: Add Your New Site

![step 1 - add](https://cloud.githubusercontent.com/assets/6520639/9803638/717820a6-57d9-11e5-838f-d2a732eb0a41.png)

Creating a new site on Netlify is simple. Once you've logged in, you'll be taken to https://app.netlify.com/sites. If you're just starting out, there's only one option.

### Step 2: Link to Your GitHub
Clicking "New Site" brings you to this screen:

![step 2 - link](https://cloud.githubusercontent.com/assets/6520639/9803637/7176ac8a-57d9-11e5-9b09-f43dc772a4f9.png)

When you push to GitHub, Netlify does all the work. No more manual deploying of updates or changes!

Since your assets are hosted on GitHub, we'll need to link  Netlify to GitHub. Click "Link to GitHub".

### Step 3: Authorize Netlify
![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the "Authorize Application" button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo
![step 4 - repo](https://cloud.githubusercontent.com/assets/6520639/9897552/b9ea7f7c-5bfe-11e5-94a0-f957a7d1986e.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "middleman" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://cloud.githubusercontent.com/assets/6520639/9803639/717b2008-57d9-11e5-949c-4ea36645ff08.png)

Here you can configure your options. For the purposes of this tutorial, there's nothing you need to change, so just click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://cloud.githubusercontent.com/assets/6520639/9803778/43c95312-57db-11e5-872b-7a37a19f0589.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Let's make it look a little prettier:

![step 8 - pretty](https://cloud.githubusercontent.com/assets/6520639/9803837/f525e7b0-57db-11e5-9398-40bf488a1515.png)

There, that's better. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!

...
...
...


no post credits sequence. No Easter Egg. It's finito.
