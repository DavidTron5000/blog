---
title: Learning Review for our Feb 2 Origin Outage
author: Matt Biilmann
image: /img/blog/Cover-Photo.png
format: blog
short_title: Learning Review Feb 2
description: Background and preventive measures for our Feb 2 Origin Outage
date: 2017-02-03T23:41:50.264Z
---

Yesterday we had a serious incident where human error caused a data migration to go wrong and caused metadata for 5.2% of the deploys in our system to get overwritten.

This caused downtime for sites if they had one of these deploys active, and the given CDN node did not have the site content in its cache. Our API and web UI also failed to fetch any sites that included a deploy in an invalid state.

## The beginning. 9:17am

The failed migration instantly triggered alerts for failed origin requests starting at 9:17am PST
Our immediate priority was to get affected sites back to normal first, focusing on affected paying customers on Enterprise and Global plans first, and then on fixing API serialization errors and, second, getting our web UI back to normal.

All sites affected were configured to deploy automatically from git, so to get sites back in a good state we started working in parallel on two tasks:

1. Immediately start triggering re-runs of builds for sites that were directly affected by this.
2. Meanwhile restore the latest database backup, get a dump of the deploy metadata collection and work on scripts to restore affected deploys.

## Recovering

We wrote a series of queries to determine the list of affected sites and deploys that belonged to customers with SLAs to get their sites ahead in the queue. In general those sites were much less prone to hit the origin failures due to more dedicated cache disk space on our global custom CDN. Due to this none of our enterprise clients were down for more than 10 minutes and most experienced no downtime.

However, when triggering the initial badges of rebuilds, in some cases, the final step to getting the new deploy live would fail during a step where we compare the timestamp of the latest completed deploy - because the deploy metadata for that deploy was invalid. We were however able to manually push through deploys and around 10:20am PST we were running some emergency processing scripts that would push through any deploys with this issue automatically.

**At 11:25am PST** we had a fix live in our background processors that finally allowed all the new builds to go through normally.

Meanwhile we were waiting for the backup to restore from S3. However we managed to cut down the waiting time considerable as our backup system allows us to spin up a read-only database with access to a specific snapshot directly from a fuse mounted S3 bucket.

**At 12:30pm PST** we started being able to get deploy metadata from our latest backup and directly fix broken deploys on a site by site basis through a manual process. Since most affected sites were still working fine due to the CDN caching, we started manually restoring sites focusing on the ones that were reported down through all of our support channels.

**At 1:45pm PST** we had scripts in place to automate this process and get any site back into the last known good state on a site by site basis.

**At 3:15pm PST** all affected deploys that were present in our DB backup had been restored at this point. We started running a script to identify sites that had not been restored from the DB backup and had not had any new build go through since the incident start.

**At 3:46pm PST** we registered all affected deploys as having been dealt with either by restoring from backup or reverting the site to the last known state.

Some of the sites that were deployed in the interval between the moment we ran the original migration and until the issue had been fixed, ran into a secondary issue where the bad metadata for existing deploys would cause some new file uploads to get into a bad state. We’re identifying all sites affected by this and will get in touch with clients that may have files that didn’t upload correctly.


## Action Items

Yesterday’s incident was in many ways the worst case scenario for any service, where human error caused a considerable amount of data to be irrecoverably lost from the production database.

Ironically we had our first major disaster recovery exercise scheduled for the end of this month, in order to improve our processes around major issues. Instead we had to learn during the real deal.

The action items coming out of this come in two groups:

1. How can we avoid any incident like this from ever occurring again.
2. How can we recover faster from an incident like this.

## Avoiding Similar Incidents

Eventually this comes down to avoiding human error, whether we’re talking database updates or major configuration changes.

There’s two ways we can address this:

1. Processes
2. Tooling

Whenever possible, the second should take precedence.

## Preventive process no. 1 - Peer signoff

In terms of processes we’re instilling a hard rule that no-one, however experienced, should run a custom write query against live data without getting the OK from at least one other senior infrastructure engineer. Even if the query has been tested against a staging environment.

## Preventive process no. 2 - Database snapshot

We will also start triggering a database snapshot before running any write query that operates on more than one document. Our database backup system makes taking snapshots fast and efficient, and we will take better advantage of this.

## Preventive tooling - Auditing and Enforced Review

In terms of tooling, we’re now wrapping our database interface in a custom layer that scans for certain types of command and runs them by a Slack channel before executing them. This tool also announces in Slack whenever a developer starts a console session and leaves an audit trail in Slack of all commands.


## Improving Recovery

Most of the deploy metadata can be reconstituted from other objects in the database or inferred from the files in the deploys, etc. However, the deploy metadata object contains a “pointer” to a “tree object” in our large distributed filesystem. Without this pointer we have no way of knowing what files are in the deploy (hence the 404s for affected pages).

## Improving recovery no. 1: Logging more deploy metadata
Going forward we’re going to log this pointer whenever we set it on a deploy object. This will make it possible to reconstruct all recent deploys from our logs if needed.

One positive note during this incident, was that our database backup system is working well and we had no problems recovering our latest backup.


## Improving recovery no. 2: Better internal documentation
However, it took us much longer than needed to realize that we have the ability to mount any database snapshot as a read-only database directly from our S3 backups and connect to that straight from our application servers. Had we realized this earlier we would not have wasted time waiting to recover a full dump of the deploy metadata and could have started the process of repairing the broken data a few moments after the incident began. Had this occurred after our planned disaster recovery exercise, we would no doubt have been able to react much faster.

Now we’re writing up extensive docs on how to granularly access data from any DB snapshot, and we’ll be increasing the rate with which we take snapshots, so we can cut down the time it would take to do partial data recovery at any time in the future.

## Improving recovery no. 3: Triggering Rebuilds
Currently our API and web UI allows users to trigger a new build on their main branch.

Being able to easily trigger a rerun of a specific build from the same git commit, both through our UI and our API, has been a common feature request. We’re now going to push that to the front of the product roadmap, since it would also help in quickly rebuilding a specific deploy in the future.


## Summary

Preventing human error is of course always hard but fortunately we have found a number of ways to better prevent something like this from happening ever again, and to recover faster if it should so anyway.

## Preventive process

- Peer signoff
- Pre migration database snapshot

## Preventive tooling

- Enforced Auditing and Reviews

## Improving recovery

- Logging more deploy metadata
- Better internal documentation
- Support for Triggering Rebuilds
