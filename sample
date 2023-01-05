title=Markdown Static Site Generator
description=An ultra minimal static site generator
image=https://compassionate-saha-53a9e6.netlify.app/assets/markdown-to-html.png
date=2022-02-18
publish=true
@@@

## Markdown SSG

I needed to set up a static site generator for some blogging. And while plenty of these exist ([Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.com/), [etc.](https://jamstack.org/generators/)), none were quite as minimal as I liked. So I built my own!

## Getting Started

-   Clone https://github.com/rysolv/markdown_ssg
-   Create a new markdown file (or edit the `getting-started.md`) in the `src` folder
-   Include any images you want to use in the `src/assets` folder
-   Run `npm run build`

This creates a `/build` directory, and populates it with HTML, CSS, and images from the `src` directory.
The script also creates standard metatags for social links (native, OpenGraph, Twitter) and generates a `sitemap.xml`

```
🗀 build
🗀 src
    🗀 assets
        cat.png
        style.css
    hello-world.md
index.js
```

## Why markdown

Well I'm in a code editor all day anyway. I like the [syntax](https://www.markdownguide.org/basic-syntax/).

And the indention is really nice. Especially when I want to provide code snippits. Which I do a lot of when I write tutorials. Since I'm staying in VS code the whole time I can just copy over snippits.

```
// Convert Meta tags to object
const metaObj = meta.split(/\n/).reduce((acc, el) => {
    if (el.length) {
        const [key, value] = el.split(':');
        acc[key] = value.trim();
    }
    return acc;
}, {});
```
