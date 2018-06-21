---

title: "A Step-by-Step Guide: Cactus on Netlify"
author: Aaron Autrand
image: /img/blog/cactus-and-sofa.jpg
image_caption: ""
format: blog
short_title: Cactus on Netlify
description: A guide to building and hosting a site created with Cactus on Netlify.
thumbnail: thumbnails/cactusformac.png
cmsUserSlug: ""
date: 2016-04-08
tags:
  - tutorial
  - cactus
  - python
  - django
---

Let's take a look at building a site with [Cactus](https://github.com/koenbok/Cactus), including continuous deployment.

Cactus is a modern build tool that runs on Python and uses Django's templating engine. Cactus has a lot of tricks up its sleeve, and even has a [Mac app](http://www.cactusformac.com/).

<!-- excerpt -->

The app doesn't work out of the box with Netlify, so there are a few quick changes you'll need to make before you can deploy. Jump to [Created with Cactus App](#cactusapp) to make those changes.

If you've already built your Cactus site, you can jump down to [Connecting to Netlify](#netlifystart).

## Installing Cactus

This guide assumes you have [Python](https://www.python.org/) installed.

Open your terminal, and enter the following command:

```
$ pip install virtualenv
```

Installing virtualenv will allow you to easily control all the dependencies needed for your project (or any Python project). This way, we can make sure that what you see when you build your Cactus site on your local machine is exactly what you see when you host that site on Netlify.

Let's get your workstation prepped. Use virtualenv to create the `cactus` directory where you'll be working:

```
$ virtualenv ~/PATH/TO/cactus
$ cd ~/PATH/TO/cactus
$ source bin/activate
```

Now you can install Cactus

```
$ sudo easy_install cactus
```

## **Building Your Site**

Now that you are in your virtualenv and have cactus installed, it's time to put your site framework in place. do that with the following command:

```
$ cactus create ~/my-site
```

This creates a directory called `my-site` inside the `cactus` directory, which you've set up as a virtualenv.

Change to the `my-site` directory with this command

```
$ cd my-site
```

Cactus has already built you a dummy site with a directory and file framework, so you can test it out immediately. Run cactus as a local server with this command

```
$ cactus serve
```

This will generate your site in simple HTML format in `~/my-site/.build`

Now you can view your site by visiting [http://localhost:8000](http://localhost:8000) in your browser.

Like what you see? Great. Let's move on!

## **Preparing for Deployment**

If you are satisfied with your site, it's time to get it ready to deploy. First, let's make sure that Cactus and GitHub will play nicely together.

Cactus generates your website to the `.build` directory. We want to make sure that the `.build` directory is not version controlled by Git, so we'll create a `.gitignore` file in the root directory and add `.build` to it:

```
$ echo "/.build" >> .gitignore
```

We also want to make sure that Netlify knows exactly which versions of various Python plugins you are using. We can do that by creating a file called `requirements.txt`

```
$ pip freeze > requirements.txt
```

Okay, you're ready to go!

Now it's time to push it to your repo of choice. What follows are directions for users of the CactusforMac app. You don't need them, so you can jump down to [Creating Your Git Repo](#gitrepo).

<a id="cactusapp"></a>

## **Created with Cactus App**

If you created your site with the CactusforMac app, you know that it's set up out of the box to build on your machine and deploy to Amazon's S3. With Netlify, the site will actually be built on our server (so that we can optimize it, making it lighter, smaller and faster) so you'll need to make a few changes before you can launch the site.

First, navigate to the folder where your site lives. If you used the app's normal naming structure, it will be named something like `My Blog Site`. Python doesn't like spaces, so rename that folder to something like `my-site`.

Next, open that folder and create a new file, and name it `.gitignore`

Open `.gitignore` in your text editor, and paste in the following

```
/.build

**/*.pyc
*-env/
```

Finally, Netlify needs to know what tools to use to build your site. Create a file called `requirements.txt` and paste in the following line

```
Cactus==3.3.3
```

That's all you have to do. Now it's time to push to GitHub.

<a id="gitrepo"></a>

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open the terminal.

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/my-site
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
git remote add origin GIT_REPOSITORY_URL
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
![step 4 - repo](/img/blog/cactus4.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "cactus" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](/img/blog/cactus_settings.png)

Here you can configure your options. Be sure your settings match the screenshot above, with `/.build` as the directory and `cactus build` as the build command.

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Netlify will build and optimize your site, and you can watch the progress.

### Step 7: Done

![step 7 - done](/img/blog/cactus7.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Your site is now live. Congratulations, and thanks for using Netlify!
