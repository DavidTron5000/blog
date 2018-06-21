---
title: Learning Review for Build Network Outages in September 2017
author: Chris McCraw
image: /img/blog/planning.jpg
short_title: Learning Review for Build Network Outages
tags:
  - stability
format: blog
description: >-
  We had 3 outages in early-mid September 2017.  This post describes the causes
  and what we're doing to prevent future similar situations.
date: 2017-09-27T23:19:29.000Z
draft: false
---
## Overview

Our build network  suffered partial outages several times during the beginning to middle of September.  We know this isn’t the level of reliability you expect from us, so our team discussed  the causes and solutions (already in place and planned) and would like to share a summary of that conversation with you.

We believe in transparency and welcome any follow-up questions you might have via [our helpdesk](mailto:support@netlify.com).

## Timelines

The timelines for degraded service are reflected in our [status Twitter account](https://twitter.com/netlifystatus) as well as our [status page](https://netlifystatus.com).

The high level overview is that on three separate days our build network was unable to begin or complete deploys for a period of time.  Our web service and UI were generally not affected except for a few minutes when we were deploying fixes to our backend to mitigate the problems below.

In all three cases the proximate cause varied, but there are two root causes shared by all:

1. A change to our background processing processing system caused some of our job handling to queue many requests.
2. When we successfully ran those requests in bulk after repairing the proximate causes, this caused a part of our message queueing system to fail.

Two of those incidents were additionally affected by another root cause; a lot of traffic from spam users - people creating thousands of bogus sites on our service creating extra load that took things from bad to worse.

We also feel our communication with Netlify users wasn’t timely, which is considered a large failure on our part. That combined with prematurely declaring the situation resolved more than once (solved: job backup, about to fail: message queue) shows a lot of room for communication improvements.

## Present

After the last incident, we deployed a permanent fix for the background processing system stalling to avoid future incidents.  We have done some work on the message queueing system that has already improved reliability, but that is still a work in progress. (Read more in the “Future” section below.)

Additionally, we’ve improved the tooling around our status page backend (which is open source if you want to check it out:  https://github.com/netlify/netlify-statuskit ), so that future incidents can be created and managed more easily and we will communicate situations on our status page.

Finally, we’ve put a lot of safeguards in place to prevent abuse of our system by spammers. This ranges from rate limitations to better algorithms to detect and prevent that type of visitor from causing the same kinds of service degradation.

## Future

We are always trying to improve. Right now our improvement priorities are our service, stability and customer experience. Both the communications delay and the build system issues fall into those categories, so we have additional work planned for the immediate future:

**Build System**

* Segment our build queueing system more thoroughly to prevent impact of the many by the few (spammers).  The groundwork for this change is already in place but it needs to be carried over to some other systems before it is in full effect.
* Improve the redundancy in the message queueing system to be more resilient to load spikes and other single node or network partitioning issues.
* Split our API (drives uploads/builds/our UI) and our webservice requests to our backend into different pools that we can tune the balance dynamically but also prevent spikes in the API from affecting webservice at all.

**Customer Communication**

* Train additional team members to be able to handle emergency communications so that anyone available can help us  messaging to customers more quickly on twitter and  the status page.
* Improve the Support [webpage](https://www.netlify.com/support) to include status indicators.

---

We hope this gave you insight as to the why's of what went wrong as well as how we plan to address those issues.  We value each and every Netlify supporter and would welcome any other feedback or questions in [our helpdesk](mailto:support@netlify.com).
