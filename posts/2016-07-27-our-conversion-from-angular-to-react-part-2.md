---

title: Converting Angular to React, Exploring The Basics
author: Brian Douglas
image: /img/blog/react-dark-logo.svg
format: blog
short_title: Exploring Basics with React
description: Converting Angular controllers to React components can be straight forward if you follow a few rules and tricks.
thumbnail: thumbnails/raising-both-hands-in-celebration.png
cmsUserSlug: ""
date: 2016-07-27
tags:
- react
- angular
---

From my experience, Angular Controllers can easily get very heavy with
the logic and complicated to tests, due to a large amount of direct
dependency injection. React solves this elegantly with the use of
Components that are aware of props and states.

At Netlify our app was Angular 1.x and with a completely redone [Angular 2](https://www.youtube.com/watch?v=fBeuaDOBk3s) on the horizon, we got to thinking about trying something
new. In the <a href="/blog/2016/07/26/our-conversion-from-angular-to-react/">previous post</a>, I explored the steps we took to prepare our
app for React and in this post I will show some basic things in React.

React prides itself in being the V in MVC, so the need for a separate
controller is not necessary, due to its [declarative approach](http://stackoverflow.com/questions/33655534/difference-between-declarative-and-imperative-in-react-js). All the
logic lives in the component or an import from a third party dependency. Making everything declarative makes working in the UI less about being a React expert and more about simply knowing your Frontend UI Components.

React code can also be written in the latest ES Next JavaScript, and
it does not require you to learn another syntax otherwise. This is great because all modern browsers [support](https://kangax.github.io/compat-table/es6/) the majority of this new JavaScript syntax.

I [interviewed Kent C. Dodds](https://www.thisdevelopingstory.com/tds-56-kent-c-dodds) a few weeks back and we chatted a bit about the transition
from Angular to React. He gave me the revelation that React is actually
helping us be better JavaScript developers. This thought is valid,
because the majority of the UI manipulation is happening in
JavaScript.

For example rendering a list of items in React requires you to use the
JavaScript map function instead of the Angular shorthand `item in
items`.

```
import React from "React";
import Item from "ItemComponent";

class ItemGrid extends React.Component {
  ...

  render() {
    const {items} = this.props;

    return (
      <div>
        {items.map(this.renderItem)}
      </div>
    );
  }

  renderItem(p) {
    return (
      <div key={p.id}>
        <Item content={p} />
      </div>
    );
  }
}
```

Within the `render()` is JSX and we will cover the wonders this in the
next post.

## Props and State

Props and State can be thought as attributes the Component is aware of.
The difference between the two; Props are immutable and State is
mutable.

Use the newer ES2015 classes

```
import React from "react";

class Item extend React.Component {
  // State gets set in the class constructor and accessible
  // by calling this.state
  constructor(props) {
    super(props)
      this.state = {title: "Item Component"}
  }

  // Props get passed to the Item Component on declaration
  // and accessible using the this.props
  static propTypes = {
    content: React.PropTypes.string,
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.props.content}
      </div>
    );
  }
}
```

## Lifecycle Methods

Lifecycle methods are various methods executed at specific points in the
components life. This gives you the ability track and manipulates state
during specified times that are, but not limited to mounting/unmounting, prop changes, and component updates.

For example, componentWillMount is available to you to perform
asynchronous actions while the Component is rendering on the page. This
allows you to fetch and manipulate data in preparation for this render.

```
import React from "react";
import fecthApiData from "special-library"

class Item extend React.Component {
  ...

  componentWillMount() {
    fecthApiData.then((res) => {
      // setState is method avaiable in React to mutate the state
      this.setState({
        imageUrl: res.data
      });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.props.content}
        <img src={this.state.imageUrl} />
      </div>
    );
  }
}
```
**This is a simple example of data fetching, In our React code we now fetch the builds asynchronously using [redux](https://github.com/reactjs/redux) and [redux-thunk](https://github.com/gaearon/redux-thunk)
and pass it to the Components using a prop.*

## No More $scope

Outside of States, Props, and LifeCycle Methods, you are essentially
writing JavaScript when writing React. There is not many shortcuts and hidden
syntax. The idea that React can be so declarative while writing has kept
me coming back for more.

The idea of attaching things to a global `$scope` to have access
and manipulate is no longer needed, now everything declared either
using state or passing a prop -- What you see is what you get.

Read our next post, <a href="/blog/2016/08/17/converting-angular-to-react-jsx/">all about JSX</a>.
