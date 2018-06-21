---
title: 'JAMstack architecture on Netlify: How Identity and Functions work together'
author: Matt Biilmann
tweet: ''
image: /img/blog/functions-identity@2x.png
no_overlay: false
short_title: Identity and Functions on Netlify
tags:
  - tutorial
  - functions
  - identity
format: blog
description: >-
  In this tutorial we'll take a deeper look at how to use Functions together
  with Netlify’s Identity feature to access and update user data, and allow your
  users to send you a message that you receive directly on Slack. All it takes
  is a little bit of glue code to bring the services together.
date: '2018-03-29'
draft: false
---
AWS Lambda functions can change how we think about development. Instead of starting projects as large monolithic database driven application, we can start with a simple static front-end, and use serverless functions to glue together different microservices to build powerful real-world applications. A key part of this is user management and permissions.

In this tutorial we'll take a deeper look at how to use Functions together with Netlify’s Identity feature to access and update user data, and allow your users to send you a message that you receive directly on Slack. All it takes is a little bit of glue code to bring the services together. 

You'll learn how to call AWS Lambda functions from your React front-end, how to access and update user metadata from your AWS Lambda functions, and how to set up event-based functions triggered by Identity actions like new sign ups.

This tutorial requires working knowledge of React and the HTML5 `fetch` API, as well as a [Slack](https://slack.com) workgroup where you have admin access.

We’ll build out a small service that lets authorized site users send up to one message per hour from a form on your site to a channel in your Slack workgroup, powered by Netlify Identity and an integrated AWS Lambda function.

## Sending to Slack

This tutorial will be based on our [Create-React-App-Lambda](https://github.com/netlify/create-react-app-lambda) boilerplate. To follow along, start by creating a new site based on it:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/create-react-app-lambda)

Before getting into the code, lets start by creating a Slack webhook integration: <https://my.slack.com/services/new/incoming-webhook/>

Once your have a URL for the Slack webhook, go to the build settings for your new Netlify site and set an environment variable called `SLACK_WEBHOOK_URL` pointing to your new Slack hook.

Now back the code. Clone your new GitHub repository locally and follow the README to install dependencies and setup your local dev environment.

You’ll see that the new repository has a `src/lambda` folder. Each Lambda function we add under `src/lambda/<name>.js` will automatically be exposed as a web endpoint under the site-relative path `/.netlify/functions/<name>`.

In this case we'll remove the default `hello.js` and add a simple `slack.js` function that allows anyone to post messages to your SLACK_WEBHOOK_URL:

```js
const fetch = require("node-fetch");
const slackURL = process.env.SLACK_WEBHOOK_URL;
export function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 410, body: "Unsupported Request Method" });
  }
  try {
    const payload = JSON.parse(event.body);
    fetch(slackURL, {
      method: "POST",
      body: JSON.stringify({ text: payload.text })
    }).then(() => {
      callback(null, { statusCode: 204 });
    }).catch((e) => {
      callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
    })
  } catch (e) {
    callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  }
}
```

At this point we're still not contemplating Identity or roles. Let’s set up a form to let anyone ping us in Slack, by editing your `App.js`:

```js
import React, { Component } from 'react';
import './App.css';
class SlackMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, text: null, error: null, success: false};
  }
  handleText = (e) => {
    this.setState({text: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    fetch('/.netlify/functions/slack', {
      method: "POST",
      body: JSON.stringify({
        text: this.state.text
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {throw(err)});
      }
    })
    .then(() => this.setState({loading: false, text: null, success: true, error: null}))
    .catch(err => this.setState({loading: false, success: false, error: err.toString()}))
  }
  render() {
    const {loading, text, error, success} = this.state;
    return <form onSubmit={this.handleSubmit}>
      {error && <p><strong>Error sending message: {error}</strong></p>}
      {success && <p><strong>Done! Message sent to Slack</strong></p>}
      <p>
        <label>Your Message: <br/>
          <textarea onChange={this.handleText} value={text}></textarea>
        </label>
      </p>
      <p>
        <button type="submit" disabled={loading}>{loading ? "Sending Slack Message..." : "Send a Slack Message"}</button>
      </p>
    </form>;
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slack Messenger</h1>
        </header>
        <SlackMessage/>
      </div>
    );
  }
}
export default App;
```

Commit the changes and push to Git, and now your new function is live. Visit your site URL and by now you should be able to send yourself Slack messages!

You can find the full code for this step of the tutorial here:
<https://github.com/biilmann/testing-slack-tutorial/tree/v1-sending-to-slack>

## Adding Identity

Right now your `slack.js` method is open for any user, and we wanted to allow only signed in users to post to our channel.

Netlify's Identity service lets you add signup and login functionality to any web project, and can issue [JSON Web Tokens](https://www.netlify.com/blog/2018/01/23/getting-started-with-jwt-and-identity/) (JWTs) representing your users.

Identity is a fundamental aspect of many types of website interaction. It helps you answer questions like: Who just made this order? Who signed up for a subscription? Who posted an update? Does the user trying to update my website have the right roles and permissions? Or in this case, “Is this person allowed to send to my Slack channel?”

A typical JWT from Netlify's Identity service will represent a user as a JSON object of this format:

```json
{
  "sub": "<the-id-of-the-user>",
  "email": "jon.doe@example.com",
  "user_metadata": {
    "full_name": "Jon Doe"
  },
  "app_metadata": {
    "authorization": {
      "roles": ["admin"]
    }
  }
}
```

For this example we'll use [Netlify's Identity widget](https://github.com/netlify/netlify-identity-widget) to add sign-in functionality to your project. We do this by adding the library as a dependency:

```
yarn add netlify-identity-widget
```

Now add the line,

```
import netlifyIdentity from "netlify-identity-widget"
```

 at the top of your `App.js` file, and then modify your `App` component like this:

```js
class App extends Component {
  componentDidMount() {
    netlifyIdentity.init();
  }
  handleIdentity = (e) => {
    e.preventDefault();
    netlifyIdentity.open();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slack Messenger</h1>
        </header>
        <p><a href="#" onClick={this.handleIdentity}>User Status</a></p>
        <SlackMessage />
      </div>
    );
  }
}
```

If you run this locally, you'll see a link in the header that lets us open the Identity widget. From there, users can either log in or log out depending on status.

Before this will work, however, you'll need to add an identity service to your site. You can do this from the Identity tab in your Netlify site dashboard.

![Enabling Identity on the Netlify App](/img/blog/enable identity @2x.png)

Now you have a brand new identity service for your site that you can start using straight away. Make sure to deploy your site again, and once it's live, you should be able to sign up and get a confirmation mails from your new identity service. Follow the link and create your first user.

## Restricting Access

Now that you have an identity service, you can start using it to restrict access to your Slack function.

One way to achieve that is through Netlify's JWT-based visitor access control, but for this example we want to do it with JavaScript in the Lambda function.

Before we can do that, we need to make sure we're passing along the user's JWT. Add this new method to your `SlackMessage` component in `App.js`:

```js
generateHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (netlifyIdentity.currentUser()) {
    return netlifyIdentity.currentUser().jwt().then((token) => {
      return { ...headers, Authorization: `Bearer ${token}` };
    })
  }
  return Promise.resolve(headers);
}
```

This checks if there's a logged in user with `netlifyIdentity.currentUser()` and then uses the `jwt` method to get a fresh JWT for the user that we can set as a bearer token.

To hook that up with our function call, we alter `handleSumbit`, wrapping its `fetch` method like this:

```js
handleSubmit = (e) => {
  e.preventDefault();

  this.setState({ loading: true });
  // Make sure we use the right headers when sending to slack.js
  this.generateHeaders().then((headers) => {
    fetch('/.netlify/functions/slack', {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: this.state.text
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {throw(err)});
      }
    })
    .then(() => this.setState({loading: false, text: null, success: true, error: null}))
    .catch(err => this.setState({loading: false, success: false, error: err.toString()}))
  });
}
```

When your function endpoint receives these new headers, Netlify's Functions service will automatically detect any bearer token and verify the signature. If it's a valid token issued by the Identity instance linked to the site, Netlify will add the user's claims in a `context.clientContext.user` object.

You can use this object to add a little guard clause to the `handler` method in `slack.js`, blocking access for users who haven’t logged in:

```js
const claims = context.clientContext && context.clientContext.user;
if (!claims) {
  return callback(null, { statusCode: 401, body: "You must be signed in to call this function" });
}
```

You can also access the user information provided in `context.clientContext.user` to include the sender email address in the Slack message. In this case, we’ll put it in a Slack [message attachment](https://api.slack.com/docs/message-attachments), adding it to the body of the POST request:

```js
fetch(slackURL, {
  method: "POST",
  body: JSON.stringify({
    text: payload.text,
    attachments: [
      { "text": `From ${claims.email}` }
    ]
  })
})
```

Commit these changes and push to Git. Once the new version of the site is live, only logged-in users will be able to send a message to your Slack channel, and the sender email will appear with every message.

You can find the full code for this step of the tutorial here:
<https://github.com/biilmann/testing-slack-tutorial/tree/v2-only-logged-in-users>

## Updating User Data with the Identity API

We’ve shown how your Lambda function can receive logged-in user data, but it also has permission to update that data. (This only works when the Lambda function and the Identity instance are on the same site.)

Let’s use this capability to rate limit your users so they can’t spam your channel with a constant barrage of messages.

Each user in Netlify Identity has `user_metadata` and `app_metadata` attributes. The `user_metadata` can be updated by the user directly through the identity API, but the `app_metadata` can only be updated by an admin user.

For our purpose, we want to add a `last_message_at` attribute to the user's `app_metadata` so we can limit each user to one message per hour.

In addition to the `clientContext.user` object we accessed earlier, `clientContext` also exposes an `identity` attribute with a `token` and a `url` property.

Netlify's Identity service is a managed version of the open source GoTrue API. The `url` property exposes the URL of the instance associated with the current site.

The `token` is a short lived admin JWT that authorizes our function to make calls to the GoTrue API as an admin.

Add this IdentityAPI class, along with two utility methods for our `slack.js` function:

```js
class IdentityAPI {
  constructor(apiURL, token) {
    this.apiURL = apiURL;
    this.token = token;
  }

  headers(headers = {}) {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
      ...headers
    };
  }

  parseJsonResponse(response) {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject({ status: response.status, json });
      }

      return json;
    });
  }

  request(path, options = {}) {
    const headers = this.headers(options.headers || {});
    return fetch(this.apiURL + path, { ...options, headers }).then(response => {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.match(/json/)) {
        return this.parseJsonResponse(response);
      }

      if (!response.ok) {
        return response.text().then(data => {
          return Promise.reject({ stauts: response.status, data });
        });
      }
      return response.text().then(data => {
        data;
      });
    });
  }
}
```

This is a mini API client that lets us authorize and send requests to the underlying GoTrue API endpoint for our site.

Add these two helper methods to `slack.js` as well:

```js
/*
  Fetch a user from GoTrue via id
*/
function fetchUser(identity, id) {
  const api = new IdentityAPI(identity.url, identity.token);
  return api.request(`/admin/users/${id}`);
}

/*
 Update the app_metadata of a user
*/
function updateUser(identity, user, app_metadata) {
  const api = new IdentityAPI(identity.url, identity.token);
  const new_app_metadata = { ...user.app_metadata, ...app_metadata };

  return api.request(`/admin/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({ app_metadata: new_app_metadata })
  });
}
```

These helper methods are all you need to interact with the underlying GoTrue API of your Identity service from within your Lambda function.

Now let’s update the main handler to start enforcing only one message per hour:

```js
const oneHour = (60 * 60 * 1000);
export function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 410, body: "Unsupported Request Method" });
  }

  const claims = context.clientContext && context.clientContext.user;
  if (!claims) {
    return callback(null, { statusCode: 401, body: "You must be signed in to call this function" });
  }

  fetchUser(context.clientContext.identity, claims.sub)
    .then((user) => {
      const lastMessage = new Date(user.app_metadata.last_message_at || 0).getTime();
      const cutOff = new Date().getTime() - oneHour;
      if (lastMessage > cutOff) {
        return callback(null, { statusCode: 401, body: "Only one message an hour allowed" });
      }

      try {
        const payload = JSON.parse(event.body);

        fetch(slackURL, {
          method: "POST",
          body: JSON.stringify({
            text: payload.text,
            attachments: [
              { "text": `From ${user.email}` }
            ]
          })
        }).then(() => (
          updateUser(context.clientContext.identity, user, { last_message_at: new Date().getTime() })
        )).then(() => {
          callback(null, { statusCode: 204 });
        }).catch((err) => {
          callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
        })
      } catch (e) {
        callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
      }
    })
}
```

There are a few small additions here: 

1. We wrap our Slack message call in a `fetchUser` method. The claims in the JWT have a lifetime and in this case we want to make sure we get the latest value of the `last_message_at` property, so we fetch it directly from the GoTrue API.
2. We use this value  to block requests from users who already sent a message within the last hour.
3. Once we've sent the Slack message, we update the user with the new `last_message_at` value.

Update your app and deploy the changes, and now users will only be able to send you one message per hour! Much better for a busy developer!

You can find the full code for this step of the tutorial here:
<https://github.com/biilmann/testing-slack-tutorial/tree/v3-one-message-an-hour>

## Identity Hooks

How about knowing when a new user signs up for your Slack messenger service?

You can trigger function calls when certain Netlify events happen, like when a deploy completes successfully or a form submission triggers. The following events are currently available for the Identity service:

* `identity-validate`: Triggered when a user tries to sign up, but before confirmation
* `identity-signup`: Triggered when a user confirms their sign up
* `identity-login`: Triggered when a user logs in

To make a function that runs every time a user signs up, create a new file in `src/lambda` called `identity-signup.js`. The filename alone is all you need to connect the hook. Event-triggered functions work by matching the function file-name to the name of the event.

Add this code to your new `src/lambda/identity-signup.js` to send a notification to Slack every time a user joins:

```js
const fetch = require("node-fetch");
const slackURL = process.env.SLACK_WEBHOOK_URL;

