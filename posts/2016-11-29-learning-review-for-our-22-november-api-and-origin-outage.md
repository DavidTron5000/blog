---
title: Learning Review for our 22 November API and Origin outage
author: Chris McCraw
format: blog
short_title: A review of the causes behind and our reactions to the 22 Nov API/Origin outage
description: A review of the causes behind and our reactions to the 22 Nov API/Origin outage
date: 2016-12-01T10:07:38-08:00
---

## The downtime

On the 22nd of November, the database backing our service filled its disk and stopped responding. Thirty minutes later, we had the database moved to a bigger disk and service returned to normal. During those thirty minutes, our CDN edge nodes and DNS service continued to work, so while some customer sites were down, high-traffic sites were available as their content was already cached at the edge nodes.

We have done extensive analysis on the situation and have come up with a timeline and a series of causes which we have already mitigated, or will mitigate going forward to prevent another outage of this type.

The situation began a few days earlier, when we noticed an upward trend in our database size. Since the database holds new files deployed until we can copy them to our backing store, this wasn’t necessarily a bad thing, unless we were to run out of space.  We saw the growth trend and began to prepare - we provisioned a larger disk on our replicated database, and began to migrate the data to the new partition. However, this replication failed, and, as the database growth curve continued to get steeper (due, we found out, to some illegal sites being autocreated very rapidly) and the ongoing replication process used up the rest of the available space on the master, so the master ran out of space around 7am our time.

Our team sprung into action and provisioned a much larger filesystem, copied the files over, and got the database restarted within 30 minutes. And, the replicated version was synced soon afterwards so we are again running with sufficient headroom and good replication.

During the outage, we continued to serve most content due to the decoupled nature of our CDN edge nodes from our backing store on the origin server.  Anything already cached was still present, though our own admin UI and new content would not be processed.  We’ll look for ways to make a similar failure mode even less impactful — in addition to less likely — going forward.

## Some failures

* We waited too long to try to migrate to larger filesystems. Based on the growth rate up to the week before, we had plenty of headroom. Based on the new, spammer-induced turbo growth, we did not.

* Our preferred replication method uses up quite a bit of space on a database of the size ours had grown to, and we didn’t anticipate that causing premature failure.

* Our status page was out of date and not easily update-able

## The present

* We’ve already deployed a new [status page](https://netlifystatus.com) with incident history that is much easier to update.

* We’ve got the database mirrored successfully onto volumes with much more headroom

* We’ve revamped our monitoring to give us more warning before a full disk situation so we can prepare by pre-allocating more space further ahead of time, instead of breaking the database.

* We’ve modified the way we do re-hydration of a replica to take \~10 minutes versus 8\+ hours.

## The future

* Aside from just monitoring disk usage, we need to monitor the *rate of change* on growth patterns

* We’re redesigning our database handling practices to always have a live master and slave during any potentially impactful operation
