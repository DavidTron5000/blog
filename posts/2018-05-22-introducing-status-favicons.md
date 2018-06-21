---
title: "Netlify now shows your deploy status on its favicon"
author: Bret Comnes & Rafael Conde
tweet: >-
  Whats in a Favicon? Introducing status favicons
image: /img/blog/favicon-status-screenshot.jpeg
short_title: "Introducing Status Favicons"
tags:
  - design
  - favicon
format: blog
description: >+
  A short introduction to Netlify's status favicons, and the process and ideas behind their creation.
date: '2018-05-22'
no_overlay: false
---

Ever tab away from a Netlify deploy log only to lose it next to a sea of similar looking Netlify tabs? Yeah, that happens to us, too. That’s why we recently rolled out an update that displays deploy status information in the favicon on your browser tab. The special favicons appear when you navigate to your deploy logs.

Here’s what you’ll see:

![4 versions of the favicon: 1. A simplified version of the Netlify logo – a teal square rotated 45 degrees. 2. Simplified logo with a yellow circle. 3. Simplified logo with a red circle with a white line through it. 4. Simplified logo with a checkmark.](/img/blog/favicon-status-screenshot.jpeg)

You will see a yellow dot on the icon when the deploy is building; it will turn into a white check on the logo if the build succeeds, or a red dot with with a line through it if the build fails.  When you are on a different page of the app, no status icon will be shown.  

While this might seem like a simple feature, we discovered a few interesting problems during development. Keep reading if you’re curious how we worked through these problems.

## Brand sentiment

In one of our first iterations, we used red, yellow and green colorized versions of Netlify's logo. We decided against this initial version to avoid developing unintended user sentiment during negative outcomes like [when your build fails](https://sadtrombone.com/).

<img alt="" src="/img/blog/color-status-screenshot.png" />

## Shape and contrast

In an attempt to solve the problems we identified with a colorized logo, we switched to using small colorized dots overlaid on an unmodified logo.

<img alt="" src="/img/blog/favicon-shape.png" />

The colorized indicator overlay solved some of the problems we had with the colorized logos, but a large issue remained.  [Color blind and vision impaired individuals](http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/) may have trouble distinguishing the red, yellow and green colors of the dots if they lack any distinguishing features independent of color.

When working with a fraction of 16x16 and 32x32 pixel icons, it may seem like it’s hardly worth including distinct status shapes, but it actually provides important distinguishing features to anyone who can't easily distinguish colors. 

First, we removed a lot of the “noise” from our logo by reducing it to its simplest shape. This helped ensure it looked sharp as a small 16x16 pixel icon and afforded visual room for the increased detail around the status icon.

Then, we had to come up with different shapes to distinguish between the building and failed states. We tried a lot of them, and these were some of our favorites:

![5 different versions of the favicon for a failed deploy. 1. circle. 2. cross, 3. hexagon, 4. triangle, 5. circle with a horizontal white line through it.](/img/blog/favicon-shape-variants.png)

As we explored each shape, we had some realizations:

* We couldn’t use the circle because we couldn’t rely on color alone to differentiate the icons.
* The x at 16x16 is too blurry and hard to understand.
* The _stop sign_ at lower resolutions looks too much like a circle.
* We use triangle shapes across the app to indicate a warning status, and not errors, so that could be confusing.
* [There is no standard mapping between stoplight colors and shapes](https://ux.stackexchange.com/questions/114385/colorblind-status-shapes). ([but maybe there should be](http://www.yankodesign.com/2010/06/09/re-learning-the-traffic-lights/)?)

## Final

Ultimately, we chose a set of favicons that incorporated considerations for color, shape, and contrast.

![4 versions of the favicon: 1. A simplified version of the Netlify logo – a teal square rotated 45 degrees. 2. Simplified logo with a yellow circle. 3. Simplified logo with a red circle with a white line through it. 4. Simplified logo with a checkmark.](/img/blog/favicon-status-screenshot.jpeg)

## Conclusion

Hopefully this feature comes in handy and isn’t too disruptive to your compile time sword fighting.  

<figure>
<a href="https://xkcd.com/303/"><img src="/img/blog/xkcd303.png" alt="The #1 programmer excuse for legitimately slacking off: 'My code’s compiling'"></a>
<figcaption>I bet <a href="https://xkcd.com/303/">xkcd</a> didn't anticipate these status favicons</figcaption>
</figure>

We strive to take accessibility into consideration when designing and changing features, and make a best-effort attempt to not let easy-to-miss accessibility issues fall by the wayside.  If any of these accessibility design considerations have made your work a little easier we would love to hear from you! Likewise, if we’ve missed something here or elsewhere in the product we would love for you to help us learn and get better. 

Lastly, if you enjoy solving problems like this, we are currently hiring for a [Senior Product Designer](https://hire.withgoogle.com/public/jobs/netlifycom/view/P_AAAAAACAAADCtTMqkhLD1y)!
