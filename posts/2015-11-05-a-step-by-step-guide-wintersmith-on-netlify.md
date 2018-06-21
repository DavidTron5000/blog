---

title: "A Step-by-Step Guide: Wintersmith on Netlify"
author: Aaron Autrand
image: /img/blog/wintersmith-screenshot.png
format: blog
short_title: Wintersmith on Netlify
description: A step-by-step guide on how to host a website built with static site generator Wintersmith.
thumbnail: thumbnails/wintersmith-og.png
cmsUserSlug: ""
date: 2015-11-05
tags:
  - wintersmith
  - nodejs
  - tutorial
---

Today, we're going to look at how to host a website built with [Wintersmith](http://wintersmith.io/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have a Wintersmith site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

## Installing Wintersmith

This guide assumes you have [Node.js](https://nodejs.org) installed.

Open your terminal, and enter the following command:

```
$ npm install -g wintersmith
```

The `-g` flag will install Wintersmith globally on your system, which you need to make sure Wintersmith has access to the proper dependencies.

Now, navigate to where you want to set up your project, then run the command below. Whatever you decide to name your project, you must be sure not to call it just plain `wintersmith` (which is why we are calling this project `wintersmithnetlify`).

```
$ wintersmith new wintersmithnetlify
```
Now you can see a `wintersmithnetlify` directory, with all of the various assets you need to develop your site in `wintersmith`.

Change into this new directory:
```
$ cd ./wintersmithnetlify
```
 If you decided to call your project `wintersmith`, the next command will fail:
```
$ npm install wintersmith --save
```
The above command inserts `wintersmith` into the dependencies of your `package.json` file, which tells Netlify what tools it needs to build your site. If you named your project `wintersmith`, npm will refuse to add `wintersmith` as a dependency of itself.

Open the `content` directory, then the `articles` directory. In Wintersmith, each article has its own directory, and inside that directory is the actual written content contained in a file called `index.md`. Create a folder called `netlify`, and then create a new text document inside that folder. Now you can add some content to that file.

```
---
title: "Wintersmith with Netlify"
author: Netlify Team
date: 2015-10-31
template: article.jade
---

It's spooky how easy it is to get a website up and running on Netlify when you build it with Wintersmith!
```
Once you are satisfied with your content, save the text file as index.md

It's time to display your content. Use this command to generate your site:

```
$ wintersmith preview
```

Wintersmith will compile your site, create an internal server at http://localhost:8080, and watch for changes. Add some more content to `index.md`. When you save your changes, reload your Wintersmith site to see the updated content.

Like what you see? Great. Let's move on!

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "wintersmith".

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/wintersmithnetlify/
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
![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4Wintersmith.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "wintersmith" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5Wintersmith.png)

Here you can configure your options. For the purposes of this tutorial, there's nothing you need to change, so just click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7Wintersmith.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
