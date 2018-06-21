---

title: "Integrating With Netlify: OAuth2"
image: /img/blog/netlifylogo.png
author: Mathias Biilmann
format: blog
short_title: Netlify and Oauth2
description: "Netlify has an extensive developer API that enables anybody to build integrations and services on top of our service. This tutorial will show how to integrate any service with Netlify by using our OAuth2 provider."
date: 2016-10-10T14:00:00.000Z
tags:
  - netlify
  - api
  - integrations
---

Netlify has an extensive developer API that enables anybody to build integrations and services on top of our service.

Since Netlify is an OAuth2 provider, you can use this API to build services that Netlify users can authorize to operate on their behalf, whether they want you to publish projects, add snippets to their sites, install Webhooks or the like.

The typical OAuth2 flow works like this:

1. User clicks a link or button in your app, requesting to do an action on Netlify.
2. The user visits a link on Netlify that asks them to authorize your application.
3. Netlify sends the user back to your app with an access token tied to their account.

While the full [OAuth2 spec](https://tools.ietf.org/html/rfc6749) is long and complex, it’s actually a very simple flow to implement.

I’ve created a sample [Netlify integration project](https://github.com/netlify/netlify-oauth-example) that shows how to do this kind of integration.

This example demonstrates the “Implicit Grant Flow” where the main security mechanism is the Redirect URI on file for the OAuth2 Application. This means it can be used from a pure single page app without any server-side code.

If your app is already using some server-side code, you might want to use the very similar “Authorization Code Grant” to make sure the final access token ends up stored server-side
without any exposure to the browser.

You can play with the example here: https://netlify-oauth-example.netlify.com/ and read through the code in the [example/app.js](https://github.com/netlify/netlify-oauth-example/blob/master/example/app.js) file.

We love seeing what people build on top of our platform, and we're always happy to help any integrator get started, so if you have questions or are working on a project, don't hesitate to contact us!
