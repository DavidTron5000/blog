---

title: "A Step-by-Step Guide: Assemble on Netlify"
author: Aaron Autrand
image: /img/blog/assemble-screenshot.png
format: blog
short_title: Assemble on Netlify
description: A step-by-step guide on how to host a website built with static site generator Assemble.
thumbnail: thumbnails/4475-thumb.png
cmsUserSlug: ""
date: 2016-01-11
tags:
  - assemble
  - nodejs
  - tutorial
---

Today, we're going to look at how to host a project built with [Assemble](http://assemble.io/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have an Assemble site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

## Installing Assemble

This guide assumes you have [Node.js](https://nodejs.org) installed.

Since Assemble is a Grunt plugin, `grunt` must be installed first:

```
$ npm install -g grunt-cli
```

The `-g` flag will install Grunt globally on your system, which you need to make sure Grunt has access to the proper dependencies.

We'll be using an Assemble boilerplate site for this tutorial. Download it [here](https://github.com/assemble/boilerplate-site/archive/master.zip "Assemble Boilerplate Site"), and unzip it wherever you'd like.

Change to the unzipped folder:
```
$ cd /PATH/TO/assemble-boilerplate-site-master
```
Inside the folder, you'll see two very important files, `Gruntfile.js` and `package.json`. The former tells grunt what to do, and the latter lays out the dependencies needed for your site. Netlify will use the information in `package.json` to identify which tools we need to build your project. `npm` also uses `package.json` to know which uninstalled dependencies to add to your project:

```
$ npm install
```
Once you have all the dependencies installed, you can build your project:
```
$ grunt assemble
```

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "assemble".

In the terminal, initialize the local directory as a Git repository.
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

Since your assets are hosted on GitHub, we'll need to link  Netlify to GitHub. Click "Link to GitHub".

### Step 3: Authorize Netlify
![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the "Authorize Application" button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo
![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4Assemble.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "assemble" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5Assemble.png)

Here you can configure your options. For the purposes of this tutorial, make sure your configuration matches the screenshot, then click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7Assemble.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
