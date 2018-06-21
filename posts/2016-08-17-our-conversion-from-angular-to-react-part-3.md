---

title: Converting Angular to React, JSX
author: Brian Douglas
image: /img/blog//react-heart.svg
format: blog
short_title: Exploring Basics with React and JSX
description: Converting Angular templates to React components can be straight forward if you follow a few rules and tricks.
thumbnail: /uploads/raising-both-hands-in-celebration.png
cmsUserSlug: ""
date: 2016-08-17
tags:
- react
- angular
---

React introduces an entirely new markup, [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html). JSX is short for JavaScript XML and resembles XMl in a way but operates very similar to HTML.

I very briefly mentioned JSX in the first post of this series, and
provided the following example:

```
// jsx sample

render() {
  return (
    <Form>
      <FormRow>
        <FormLabel />
        <FormInput />
      </FormRow>
    </Form>
  );
)
```

The idea of including markup amongst JavaScript seemed foreign and even began a point of contention for me. Inline
markup however, is no stranger to Angular with Directives and actually provides an
elegant solution for working Components. The idea is to have everything
about your Component encapsulated into one file, including styles.

JSX is the key piece that makes React ideal constructing UI.

![open-source-modal](/img/blog/open-source-modal.png)

```
// OpenSource Modal Component

import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import heartIcon from "../../images/heartIcon.svg";

export default class OpenSource extends React.Component {
  render() {
    const {show, close, onSubscribe} = this.props;

    return (
      <Modal onHide={close} show={show} className="openSourceModal">
        <Modal.Body>
          <h1>We <img src={heartIcon} alt="Heart Icon"/> Open Source</h1>
          <p>If you are working on open source or non-commercial projects, you can get a full pro plan for free!</p>
          <button onClick={onSubscribe}>Upgrade for Free</button>

          <p className="help-block">
            Free plans are a gift to the open-source community and should not be used for commercial projects. We reserve the right to revoke any free plan that is not an open-source or developer project at any time
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}
```
All the code needed to make the above modal work is encapsulated in the
OpenSource component. This component can be moved and reused wherever we
choose to use it thanks to the use of ES2015 exports declarations before
the `class`.

The requirements to export JSX from React components only requires a
`render()` function that returns markup. Note that I am using a pre-built
`<Modal />` component from the React Bootstrap library and passing children
elements using standard HTML tags and attributes.

The only difference in my markup to standard HTML is the use of
`className` and `class`. Due to this being JavaScript, JSX opted to use
something other than `class` attributes to avoid name collisions.

So going back to the comparison to Angular, Most of this can
be done in an [Angular
Directive](https://docs.angularjs.org/guide/directive) with some inline
HTML. The only drawback would be the amount of code written boiler needed for connecting
Angular Controllers, Templates, and Modules as the Directive grows to
become more complex.

```js
// example of Angular Directive taken from their docs

angular.module('docsTabsExample', [])
.directive('myPane', function() {
  return {
    require: ['^^myTabs', 'ngModel'],
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, controllers) {
      var tabsCtrl = controllers[0],
          modelCtrl = controllers[1];

      tabsCtrl.addPane(scope);
    },
    templateUrl: 'my-pane.html'
  };
});
```
The beauty of React is most of the Tribal Knowledge lives within the
confines of JavaScript and not so much React. I have been using Angular
for over a year and still have to look at the documentation to figure
out what short-hand boilers are needed in my Directive declarations.

Today at Netlify we are using React and loving it. Not only has it
enabled our Frontend team to create great UIs, it has also enabled our
Designers as well. The entirety of this Component was actually styled by
our Designer, thanks to the clear layout JSX provided for them.

As a reminder from the <a href="/blog/2016/07/27/converting-angular-to-react-exploring-the-basics/">last post</a>, we also don't need to attached $scope
variables for data access in our markup. Everything done in JavaScript
is available within the confines of the Component.

Hopefully these last few posts have been enlightening. If you are using
React with Netlify, lets us know on <a href="http://ctt.ec/8Qao8">Twitter</a>

If you are not, we wrote a post just for you and how you can <a href="/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/">deploy
React on Netlify in 30 seconds</a>

