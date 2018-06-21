---
author: Aaron Autrand
cmsUserSlug: ''
format: blog
short_title: Gatsby on Netlify
date: 2016-02-24T00:00:00.000Z
thumbnail: thumbnails/gatsbyjs.png
title: 'A Step-by-Step Guide: Gatsby on Netlify'
image: /img/blog/gatsby-leonardo.jpg
tags:
  - gatsby
  - nodejs
  - react
  - tutorial
description: A short guide to help you set up Gatsby on Netlify with continuous deployment.
---
**This guide was most recently updated on Wed, Aug 9th, 2017. Below are the package versions used:**

    
    Node: 8.1.3
    
    NPM: 4.6.1
    
    gatsby-cli: 1.0.7

Today, we’re going to look at how to host a website built with [Gatsby](https://github.com/gatsbyjs/gatsby) on Netlify, including setting up continuous deployment.

Gatsby is a new static site generator, but it’s gaining traction fast! It’s made in what’s probably the only thing as hot as Google’s ‘go’ right now, React.js. React is a hugely popular javascript framework out of Facebook.

<!-- excerpt -->

Let’s start from scratch (if you already have a Gatsby site set up, you can skip down to [here](#netlifystart)).

Open your terminal, and enter the following command (this guide assumes you have Node.js installed):

    $ npm install -g gatsby-cli

The `-g` flag will install Gatsby globally on your system, which you need to make sure Gatsby has access to the proper dependencies.

Gatsby offers a few starters, which are partially built sites preconfigured to get your project up and running faster. We'll be creating a blog, so we are going to use the Starter Blog starter from [https://github.com/gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).

Now, navigate to where you want to set up your project, then run the command below. Whatever you decide to name your project, you must be sure not to call it just plain `gatsby` (which is why we are calling this project `gatsbynetlify`).

    $ gatsby new gatsbynetlify

This will  build a new Gatsby site with the Starter Blog framework.

Now you can see a `gatsbynetlify` directory, with all of the various assets you need to develop your site in `gatsby`.

Change into this new directory:

    $ cd ./gatsbynetlify

Next, we’ll run:

    $ npm install gatsby-cli --save

The above command inserts `gatsby` into the dependencies of your `package.json` file, which tells Netlify what tools it needs to build your site. If you named your project `gatsby`, npm will refuse to add `gatsby` as a dependency of itself.

Open the `/src/pages` directory. Inside that directory you should see several JS files, these are your pages. They are also React components. By default, there should be two imports at the top and a single function. The contents of this function look a lot like HTML and for the most part it’s the same, however it’s actually JSX. Most things are interchangeable, but there are a few things like `class` which is changed to `className`. Your pages will be generated from the content inside this function, and you can modify it as you see fit.

It’s time to display your content. Run the following command:

    $ gatsby develop

Gatsby will compile your site, create an internal server at [http://localhost:8000](http://localhost:8000), and watch for changes. Add some more content to `index.js`. When you save your changes, reload your Gatsby site to see the updated content.

Like what you see? Great. Let’s move on!

## Prepping for Build

Netlify can use any number of versions of tools to build your site. But we need to tell Netlify which versions to use. Since Gastby uses Node.js and NPM, we need to see which version you are running on your production machine. In the terminal enter the following:

    $ node -v

Now you can add this same version of Node to your Netlify site by following the instructions in the following document: [https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version](https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version)

Now it’s time to push it to your repo of choice. Directions for GitHub follow here.

## Creating your Git Repo

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let’s call your new repo `gatsby`.

Change the current working directory to your local project.

    $ cd ~/PATH/TO/gatsbynetlify/

Initialize the local directory as a Git repository.

    $ git init

Add the files in your new local repository. This stages them for the first commit.

    $ git add .

Commit the files that you've staged in your local repository.

    $ git commit -m 'First commit'

At the top of your GitHub repository’s Quick Setup page, click the clipboard icon to copy the remote repository URL.

In Terminal, add the URL for the remote repository where your local repository will be pushed.

    git remote add origin Git_Repository_URL

Verify your URL

    git remote -v

Now, it’s time to push the changes in your local repository to GitHub.

    git push -u origin master

Now that your assets are up and running on GitHub, let’s connect them to Netlify.

<a id="netlifystart"></a>

## Connecting to Netlify

### Step 1: Add Your New Site

![New Site Button](/img/blog/new_site_button.png)

Creating a new site on Netlify is simple. Once you’ve logged in, you'll be taken to https://app.netlify.com/. If you’re just starting out, there’s only one option.

### Step 2: Link to Your GitHub

Clicking “New Site from Git” brings you to this screen:

![Connect Git Repo](/img/blog/create_link_repo.png)

When you push to GitHub, Gitlab, or Bitbucket, Netlify does all the work. No more manual deploying of updates or changes!

Since your assets are hosted on Git, we’ll need to link Netlify to the repo. Click the button for hosted git service that you use.

### Step 3: Authorize Netlify

![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It’s time to allow Netlify and GitHub to talk to each other. Clicking the “Authorize Application” button will do just that. Like it says in the image below, Netlify doesn’t store your GitHub access token on our servers. If you’d like to know more about the permissions Netlify requests and why we need them, you can visit [https://docs.netlify.com/github-permissions/](https://docs.netlify.com/github-permissions/).

### Step 4: Choose Your Repo

![Choose Your Repo](/img/blog/choose_repo.png)

Now that you’ve connected Netlify and GitHub, you can see a list of your Git repos.  Select the **gatsby** repo you created earlier.

### Step 5: Configure Your Settings

![Deploy Settings](/img/blog/deploy_settings.png)

Here you can configure your options. For the purposes of this tutorial, there’s nothing you need to change, so just click "Save".

### Step 6: Build Your Site

![Deploy Progress](/img/blog/deploy_progress.png)

Now it’s time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you’ve probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![Gatsby Hello World!](/img/blog/Gatsby_Default_Starter.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!


