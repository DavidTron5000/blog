---
title: How to Integrate Netlify’s Form Handling in a React App
author: Irene Morente
image: /img/blog/react.svg
short_title: How to Integrate Netlify’s Form Handling in a React App
tags:
  - React
  - Form handling
  - How-to
  - Tutorial
format: blog
description: >-
  Netlify comes with some handy, built-in features to process form submissions
  without having to write any server-side code. Learn how to integrate them in
  your React app.
date: 2017-07-20T05:44:45.000Z
---

Netlify comes with some handy, built-in features to process form submissions without having to write any server-side code. Form handling was historically a paid feature but, with the new super-powered free tier, it is now available for all sites for free. 🎉

If your site includes an HTML form, you can add a `netlify` attribute to the form tag and start receiving submissions right away (learn more in the [form handling docs](https://www.netlify.com/docs/form-handling/)).

In a React app, however, just adding a `netlify` attribute to a JSX form won’t work [sad trombone].

The post-processing bots that look for the `netlify` attributes when a site is deployed only know how to parse HTML. Until they evolve enough to detect forms rendered with JavaScript, we need to give them a little extra help.


## Form Handling with a Stateless React Form

For simplicity’s sake, we’ll use [React’s single file example](https://facebook.github.io/react/downloads/single-file-example.html) as starting point for our very basic React contact form.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      ReactDOM.render(
        <form name="contact" method="post">
          <p>
            <label>Your Name: <input type="text" name="name"/></label>
          </p>
          <p>
            <label>Your Email: <input type="email" name="email"/></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>,
        document.getElementById("root")
      );

    </script>
  </body>
</html>
```

You will not want to use this setup for your production app, but the steps for integrating form handling are the same for any React app you host on Netlify.

<a id="step-1"></a>

**1. Add a static HTML version of the form to your site**

In any HTML file in your site folder, include an HTML form with the `netlify` attribute and the input fields you want Netlify to process.

For this example, we’ll just add it right after the opening `<body>` tag in our index HTML file.

```html
<!-- A little help for the Netlify post-processing bots -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
```   

Besides the `netlify` attribute, we’ve also added a `netlify-honeypot` attribute to avoid showing a captcha when a user submits the form.

Note that form labels are optional here since the HTML form is hidden and our site visitors won’t interact with it directly.

<a id="step-2"></a>

**2. Add a hidden `form-name` field to your JSX form**

In the JSX form, include an `<input type="hidden" name="form-name" value="the-name-of-the-html-form" />`.

Our example HTML form name is `contact`, so we’ll add:

```html
<input type="hidden" name="form-name" value="contact" />
```

Our final example now looks as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Contact</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>

    <!-- A little help for the Netlify bots if you're not using a SSG -->
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

    <div id="root"></div>
    <script type="text/babel">

      ReactDOM.render(
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Your Name: <input type="text" name="name"/></label>
          </p>
          <p>
            <label>Your Email: <input type="email" name="email"/></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>,
        document.getElementById("root")
      );

    </script>
  </body>
</html>
```

To see it in action, you can [download the example zip file](https://github.com/imorente/netlify-form-handling-integration/archive/react-form-example.zip) and drag & drop it onto your [Netlify dashboard](https://app.netlify.com) to deploy it.

_Update_

**If you’re using a static site generator** like [Gatsby](https://www.gatsbyjs.org) or [Phenomic](https://phenomic.io), or tools like [react-snapshot](https://www.npmjs.com/package/react-snapshot) that generate a static snapshot of your site, the build tool will generate the static HTML form automatically for you. That means you can skip <a href="#step-1">step 1</a> and add the `netlify` attributes to your JSX form instead.

Gatsby strips out input fields that are not included in the JSX form, so you will still need to add the `form-name` hidden input field as described in <a href="#step-2">step 2</a>.
	
```html	
<form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
  {/* You still need to add the hidden input with the form name to your JSX form */}	
  <input type="hidden" name="form-name" value="contact" />	
  ...	
</form>
```

To see an example of a basic contact page using Gatsby, you can [check out the code on GitHub](https://github.com/imorente/gatsby-netlify-form-example), or use the quick [deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/imorente/gatsby-netlify-form-example) option to get your own copy.

## Form Handling with a Stateful React Form

Let’s replace the JSX form in the previous example with a stateful React component.

The juicy bit is the `handleSubmit` function in the `ContactForm` component.

```javascript
<script type="text/babel">

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  class ContactForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: "", email: "", message: "" };
    }

    /* Here’s the juicy bit for posting the form submission */

    handleSubmit = e => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...this.state })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

      e.preventDefault();
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
      const { name, email, message } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              Your Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message" value={message} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      );
    }
  }

  ReactDOM.render(<ContactForm />, document.getElementById("root"));

</script>
```

Like before, you can [download the zip file](https://github.com/imorente/netlify-form-handling-integration/archive/stateful-react-form-example.zip) with this example and drop it onto your [Netlify dashboard](https://app.netlify.com) to deploy it.

## Troubleshooting tips

1. **The form isn’t listed in the Forms section of the Netlify dashboard.** The most likely cause is that the Netlify bots haven’t found a static HTML version of the form. Make sure somewhere in your site folder there’s an HTML form with the right `name`, and a `netlify` or `data-netlify` attribute. If you’re using Gatsby, or any other static site generator, try browsing your site with Javascript disabled – if you can’t see the form in the source code, the Netlify bots probably won’t either.

2. **The form is listed in the Forms section but there are no submissions.** Make sure the POST request includes the `form-name` parameter with the correct name of the form.

3. **There are submissions but they are blank.** Make sure the input fields in the HTML version of the form have a `name` attribute, and the parameters sent in the POST request have the same names as the input fields in the HTML form.

## Key take-aways

1. **In any HTML file** in your site folder, add an HTML form with the `netlify` attribute and the input fields you want Netlify to process.
2. **In the JavaScript form**, add a hidden field called `form-name` with the name of the HTML form. Alternatively, if you’re using AJAX to submit the form, send a POST request to any path on your site. The request should include the header `"Content-Type": "application/x-www-form-urlencoded"`, and the `form-name` attribute in the body. Make sure the attributes in the request body are URL-encoded to match the content-type.
3. Happy form handling!
