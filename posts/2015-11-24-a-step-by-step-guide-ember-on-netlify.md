---

title: "A Step-by-Step Guide: Ember on Netlify"
author: Aaron Autrand
image: /img/blog/ember-screenshot.png
image_caption: null
format: blog
short_title: Ember on Netlify
description: A step-by-step guide on how to host Ember on Netlify.
thumbnail: thumbnails/emberjs-logo.png
cmsUserSlug: ""
date: 2015-11-24T00:00:00.000Z
tags:
  - ember
  - nodejs
  - tutorial
---

Today, we’re going to look at how to host a webapp built with [Ember](http://emberjs.com/) on Netlify, including setting up continuous deployment.

Ember is a great framework for creating awesome applications. In fact, [Netlify CMS](https://github.com/netlify/netlify-cms) is made with Ember. It has a huge ecosystem and a great asset pipeline out of the box as well, and we’re hosting tons of webapps using Ember on Netlify.

Let's start from scratch. If you already have an Ember site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

## Installing Ember

This guide assumes you have [Node.js](https://nodejs.org) installed.

Open your terminal, and enter the following command:

```
$ npm install -g ember-cli
```

The `-g` flag will install Ember globally on your system, which you need to make sure Ember has access to the proper dependencies.

Now, navigate to where you want to set up your project, then run the command below. Whatever you decide to name your project, you must be sure not to call it just plain `ember` (which is why we are calling this project `embernetlify`).

```
$ ember new embernetlify
```
Now you can see a `embernetlify` directory, with all of the various assets you need to develop your site in `ember`.

Change into this new directory:
```
$ cd ./embernetlify
```
Now you can preview your webapp by running Ember's built-in server:
```
$ ember server
```
Ember will launch your webapp at [http://localhost:4200](http://localhost:4200).

Like what you see? Great. Let's move on!

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "ember".

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/embernetlify/
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
$ git commit -m 'First commit'
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
git push -u origin master
```

Now that your assets are up and running on GitHub, let's connect them to Netlify.

<a id="netlifystart"></a>

## **Connecting to Netlify**

### Step 1: Add Your New Site

![step 1 - add](https://cloud.githubusercontent.com/assets/6520639/9803638/717820a6-57d9-11e5-838f-d2a732eb0a41.png)
Creating a new site on Netlify is simple. Once you've logged in, you'll be taken to https://app.netlify.com/sites. If you're just starting out, there's only one option.

### Step 2: Link to Your GitHub
Clicking "New Site" brings you to this screen:

![step 2 - link](https://cloud.githubusercontent.com/assets/6520639/9803637/7176ac8a-57d9-11e5-9b09-f43dc772a4f9.png)

When you push to GitHub, Netlify does all the work. No more manual deploying of updates or changes!

Since your assets are hosted on GitHub, we'll need to link Netlify to GitHub. Click "Link to GitHub".

### Step 3: Authorize Netlify
![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the "Authorize Application" button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo
![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4Ember.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "ember" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5Ember.png)

Here you can configure your options. For the purposes of this tutorial, make sure that your configuration matches the screenshot, then click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7Ember.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
