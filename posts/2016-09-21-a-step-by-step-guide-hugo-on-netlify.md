---
title: 'A Step-by-Step Guide: Victor-Hugo on Netlify'
author: Eli Williamson
tweet: a
image: /img/blog/hugo.jpg
short_title: Hosting Hugo on Netlify
tags:
  - hugo
  - go
  - tutorial
format: blog
description: >-
  A step-by-step guide on how to host a website made with static site generator
  Hugo.
date: 2016-09-21T00:00:00.000Z
draft: false
---
**This guide was most recently updated on Wed, January 23rd, 2018. Below are the package versions used:**

```
Hugo: 0.34

Template: https://github.com/netlify/victor-hugo

Note: screenshots may be outdated.
```

Today, let's take a look at how to host a static website using [Hugo](https://gohugo.io/)  on Netlify, including setting up continuous deployment.

In this tutorial we will be using [Victor Hugo](https://github.com/netlify/victor-hugo) (a continually-maintained Hugo boilerplate) to build our static site.

To get started, let's make sure you have all the tools you'll need. Go ahead and download Victor Hugo [here](https://github.com/netlify/victor-hugo).

If you already have a Hugo site set up, you can skip straight to the [Connecting to Netlify](#netlifystart) section.

<!-- excerpt -->

## Building Your Site

Hugo builds and organizes a skeleton for your site, which will set up a main directory; for simplicity's sake, we'll call this `hugo`. Additionally it sets up sub-directories within this `hugo` directory for the purposes outlined below. Here is a basic breakdown of the structure Victor Hugo builds for you:

```
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|  |--config.toml      // Where your global configuration settings are set/stored
|--src                 // Files that will pass through the asset pipeline
|  |--css              // CSS files in the root of this folder will end up in /css/...
|  |--js               // app.js will be compiled to /js/app.js with babel
```

To get started open terminal/command prompt, navigate to where your Victor Hugo folder lives:

```
$ cd /PATH/TO/hugo
```

Then install the necessary dependencies by entering:

```
$ npm install
```

To start the server enter:

```
$ npm start
```

## Let's create an About page.

In terminal, navigate to the `site` directory which can be done from terminal with a command like:

```
$ cd site
```

Now lets go ahead and initialize the about page using the following Hugo command:

```
$ hugo new about.md
```

If you open the `hugo` directory in your file manager, you'll see a list of subdirectories. Open `site/content/about.md` to see what you just created. You'll should see something like this:

```
+++
date = "2016-09-25T11:45:50-07:00"
draft = true
title = "about"

+++
```

Put some content in Markdown format below the toml front-matter (the section marked by `+++` before and after it) and then save it.

## Now, let's add a new post.

To do so enter the following:

```
$ hugo new post/first.md
```

The new file is located at `content/post/first.md`. It's just begging to be spiced up, isn't it?

```
+++
date = "2015-09-25T11:49:03-07:00"
draft = true
title = "first"

+++

“Peace of mind produces right values, right values produce right thoughts. Right thoughts produce right actions and right actions produce work which will be a material reflection for others to see of the serenity at the center of it all.”
― Robert M. Pirsig, Zen and the Art of Motorcycle Maintenance
```

\*TIP: Create a few posts like this to get some content in place and see the formatting of multiple articles in lists.

Now that you have some content, it's time to display it. Hugo has a [repository full of themes](http://themes.gohugo.io/) that you can use (or you can always create a custom theme). For the purposes of this tutorial, let's use the [Strata](https://github.com/digitalcraftsman/hugo-strata-theme) theme.

Find the Strata theme in Hugo's theme library (or you can click [here](https://github.com/digitalcraftsman/hugo-strata-theme)). To avoid headaches and to make it easy to tweak the theme we are just going to download the zip instead of cloning the theme's repo. To do so, click the **Clone or download** button then click the **Download ZIP** button on the right hand side of the page. In the `hugo/site` directory, create a new folder called `themes`, then unzip the Strata file into `/PATH/TO/hugo/site/themes`. Be sure to rename the folder from `hugo-strata-theme-master` to just plain `hugo-strata-theme`.

## Setting up your first theme.

Most themes will document how to set them up in their `README.md` file. For the Strata theme, there are 5 main things we need to do.

1. To avoid conflicts with the theme, we are going to delete some of the initial boilerplate files, please delete all the files within the `layouts` directory at `site/layouts`. Another conflicting file is `src/css/main.css` - delete this file too. (If you're building your own theme, please disregard these steps.)
2. Then we must copy the contents of the example `config.toml` file from `themes/hugo-strata-theme` to our site's `config.toml` file located at `hugo/site`.
 **\*NOTE: Be sure to update the `baseurl` variable in the config file to a relative path like below.**
 ```
 baseurl = "/"
 ```
3. We must update our landing page layout with the theme's template layout located at `themes/hugo-strata-theme/index.html`. For your convenience, here is the code from this theme (as of 9/9/16) to replace the contents of your `index.html` located in `site/layouts/index.html`.
     ```
     {{ define "main" }}
      {{ if not .Site.Params.about.hide }}
        {{ partial "about" . }}
      {{ end }}

      {{ if not .Site.Params.portfolio.hide }}
        {{ partial "portfolio" . }}
      {{ end }}

      {{ if not .Site.Params.recentposts.hide }}
        {{ partial "recent-posts" . }}
      {{ end }}

      {{ if not .Site.Params.contact.hide }}
        {{ partial "contact" . }}
      {{ end }}
     {{ end }}
     ```
4. To include our new about page into this theme's navigation, open up the `config.toml` file we edited earlier and update the menu variables to include the about page as follows:
     ```
     [[menu.main]]
      name = "Home"
      url  = "/"
      weight = 0

     [[menu.main]]
      name = "About"
      url  = "about"
      weight = 5

     [[menu.main]]
      name = "Blog"
      url  = "post/"
      weight = 10
     ```
You will now see the about page link rendered in the sidebar navigation but if you click it, it will throw an error that the about page cannot be found. This is because we never changed the status of the page from draft to production-ready. All we have to do is change the value of `draft` from `true` to `false` in the front-matter. Your `about.md` file we created earlier should now look like:
    ```
     +++
     date = "2016-09-09T10:15:23-04:00"
     draft = false
     title = "about"
     +++

     ## This is our sample Markdown content.
     ``` 
5. Repeat this draft status updating with all of the post files we created earlier (referring to the `first.md` and other content you may have created). This will allow you to see these articles listed on the homepage (in the "Recent Blog Posts" section) and on the "Blog" page (accessed by clicking "Blog" in the side navigation).

## **Testing Your Site**

Now that we've got your site setup, let's take a look at what we've got (if you haven't already been monitoring in real-time). Fire up the server in terminal with the command:

```
$ npm start
```

Voilà! You should see your landing page styled to look similar to the screenshot below.

![Screenshot](https://raw.githubusercontent.com/digitalcraftsman/hugo-strata-theme/dev/images/screenshot.png)

While your in awe of your new landing page, go ahead and check out your new "About" and "Blog" pages too.

If all looks good, it's time to push your new hugo site to a Github repo (Netlify also supports linking to BitBucket, GitLabs and self-hosted repos).

## **Creating your Git Repo**

[Create a new repository on GitHub](https://help.github.com/articles/create-a-repo/). To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open terminal (or your command-line tool of choice) and make sure the current working directory is set to your local project. If not, navigate there like below:

```
cd /PATH/TO/hugo
```

Initialize the local directory as a Git repository.

```
git init
```

If you're not using the [Victor Hugo](https://github.com/netlify/victor-hugo) template, then you may need to create `.gitkeep` files in any folder that is empty, as git will ignore folders with no content. (The following command assumes you are on macOS or Linux)

```
touch archetypes/.gitkeep content/.gitkeep layouts/.gitkeep static/.gitkeep data/.gitkeep
```

Add the files in your new local repository. This stages them for the first commit.

```
git add .
```

Commit the files that you've staged in your local repository.

```
git commit -m 'First commit'
```

At the top of your GitHub repository's Quick Setup page, click the clipboard icon to copy the remote repository URL.

In Terminal, add the URL for the remote repository where your local repository will be pushed.

```
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Verify your URL

```
git remote -v
```

Now, it's time to push the changes in your local repository to GitHub.

```
git push origin master
```

<a id="netlifystart"></a>

Now that your repo is on GitHub, let's connect them to Netlify.

## Getting started on Netlify

In this section, we will show you how easy it is to launch your first Hugo site on Netlify. If you are not already a Netlify user, go ahead and sign up for free [here](https://app.netlify.com/signup) first.

### Step 1: Add Your New Site

![step 1 - add](/img/blog/add-new-project.png)

Creating a new site on Netlify is simple. Once you've logged in, you'll be taken to https://app.netlify.com. If you're just starting out, there's only one option, Click the **Add A New Project** button shown above.

### Step 2: Link to Your GitHub

Clicking "Add A New Project" brings you to this screen:

![step 2 - link](/img/blog/step-2-hugo.png)

When you push to GitHub, Netlify does all the work. No more manual deploying of updates or changes!

Since your repo is already pushed to GitHub, all we need to do is link Netlify to GitHub. Click the **GitHub** button as illustrated in the screenshot above.

### Step 3: Authorize Netlify

![step 3 - authorize](https://cloud.githubusercontent.com/assets/6520639/9803635/71760370-57d9-11e5-8bdb-850aa176a22c.png)

It's time to allow Netlify and GitHub to talk to each other. Clicking the **Authorize Application** button will do just that. Like it says in the image below, Netlify doesn't store your GitHub access token on our servers. If you'd like to know more about the permissions Netlify requests and why we need them, you can visit <https://docs.netlify.com/github-permissions/>.

### Step 4: Select Your Repo

![step 4 - repo](https://cloud.githubusercontent.com/assets/6520639/9897552/b9ea7f7c-5bfe-11e5-94a0-f957a7d1986e.png)

Now that you've connected Netlify and GitHub, you can see a list of your Git repos. There's the "hugo" repo we just pushed to GitHub. Let's select it.

### Step 5: Configure Your Settings

![step 5 - configure](/img/blog/config-your-repo.png)

Here you can configure your options. Make sure your Directory is `dist/` and your build command is `npm run build`. Then click the **Build your site** button to continue.

### Step 6: Build Your Site

![step 6 - build](/img/blog/building-site.png)

Now it's time to sit back and relax. You did your part let Netlify take care of the rest - it'll only take a minute.

### Step 7: All Done

![step 7 - done](/img/blog/done-1.png)

Netlify went ahead and gave your site a temporary name. Let's quickly update that to make it look a little prettier:

![step 8 - pretty](/img/blog/done-2.png)

There, that's better. Looks pretty good, huh? Wasn't that easy? Take it a step further and setup your custom domain (Learn how to do that [here](https://www.netlify.com/blog/2016/03/14/setting-up-your-custom-domain/)). Congratulations, and thanks for using Netlify!
