---

title: "3 of the Most Common Errors in React"
author: Brian Douglas
image:
format: blog
short_title: Common errors in React
description: React also does a great job with returning descriptive error messages when you make mistakes while creating your application. This post will walk through 3 of the most common error messages you will come across when writing React code.
thumbnail:
cmsUserSlug: ""
date: 2016-11-10
tags:
  - react
  - javascript
  - debugging
---

Since I began programming I have been writing errors in my code. It is well understood in the programming community that we will write bugs, but most errors in our code come up frequently enough that we can identify the solution rather quickly. React is a JavaScript plugin and no different when it comes to frequent errors. React also does a great job with returning descriptive error messages when you make mistakes while creating your application.

I am going to go through 3 of the most common error messages you will come across when writing React code, but before I do I am going to briefly describe the application I created.

It is a Nicolas Cage page and display the many faces of Cages. There is nothing too crazy, I have one Component call TheCage that displays his charming personality.


![website screenshot](/img/blog/facethecage.png)

## 1. Returning Invalid React Component

The first common error I want to go through  is pretty straight forward and happens quite a bit for me when I write <a href="/blog/2016/09/27/refactoring-towards-pure-components-in-react/">presentational components</a>. The React team has done a great job providing detailed error messages to describe the problem.

Error Message:
```
warning.js:36 Warning: React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components). Check the render method of `App`.
```

TheCage component:

```js
// src/TheCage.js
import React from "react";
import nicks from "./lib/nicks.js";

const TheCage = () => {
  return (
    <div className="Cage">
      <div className="cages">
        {nicks.map((nick, i) => (
          <img key={i} className="nick" alt={nick.alt} src={nick.image} />
        ))}
      </div>
    </div>
  );
}
```

React is complaining about what is being returned or rather what is not being returned.  The error message is letting us know I am returning should be a string or a ReactClass (for composite components), and then it recommends checking the render method of `App`. As you can see below, we do have valid syntax in our render method, but the problem is not here it’s in our TheCage components.

The App Component:

```js
    // src/App.js
    class App extends Component {
      render() {
        return (
          <div className="App">
            <h1>Face the Cage</h1>
            <TheCage />
          </div>
        );
      }
    }
```

Solution:
I am using the ESnext import/export syntax and actually not exporting the actual component. The fix only requires me to explicitly export the component by adding export default TheCage.

```js
// src/TheCage.js
const TheCage = () => {
  return (
    <div className="Cage">
      ...
    </div>
  );
}

export default TheCage;
```


## 2. Error in Promise

The app so far is amazing but I wanted to add a movie that Nicolas Cage starred in, and what better movie than The Rock. I created a quick API call to the Open Movie Database (omdb) to return data for the best Nicolas Cage ever made.

Movie Api Wrapper:

```js
// src/lib/movie.js
import axios from 'axios';

export function fetchMovieData() {
  const imdbUrl = "http://www.omdbapi.com/?t=the+rock&y=&plot=short&r=json";
  return axios.get(imdbUrl).then((respsonse) => response.title)
}
```

Error Message:
```
Uncaught (in promise) TypeError: ...
```

This error message is just complaining that there is an error in the promise you are returning, which is more than likely preventing my movie data from being presented. I made a mistake in calling response.title instead of response.data. This quick change returns the data I am looking for.


```js
export function fetchMovieData() {
  const imdbUrl = "http://www.omdbapi.com/?t=the+rock&y=&plot=short&r=json";
  return axios.get(imdbUrl).then((respsonse) => response.data)
}
```

## 3. Can’t Render Object

Now that I getting data for my favorite movie, I also created a new component called Movie, where I can present some nice data about the Rock, but I am getting a weird error stating the following, Objects are not valid as a React child.

Error Message:
```
Objects are not valid as a React child
```

Movie component:

```js
// src/Movie.js
import React, {Component} from "react";
import {fetchMovieData} from "./lib/movie.js";

export default class Movie extends Component {
  ...
  componentDidMount() {
    fetchMovieData().then(
      (respsonse) => this.setState({movieData: response})
    );
  }

  render() {
    return (
      <div className="Movie">
         {this.state.movieData}
      </div>
    );
  }
}
```

Solution:
The response I set to movieData is an object and the error message is complaining about that specifically. The quick fix is to be more explicit when set the response data to variables on state.


```js
componentDidMount() {
render() {
    const {Plot, Poster, Title} = this.state;
    return (
      <div className="Movie">
        <h2>
          {Title}
        </h2>
        <img alt="poster" src={Poster} />
        <p>
          {Plot}
        </p>
      </div>
    );
  }
}
```

Now I can see the data on the critically acclaimed movie, The Rock, just by adding a call to the data specific attribute to avoid trying to display the entire object blob.

![the rock](/img/blog/therock.png)

There are other errors that show up while writing React code, but as far as the errors that show up constantly these are it. Once you are familiar with these errors and how to fix them the rest tends to get easier.

The code for this project is available [here](https://github.com/bdougie/the-cage) and if there are other common errors I left out, let us know and I can add it to the list. If you dare feel free to [Face The Cage](http://facethecage.netlify.com/) as well :)
