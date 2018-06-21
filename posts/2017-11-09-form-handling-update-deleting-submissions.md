---
title: 'Form Handling Update: Deleting Submissions'
author: Luna Yu
tweet: >-
  You asked, we answered! You can now delete form submissions in the Netlify app
  and API.
image: /img/press/logos/logomark-light.png
short_title: 'Now available: form submission deletion'
tags:
  - features
  - forms
format: blog
description: Announcing the ability to delete form submissions in the Netlify app and API.
date: 2017-11-09T20:08:18.371Z
draft: false
---
A few weeks ago we announced the first in a series of upgrades to Netlify’s [form handling](https://www.netlify.com/docs/form-handling/) (beta), which allows you to add forms to your site without writing server-side code. Now, not only can you [export form submissions to CSV](https://www.netlify.com/docs/form-handling/#exporting-submissions), you can also [delete submissions](https://www.netlify.com/docs/form-handling/#deleting-submissions).

![delete submissions flow](/img/blog/delete_submissions_v3.gif)

From the form detail page in the Netlify app, you can now select one or more form submissions, then click a button to delete them. (Be warned—the deletions are permanent!) You can also delete submissions programmatically using the [Netlify API](https://www.netlify.com/docs/api/#form-submissions).

This means that users like [@crgeary](https://twitter.com/crgeary) and [@_brettsmith](https://twitter.com/_brettsmith) who need to consider how long they store client data, or just like a tidy dashboard, have more control.

![User tweets requesting deleting form submissions.](/img/blog/delete_submission_twitter_requests.png)

If you’re ready to give serverless form handling a try, this [tutorial on form handling](https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/) in a React App or this [tutorial that integrates Zapier](https://www.netlify.com/blog/2017/09/19/form-handling-with-the-jamstack-and-netlify/) are a great place to start.

In the meantime, we’ll keep working to make form handling better for you. Give us a shout on [Twitter](https://twitter.com/Netlify), [Gitter](https://gitter.im/netlify/home), or through support with your feedback.
