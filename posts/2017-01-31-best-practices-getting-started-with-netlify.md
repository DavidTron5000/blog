---
title: 'Best Practices: Getting started with Netlify'
author: Chris McCraw
image: /img/blog/logo-icon-v1-01.svg
format: blog
short_title: Tips for setup & configuration
tags:
  - getting started
  - how to
description: Tips for setup & configuration of a new Netlify site
date: 2017-01-31T20:35:22.223Z
---
We hope that our software is fairly intuitive and obvious.  However, one of my own favorite adages is that ["There is no intuitive interface, not even the nipple.  It’s all learned"](http://www.greenend.org.uk/rjk/misc/nipple.html).

To that end, here are some best practices for getting started with Netlify that we try to make easy even if they’re not obvious.  

 1. **Name your site something meaningful immediately.**  We pick an automatic name for you but it is just a string of words and numbers.  You can certainly leave your site named magic-firefighter-12345 but if you run a few sites with us, they are pretty hard to tell apart.  Pick a name that is a valid DNS hostname (all letters, numbers, and dashes - no spaces, symbols, dots, or underscores), and one that you don’t mind your customers knowing since it is visible to people who closely examine your site’s settings.  I usually use something like “projectname” or “project-test”.  You can change this later, but you will also have to revise some other settings when you do (see step 3 below)
    ![screenshot of settings page](/img/blog/screen1.png)
 2. **Get your site built and tested before you do anything else.**  I make this suggestion since it would be a bit of a waste of time to do any more in-depth configuration in case your site ends up not being a good fit for our service, and we want to save you time, not waste your time!  Here’s how our typical customer’s onboarding flow goes:
    ![screenshot of deploys tab](/img/blog/screen2.png)
 3. (Optional) **Link a repository.**  Get the connection between your Git provider hooked up if you plan to.  [This article has in-depth information on the why’s and how’s](https://www.netlify.com/docs/continuous-deployment/) - but never fear, our setup wizard does all of this for you automatically.
 4. (Optional) **Debug your builds.**  [Netlify provides its own build environment which is described here](https://www.netlify.com/blog/2016/10/18/how-our-build-bots-build-sites/).  It isn’t really special - but it also isn’t identical to your development machine.  In case you’re using [our CLI](https://www.netlify.com/docs/cli), [our API](https://www.netlify.com/docs/api/) or manual deploys, we won’t build anything for you - we’ll just deploy your files.
 5. **Check out the Deploys tab.**  Each site has its own Deploys tab in our UI, accessible from the main site settings page.  On this tab there are a few things of interest:
 6. build logs.  In case a build went wrong, this is a good place to look for information.  Those boxes are tiny but you can scroll up and down in them and they also track your build in real-time!  No logs for a manual deploy, but there are still…
 7. [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) you (and anyone you tell about them) can browse.  Also,
 8. you can revert to a previous build there, or…
 9. you can download a copy of any build with the download icon right next to the build.  And finally…
10. if you pushed from git, the hash is a link to that commit in your repository!
11. **Apply a custom domain name.**  We invite all customers to bring a custom domain name, and we provide SSL for your domain name(s).  However, before you start, get [DNS configured properly](https://www.netlify.com/docs/custom-domains/) and [please get in touch in advance](https://www.netlify.com/support/) if you are migrating a production website that is already using SSL so I can give you some special advice about migrating.  Note that in case you use your apex domain (eg: domain.com) we’ll automatically redirect www.domain.com to your site (if you configure its DNS to point to us as well), or vice versa (set www.domain.com as your custom domain, and we’ll automatically redirect domain.com to your site).
12. **Configure SSL.**  It’s on the ‘HTTPS’ tab of your Site’s settings. This step comes after DNS, and hopefully after your old DNS records’ TTL has expired.   [TTL is a setting for how long your record can be cached](http://dyn.com/blog/dyn-tech-everything-you-ever-wanted-to-know-about-ttls/), and that caching interval must expire before we can create SSL certificates for you automatically.  Also: **Don’t check the ‘force TLS’ option until you are certain that all of your URL’s work with an ‘https://’ in front!**  Once again [I’m happy to help you out](https://www.netlify.com/support/) if you have any questions or concerns about the process.
13. (Optional) **Set up notifications/integrations, invite collaborators.**  These are not required features, but if you use Slack or want to trigger builds or notifications by webhook or email, or are working with some collaborators, now’s a great time to get them setup.  These are both tabs on the main settings page, ‘Notifications’ and ‘Access’ respectively.  Inviting others to collaborate will mean that they can change your site’s configuration but isn’t needed for people to browse your site - anyone can do that.  For more information about Notifications, check out:
14. https://www.netlify.com/docs/webhooks/ and
15. https://www.netlify.com/blog/2015/12/03/a-guide-to-zapier-integration-with-netlify/
16. **Write to us if you have any questions or suggestions.**  I lead the support team at Netlify and one of my most important duties is to ensure your success with our software.  Struggling with some configuration, having trouble with a build, or wonder if our service can do something you’re interested in?  [It’s free to ask!](https://www.netlify.com/support/)

---
