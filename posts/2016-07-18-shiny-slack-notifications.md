---

title: Shiny Slack notifications from Netlify
author: David Calavera
image: /img/blog/netlify-slack-notifications.png
format: blog
short_title: Slack notifications
description: Send deploy and form notifications to Slack from Netlify
thumbnail: thumbnails/netlify-slack-notifications-thumbnail.png
cmsUserSlug: ""
date: 2016-07-18
tags:
- slack
- notifications
- integrations
---

Did you know that you can get notifications in Slack every time you deploy a site on Netlify?

The messages were a bit sparse in content and format, so we decided to invest some time <s>playing with</s> learning about [Slack’s awesome message builder](https://api.slack.com/docs/messages/builder). The new messages include information about the deployed site, as well as links to the production url, build log and when we sent the message.

There are three types of messages you can get for deployed sites on Netlify. When we start building your site, when a deploy is complete, and when something goes wrong:

![](/img/blog/netlify-slack-deploy-notifications.png)

You can also get form submission notifications in Slack if you use [Netlify forms](/docs/form-handling). We separate each field in the form so the message arrives to you loud and clear:

![](/img/blog/netlify-slack-form-notifications.png)

Configuring Slack notifications on Netlify is very straight forward, check out [our documentation](/docs/webhooks) to learn how to enable them for your deploys and forms!
