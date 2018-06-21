---

title: "Keep your site stable with Locked Deploys"
author: David Calavera
image:
format: blog
short_title: Keep your site stable with Locked Deploys
description: Locked Deploys help you keep stable versions of your sites in production.
thumbnail:
cmsUserSlug: ""
date: 2017-01-10
tags:
  - continuous delivery
  - deployment
---

We just launched [Locked Deploys](/docs/locked-deploys)! These help you keep stable versions of your sites in production without losing the advantages of continuous deploys. Locked Deploys are specially helpful in those times when you want to pause publishing to production in every single merge to a master branch, for a while.

![](/img/blog/locked-deploys.gif)

You can pin any site to its current deploy and we’ll keep building new deploys as they come in, but we won’t publish them if they affect production. The sites will still have unique URLs for you and your team to check them out, safely. Whenever you’re ready to publish a new version, you can unlock your site and deploy the new version, or publish an existent one directly from Netlify.

We've also added new event notifications, so you're aware when someone locks or unlocks a deploy. You can get those messages via email, Slack, or sending them to an external service with a webhook. All you need to know to configure them is in our guide about [outgoing webhooks and notifications](/docs/webhooks/#outgoing-webhooks-and-notifications).

![](/img/docs/locked-deploys-events.png)

Locked deploys use Netlify's atomic and immutable deployment features, you can read more about them in our [documentation](/docs/versioning-and-rollbacks).

We look forward to continuing to build features that make your development workflow smooth, safe and smart.
