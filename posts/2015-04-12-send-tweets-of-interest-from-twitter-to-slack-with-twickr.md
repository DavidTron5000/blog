---

title: Twickr—Send Tweets of Interest from Twitter to Slack
author: Mathias Biilmann
image: /img/blog/twickr.png
format: blog
short_title: Send Tweets to Slack
description: Twickr is a small open-source tool for automatically sending tweets of interest to Slack
thumbnail: /img/posts/thumbnails/twickr.png
cmsUserSlug: twickr-send-tweets-of-interest-from-twitter-to-slack
date: 2015-04-12
tags:
  - open-source
  - twitter
  - slack
  - tools
---

[Twickr](https://github.com/netlify/twickr) is a small tool we're using @netlify to get tweets of interest delivered to our Slack.

For us Slack has turned into a sort of command center, where we process support requests, discuss features, share drafts of mails or blog posts, get operational status messages and alerts.

Like most other startups we have a few stored twitter searches we tend to run all the time, to keep up with all that's going on in our field. Terms like "Netlify” and ”static generators", etc..

So we thought it would be nice if we could just get new notifications in Slack whenever someone tweets with such terms.

<!-- excerpt -->

While tools like [Mention](https://en.mention.com/) paired with [Zapier](https://zapier.com/) can do this, paying up to €299/month just to follow more than 5 different search terms seemed like way, way to much to pay for automating this.

So last Saturday morning I whipped up a [small tool in Go](https://github.com/netlify/twickr) that takes care of this for us.

Today we're releasing [Twickr](https://github.com/netlify/twickr) as open-source in the hope that this will be useful to others as well.

Twickr lets you setup a list of keywords you're interested in and then connects to [Twitter's streaming API](https://dev.twitter.com/streaming/overview). Whenever someone mention any of your keywords in a tweet, it'll send a message to your Slack channel of choice.

## Installation

Download the relevant release for your server's OS and architecture and extract the files.

[Twickr Downloads](https://github.com/netlify/twickr/releases)

## Configuration

Before you can run Twickr, you need to setup a [Twitter application](https://apps.twitter.com/) and a [Slack Inbound Webhook](https://netlify.slack.com/services/new/incoming-webhook).

**Twitter Setup**

1. Go to [Twitter's Application Management](https://apps.twitter.com/) and create a new app.
2. Fill out the name description and website and create the app.
3. Go to "Keys and Access Tokens" and create a new access token

**Slack Setup**

1. Create a new Inbound Webhook for your Slack account [here](https://netlify.slack.com/services/new/incoming-webhook)

**The Configuration File**

Create a `config.json` file in the same folder as the twickr executable. An example configuration file is included in the download.

1. Fill in the credentials for your new Twitter app and the URL from your Slack webhook.
2. Optionally specify which channel to send Twickr messages to
3. Enter a coma-separated list of keywords you want Twickr to keep an eye on

## Running

```bash
cd <path-to-your-twickr-install>
./twickr
```

Normally you'll run Twickr on a server (rather than on your laptop or desktop machine) where it can keep running continuously. An easy way to make sure it stays up after you close your SSH connection is to run it in a TMUX or Screen session.

We hope this tool can be useful to others :) Pull requests with extra features are welcome, though the aim is to keep it simple and just do one thing well.

Enjoy!
