---
title: Introducing Structured Redirects and Headers
author: David Calavera
short_title: Structured Redirects and Headers
tags:
  - redirects
  - headers
  - cdn
format: blog
description: >-
  Today, we’re introducing a more structured approach to declaring redirects and
  header rules for your projects.
date: 2017-10-17T15:55:23.746Z
draft: false
---

Two user-favorite features are getting a major upgrade. Today, we’re introducing a more structured approach to declaring redirects and header rules for your projects, as well as the ability to add custom headers and signatures to your proxy redirects. 

Though we’ll continue supporting the current configuration files, updating to the new format will make it easier to extend files as these features continue to grow. 

The new structured rules live in your `netlify.toml`  file within your repository. That file is uploaded with the rest of your site every time you deploy.

Each structured redirect rule is a table into an array. You can add as many redirects to the file as you'd like.


    # COMMENT: These are two basic redirect rules
    # COMMENT: This is an abbreviated syntax for rules that fit in one line
    redirects = [
      {from = "/old-path", to = "/new-path"},
      {from = "/*", to = "/index.html", status = 200}]
      
    # COMMENT: These are two rules with all the fields expanded
    # COMMENT: This is an expanded syntax for rules that won't fit in one line
    [[redirects]]
      from = "/old-path"
      to = "/new-path"
      status = 301
      force = false
      query = {path = ":path"} # COMMENT: apply this rule for /old-path?path=example
      conditions = {Language = "en", Country = "US"}
      
    [[redirects]]
      from = "/*"
      to = "/index.html"
      status = 200
      force = true # COMMENT: ensure that we always redirect

Each structured header rule is also table into an array. Allowing you to add as many header rules as you'd like.


    # COMMENT: This is a simple header rule
    # COMMENT: This is an abbreviated syntax for rules that fit in one line
    headers = [
      {for = "/*", values = {X-Custom-Header = "foo", X-Other-Header = "bar"}}]
      
    # COMMENT: These are two rules with all fields expanded
    # COMMENT: This is an expanded syntax for rules that won't fit in one line
    [[headers]]
      for = "/"
      [headers.values]
      # COMMENT: Multi-key header rules are expressed with multi line strings
      Link = '''
      </style1.css>; rel=preload; as=stylesheet, \
      </style2.css>; rel=preload; as=stylesheet, \
      </style3.css>; rel=preload; as=stylesheet''' # Headers for H2 Server Push
      X-Custom-Header = "foo"
      
    [[headers]]
      for = "/*"
      [headers.values]
      X-Other-Header = "bar"


## Custom Headers in Proxy Redirects

Many of you asked for a way to implement custom headers in proxy redirects, so you could do something like send a header to identify that requests are coming from Netlify. With the new structured redirect rules, you can now add a map with custom headers for your proxy redirects, and Netlify will send them with every request.


    [[redirects]]
      from = "/api"
      to = "https://my-api.example.com"
      status = 200
      force = true
      headers = {X-From = "netlify", X-Custom-Token = "my custom token"}


## Signed Proxy Redirects

To give you more confidence about the origin of requests that arrive to a proxied server, Netlify has added the keyword `signed` so you can sign all proxy requests with a [JSON Web Signature](https://en.wikipedia.org/wiki/JSON_Web_Signature) (JWS). To enable JWS on your requests Netlify requires a secret token. You can set that token in your site’s environment, and reference it in the redirect rule.


    [[redirects]]
      from = "/api"
      to = "https://my-api.example.com"
      status = 200
      force = true
      signed = "NAME_OF_MY_ENVIRONMENT_VARIABLE"


## Migrating to the new structured configuration

You can use the Netlify [playground](https://play.netlify.com) to convert your current redirect and header rules to this new format. Select the kind of rules you want to translate and copy your rules in the online editor. Select  `Test rules`, and if your configuration is correct, we’ll translate it directly for you.
