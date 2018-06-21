---
title: 'Extending Netlify CMS, Part One: Custom Widgets'
author: Benaiah Mischenko
image: /img/blog/cms-presentations-example.png
format: blog
short_title: 'Netlify CMS: Custom Widgets'
tags:
  - cms
description: >-
  While Netlify CMS has enough functionality for many sites out of the box, some
  sites are going to need a setup geared specifically for their use case. This
  post is the first in a series designed to give a straightforward look at
  extending the CMS - starting with creating custom widgets.
date: 2017-06-20T16:10:59-07:00
---
While Netlify CMS has enough functionality for many sites out of the
box, some sites are going to need a setup geared specifically for
their use case. This post is the first in a series designed to give a
straightforward look at extending the CMS - starting with creating
custom widgets.

## Our example project

To illustrate extending the CMS, we'll be creating a site that uses
[reveal-md](https://github.com/webpro/reveal-md) to create web-based slideshows from Markdown documents.
The build process for the site itself is quite simple, so I won't be
going over that in the blog posts themselves. If you're interested in
the setup, you can take a look at the [GitHub repo](https://github.com/benaiah/netlify-cms-presentations-example). You can
also see an example of the finished site as it progresses at
[https://cms-presentations-example.netlify.com](https://cms-presentations-example.netlify.com).

## What are widgets?

Each collection in Netlify CMS is made up of a series of *fields*,
each corresponding either to a frontmatter field or to the body of the
entry. Each field is represented in the entry editing page by a
*widget*, which is made up of two React components - one for the
editing control and one for the preview.

For instance, take a look at this section of the example config for
Netlify CMS:

    collections: # A list of collections the CMS should be able to edit
      - name: "posts" # Used in routes, ie.: /admin/collections/:slug/edit
        label: "Post" # Used in the UI, ie.: "New Post"
        folder: "_posts"
        slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
        create: true # Allow users to create new documents in this collection
        fields: # The fields each document in this collection have
          - {label: "Title", name: "title", widget: "string", tagname: "h1"}
          - {label: "Publish Date", name: "date", widget: "datetime", format: "YYYY-MM-DD hh:mma"}
          - {label: "Cover Image", name: "image", widget: "image", required: false, tagname: ""}
          - {label: "Body", name: "body", widget: "markdown"}
        meta:
          - {label: "SEO Description", name: "description", widget: "text"}

Each field has an associated widget, and can also set additional
settings for that widget. `body` is a special field - it's not an
entry in the frontmatter, but rather the body of the entry without the
frontmatter.

The CMS comes with a number of [built-in widgets](https://www.netlifycms.org/docs/widgets), which we
can use to help create our own. Adding a new widget to the CMS is as
simple as the following (a full example will come later on):

    CMS.registerWidget(
      "newWidget",      // Widget name
      newWidgetControl, // Editor component
      newWidgetPreview  // Preview component (this is optional)
    );

Once this is done, you can enable it by adding it to a field in one of
the collections in your \`config.yml, like so:

    collections:
      - name: someCollection
    
        # ... #
    
        fields:
          - label: "Some Field"
            name: someField
            widget: newWidget

Now the field will be both edited and previewed using the React
components for `newWidget`.

## Getting started

To follow along with the code, you'll want to get a build system set
up that allows you to use ES6, npm modules, and JSX. I won't go into
detail on that here, but you can see a simple `webpack` config that
enables these in the [GitHub repo](https://github.com/benaiah/netlify-cms-presentations-example).

First, we'll want to install `netlify-cms` as a dependency:

    $ npm install --save netlify-cms

Next, we'll create a `cms.js` which will be the entry point into our
application (this is at `src/cms/cms.js` in [the repo](https://github.com/benaiah/netlify-cms-presentations-example)). This
will import the CMS and our new widget (which we haven't written yet).
After compilation, this will be used instead of the normal CMS script
in the CMS' `index.html`.

    import CMS from "netlify-cms";
    
    import { SlidesControl, SlidesPreview } from "./Slides";
    
    CMS.registerWidget("slides", SlidesControl, SlidesPreview);

To actually use this widget, we assign it to one of our fields in the
`config.yml`:

    collections:
      - name: presentations
    
        # ... #
    
        fields:
          - {label: Title, name: title, widget: string, tagname: ""}
          - label: Body
            name: body
            widget: slides

Now we can start creating the widget itself.

## Minimum viable widget

First off, we'll need to install React to use JSX. We'll also be using
[styled-components](https://github.com/styled-components/styled-components) to add a little CSS:

    $ npm install --save react styled-components

Now we'll create `src/cms/Slides.js` and add some boilerplate:

    import React, { Component } from "react";
    import styled from "styled-components";
    
    // This is the editing component
    export class SlidesControl extends Component {
      render() {
        return <div></div>;
      }
    }
    
    // This is the preview component
    export const SlidesPreview = props => <div></div>;

## Props for widget components

That's the minimum, but it's not very useful now. In order to make
widgets work, we use the props handed in. The widget components
receive several props:

* `value`: the current value of the field. This comes from post
  frontmatter, unless it is the "body" field, in which case it
  contains the whole content *except* the frontmatter. Our "slides"
  widget is designed to be used on a "body" field made up of Markdown.
* `field`: the field object in the `config.yml`, as an Immutable.js
  Map. Can be used to allow specification of widget options in the
  config.
* `forId`: the string ID of the field. Equivalent to
  `field.get("name")`. (Control component only.).
* `onChange`: a function we call with the updated value of the field.
  \(Control component only.).
* `onAddAsset`, `onRemoveAsset`, and `getAsset`: lets us handle
  adding, removing, and retrieving resources that this field uses but
  are not stored directly in the field (usually images). (Control
  component only.)

[reveal-md](https://github.com/webpro/reveal-md) uses a Markdown document to create slides, with a given
separator. By default, it's `---`. We'll hardcode that in the control
for now. The `SlidesControl` is going to simply split the individual
slides apart and create a (currently nonexistent) `SlideControl` for
each one.

    const separator = "\n\n---n\n";
    
    export class SlidesControl extends Component {
      getValue() {
        return this.props.value ? this.props.value : "";
      }
    
      handleSlideChange(value, i) {
        const newValues = this.getValue().split(separator);
        newValues[i] = value;
        this.props.onChange(newValues.join(separator));
      }
    
      render() {
        const slides = this.getValue().split(separator);
        const slideControls = slides.map((slideContent, i) => (
          <SlideControl
            {...this.props}
            key={i}
            value={slideContent}
            onChange={value => this.handleSlideChange(value, i)}
          />
        ));
        return <div>{slideControls}</div>;
      }
    }

We'll add similar functionality to `SlidesPreview`, likewise
delegating to a per-slide component:

    export const SlidesPreview = props => (
      <div>
        {props.value
          .split(props.field.get("separator", defaultSeparator))
          .map((val, i) => <SlidePreview {...props} key={i} value={val} />)}
      </div>
    );

## Using the `field` prop for widget settings

The default slide separator, `---`, is pretty common in Markdown.
We'll allow people to set a different one in their `config.yml` by
using the `field` prop. In order to get individual slides from the
full Markdown, we'll need to split the body based on the separator.
We're going to delegate the individual slides to their own React
components, `SlideControl` and `SlidePreview`.

    const defaultSeparator = "\n\n---n\n";
    
    export class SlidesControl extends Component {
      getValue() {
        return this.props.value ? this.props.value : "";
      }
    
      handleSlideChange(value, i) {
        const newValues = this.getValue().split(
          this.props.field.get("separator", defaultSeparator)
        );
        newValues[i] = value;
        this.props.onChange(
          newValues.join(this.props.field.get("separator", defaultSeparator))
        );
      }
    
      render() {
        const slides = this.getValue().split(
          this.props.field.get("separator", defaultSeparator)
        );
        const slideControls = slides.map((slideContent, i) => (
          <SlideControl
            {...this.props}
            key={i}
            value={slideContent}
            onChange={value => this.handleSlideChange(value, i)}
          />
        ));
        return <div>{slideControls}</div>;
      }
    }

Our [reveal-md config](https://github.com/Benaiah/netlify-cms-presentations-example/blob/master/reveal-md.json) has the separator set to `"\\n\\n<!--s-->\\n\\n"`,
so let's set that in the CMS config as well:

    collections:
      - name: presentations
    
        # ... #
    
        fields:
          - {label: Title, name: title, widget: string, tagname: ""}
          - label: Body
            name: body
            widget: slides
            separator: "\n\n<!--s-->\n\n"

## Creating the slide controls

Now we need those two components! First, let's get to the editor. It
would be pretty disappointing if we had to invent our own markdown
editor and preview, when there's already perfectly good ones built
into the CMS. Fortunately, it's very easy to wrap other CMS widgets,
since they're just React components. We can use `CMS.getWidget` to get
an object with `control` and `preview` components:

    const SlideControlHeader = styled.div`
      /* styles omitted... */
    `;
    
    const SlideControl = props => {
      const MarkdownControl = CMS.getWidget("markdown").control;
      return (
        <div>
          <SlideControlHeader>Slide</SlideControlHeader>
          <MarkdownControl {...props} />
        </div>
      );
    };
    
    const SlidePreview = props => {
      const MarkdownPreview = CMS.getWidget("markdown").preview;
      return <div><hr /><MarkdownPreview {...props} /></div>;
    };

\(You can find the omitted styles at
[the Slides.js file](https://github.com/Benaiah/netlify-cms-presentations-example/blob/master/src/cms/Slides.js) in the repo.)

## Adding controls

We should have a working slide editor now! There's a few problems
still, though:

* You can't create new slides. (Technically, you can, you just have to
  enter the slide separator manually, but that's not a great solution.)
* You can't delete slides.
* You can't move slides.

To fix these, we'll add a control bar to each slide. The bar itself
with some basic styling is pretty simple:

    const CommandBar = styled.div`
      /* styles omitted... */
    `;
    
    const CommandBarButton = styled.button`
      /* styles omitted... */
    `;
    
    const SlideCommandBar = props => (
      <CommandBar>
        <CommandBarButton onClick={props.createSlideAbove}>
          + Above
        </CommandBarButton>
        <CommandBarButton onClick={props.createSlideBelow}>
          + Below
        </CommandBarButton>
        <CommandBarButton onClick={props.deleteSlide}>
          Delete
        </CommandBarButton>
        <CommandBarButton onClick={props.moveSlideUp}>
          Move Up
        </CommandBarButton>
        <CommandBarButton onClick={props.moveSlideDown}>
          Move Down
        </CommandBarButton>
      </CommandBar>
    );

The question now is "what do we pass in as the props to the
`SlideCommandBar`"? All of these need to change the overall value of
the `SlidesControl`, not just the contents of an individual slide, but
we want to attach them *to* an individual slide.

We'll solve this by creating a function that gets an object the
command bar functions for a given slide. It'll take the current value
of the slide array as a whole, as well as the index of the slide we're
at (since all the operations we care about just involve changing the
array, not the contents of our particular slide).

    const getSlideActions = (onChange, slides, i) => {
      // The Array.prototype.slice method, which we'll use later, mutates
      // its argument, so we make a copy of it here.
      const slidesCopy = slides.slice();
      
      return {
        createSlideAbove: () => {
          slidesCopy.splice(i, 1, "", slides[i]);
          return onChange(slidesCopy);
        },
        createSlideBelow: () => {
          slidesCopy.splice(i + 1, 0, "");
          return onChange(slidesCopy);
        },
        deleteSlide: () => {
          slidesCopy.splice(i, 1);
          return onChange(slidesCopy);
        },
        moveSlideUp: () => {
          if (i === 0) {
            return onChange(slidesCopy);
          }
        },
        moveSlideDown: () => {
          if (i === slidesCopy.length) {
            return onChange(slidesCopy);
          }
          slidesCopy.splice(i, 2, slides[i + 1], slides[i]);
          return onChange(slidesCopy);
        }
      };
    };

Now we can create these functions when rendering the `SlideControl`s
and pass them in as props:

    export class SlidesControl extends Component {
    
      /* ... */
      
      getSlideCommandBarActions(slides, i) {
        return getSlideActions(
          newSlides =>
            this.props.onChange(
              newSlides.join(this.props.field.get("separator", defaultSeparator))
            ),
          slides,
          i
        );
      }
    
      render() {
        const slides = this.getValue().split(
          this.props.field.get("separator", defaultSeparator)
        );
        const slideControls = slides.map((slideContent, i) => (
          <SlideControl
            {...this.props}
            key={i}
            value={slideContent}
            onChange={value => this.handleSlideChange(value, i)}
            commandBarActions={this.getSlideCommandBarActions(slides, i)}
          />
        ));
        return <div>{slideControls}</div>;
      }
    }

## Summary

You should now be able to create your own custom widgets to extend
Netlify CMS to fit your content, no matter what it is. 

Now that you've
finished, you should be comfortable with the following:

* Including Netlify CMS as a dependency in your project
* Registering and enabling new widgets
* Using the props passed in to your widget to display and edit the
  field values
* Using field settings to allow customization of your widgets
* Wrapping existing widgets for reusing them in your own

I hope you've found this post helpful! If you're interested in
learning more or contributing to the project, please visit us at
[netlifycms.org](https://netlifycms.org), at the [GitHub repo](https://github.com/benaiah/netlify-cms-presentations-example),
or chat with us [on Gitter](https://gitter.im/netlify/NetlifyCMS).

