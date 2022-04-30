const fs = require('fs').promises;
const marked = require('marked');
const header = require('./header');
const author = require('./author');
const shareLinks = require('./share');
const {compressableFormats} = require('./constants');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const siteName = 'Rysolv';
const baseUrl = 'https://rysolv.com/blog';
const [today] = new Date().toISOString().split('T');
const sitemap = [];

const renderer = {
	image(href, title, text) {
		let imageHrefArr = href.split('.');
		if (
			argv.dontCompressImages ||
			argv.dontGenerateWebp ||
			!compressableFormats.has(imageHrefArr.pop())
		){
			return false;
		}

		const titleStr = title ? `title="${title}"` : '';

		return `
			<picture>
				<source srcset="${imageHrefArr.join('.')}.webp" type="image/webp">
				<img src="${href}" alt="${text}" ${titleStr}>
			</picture>
		`;
	}
}
marked.use({ renderer });

async function build() {
	const files = await fs.readdir('./src');

	for (const file of files) {
		if (file !== 'assets') {
			// Take first part of file name for html name (this will be the url)
			const [path] = file.split('.');

			// Check if file path valid. Helps with '.DS-Store' file
			if (path) {
				// Read Markdown and generate HTML
				const data = await fs.readFile(`./src/${file}`, 'utf8');
				const html = generateHtml(data, path);

				// Write HTML to file
				await fs.writeFile(`./build/${path}.html`, html);
			}
		}
	}
	// Write sitemap.xml to file
	await fs.writeFile(
		`./build/sitemap.xml`,
		[
			'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84 https://www.google.com/schemas/sitemap/0.84/sitemap.xsd">',
			...sitemap,
			'</urlset>',
		].join('')
	);
}

function generateHtml(data, path) {
	const [meta, markdown] = data.split('@@@');

	// Convert Meta tags to object
	const metaObj = meta.split(/\n/).reduce((acc, el) => {
		if (el.length) {
			const [key, value] = el.split('=');
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
		`<url><loc>${metaObj.url || ''}</loc><lastmod>${
			metaObj.date || today
		}</lastmod></url>`
	);

	return `
		<!DOCTYPE html>
		<html lang="en">
		${metaTags}
		<link rel="stylesheet" href="assets/style.css">
		<link rel="icon" href="assets/favicon.ico" />
		<title>${metaObj.title}</title>
		</head>
		<body>
		${header}
		<article>
		${parsed}
		${shareLinks(metaObj.url, metaObj.title)}
		${author.generateHTML(!(argv.dontCompressImages || argv.dontGenerateWebp))}
		</article>
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
		<meta name="description" content="${description || ''}" />
		<meta name="language" content="english" />
		<meta name="title" content="${title || ''}" />
		<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, maximum-scale=1.0, user-scalable=2">	
	`;
	const openGraph = `
		<!-- OpenGraph -->
		<meta property="og:description" content="${description || ''}" />
		<meta property="og:image" content="${image}" />
		<meta property="og:site_name" content="${siteName || ''}" />
		<meta property="og:title" content="${title || ''}" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="${url || ''}" />
	`;
	const twitter = `
		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:description" content="${description || ''}" />
		<meta name="twitter:image" content="${image || ''}" />
		<meta name="twitter:title" content="${title || ''}" />
	`;
	return baseMeta + openGraph + twitter;
}
build();
