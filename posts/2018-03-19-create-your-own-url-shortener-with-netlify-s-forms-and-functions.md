---
title: 'Create your own URL shortener with Netlify''s Forms and Functions '
author: Phil Hawksworth
tweet: ''
image: /img/press/logos/logomark-light.png
no_overlay: false
short_title: Build a URL shortener with Netlify Functions and Forms
tags:
  - tutorial
  - functions
format: blog
description: >-
  Create a URL shortener that uses your own custom domain with Netlify Functions
  and Forms
date: '2018-03-19'
draft: false
---
Netlify’s [recent release](https://www.netlify.com/blog/2018/03/20/netlifys-aws-lambda-functions-bring-the-back-end-to-your-front-end-workflow/) of support for AWS Lambda functions prompted me to consider what might now be possible that was previously quite difficult. Armed with Netlify’s Functions, Redirects, Forms, API access, Deploy Hooks, (and a little imagination), I decided to roll my own URL shortener.  It was rather fun, and you can create yours using the tutorial below.

## Why would you want this?

There are lots of URL shorteners out there. Chances are you’ve used one in the past in order to turn some long, unfriendly looking URL into something memorable or short enough to type, dictate, or just for an easier copy and paste.

Well, this is another one of those. But instead of it being hosted by somebody else, this is an example of one that you could host for yourself.

Most of the time, the existing solutions are just fine.  There are many to choose from - https://tinyurl.com, https://is.gd, https://bit.ly, https://goo.gl and more.  Some offer more facilities than others, with things like custom short codes and analytics. But all of them depend on a third-party service. They also introduce an extra database query and DNS hop to the journey made when following a link, and typically they create links which are not related to your own domain, which could be a nice facility to have.

## What does this version give you?

This post is part tutorial part proof of concept, exploring some interesting uses of the features on Netlify. But it is also me scratching an itch to have my own URL shortener which does not depend on an external service. I want the ability to easily make my own short URLs which won’t go dead if some service outside of my control gets retired. I also want to be able to have recognizable, branded URLs on my own domain.

You can see what the end results look like and give the URL shortener a whirl on this demo site. But remember, this is a demo, so the links you create there might not last forever.

<https://linkylinky.netlify.com>

If you’d rather go further with your experimentation, and deploy your own version to play with, you can do that with just a couple of clicks thanks to the button below.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/linkylinky" class="btn-dtn">
          <img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify">
        </a>

## How does this work?

The site actually just represents the automation of what I had been doing manually for some time. During conference talks I often include a link to my slides. I like the link to be meaningful and short to help people find their way to a page on Speakerdeck or a Google Slides presentation or anywhere with a URL too long to jot down during a talk.

![An example of a link I shared with the audience at Smashing Conference for easy access to my slides](https://d2mxuefqeaa7sj.cloudfront.net/s_987683888DDDC85E6FD609C9503C6AB8872B723531CA0C78B664138348B05FFA_1519224484099_next-wave-infra-smashing-london.001.png)

To create this short link on my [own domain](https://www.hawksworx.com) I use a feature provided by Netlify, where I host my site. [Netlify](https://www.netlify.com) lets you specify redirect rules via a configuration file in your site’s code. You can use either a `_redirects`  file, or add the configuration to Netlify’s global config file: `netlify.toml`.

For my own website, I prefer to use the `netlify.toml` option. The [entry I added](https://github.com/philhawksworth/hawksworx.com/commit/119b6c49c4fe42b9612a0f16f51c3380566ba75f) to create the short URL above looked like this:

```
[[redirects]]
  from = "/talks/smashing"
  to = "https://speakerdeck.com/philhawksworth/next-wave-infrastructure"
  status = 302
  
```

These configurations have an effect on how traffic to your site is routed by Netlify’s CDN. It’s 
a powerful feature which allows you to control the behavior of the URLs in your site. I’ll not go into details of this here as I’ve mentioned it before in a post called [10 Netlify Features to Surprise and Delight](https://medium.com/netlify/10-netlify-features-to-surprise-and-delight-225e846b7b21). You can also get more detailed information directly from [the docs](https://www.netlify.com/docs/redirects/).

The key here though, is that this configuration sets up redirect rules which happen right on the CDN edge nodes. Traffic is not hitting a server or querying a database which I have to maintain or manage. It all happens at the node geographically closest to the site visitor, so it is fast and resilient.

[My website](https://www.hawksworx.com) is already generated by a [static site generator](https://www.staticgen.com). From here it feels like a short hop to have my build also generate the redirect rules for me and allow me to automate the process with a handy little UI.

That’s what I’ve done. The https://linkylinky.netlify.com site is an example of that free from the noise of the rest of my blog. 

## Step by step

**1. Submitting new URLs to a form**

I want to be able to submit a new destination URL and receive a new shortcode URL in return. This is a static website so I don’t have a server to handle post requests, but thankfully there are several services around the JAMstack ecosystem which can offer form handling as a service. [Netlify has a form handling facility built](https://www.netlify.com/docs/form-handling/) in, so I’ll just use that.

![Viewing the submissions to my routes form. Available though Netlify’s admin console or via an API request](https://d2mxuefqeaa7sj.cloudfront.net/s_987683888DDDC85E6FD609C9503C6AB8872B723531CA0C78B664138348B05FFA_1519231834307_Screen+Shot+2018-02-21+at+16.50.00.png)

**2. Generating the**  **`_redirects`** **configuration**

Since the submissions collected by Netlify’s Forms are available programmatically [via an API](https://www.netlify.com/docs/api/), I can grab them when I run my build to use when populating the configuration file. 

This gives me an updated `_redirects` file for my site deployed to the CDN whenever my build runs, which looks a little like this:

```
/66XXMgJR  https://news.bbc.co.uk  302
/MjwwEm0G  https://paper.dropbox.com/  302
/nZxxzDkD  https://www.whosampled.com/Dorothy-Ashby/sampled/  302
/j2ZZ0r2z  https://twitter.com/i/notifications  302
...
```

**3. Adding some intelligence with Lambdas** 

At this stage I have the basics of a working solution, but until I add some logic it’s not something I could confidently use. The redirect rules generated are entirely based on the information posted to the form. That’s fine, but it doesn’t automatically create a shortcode for me. Nor does it avoid duplication of destination URLs or shortcodes. To do that, I’ll need the ability to introduce some logic at the time when the user is asking for a new redirect rule.

This is the perfect example of a something which could be achieved by using a Lambda Function, or a similar _Function as a Service_ function from another provider like Google Cloud or Microsoft Azure.

Happily, Netlify makes the deployment of AWS Lambda functions trivially with Netlify Functions. There is great [documentation and guidance on how to use Netlify Functions](https://www.netlify.com/docs/functions/) so I’ll skip to describing what my functions do.

Rather than posting my form data directly to the Netlify form handlers, I use JavaScript to post the request for a new short url to a function I created called [generate-route](https://github.com/philhawksworth/linkylinky/blob/master/src/lambda/generate-route.js). When this function is invoked via an HTTP request it can:

* Sanitize the submitted URL to ensure it includes a protocol and is well formed
* Generate a unique shortcode
* Ensure that this new entry would not create a duplicate in our `_redirects` file
* Post the massaged data to my routes form
* Return a message to the UI to tell the user what their new URL will be

With the nicely formatted data posted to my form, I pick up where I was before, triggering a build and deployment automatically.

Meanwhile, I’ve told the user what their new URL will be.

One of the many benefits of using Netlify Functions as to create and manage Lambdas is that this code is all managed and deployed from within the codebase of a site. No fiddly separate development workflows or deployment processes to update my Lambda functions for me. You can see this function in a bit more detail if you take a [look at it in my site repo](https://github.com/philhawksworth/linkylinky/blob/master/src/lambda/generate-route.js).

**4. Shortcutting the build time by accessing the Forms API directly**

Once small problem is still lingering. 

The new redirect will not be active until my build and deployment to the CDN completes. For this project, that process is averaging around 25 seconds, which is nice and fast for a site build and deployment, but an eternity for a user to resist the temptation to click on the shiny new link that I just gave them.

I’ll need to make that work for them _even before_ the build completes.

And I can do that by cheating.

Although the build takes a few seconds, the data posted to the form is available instantly via the API. I am already calling that API during the build process. If I called the same API directly from the client via JavaScript, I could look up the new route and then redirect the user to the correct destination URL right away. No more waiting for the build to finish.

Once again, this is a great moment to use a Lambda function. On this occasion my [get-route](https://github.com/philhawksworth/linkylinky/blob/master/src/lambda/get-route.js) Lambda function acts a bit of middleware to proxy requests from the browser to the form submission API.

To see what that function returns you can try calling it by following the link below. It should tell you were a given shortcode will resolve to. 

<https://linkylinky.netlify.com/.netlify/functions/get-route?code=wjVZ9GXX>

Here’s why this is preferable to just hitting the API directly from the browser:

* Calls to the form submissions API need to be authenticated. I don’t want to expose my auth token by including it in the code or show it in requests made from the client to the API. I’ll keep that between the Lambda and the API thanks to [Netlify’s support for environment variables](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables)
* The form submissions API only gives us basic access to the submissions content. I need somewhere to run the logic to search for the URL which corresponds to a given shortcode. That lookup happens in this Lambda function.

Combining these pieces gives me just what I need. Now I can quickly make new short urls on my own domain without any fuss.

## Big opportunities from common building blocks

This is only a simple proof of concept, but it is already useful for me. I’ll most likely add a few enhancements like the ability to provide a specific, meaningful shortcode rather than have the system generate a random one for me. And perhaps I might sometimes want short urls as a temporary resource, so an option to have my short urls expire after a given time could be handy.

With these building blocks there are all sorts of possibilities. The simple API I’ve created could be called from anything that _speaks_ _HTTP_. Perhaps I’ll make it available through a Slack integration or and Alfred App action.

Access to utilize APIs, trigger automated build processes via incoming webhooks, post to external webhooks, and execute Lambda functions, all combine to create so many possibilities.  My imagination is bristling with ideas of things I could make from what are seemingly simple building blocks.

What might you make? Tell us on [Twitter](https://www.twitter.com/netlify).
