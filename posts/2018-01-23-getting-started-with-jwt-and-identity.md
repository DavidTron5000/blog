---
title: Getting Started with JWT and Identity
author: Gerald Onyango
tweet: ''
image: /img/press/logos/logomark-light.png
short_title: jwt and identity
tags:
  - jwt
  - identity
format: blog
description: >-
  Netlify recently launched the beta version of its Identity service, a JSON web
  token (JWT)-based user authentication service.  I work on the Support team at
  Netlify, and I’ve seen firsthand that JWT and user management can be a little
  daunting. So, this post will provide both a closer look at JWT, as well as an
  overview on how to implement Netlify’s Identity service. By the way, JWT-based
  access control can be used with any JWT authentication provider, like Auth0 or
  a even a self-hosted server.
date: '2018-01-23'
draft: false
---
Netlify [recently launched](https://www.netlify.com/blog/2017/09/07/introducing-built-in-identity-service-to-streamline-user-management/) the beta version of its Identity service, a JSON web token (JWT)-based user authentication service.  I work on the Support team at Netlify, and I’ve seen firsthand that JWT and user management can be a little daunting. So, this post will provide both a closer look at JWT, as well as an overview on how to implement Netlify’s Identity service. By the way, JWT-based access control can be used with any JWT authentication provider, like Auth0 or a even a self-hosted server.

## What is JWT?

JWT stands for JSON web tokens, a standard for encoding data that includes user role information and other data relevant to your site. JWT offers a secure method of sending this information using a shared `secret` . Different routes can require different roles, with redirects to other pages when there’s a failed authentication. This means you can use the encoded user role to gate content and control user capabilities.

## What’s in a JWT?

  A JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbWV0YWRhdGEiOnsiYXV0aG9yaXphdGlvbiI6eyJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciJdfX19.4IKFHH33EXWseNjNIRO4-u5IlSlJOLyibG20qPA4Djs
```

In that long string of characters, you’ll see two periods. These separate the JWT into three separate sections: header, payload, and signature. The header and payload are two separate encoded JSON objects, and the signature requires the `secret` to decode and verify so our servers know it’s valid. If you create a JWT and encode it with a `secret`, the server or device that you intend to decode that JWT also needs to have that `secret` or the JWT can’t be verified.

[https://jwt.io/](https://jwt.io/) is a really great informational resource on JSON Web Tokens. You also decode tokens there. You should head over and try decoding the token above! Note that you’ll have to scroll a bit to see the decoder. Also, the “secret” to verify the token signature is the word “secret”.

The header contains the algorithm used to encode and the type of token. For example:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The payload has the actual data that you are trying to pass, which are called “claims”. The actual claims that are set depend on what you need to convey, with some parts being customizable and others being required by the JWT issuer/server. Below is an example of a JWT payload:

```
{
  "app_metadata": {
    "authorization": {
      "roles": [
        "admin",
        "editor"
      ]
    }
  }
}
```

In this token, I encoded only the role information since that’s all we need for role-based access with Netlify. You can also set an expiration, and additional user data like name, registration information, email, subscription status, etc. 

JWT are typically saved in a cookie, and browsers will automatically send those cookie with requests to the domain it’s associated with. For Netlify, we save the JWT in a cookie named `nf_jwt`.

## Identity: Netlify’s JWT-based user management service

Netlify’s Identity service allows you to manage and authenticate users on your site or app, without requiring them to be users of Netlify or any other service. You can use this for gated content, site administration, and more. It uses JWT, allowing you to setup visitor access control, and log users in and out using the [Netlify Identity widget](https://github.com/netlify/netlify-identity-widget).

The widget is open source, so you’re free to fork and change it, or contribute improvements. Also, if you want to design your own login/logout flow, you can use the open source library it was built with, [gotrue-js](https://github.com/netlify/gotrue-js). This works with the open source [GoTrue API](https://github.com/netlify/gotrue) used by Netlify Identity.

## Set up Identity on your Netlify site

When using Identity, you don’t have to enter the JWT secret on the site — Netlify will handle that for you automatically. Now let’s get Identity set up for you:

1. First, head over to your Netlify site settings, and click the link in the main menu at the top to go to the Identity page. The URL is unique for each site, but you can see all of your sites from [here](https://app.netlify.com/). Once there, click the “Enable Identity” button as shown below:

    ![Indtroducing Identity](/img/blog/introducing_identity.png)

    Once you’ve done that, you’ll see a list of current Identity users, which will initially consist of the e-mail address associated with that Netlify account. From this page you can also add more users, but you won’t be able to complete user signup until you’ve done step 2.  This is because to confirm an e-mail account, the Netlify Identity Widget needs to be available on your site. 

2. You’ll need a way for users to log in. You can make your own with [G](https://github.com/netlify/gotrue-js)[oTrue-js](https://github.com/netlify/gotrue-js), or use the [Netlify Identity Widget](https://github.com/netlify/netlify-identity-widget). If you choose to use our widget, you can add it to your HTML files automatically by using our [script injection](https://www.netlify.com/docs/inject-analytics-snippets/), or manually add the following to the HTML pages you want to interact with the widget: 

    ```html
    <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    ```
 
3. Now to popup the login modal, you can use JavaScript to call `netlifyIdentity.open();` anywhere on your site, or use Netlify’s handy-dandy custom HTML element:
    ```html
    <div data-netlify-identity-button>Login with Netlify Identity</div>
    ```

Netlify will save the JWT in a cookie named `nf_jwt` when a user logins in, automatically. However if you want to gate access to URL’s, you’ll need to setup your `_redirects` file as I describe below, in “How to gate content using JWT”. You can also find additional examples in [the docs](https://www.netlify.com/docs/visitor-access-control/#role-based-access-controls-with-jwt-tokens).

That’s all you need to get Identity setup! It can be done in minutes, with minimal headache. But it’s also quite extensible. There are built-in event handlers for the Netlify Identity widget that allow you to perform custom actions on initialization, login/logout, modal open/closed, etc. These are described in the [widget repo](https://github.com/netlify/netlify-identity-widget). There’s also a JavaScript object available with information about the currently logged-in user that you can use to add more dynamic content to your site, and update user meta-data. 

If you are using Netlify CMS, you can use Identity to authenticate users for the CMS. This, combined with [G](https://www.netlify.com/docs/git-gateway/)[it](https://www.netlify.com/docs/git-gateway/) [G](https://www.netlify.com/docs/git-gateway/)[ateway](https://www.netlify.com/docs/git-gateway/), will make it easier for you to add multiple editors to your site (no need to write any custom code, and editors won’t need a GitHub account). You can read more about getting Identity linked to Netlify CMS in the [docs](https://www.netlifycms.org/docs/add-to-your-site/).

## How to gate content using JWT

If you have a [Teams Business](/pricing/#teams) plan, you can use your new Identity JWT setup to gate content on your site using a `_redirects` file.

Add a `_redirects` file to your publish directory with the access restrictions you need. In my example site, I’m gating access to `/testauth` so this is my `_redirects` file:

```
/testauth/* 200! Role=admin
/testauth/ /testlogin 404
```

That will allow you to go to `/testauth` only if the role in the JWT cookie sent is `admin`. If a JWT cookie isn’t sent, or if you don’t have the proper role, your request will be processed using the second rule, which in this case does a redirect to the `/testlogin` page instead. If you don’t put a default route, users will be sent to our Netlify 404 page instead.

Assuming you’re sending a valid JWT, that’s all the setup you need on Netlify to use JWT to gate content. In fact, you can take the JWT I gave as an example above, save that in a cookie named `nf_jwt`, set the JWT password on your Netlify site to `secret`, add the `_redirects` file above to your site, and you can test JWT access control, too.

## Using third-party JWT Providers on your Netlify site

If you don’t want to use Netlify Identity, you can use a third-party service like Auth0, or even self-hosted solutions, to manage users and generate tokens. If you have a [Business Team](/pricing/#teams) plan, Netlify can use your third-party JWT for the content gating described above.

From your site dashboard, go to **Settings > Access control > Visitor access**, and set the JWT secret that you receive or set from the JWT authentication service you’re using. We need it to verify the signature on your tokens:

![Set JWT Secret](/img/blog/set_secret.png)

## Identity sample site

I’ve set up an example site with Identity and JWT for you to play with at [https://netlify-identity-example.netlify.com/](https://netlify-identity-example.netlify.com/). The routes are described on the page, and the [repo](https://github.com/futuregerald/netlify_identity_example) is also open so you can see [the code](https://github.com/futuregerald/netlify_identity_example). The site is plain HTML/CSS/JavaScript. You’ll notice I do have some custom JavaScript there for providing feedback to the user on their login state and for handling login and logout. I’ve also used event handlers to update page content using plain JavaScript. The site also has the Netlify CMS setup so you can test authentication, but it otherwise will not allow you to create or modify any content.

Now have fun and enjoy Netlify Identity and JWT. If you have any questions, just [contact our Support team](https://www.netlify.com/support/), and one of my teammates or I will help you out!
