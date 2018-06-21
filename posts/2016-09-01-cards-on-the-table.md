---

title: A Game of Cards
author: Rafael Conde
format: blog
short_title: A new User Interface for our Deploys Page
description: Two weeks ago we released a new and improved user interface for our Deploys screen.
cmsUserSlug: ""
date: 2016-09-01
tags:
- design
- ui
---

Two weeks ago we released a new and improved user interface for our Deploys screen. We are excited to share our new design components and a structure that will empower many of our future efforts by delivering a clean and obvious interface for our users.

With our new features –  [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/), [Gitlab Integration](https://www.netlify.com/blog/2016/07/13/gitlab-integration-for-netlify/) – the user interface of the Deploys page simply wasn’t keeping up. This fact, and that the deploys page is our most visited page, meant that the design team had to go back to the drawing board.

**The single most important UI element of this new design is, without a doubt, Cards.**

A Card is a separate entity that represents an obvious split between the responsibility hierarchy and the layout to the user.

First, the design team made the decision to handle deploys, there’s a lot of associated information and actions as part of a Deploy. Therefore, we chose to turn it into a card. Instead of seeing a ‘single deploy’ as part of a long list, you will see it as its own part of the puzzle.

### Let's talk about Deploy Cards

We knew from the start that we would be displaying all of these deploy cards in a chronological list format, so without a doubt, we felt a vertical list would offer the best user experience.  This also brought up another point - the cards should have a horizontal aspect.

![Layouts](https://d2mxuefqeaa7sj.cloudfront.net/s_B29B187DAB35D0F61B2B7D30F95FA64E4EA370C670CD3B9ABA177EC5F0F36674_1471874491362_layouts.png)

With the positioning of the cards decided on, we needed to find a way to display all associated information and actions.

Below is a list of what we wanted to include on the card:


- State: Publish/Failed/Pending/etc…
- Timestamp
- Type of deploy: From Github/Gitlab/Manual/etc…
- Commit hash/link
- Deploy Preview link
- Branch
- Action: View log
- Action: Download
- Action: Publish
- Action: Lock Deploys (if published)

That's a lot of information.

In one of our first prototypes, we pursued an horizontal layout, with 3 columns, it looked something like this:

![Old Mock](https://d2mxuefqeaa7sj.cloudfront.net/s_B29B187DAB35D0F61B2B7D30F95FA64E4EA370C670CD3B9ABA177EC5F0F36674_1471874502081_Screenshot+2016-08-22+14.57.33.png)

You probably spotted the issue with this approach. Most of the content here is either a very long string ie: Deploys Preview link) or a very, very short string (ie: the State). In addition the labels took up precious space and some actions had more focus than necessary (ie: the download button).

After (a lot) of iterations we landed on a simpler card. We eliminated the labels because most of the content would be self explanatory on its own. By doing this we were able to fit all of our content on the card without any major compromises.

![Final](https://d2mxuefqeaa7sj.cloudfront.net/s_B29B187DAB35D0F61B2B7D30F95FA64E4EA370C670CD3B9ABA177EC5F0F36674_1471874517411_git-integration.png)

A small detail: we changed the color and icon of the card according to the type of deploy and branch.

Yellow represents the master branch, so at a glance you can spot which deploys are on the main (usually live) branch. Grey represents other branches and manual deploys.

![Icons](https://d2mxuefqeaa7sj.cloudfront.net/s_B29B187DAB35D0F61B2B7D30F95FA64E4EA370C670CD3B9ABA177EC5F0F36674_1471874625051_Slice+2.png)

### Just the first step

This is the first iteration of changes to our app UI. There’s many new features we will be introducing as we make changes. We look forward to building and maintaining a User Interface for Netlify that delivers a top-rated user experience.
