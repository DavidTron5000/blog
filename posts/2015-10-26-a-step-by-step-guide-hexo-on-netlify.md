---

title: "A Step-by-Step Guide: Hexo on Netlify"
author: Aaron Autrand
image: /img/blog/hexo-screenshot.png
format: blog
short_title: Hosting Hexo on Netlify
description: A step-by-step guide on how to host a website built with static site generator Hexo.
thumbnail: thumbnails/6375567nnnnn.png
cmsUserSlug: a-step-by-step-guide-hexo-on-netlify
date: 2015-10-26
tags:
  - nodejs
  - hexo
  - tutorial
---

Today, we're going to look at how to host a website built with [Hexo](https://hexo.io/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have a Hero site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

## Installing Hexo

This guide assumes you have [Node.js](https://nodejs.org) installed.

Open your terminal, and enter the following command:

```
$ npm install -g hexo-cli
```

Hexo will create a directory for your project with this command:

```
$ hexo init /PATH/TO/hexo
```

Switch to the `hexo` directory:

```
$ cd /PATH/TO/hexo
```

## **Building Your Site**

Hexo can build a skeleton for your site, which will set up directories within the hexo directory to hold your content, html that hexo builds for you, and all of your necessary configuration files. Let's do that now:

```
$ npm install
```

Once that's done, the basic bones of your site are ready to go! Check out your work so far:
```
$ hexo server
```

You can take a look at your new site at http://0.0.0.0:4000/

Wow. Seriously, that's it. You're already done. Of course, you'll probably want to add some content (that's why you are building a site in the first place, isn't it?).

Hexo will create a new post for you:
```
$ hexo new "Hexo Websites on Netlify"
```

It even gives you a helpful file path for your new post. Follow that file path to open your new Markdown document (or just paste that path into the "Open" dialogue of your favorite text editor).
```
title: Hexo Websites on Netlify
date: 2015-10-09 16:03:33
tags: easy,free
---

This is how easy it is to create a static website hosted with Netlify.
```

The title and date are already set up. You can copy/paste in the above content to get a better idea of how Hexo handles text.

It's time to display your content. Use this command to generate your site:

```
$ hexo generate
```

Now, let's see how the hexo server displays your new content:
```
$ hexo server
```
Boom! Look at that new post. Like what you see? Great. Let's move on!

## **Preparing for Deployment**

If you are satisfied with your site, it's time to get it ready to deploy. First, let's make sure that Hexo and GitHub will play nicely together.

Hexo generates your website to the `public` directory. We want to make sure that the `public` directory is not version controlled by Git, so we'll create a `.gitignore` file in the root directory and add `public` to it:
```
$ echo "/public" >> .gitignore
$ echo "/node_modules" >> .gitignore
```
Okay, you're ready to go!

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "hexo".

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/hexo/
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

Since your assets are hosted on GitHub, we'll need to link Netlify to GitHub. Click "Link to GitHub".

### Step 3: Authorize Netlify

![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the "Authorize Application" button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo

![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4hexo.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "hexo" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings

![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5hexo.png)

Here you can configure your options. For the purposes of this tutorial, there's nothing you need to change, so just click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7hexo.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Let's make it look a little prettier:

![step 8 - pretty](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step8hexo.png)

There, that's better. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
