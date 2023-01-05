title=Markdown Static Site Generator
description=An ultra minimal static site generator
image=https://compassionate-saha-53a9e6.netlify.app/assets/markdown-to-html.png
date=2022-02-18
publish=true
@@@

![Markdown to HTMl](./assets/markdown-to-html.png)

# An ultra minimal static site generator

I needed to set up a static site generator for some blogging. And while plenty of these exist ([Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.com/), [etc.](https://jamstack.org/generators/)), none were quite as minimal as I liked. So I built my own!

It uses one dependency ([marked](https://www.npmjs.com/package/marked)), so not entirely minimal. But all the build logic lives in 100 lines. With half of the logic dedicated to the meta tags and sitmap generation.

```
🗀 build
🗀 src
    🗀 assets
        cat.png
        style.css
    hello-world.md
index.js
```

## Getting Started

-   Clone https://github.com/rysolv/markdown_ssg
-   Create a new markdown file (or edit the `getting-started.md`) in the `src` folder
-   Include any images you want to use in the `src/assets` folder
-   Run `npm run build`

This creates a `/build` directory, and populates it with HTML, CSS, and images from the `src` directory.
The script also creates standard metatags for social links (native, OpenGraph, Twitter) and generates a `sitemap.xml`

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

## Meta tags & Sitemap

Since the primary goal of this project was to spin up some SEO optimized articles for content marketing, the metatags and sitemap were critical.

To update meta tags, just include the relevant tags at the top of the markdown file, separated by a delininator.

(meta tags for this article)

```
title = Markdown Static Site Generator
description = A stupid simple static site generator for markdown
image = ./assets/markdown-to-html.png
date = 2022-02-18
@ @ @
```

Which generates something like this:

```
<!-- Base meta tags -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="A stupid simple static site generator for markdown" />
<meta name="language" content="english" />
<meta name="title" content="Markdown Static Site Generator" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- OpenGraph -->
<meta property="og:description" content="A stupid simple static site generator for markdown" />
<meta property="og:image" content="undefined" />
<meta property="og:site_name" content="Rysolv" />
<meta property="og:title" content=Markdown Static Site Generator />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://rysolv.com/blog/getting-started.html" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:description" content="A stupid simple static site generator for markdown" />
<meta name="twitter:image" content="" />
<meta name="twitter:title" content="Markdown Static Site Generator" />
```

It also generates a `sitemap.xml` of all the articles in the src directory.

```
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 https://www.google.com/schemas/sitemap/0.84/sitemap.xsd">
    <url>
        <loc>https://rysolv.com/blog/getting-started.html</loc>
        <lastmod>2022-02-18</lastmod>
    </url>
</urlset>
```

## Deploying to Netlify

In the spirit of deploying this in an afternoon, I went with [Netlify](https://www.netlify.com/).

### Deploy steps

-   Sign in to Netlify
-   Select `Import an Existing project`
-   Connect to a Git provider
-   Select the repo
-   Set the build step to `npm run build` and the publish directory to `/build`
-   Deploy Site!

![netlify settings](./assets/netlify.png)
