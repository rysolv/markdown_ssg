const fs = require('fs').promises;
const marked = require('marked');

const siteName = 'Rysolv';
const baseUrl = 'https://rysolv.com/blog';
const directory = './src';
const target = './build';
const sitemap = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 https://www.google.com/schemas/sitemap/0.84/sitemap.xsd">',
];

async function build() {
	const files = await fs.readdir(directory);
	for (const file of files) {
		// Take first part of file name for html name (this will be the url)
		const [path] = file.split('.');

		// Read Markdown and generate HTML
		const data = await fs.readFile(`${directory}/${file}`, 'utf8');
		const html = generateHtml(data, path);

		// Write HTML to file
		await fs.writeFile(`${target}/${path}.html`, html);
	}
	// Write sitemap.xml to file
	await fs.writeFile(
		`${target}/sitemap.xml`,
		[...sitemap, '</urlset>'].join('')
	);
}

function generateHtml(data, path) {
	// Split meta/markdown at deliminator
	const [meta, markdown] = data.split('@@@');

	// Convert Meta tags to object
	const metaObj = meta.split(/\n/).reduce((acc, el) => {
		if (el.length) {
			const [key, value] = el.split(':');
			acc[key] = value.trim();
		}
		return acc;
	}, {});
	metaObj.url = `${baseUrl}/${path}.html`;

	// Generte meta tags and HTML
	const metaTags = generateMetaTags(metaObj);
	const parsed = marked.parse(markdown);

	// Push articles to sitemap
	sitemap.push(
		`<url><loc>${metaObj.url}</loc><lastmod>${metaObj.date}</lastmod></url>`
	);

	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        ${metaTags}
        <link rel="stylesheet" href="style.css">
        <title>${metaObj.title}</title>
        </head>
        <body>
        ${parsed}
        </body>
        </html>
    `;
}

function generateMetaTags({ description, image, title, url }) {
	// Create meta tags for social links
	const baseMeta = `
		<!-- Base meta tags -->
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="${description || ''}" />
		<meta name="language" content="english" />
		<meta name="title" content="${title || ''}" />
	`;
	const openGraph = `
		<!-- OpenGraph -->
		<meta property="og:description" content="${description || ''}" />
		<meta property="og:image" content="${image}" />
		<meta property="og:site_name" content="${siteName || ''}" />
		<meta property="og:title" content=${title || ''} />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="${url || ''}" />
	`;
	const twitter = `
		<!-- Twitter -->
		<meta name="twitter:description" content="${description || ''}" />
		<meta name="twitter:domain" content="${url || ''}" />
		<meta name="twitter:image" content="${image || ''}" />
		<meta name="twitter:title" content="${title || ''}" />
	`;
	return baseMeta + openGraph + twitter;
}
build();
