---
title: Clean up promise handling with resolvePromiseProperties
author: Benaiah Mischenko
image: /img/blog/readUnpublishedBranchFile.png
format: blog
short_title: resolvePromiseProperties
tags:
  - js
description: >-
  resolvePromiseProperties allows you to take an object which has promises as
  some of its properties and get a promise that resolves to an object where all
  the promises are replaced with their resolved value.
date: 2017-04-18T17:45:12.180Z
---
## The problem

When working with REST APIs you'll frequently end up in a situation
where you want to return an object with bits of data from a couple
different endpoints. This can end up leaving you with pretty messy
code, especially if the shape of the object you're returning is
different than that of the API responses.

We ran into this multiple times while building
[Netlify CMS](https://netlifycms.org) - we'd be using data from
different parts of the Github API, some of which depend on each other,
and we'd end up with very hairy code, having to split business logic
across different `.then`s in order to get the desired set of data.

For instance, imagine you have three functions that return promises:
`getUserID(username)`, `getFullName(userID)`, and
`getLatestPost(userID)`, and you want to return an object that has
both. A naive implementation might look like the following:

    const getUserData = (username) => {
      let userID, fullName
      return getUserID(username)
      .then((id) => {
        userID = id;
        return getFullName(id);
      })
      .then((name) => {
        fullName = name;
        return getLatestPost(id);
      })
      .then((latestPost) => ({
        id: userID,
        fullName,
        latestPost,
      }));
    };

This works, but there are a couple problems with this implementation:

* We're introducing unnecessary mutations with the `userID` and
  `fullName` variables.
* Despite the fact that the promises from `getFullName` and
  `getLatestPost` are independent of each other, they're not running
  in parallel.

Fortunately, this is solvable using `Promise.all`, like so:

    const getUserData = (username) => {
      const idPromise = getUserID(username);
      return Promise.all([
        idPromise,
        idPromise.then(id => getFullName(id)),
        idPromise.then(id => getLatestPost(id)),
      ]).then((id, fullName, latestPost) => ({
        id,
        fullName,
        latestPost,
      }));
    };

This works well and is much more simple. However, the last part is a little
superfluous and makes it a bit annoying to add new pieces of
data, as you have to add them to both the `Promise.all` argument array
and the object construction in the `.then`. Wouldn't it be nicer to
have our code look more like the data it's returning?

## Introducing `resolvePromiseProperties`

That usecase is exactly what `resolvePromiseProperties` is designed
for. It takes an object that looks like this...

    {
      prop1: Promise.resolve("this is prop 1"),
      prop2: Promise.resolve("this is prop 2"),
      prop3: "this isn't a promise, so it's left alone",
    }

...and returns a promise that resolves to an object like this:

    {
      prop1: "this is prop 1",
      prop2: "this is prop 2",
      prop3: "this isn't a promise, so it's left alone",
    }

It finds any properties (one level deep) that have promise values,
creates a promise that waits for all of them using `Promise.all`, and
returns that promise with a `.then` that zips the object back
together.

If you want to resolve deeper than one level, you can simply nest
calls to `resolvePromiseProperties` indefinitely, like so:

    resolvePromiseProperties({
      prop1: Promise.resolve("prop 1"),
      prop2: resolvePromiseProperties({
        prop3: Promise.resolve("prop 3"),
      }),
    })

This will return a promise that resolves to the following object:

    {
      prop1: "prop 1",
      prop2: {
        prop3: "prop 3",
      },
    }

## Implementation

The implementation is pretty straightforward. We'll need `zipObject`
from `lodash` to zip the object back together at the end:

    import { zipObject } from 'lodash';
    
    const resolvePromiseProperties = obj => {

Next, we need to find the keys of the `obj` which represent promises,
and collect them into an array which we'll pass to `Promise.all`:

      const promiseKeys = Object.keys(obj).filter(
        key => obj[key] instanceof Promise);
        
      const promises = promiseKeys.map(key => obj[key]);

We call `Promise.all` to wait on all the promise properties:

      Promise.all(promises)

And return a copy of the object with the promise properties
overwritten with the resolved values of their promises:

        .then(resolvedPromises => resolve(
          Object.assign(obj, zipObject(promiseKeys, resolvedPromises)))
        );
      };

Full function:

    import { zipObject } from 'lodash';
    
    const resolvePromiseProperties = obj => {
      const promiseKeys = Object.keys(obj).filter(
        key => obj[key] instanceof Promise);
        
      const promises = promiseKeys.map(key => obj[key])
      
      Promise.all(promises).then(resolvedPromises =>
        Object.assign({}, obj, zipObject(promiseKeys, resolvedPromises))
      );
    };

## Rewriting our original function with `resolvePromiseProperties`

Our above function can now look like this:

    const getUserData = (username) => {
      const idPromise = getUserID(username);
      return resolvePromiseProperties({
        id: idPromise,
        fullName: idPromise.then(id => getFullName(id)),
        latestPost: idPromise.then(id => getLatestPost(id)),
      })
    }

## Real world application

So let's see how we can use this to clean up a messy function. When
working on Netlify CMS, I ended up working on this function,
[readUnpublishedBranchFile](https://github.com/netlify/netlify-cms/blob/1dc2841609712bc8f9b9bd44c7fd126d88a5ae1e/src/backends/github/API.js#L161):

    readUnpublishedBranchFile(contentKey) {
      let metaData, fileData;
      const unpublishedPromise = this.retrieveMetadata(contentKey)
      .then((data) => {
        metaData = data;
        if (data.objects.entry.path) {
          return this.readFile(data.objects.entry.path, null, data.branch);
        }
        return Promise.reject(null);
      })
      .then((file) => {
        fileData = file;
        return this.isUnpublishedEntryModification(metaData.objects.entry.path);
      })
      .then(isModification => ({ metaData, fileData, isModification }))
      .catch(() => {
        throw new EditorialWorkflowError('content is not under editorial workflow', true);
      });
      return unpublishedPromise;
    }

It has all the problems that our first imaginary function did above:
promises are not being run in parallel when they should be, there's
unnecessary mutation, and the function is difficult to read. Using
`resolvePromiseProperties`, I rewrote this to [the following version](https://github.com/netlify/netlify-cms/blob/master/src/backends/github/API.js#L161):

    readUnpublishedBranchFile(contentKey) {
      const metaDataPromise = this.retrieveMetadata(contentKey)
        .then(data => (data.objects.entry.path ? data : Promise.reject(null)));
      return resolvePromiseProperties({
        metaData: metaDataPromise,
        fileData: metaDataPromise.then(
          data => this.readFile(data.objects.entry.path, null, data.branch)),
        isModification: metaDataPromise.then(
          data => this.isUnpublishedEntryModification(data.objects.entry.path, this.branch)),
      })
      .catch(() => {
        throw new EditorialWorkflowError('content is not under editorial workflow', true);
      });
    }

It's much cleaner and easier to read, and even runs better to boot,
since the promises are running in parallel where possible.

## Conclusion

`resolvePromiseProperties` has been very useful for handling groups of
related promises in [Netlify CMS](https://netlifycms.org). I hope it
can be useful in your JS projects! If you'd like to learn more about
Netlify CMS and how it can help you build fast static sites with rich
content, visit [netlifycms.org](https://netlifycms.org).

