---

title: Grouping Immutable Deploy Data 
author: Brian Douglas
format: blog
short_title: Grouping Immutable Deploy Data
description: We recently wrapped up a UI update to the deploys page and laid our Cards on the table. This is a quick explanation of how we used Immtuable JS to display our new deploy data.
thumbnail: /uploads/netlify-gitlab-thumbnail.png
cmsUserSlug: ""
date: 2016-09-13
tags:
- react
- redux
- immutable
---

We recently wrapped up a UI update to the deploys page and laid our <a href="/blog/2016/08/25/cards-on-table/">Cards on the Table</a>. Netlify practices the [JAMstack](https://jamstack.org/) philosophy when building websites, including the one you are reading right now 💥 Which means, we have an API that populates everything on our new "`/deploys`" screen. 

![grouped deploys](/img/blog/grouped-deploys.png)

I was tasked with updating the data from a boring list (below) of deploys, to a new list
grouped by date (above and fancy).

![not grouped deploys](/img/blog/grouped-deploys-old.png)

The challenge in completing this change is that the data is coming from the API is not grouped by date and just a boring array, did I mention how boring this was?

I did mention the array of data is boring, but we do use Redux to maintain the state of our data within the
Container Components, which is a lot of fun to work with. We also use [Immutable](https://facebook.github.io/immutable-js/) to further ensure that the
state of our data is maintain.

The Deploy Data comes over in the follow form from our API:

```js
// Just an example, not actually code ;)

[
  {id: "123", created_at: new Date("2016-05-01 3:37:00")},
  {id: "234", created_at: new Date("2016-05-01 4:00:00")}
]

```

Redux gives us the ability to access data in a unilateral way, meaning,
we do not manipulate the data received, but create new immutable objects, which
gives us access the original state of all our data. 

It is not ideal to mutate the different deploy states of the sites we
host on Netlify. A user has the ability to always look back at the state
of their site and even rollback to that deploy state if desired. 

The Immutable project helps to ensure immutability of these deploys.

So going back to my task of grouping deploys by date -- The deploy screen
is the only place where we display deploys and the reducer is the exact
spot in the code where we prepare builds to be displayed.

Immutable Objects look very similar to regular JavaSscript objects but differ
enough that I have to look up their [documentation ](https://facebook.github.io/immutable-js/docs/#/) quite frequently.

Immutable Arrays are called a List and if you are unfamilar and would
like to learn more, I would checkout the [egghead.io](https://egghead.io/courses/learn-how-to-use-immutable-js) course on the
[Immutable](https://egghead.io/courses/learn-how-to-use-immutable-js).

I actually took the TDD aproach here and wrote out tests for a `groupByDate()`. The idea is to create a new List that groups similar deploys with the **created_at** date as the key.

```js
import expect from "expect";
import {fromJS} from "immutable"; // helper to convert JS to Immutable Object
import {groupByDate} from "./src/reducers/deploys";

describe("grouping builds by date", () => {
  it("should handle an empty array", () => {
    expect(groupByDate(fromJS([]))).toEqual(fromJS({}));
  });

  it("should handle a list with one element with a date", () => {
    const items = fromJS([{id: "123", created_at: new Date("2016-05-01 3:37:00 PST")}]);
    expect(groupByDate(items).toJS()).toEqual(
      {"2016-05-01":  [{id: "123", created_at: new Date("2016-05-01 3:37:00 PST")}]}
    );
  });

  it("should handle a list with multiple items on the same date", () => {
    const items = fromJS([{id: "123", created_at: new Date("2016-05-01 3:37:00")}, {id: "234", created_at: new Date("2016-05-01 4:00:00")}]);
    expect(groupByDate(items).toJS()).toEqual(
      {"2016-05-01":  [{id: "123", created_at: new Date("2016-05-01 3:37:00")}, {id: "234", created_at: new Date("2016-05-01 4:00:00")}]}
    );
  });
});
```

I now have my test organize, I am now able to implement actual code to group
deploys by the similar dates. The `reduce()` function is available to
use with Immutable Lists just like mutable JavaScript arrays and gives
us the option to default to a Immutable Map as the beginning value.


```js
// reduce is used to a new List of Maps with the created_at date as the key

export function groupByDate(items) {
  return items.reduce((result, item) => {
    const createdAt = moment(item.get("created_at")).format("YYYY-MM-DD");
    const existingList = result.get(createdAt) || List();

    return result.set(createdAt, existingList.push(item));
  }, Map());
}
```

I am now able to reduce the my array into to exactly what a need, grouped array of key/value data grouped by an dates.

```js
// New data grouped by date

[
  {"2016-05-01":  [
    {id: "123", created_at: new Date("2016-05-01 3:37:00")},
    {id: "234", created_at: new Date("2016-05-01 4:00:00")}
  ]}
]

```

Similar the Immutable docs, I always have to refer this [tweet](https://twitter.com/steveluscher/status/741089564329054208) for understanding of how **reduce()** works.


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Map/filter/reduce in a tweet:<br><br>map([🌽, 🐮, 🐔], cook)<br>=&gt; [🍿, 🍔, 🍳]<br><br>filter([🍿, 🍔, 🍳], isVegetarian)<br>=&gt;  [🍿, 🍳]<br><br>reduce([🍿, 🍳], eat)<br>=&gt; 💩</p>&mdash; Steven Luscher (@steveluscher) <a href="https://twitter.com/steveluscher/status/741089564329054208">June 10, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I now use everything I have learned and tested in to practive, using my
favorite Markup renderer <a href="/blog/2016/08/17/converting-angular-to-react-jsx/">JSX</a>. The result of all my hard work is now stored in the `groupedDeploys` prop, I can now **map()** each item per group and easily display the Group Date. The deploy data is rendered using a second map. 

```js
... 
// first map()
{groupedDeploys.map((deploys, date) => <div>

  <div>
    <h2>{moment(date).format("LL")}</h2>
    {!currentDeployed && site.get("build_settings") &&
      <a onClick={this.handleTriggerbuild}>
        Trigger Build
      </a>
    }
  </div>

  // second map()
  <ul>
    {deploys.map((deploy) => (
      <li key={build.get("id")}>
        <CardDeploy data={deploy} />
      </li>
    ))}
  </ul>

</div>)}

...

```
Now that this is good, I can now get back to deploying.