export function handler(event, context, callback) {
  const payload = JSON.parse(event.body);
  const user = payload.user;

  fetch(slackURL, {
    method: "POST",
    body: JSON.stringify({
      text: `New signup: ${user.email}`
    })
  }).then(() => {
    callback(null, { statusCode: 200, body: '{}' })
  }).catch((err) => {
    callback(null, { statusCode: 500, body: '{"msg": "Error Reporting to Slack"}' })
  });
}
```

That's all it takes! Push this to Git and try to sign up with a new user and you should get a Slack message once you confirm the signup.

You can find the full code for this step of the tutorial here:
<https://github.com/biilmann/testing-slack-tutorial/tree/v4-identity-signup-hook>

## Going Further

The Identity hooks have one last trick up their sleeve: you can return new values for `app_metadata` and `user_metadata` in the webhook response.

This can be used to enrich the user metadata. Let’s say you have an internal directory of people who should automatically get the `admin` role. You could add code to look up the user from `identity-signup`, and if it's an admin, change the response to:

```js
callback(null, {
  statusCode: 200,
  body: JSON.stringify(
    {app_metadata: {authorization: {roles: ["admin"]}}}
  )
})
```

By doing this, all new signups matching users in your internal directory will automatically get the `admin` role set and you can now use Netlify's [JWT-based visitor control](https://www.netlify.com/docs/visitor-access-control/) to gate access to content or verify the admin role within your Lambda functions or external microservices.

Want to have more fun with functions? Check out [this tutorial](http://www.netlify.com/blog/2018/03/19/create-your-own-url-shortener-with-netlifys-forms-and-functions/) on building a URL shortener or [this great article](https://macarthur.me/posts/building-a-lambda-function-with-netlify/) on how to process a payment with Stripe.
