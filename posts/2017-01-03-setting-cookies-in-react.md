---
title: Setting Cookies in React
author: Brian Douglas
image: /img/blog/Chocolate_Chip_Emoji.png
format: blog
short_title: Setting Cookies in React
description: >-
  Setting up cookies is something pretty trivial in web development. In this
  post I walk through the process doing it in React.
date: 2017-01-19T13:32:52-08:00
tags:
  - react
---

On first login to Netlify we present you with a wonderful onboarding modal explaining briefly what we are all about.

![website screenshot](/img/blog/welcome-carousel.png)

I was given the task to only present this modal to the new users, but not to existing users. My first thought was to add a check to see if a user has exactly 1 site deployed to Netlify, then this onboard modal. This was not a great solution due to most new users onboarding with Netlify via our [Sign Up](https://app.netlify.com/signup) flow and that coaches the user through a path to deployment of your first site, which is the real purpose of the modal - to provide next steps after your first deploy to Netlify. This also does not prevent the modal from appearing on future logins as well.

From some quick Googling, I found that I could set a cookie to solve my problem. I was previously aware of cookies and how they are used, but can say throughout my development career, I have not actually needed to set one in a project for any reason yet.

I did stumble on this, at the time, unanswered [stackoverflow question](http://stackoverflow.com/questions/39826992/how-can-i-do-to-set-cookie-in-the-react-code), and took note of the complexity in the approach.

I then found the [react-cookie](https://github.com/thereactivestack/react-cookie) library that does a great job astracting access to cookies from the document with approachable functions and options. After a quick read through the [README](https://github.com/thereactivestack/react-cookie/blob/master/README.md), I was sold and stared using it.

```js
import cookie from "react-cookie";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {onboarded: cookie.load("onboarded")};
  }

  handleOnboardFlag = () => {
    cookie.save("onboarded", true, {path: "/"});
  };
  ...
}
```

I setup the Component's state based on the existance of the onboarded cookie I created. I then went one step further and wanted to exclude any users that might have
been with Netlify long enough to know its features and not need our new
onboarding carousel. I have access to the database that backs the
Netlify JAMstack app, but trying to stay true to the front-end I opted
to only solve this on the client.

Next I created an addional check that limits the onboarding check for users
who login is the same as their account creation date. This prevents
experienced users from seeing the onboarding window, but only checks
whether new
users have been onboarded that same day they signed up.

I also used [moment](http://momentjs.com/)'s diff function to identify if the
user sign up less than a day ago and compare that to onboarded cookie.
The boolean return will trigger the the onboard modal and set the cookie
to true when dismissed.

```js
render() {
  const {user} = this.props;

  const discoveryPhase = moment(user.get("last_login")).diff(user.get("created_at"));
  const isNewUser = !this.state.onboarded && moment.duration(discoveryPhase).asDays() < 1;

  return (
    <OnboardingSlides
      onHide={this.handleClose}
      onOnboardCompletion={this.handleOnboardFlag}
      isShowing={!isNewUser}
    />
  );
}
```
Now the result was rather quick, but the path to get here was met with a
bit of discovery. Thanks to React I can get an app to
production rather quickly and because of this I can focus on more
elegant solutions for common problems on the web, like 🍪s.
