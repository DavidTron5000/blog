---

title: Introducing Deploy Contexts in Netlify
author: David Calavera
format: blog
short_title: Introducing Deploy Contexts in Netlify
description: Deploy Contexts are the way to tell Netlify how to build your site. They give you flexibility to configure your site's build depending the context they are going to be deployed to.
cmsUserSlug: ""
date: 2016-08-30
tags:
- deploy contexts
- deploy previews
- continuous delivery
---

Launching [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) last month was an amazing moment for us. Many people told us how this feature is improving their development workflows.

{{< tweet 768580952339525632 >}}

However, deploying every branch in a Git repository has its consequences and new challenges. The number of deploys we process is growing exponentially, reaching 1 million very soon. After using Deploy Previews for some time, we realized that with a few tweaks they could be even more useful.

All sites deployed on Netlify have a set of configuration options that tell us how to put it in production. The most common ones are the base directory (where your raw source lives), a build command (if you’re using a site generator), a collection of environment variables, and the directory you want to publish. With Deploy Previews, we started thinking about how can we change those settings to apply development configurations not only for deploy previews, but for every single branch Netlify deploys.

Deploy Contexts are our answer to those questions, giving us the flexibility needed to customize additional things during the development process. A Deploy Context is a set of configuration options that can apply to any deploy on Netlify. They go beyond changing only environment variables. You can also change build commands, and base and publish directories. This will allow us to expose even more settings in the future too.

We have created three predefined Deploy Contexts that can apply to multiple branches. The __Production Context__ applies to the branch you have configured as main branch to deploy. The __Deploy Preview Context__ applies to every Deploy Preview you create. The __Branch Deploy Context__ applies to all branches deployed, whether they are in a Deploy Preview or not. This last one is specially useful for sites in our Pro/Open Source tiers and above. Besides these three predefined contexts, you can also use branch names as context names. Thus, if you have a branch called “staging”, you can change settings for it using the __Staging Deploy Context__.

Think of those contexts as a tree. The root is the options you set in our user interface. Those options can be overridden with the predefined contexts. For instance, you can change only the build command for Deploy Previews, or maybe you want also change one specific environment variable. At the same time, the predefined contexts can be overridden by a specific branch context. 

Allowing this kind of flexibility comes with additional challenges, you’re probably wondering already where all those settings live in our user interface. To be honest, we don’t really know yet. We decided to take an alternative route to put this feature in your hands as soon as possible. We put these settings where you think about them and store them and work with them - in a build configuration file in your versioned source code.


## Introducing the netlify.toml file

The _netlify.toml_ file is a plain text file that lives in the root of your Git repositories. We’ve been playing with several file formats to set these options. We decided that [TOML](https://github.com/toml-lang/toml) is a better fit moving forward. We’re also working on consolidating other things there, keeping backwards compatibility, but that’s something for a future blog post.

It’s really easy to override settings in our _netlify.toml_ file. For instance, if your production site is built with Hugo, you can enable showing drafts and future content for deploy previews in there:

    [context.deploy-preview]
      command = "hugo --buildDrafts --buildFuture"

In that case, only the build command will be overridden; we take everything else from the site’s global settings.

You can see a more complete _netlify.toml_ file in [our documentation](https://www.netlify.com/docs/continuous-deployment#deploy-contexts). I hope that example piqued your curiosity.

We’re very excited to release this new feature and we cannot wait to get your feedback!
