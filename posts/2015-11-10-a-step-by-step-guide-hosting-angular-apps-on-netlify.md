---

title: "A Step-by-Step Guide: Hosting Angular Apps on Netlify"
author: Aaron Autrand
image: /img/blog/angularjs-screenshot.png
format: blog
short_title: Angular Apps on Netlify
description: A step-by-step guide on how to host your angular.js apps on Netlify.
thumbnail: thumbnails/angular-js-copy.png
cmsUserSlug: ""
date: 2015-11-10
tags:
  - angularjs
  - nodejs
  - tutorial
---

Today, we're going to look at how to host applications built with [AngularJS](https://angularjs.org/) on Netlify, including setting up continuous deployment.

Let's start from scratch. If you already have an AngularJS project set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

## Installing Angular

This guide assumes you have [Node.js](https://nodejs.org) installed.

We'll be using a tool called Yeoman to build our project. Yeoman is a scaffolding tool that works in conjunction with a package manager (like NPM or Bower) and a build tool (like Grunt or Gulp) to create modern web apps.

Open your terminal, and enter the following command:

```
$ npm install -g grunt-cli bower yo generator-karma generator-angular
```

The `-g` flag will install the tools globally on your system, which you need to make sure they have access to the proper dependencies.

Create a directory for your new project. We'll call this one `angularyeoman`
```
$ mkdir PATH/TO/angularyeoman
```
Now change to that directory
```
$ cd PATH/TO/angularyeoman
```
`Yo` will build your scaffolding based on the generator that you installed. Since we installed `generator-angular`, run this command:
```
$ yo angular
```
Yo will ask a few simple questions to ge you started. For now, let's say "No" to Gulp, "No" to SASS, and "Yes" to boostrap. Next, let Yeoman install the suggested Angular modules, just by hitting 'enter'.

You can test your install by running:
```
grunt serve
```
Grunt will run a local, Node-based server at [localhost:9000](http://localhost:9000).

Like what you see? Great. Let's move on!

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "angularyeoman".

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/angularyeoman/
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
![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4AngularJS.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "angularyeoman" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5AngularJS.png)

Here you can configure your options. For the purposes of this tutorial, make sure that your configuration matches the above screenshot, then click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7AngularJS.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view.

### Netlify Features: History Pushtate and Prerendering

One of the problems with hosting single page apps on static web services like S3 or GitHub pages is a lack of support for history pushstate. Netlify lets you create a rewrite rule to display your `index.html` instead of a 404, giving you clean web addresses (no more `#`) and avoiding frustrating error pages. [Find out more](https://www.netlify.com/docs/redirects#history-pushstate-and-single-page-apps)

Additionally, Netlify has built-in support for prerendering to give relevant content to webcrawlers, ensuring that your pages will get indexed correctly across all search engines and web properties. [Find out more](https://www.netlify.com/docs/prerendering)
