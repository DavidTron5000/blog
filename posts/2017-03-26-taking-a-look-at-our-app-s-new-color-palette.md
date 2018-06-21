---
title: 'Design Series: Our App''s New Color Palette'
author: Rafael Conde
image: /img/blog/color-palette.png
format: blog
short_title: Netlify App 2.0 Color Palette
tags:
  - design
description: >-
  Today we are going to address the color palette chosen to paint our
  backgrounds, our buttons, which gives our app it's look and feel.
date: 2017-04-06T15:20:02-07:00
---

We’ve talked about our [Grid System](https://www.netlify.com/blog/2017/03/23/a-2.0-grid-system/) and how crucial it is for our redesigned user interface. Today we are going to cover the color palette we’ve chosen to paint our backgrounds, our buttons, and the overall look and feel.

This topic gets entry *number two* on our series because, much like sizes, paddings and our unit to build a layout, color is one of those areas that eventually ended up trickling down throughout all of the work built on top of it.

---

We started with the base color, the color of our text, the yin for our `#fff` yan. If you’re thinking `#000`, pure black, you’re very close. Back in 2012, I read a short article explaining [why you shouldn’t use black on your designs by Ian Storm Taylor](https://ianstormtaylor.com/design-tip-never-use-black), here’s an excerpt that really struck a chord with me:

> “When you put pure black next to a set of meticulously picked colors, the black overpowers everything else. It stands out because it’s not natural. All of the “black” everyday objects around you have some amount of light bouncing off of them, which means they aren’t black, they’re dark gray. And that light probably has a tint to it, so they’re not even dark gray, they’re colored-dark gray.”

*I highly recommend reading [Ian’s piece](https://ianstormtaylor.com/design-tip-never-use-black).*

I remember reading this 5 years ago when I was still day-dreaming about switching from being a programmer to a designer. I have never used `#000`, pure black, in any of my work since. This time wouldn’t be any different.

![Our background's dark blue color](/img/blog/background-color.png)

We ended up deciding on this dark blue, it works well on a large footprint, like our background header, and it’s dark enough to pass as a very neutral, basic black for text.
With this basic unit set, we needed a palette of different shades of such color, to provide a larger pool of contrasts and options to play on hierarchy and weights.

For the most part of our development process, we were using the equivalent of 100/70/50/30% opacity on a white background, but for some reason it wasn’t working in some situations. This made us try the [Material Design specs](https://material.io/guidelines/style/color.html#color-text-background-colors), and it worked pretty well.

Now we are using 87%, 54%, and 38%.

If you work at Google, or if you know how and why Google’s designers arrived at these values, I would love to know, because they don’t make sense to me, but I know that they actually feel pretty good on the eye.

¯\\*(ツ)*/¯

Of course with this, we can set up a group of CSS variables that can make this all work for us:

    --colorText: color(var(--baseColor) a(0.87));
    --colorTextMuted: color(var(--baseColor) a(0.54));
    --colorPlaceholder: color(var(--baseColor) a(0.38));

We were still missing one last shade, our **background**.

As you may know, a big part of our new User Interface is the use of Cards, which we will cover in more detail on a future piece. These cards from day one had a pure white, `#fff` background color. We all agreed on that.

Now for a card with a pure white fill to have some contrast with the background (and not be swallowed by it) the background needs to have a different shade.

We tried our best at striking a balance between a very light background, something that just blends in and disappears, and being different enough from the cards’ pure white color.

So we decided on our black, our base color, with a 2% opacity over a white background: `#FAFBFB`.

Here’s an example of these base colors played with one another:

![Our background header, with card](/img/blog/header-example.png)

## Just a splash of color

Almost there — we now just needed a splash of color and life in it.

We need color to make any element stand out, convey meaning and intent, guide and help our users. And look pretty.

I’m going to cover the actually design of our UI elements on a dedicated post, but from very early on we wanted to simplify our color palette and really nail down the colors that we needed. We decided on three colors.

Picking these was very easy to me thanks to the wonderful work from my partner in crime Eli, and his great work put in the marketing site, the site you are most likely currently looking at.

I only had to get some stronger darker shades of our colors for specific elements, because a completely filled green button behaves very different from a thin block of text with the same color.

![example of difference between using a color for background or text](/img/blog/contrast.png)

So we only ended up needing three main colors:

* Our green, our brand green: to communicate **Creation**, **Productive actions;**
* Red: to communicate **Destruction**, **Dangerous actions**, **Non-reversible actions**;
* Our Gold: to communicate an **Upgrade**, **exclusive content/actions**, **limited offers**, **something new**;

![Our final color palette](/img/blog/color-palette.png)

In Sketch, by adding this palette to our Document’s Colors, makes it so easy to detect when something is *off* (because the selected color gets highlighted in the grid), and makes it so fast to get in, pick the right color, and get out.

![Palette in Sketch](/img/blog/sketch picker.png)

---

In the end, I’m pretty happy we arrived at this palette. It’s simple and obvious which means it get’s out of the way and simplifies the rest of the design work.