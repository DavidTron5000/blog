---
title: Lektor on Netlify - A Step-By-Step Guide
author: Aaron Autrand
image: /img/blog/lektoregg.jpg
short_title: Hosting Lektor on Netlify
tags:
  - lektor
  - Python
  - tutorial
  - app
format: blog
description: Build sites with Lektor and host on Netlify with continuous deployment
date: 2016-05-25T00:00:00.000Z
draft: false
---
**This guide was most recently updated on Oct 17th 2017. Below are the package versions used:**

    Python: 2.7
    Lektor: 2.3
    Note: screenshots may be outdated.

Today, we're going to look at how to host a website built with [Lektor](http://getlektor.com) on Netlify, including setting up continuous deployment.

The interesting thing about Lektor is that it comes with a built-in GUI CMS and a Mac app. This makes content creation less daunting for newer users.

Let's start from scratch. If you already have a Lektor site set up, you can skip straight to the [Preparing for deployment](#gitstart) or [Connecting to Netlify](#netlifystart) sections.

<!-- excerpt -->

## Installing Lektor

This guide assumes you have [Python](https://www.python.org/) installed.

Lektor allows for an easy install, either with a Mac app or through the command line.

If you are running the [Lektor app](https://github.com/lektor/lektor/releases/latest), after installation, launch the app. In the Mac menu bar, click Lektor, then `Install Shell Command`.

If you prefer the command line, Linux and Mac users can install Lektor via this shell script:

```
$ curl -sf https://www.getlektor.com/install.sh | sh
```

If you are on Windows, install Lektor with this command line entry:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://getlektor.com/install.ps1'))" && SET PATH=%PATH%;%LocalAppData%\lektor-cli
```

Now that you have Lektor installed, let's put it to use.

## **Building Your Site**

Lektor can build a skeleton for your site, which will set up directories within the lektor directory to hold your content, html that Lektor builds for you, and all of your necessary configuration files. Let's do that now. In your command prompt enter:

```
$ lektor quickstart
```

(If you are using the Mac app, you'll still need to do the quickstart in the command prompt)

Lektor will ask you a few questions to get your project started. For the purposes of this tutorial, name your project `Netlify-Lektor`. If you see something in square brackets after the question, that's the default setting. You can change the settings to meet your needs.

After you've created your project, you'll want to change to the directory where the project lives:

```
$ cd Netlify-Lektor
```

Now that that is all out of the way, let's play around with the site. Lektor has a built-in server that allows you to see your work as you tweak things to your liking.

```
$ lektor server
```

This launches an instance of your project at [localhost:5000](http://localhost:5000). Go ahead and open it up.

Click the pencil in the upper right hand to launch the admin panel. In the left hand column, you will see the actions you can use to edit the page, as well as sub pages that you can navigate to (and then edit as well).

To see some of the things you can do with Lektor (including changing text input fields), the Lektor team has created a [basic video walkthrough](https://youtu.be/lTWTCwuPdrU?t=1m15s) to get you started.

## **Preparing for Deployment**

If you are satisfied with your site, it's time to get it ready to deploy. First, let's make sure that Lektor and GitHub will play nicely together.

Lektor generates your website to a system directory, which won't play nice with Netlify. We'll want Lektor to generate the site in a directory we've specified called `build` when it runs on Netlify, so we'll create a `.gitignore` file in the root directory and add `build` to it:

```
$ echo "/build" >> .gitignore
```

Next up you probably want to ensure that our versions of Python and Lektor match yours!  To choose a python version, create a `/runtime.txt` file with the python version closest to the one you use locally.  [Versions available are listed here]  (https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version).

Finally, you'll want to tell us what dependencies you have - our build environment is rather bare but we'll automatically install everything listed in `/requirements.txt` - which should include at least "lektor".

Now it's time to push it to your repo of choice. Directions for GitHub follow here.
<a id="gitstart"></a>

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "lektor".

Make sure you are in your project directory (the one we named `Netlify-Lektor`):

```
$ cd ~/PATH/TO/Netlify-Lektor
```

Initialize the directory as a Git repository.

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

## Connecting to Netlify

### Step 1: Add Your New Site

![step 1 - add](/img/blog/step1newsite.png)

Creating a new site on Netlify is simple. Once you’ve logged in, you'll be taken to https://app.netlify.com/sites. If you’re just starting out, there’s only one option.

### Step 2: Link to Your GitHub

Clicking “New Site” brings you to this screen:

![step 2 - link](/img/blog/step2link.png)

When you push to GitHub, Netlify does all the work. No more manual deploying of updates or changes!

Since your assets are hosted on GitHub, we’ll need to link Netlify to GitHub. Click “Link to GitHub”.

### Step 3: Authorize Netlify

![step 3 - authorize](/img/blog/step3authorize.png)

It’s time to allow Netlify and GitHub to talk to each other. Clicking the “Authorize Application” button will do just that. Like it says in the image below, Netlify doesn’t store your GitHub access token on our servers. If you’d like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo

![step4lektor.png](/img/blog/step4lektor.png)

Now that you’ve connected Netlify and GitHub, you can see a list of your Git repos. There’s the **lektor** repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings

![step5lektor.png](/img/blog/step5lektor.png)

Here you can configure your options. Make sure that `/build` is the directory you want to deploy, and enter `lektor build --output-path ./build` as your build command.

### Step 6: Build Your Site

![step 6 - build](/img/blog/step6build.png)

Now it’s time to sit back and relax. The first build will take some time, as Netlify gathers all the dependencies needed to build your site.

### Step 7: Site Is Live

![step7lektor.png](/img/blog/step7lektor.png)

Netlify has given your site a temporary name, and it's now up and running for all to see. Pretty great, huh?
