---

title: "A Step-by-Step Guide: Hosting Exposé on Netlify"
author: Aaron Autrand
image: /img/blog/jack-ventures.jpg
format: blog
short_title: Host Exposé on Netlify
description: A step-by-step guide on how to host a site built with Exposé - A simple static site generator for photoessays written in Bash.
thumbnail: thumbnails/expose.jpg
cmsUserSlug: ""
date: 2015-11-02T00:00:00.000Z
tags:
  - expose
  - bash
  - tutorial
---

Today, we're going to look at how to host a photo and video portfolio built with [Exposé](https://github.com/Jack000/Expose) on Netlify, including setting up continuous deployment.

Exposé is a Bash script that turns images and videos into a photoessay similar to [jack.ventures](http://jack.ventures/) or [jack.works](http://jack.works/)--the author's personal blogs.

With a few simple tweaks, Exposé can work with Netlify to continually and consistently update your photo and video content.

<!-- excerpt -->

## Installing Exposé

Let's begin by creating your project directory. For the purposes of this tutorial, let's call it `exposenetlify`:

```
$ mkdir PATH/TO/exposenetlify
```

Navigate to your newly created directory:

```
$ cd PATH/TO/exposenetlify
```

Now let's put Exposé in that directory. The easiest way to do it is by adding Exposé as a git submodule. This way, if the maintainer of Exposé updates it, Netlify will automatically use the updated version of Exposé:

```
$ git init
$ git submodule add https://github.com/Jack000/Expose.git expose

```

Next, we need to create a new subdirectory, which we'll call `images`:

```
$ mkdir ./images
```

Obviously, all your images will go into the `images` directory. You can add as many subfolders to the `images` directory as you'd like, nested any number of times. To arbitrarily order folders, add a numerical prefix to the folder name. Any numerical prefixes are stripped from the url.

Captions and stories for specific images can be created by adding a `.txt` file to the folder where an image is contained. So `breakfast.jpg` and `breakfast.txt` should be in the same subdirectory, with identical names (apart from the file extension).

Once you've chosen your images and added captions, change to the `images` directory in the terminal:

```
$ cd images
```
Now, you want to run the `expose.sh` script from the `expose` submodule directory, which you can do by running this command:

```
images $ ../expose/expose.sh
```

Sit back and relax. This will probably take a while, depending on the number of photos you have.

Exposé will compile your site into the `images/_site` folder. Inside it, you'll find each of your images in its own separate folder, containing each image in multiple sizes. In the folder containing the image subfolders, you'll also find a file called `index.html`. Double click `index.html` to get a preview of your new site.

Like what you see? Great. Let's move on!

We're almost ready to push to git. Before we do, make sure you are in the `exposenetlify` folder:

```
$ cd PATH/TO/exposenetlify
```

We want to make sure that the `images/_site` directory is not version controlled by Git, so we'll create a `.gitignore` file in the root directory and add `_site` to it:

```
$ echo "images/_site" >> .gitignore
```

Now it's time to push it to your repo of choice. Directions for GitHub follow here.

## **Creating your Git Repo**

Create a new repository on GitHub. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users).

For our purposes, let's call your new repo "expose".

Change the current working directory to your local project.

```
$ cd ~/PATH/TO/exposenetlify/
```

You already initialized the directory as a local git repository when you installed the `expose` submodule, so you just need to add your files to the remote repository:

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

## Connecting to Netlify

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
![step 4 - repo](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step4Expose.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "expose" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings
![step 5 - configure](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step5Expose.png)

Here you can configure your options. For the purposes of this tutorial, make sure your configuration matches the screenshot, then click "Save".

### Step 6: Build Your Site

![step 6 - build](https://cloud.githubusercontent.com/assets/6520639/9803640/717b9c40-57d9-11e5-9ca4-92f90f8ed005.png)

Now it's time to sit back and relax. Go grab something cold to drink, scratch the dog behind the ears, or just get up and walk around (you've probably been in front of the computer for too long today, right?). Netlify will do the rest, and you can watch the progress.

### Step 7: Done

![step 7 - done](https://raw.githubusercontent.com/munkymack/netlify-assets/master/Step7Expose.png)

Wait, you thought there was going to be more? Nope! Netlify has done it all for you, including giving your site a temporary name. Now you can add your custom domain, and your site will be live for your adoring public to view. Congratulations, and thanks for using Netlify!
