---

title: Refactoring towards Pure Components in React
author: Brian Douglas
format: blog
short_title: Pure React Componetns
description: Since working with React I have noticed a frequent change in the way Components are written. This is a round up of all those ways.
thumbnail: /uploads/netlify-gitlab-thumbnail.png
cmsUserSlug: ""
date: 2016-09-27
tags:
- react
---

Since working with React I have noticed a frequent change in the way Components are written.

I have always had a preference for writing in the ES6 style component, coming from writing exclusively JavaScript in the Ember framework.

I am currently rewriting some code for the Netlify site and see some low hanging fruit for the use of Pure Components. 

For those unfamiliar there a few type of Components in React: 

## Container

This is a smart component that understands knowledge of it surroundings, including routing and data. Limiting the scope of the container to handle these things make the rest of the Components more flexible for reuse and presentation.

## Smart Component

This component is aware of its own state and even uses other functions to help out with that task. In addition to presenting props and it also can manipulate it’s own state, which makes things a little more challenging to test and present.

## Pure/Stateless

This a dumb component that simply presents the data as provided. These components are perfect for reusability and simple to test. The plan page showing pricing and features lives in the **<SitePlanMenu />** Component, which is a Smart Component. 

![plans](/img/blog/plans.png)

The code originally was written with the idea of eventually moving towards Pure components, where each section is abstracted into its own function and called in the render method. 

Notice how **renderPlans()** is calling the plan details functions and then being rendered in the **render()** function of the component. 

```js
// Code has been simplified for brevity
  
export default class **<SitePlanMenu />** extends Component {
   ...
  planBullets(plan) {
    ...
  }

  planPrice(plan) {
    ...
  }

  selectPlanButton(plan) {
    ...
    
  }

  renderPlans() {
    return (
      <div className="row">
        {plans.map((plan, i) => (

          <div key={i} className="col-md-3">
            <div className="plan" >
              <div className="plan-title">{plan.title}</div>

              // each plan item is being called by function above
              // and will be refactored to its own component

              {this.planBullets(plan)}
              {this.planPrice(plan)}
              {this.selectPlanButton(plan)}

            </div>
          </div>

        ))}
      </div>
    );
  }
   render() {
    const {currentSubscription} = this.props;
    const {editing} = this.state;
    return (
      <div className="col-md-12 settings">
        <hgroup>
          <h1 className="page-header no-top-margin">Your Plan</h1>
          <h2>Choose your Netlify Plan</h2>
        </hgroup>
        <hr />
        <hgroup>
          <h4>Static Hosting Plan</h4>
          <h5>Pick a static hosting plan for this site. You can pick a specific hosting plan for each of your sites.</h5>
          <p>See the complete feature lists on <a href="https://www.netlify.com/pricing" target="_blank">our pricing page</a></p>
        </hgroup>


        // renderPlans() needs to be refactored here

        {this.renderPlans()}

      </div>
    );
  }
}
```

With each section in their own function, moving to Pure Components is actually a breeze. I first moved the **renderPlans()** to it’s own component and followed with the nesting the rest inside.

*Note that I am only passing in UI data and not manipulating any data
with extra functions or Flux stores.

```js
// New Pure <Plans /> Component //

import React from 'react';
import PlanBullets from './PlanBullets';
import PlanPrice from './PlanPrice';
import SelectPlanButton from './SelectPlanButton';
import {subscriptionPlans as plans} from '../lib/subscriptions.js';

const Plans = ({subscribedPlan, onSelection}) => {
  return (
    <div className="row">
      {plans.map((plan, i) => (

        <div key={i} className="col-md-3">
          <div className="plan" >
            <div className="plan-title">{plan.title}</div>

            // The sections that were previously being called
            // from functions are also now Pure Components

            <PlanBullets plan={plan} />
            <PlanPrice plan={plan} />
            <SelectPlanButton
                plan={plan}
                subscribedPlane={subscribedPlan}
                subscriptions={subscriptions}
                onSelection={onSelection}
            />
          </div>
        </div>

      ))}
    </div>
  );
};

export default Plans;
```

Finally, I deleted all the functions in the Smart Component and present the newly formed **<Plans />** component. Overall I am now dealing with fewer lines in my Smart Component. I am also now able to reuse the PlanMenu anywhere else.

```js
import React, {Component} from 'react';
import CurrentHostingPlan from './CurrentHostingPlan';
import PaymentMethod from '../components/modals/PaymentMethod';
import Plans from './Plans';

export default class SitePlanMenu extends Component {
  render() {
    const {currentSubscription, subscribedPlan, onSelection} = this.props;
    const {editing} = this.state;

    return (
      <div className="col-md-12 settings">
        <hgroup>
          <h1 className="page-header no-top-margin">Your Plan</h1>
          <h2>Choose your Netlify Plan</h2>
        </hgroup>

        // New Plans Component //

        <Plans subscribedPlan={subscribedPlan} onSelection={onSelection} />

      </div>
    );
}
```
The use of a Pure Component is nice for resuability and grants you the
ability to write more readable and maintainable code. If you use Pure Components and have examples of your use case, let us
know.
