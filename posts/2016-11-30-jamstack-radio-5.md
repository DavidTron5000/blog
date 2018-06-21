---
title: "GraphQL at GitHub"
format: podcast
episodenumber: 5
audiolink: https://media.blubrry.com/heavybit/p/d3aeja1uqhkije.cloudfront.net/podcasts/jamstack-radio/20161027-jamstack-radio-007.mp3
author: Brian Douglas
image: /img/blog/jamstack.png
description: We sat down with Kyle Daigle, manager on the API team at GitHub to chat about how they implement GraphQL into their API at GitHub.
guests:
  - name: Kyle Daigle
    bio: Kyle Daigle is Platform Engineering Manager at GitHub where he focuses on the repository hosting service’s internal and external APIs.
date: 2016-11-30
minuteslong: 41
tags:
  - jamstack
  - podcast
  - graphql
---
We sat down with Kyle Daigle, manager on the API team at GitHub to chat about how they implement GraphQL into their API at GitHub.

If you are unfamiliar, GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

If none of the made sense to you check out the [GitHub GraphQL Explorer](https://developer.github.com/early-access/graphql/explorer/) to see how many start, issues, and forks the yarnpkg has on GitHub using the GraphQL query below.

```js
    // Example GraphQL query for yarnpkg/yarn
    {
      repositoryOwner(login: "yarnpkg") {
        repository(name: "yarn") {
          name
          url
          owner {
            login
            repositories {
              totalCount
            }
          }
          description
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
```

Normally capturing this kind of information would take multiple REST calls to the API, but this query takes one, which is very empowering for me. Find out more about GraphQL and the implementation on [Episode #5 of JAMstack Radio](http://www.heavybit.com/library/podcasts/jamstack-radio/ep-5-graphql-at-github/). Also feel free to subscribe to keep up to date with all thing JAMstack as well.


