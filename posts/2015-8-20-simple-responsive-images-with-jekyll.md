---

"title": "Simple Responsive Images with Jekyll"
"author": "Mathias Biilmann"
"image": "responsive.jpg"
"short_title": "Jekyll Image Plugin"
"description": "The new jekyll-srcset plugin makes it easy to serve the best image for your visitors pixel density. Share & enjoy!"
"thumbnail": "thumbnails/jekyll-logo.png"
"cmsUserSlug": ""
"date": 2015-08-20
format: blog
"tags":
  - jekyll
  - plugins
  - responsive images
  - tools
  - design
---

[Jekyll Srcset](https://github.com/netlify/jekyll-srcset) is a small plugin for Jekyll that may solve your most important responsive image needs, without making things ridiculously complicated.

Here's how you would use it in a Liquid template:

<!-- excerpt -->

```html
{%raw%}{% image_tag src=page.thumbnail width="200" %}{%endraw%}
```

With a page with cover image `/thumb.jpg` with the dimensions 500x500, this will output the following img tag and generate all the needed image variations:

```html
<img src="/thumb-200x200.jpg" srcset="/thumb-200x200.jpg 1x, /thumb-400x400.jpg 2x, /thumb-500x500.jpg 3x">
```

Managing images in a responsive design is something that can reach almost any level of complexity, when you're managing different devices, aspect rations, art direction based on breakpoints and varying pixel densities.

Sometimes, however, just a few tricks can go a long way.

Not long ago, in the midst of much debate over different standards, all the modern browsers started to support the new `srcset` attribute on `img` tags, to some degree.

A lot has been written about picture tags, srcset attributes and all the potential control this gives over image variations, but all these options sometimes make responsive images seem so hard that you might be tempted to just skip dealing with it all together.

That's a shame, because the most basic use of the `srcset` attribute is so simple that there's really no reason not to take advantage of it.

Just add a srcset attribute to your img, specifying an image to use for 1x pixel density, 2x pixel density and 3x pixel density, and then let the browser worry about picking the best image.

That little fix alone will let you save lots of bandwidth for low pixel density devices while serving crisp images to Retina screens, and without having to deal with polyfills or all the verbose markup of a picture tag muddled to work in all browsers...

This new [responsive image Jekyll plugin](https://github.com/netlify/jekyll-srcset) makes it so straight forward to add a srcset attribute to your images, that there's really no excuse not to. Just add the plugin to your Gemfile and start using `{%raw%}{% image_tag %}{%endraw%}` instead of `<img>` in your templates.

You can see it in action on this very page, just check the [Liquid template](https://github.com/netlify/netlify-home/blob/master/_layouts/post.html) for the blog post you're reading right now.

Share & enjoy!
