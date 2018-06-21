---

title: "Introducing the Deploy to Netlify button"
author: David Calavera
image:
format: blog
short_title: Introducing the Deploy to Netlify button
description: The new "Deploy to Netlify" button helps you launch a new site from a template right away, just one single click required.
thumbnail:
cmsUserSlug: ""
date: 2016-11-29
tags:
  - continuous delivery
  - deploy button
  - templates
---

If you thought deploying new projects to Netlify could not be more simple, you might have been right, but we always like to surprise you.

The web is full of amazing templates and starter kits for people to reuse. However, doing that requires you to copy a bunch of code and customize it to your needs. The new "Deploy to Netlify" button helps you launch a new site from a template right away, just one single click required.

When you click on a "Deploy to Netlify" button, you’ll be redirected to Netlify’s direct deploy page. There you’ll be able to create a new site based on the template you were looking at. While this is happening, we are creating a new GitHub repository for your new site, so you can customize things even further if you want. The best way to understand how this new feature works is to see it in action:

<div class="flex-centered">
  <video width="640" height="480" controls>
    <source src="/video/statuskit.mp4" type="video/mp4">
  </video>
</div>

We’ve built the first template for you. [Netlify’s StatusKit](https://github.com/netlify/netlify-statuskit) is a template to create Status pages for your services. You can start using it by clicking the next button:

<div class="flex-centered">
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-statuskit">
    <img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify">
  </a>
</div>

Sites created with this template can begin with a customized logo and header for your business.
Once the site is created, you can also make further changes by modifying the code directly in GitHub.

## Want to create templates that others can launch with a click?

To create a template, you can set basic configuration options for their templates using the netlify.toml file. Within the new template section, you can set a list of incoming hooks that notify Netlify to build sites created with this template. You can also set required environment variables that must be changed before creating the site based on your template. This is an example of how it looks:

{{< code-snippet >}}[template]
  incoming-hooks = ["Contentful"]

[template.environment]
  CONTENTFUL_TOKEN = "this is your Contentful token"
  SITE_LOGO = "https://www.netlify.com/logo-placeholder.svg"
{{< /code-snippet >}}

You can find more information about how to create templates and buttons in [its own documentation](/docs/deploy_button/).

We’re very excited about the possibilities this feature can open up for developers. Don't hesitate to let us know where you include this new button, we love to show everyone you build with Netlify!
