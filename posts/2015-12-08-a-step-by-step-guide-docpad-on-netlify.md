---

title: "A Step-by-Step Guide: Docpad on Netlify"
author: Aaron Autrand
image: /img/blog/docpad-screenshot.png
image_caption: null
format: blog
short_title: Docpad on Netlify
description: A step-by-step guide on how to host a website built with static site generator Docpad.
thumbnail: thumbnails/1865439.png
cmsUserSlug: ""
date: 2015-12-08T00:00:00.000Z
tags:
  - docpad
  - nodejs
  - tutorial
---

Today, we're going to look at how to host a website built with [Docpad](http://docpad.org/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have a Docpad site set up, you can skip straight to the [Connecting to netlify](#netlifystart) section.

## Installing Docpad

This guide assumes you have [Node.js](https://nodejs.org) installed.

Open your terminal, and enter the following commands:

```
$ npm install -g npm
$ npm install -g docpad
```

Let's get your workstation prepped. Use `mkdir` to create the `docpad` directory where you'll be working:

```
$ mkdir /PATH/TO/docpad
$ cd /PATH/TO/docpad
```

## Building Your Site

When you first run Docpad, it builds a site based on a pre-defined skeleton, which will set up directories within the `docpad` directory to hold your content and all of your necessary configuration files:

```
$ docpad run
```

That's quite a list of possible skeletons, isn't it? You can choose whichever skeleton best fits your project's needs. For the purposes of the tutorial, let's select `No Skeleton`, which will set up the standard directory structure.

Now it's time to create some content (that's why you are building a site in the first place, isn't it?). Open your favorite text editor, and paste in the following:

```
<html>
<head>
    <title>Welcome! | Docpad on Netlify</title>
</head>
<body>
    <h1>Welcome!</h1>
    <p>Welcome to Docpad on Netlify</p>
</body>
</html>
```

Save the file as `/PATH/TO/docpad/src/render/index.html`. This will function as your homepage.

Because `docpad run` is still running, you can browse your site as you work on it by visiting [http://localhost:9778](http://localhost:9778/).

Like what you see? Great. Let's move on!

## **Preparing for Deployment**

If you are satisfied with your site, it's time to get it ready to deploy. First, let's make sure that Docpad and GitHub will play nicely together.

Docpad generates your website to the `out` directory. We want to make sure that the `out` directory is not version controlled by Git, so we'll create a `.gitignore` file in the root directory and add `out` to it:

```
$ echo "/out" >> .gitignore
```

Okay, you're ready to go!

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "docpad".

Make sure your current directory is that of your local Docpad project.

```
$ cd ~/PATH/TO/docpad/
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
git push origin master
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

![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4Docpad.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "docpad" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings

![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5Docpad.png)

Here you can configure your options. Netlify has already propagated the settings for you. Simple, huh? For the purposes of this tutorial, there's nothing you need to change, so just click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7Docpad.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Let's make it look a little prettier:

![step 8 - pretty](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step8Docpad.png)

There, that's better. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
