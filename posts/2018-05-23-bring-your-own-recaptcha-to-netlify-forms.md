---
title: Bring your own reCAPTCHA to Netlify Forms
author: David Calavera
tweet: Learn how to implement your own reCAPTCHA for Netlify Forms
image: /img/press/logos/logomark-light.png
no_overlay: false
short_title: Bring your own reCAPTCHA to Netlify Forms
tags:
  - forms
format: blog
description: Protect your Netlify Forms with your own reCAPTCHA 2 site keys.
date: '2018-05-23'
draft: false
---
Netlify’s [form handling functionality](/docs/form-handling/) provides several mechanisms to secure your project from spam messages and abuse. However, our standard conventions can’t always cover every single case. Today, we’re giving you full control to configure reCAPTCHA 2 validations in your forms, regardless of how you decide to build them, by allowing you to set your own reCAPTCHA 2 site keys and secrets.

If you want to to include a reCAPTCHA 2 on your site, you can set the key and secret in your site’s build environment variables, and Netlify will use them to secure your form submissions. Use `SITE_RECAPTCHA_KEY` to set your site key, and `SITE_RECAPTCHA_SECRET` to set the secret provided by reCAPTCHA 2. You can find more details in the [docs](/docs/form-handling/#custom-recaptcha-2-with-your-own-settings).

![reCAPTCHA settings](/img/blog/recaptcha-settings.png)

Questions or feedback about this update? Give us a shout on [Twitter](https://twitter.com/Netlify), or [through support](/support/).
