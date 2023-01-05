#!/usr/bin/env node

const fs = require('fs-extra');
const marked = require('marked');
const initialConfig = require('./initialConfig.json');

switch (process.argv[2]) {
	case 'b':
	case 'build':
		build();
		break;
	case 'i':
	case 'init':
		init();
		break;
	case '--help':
		console.log('\nMSGO - markdown static site generator\n');
		console.log('Usage: msgo [OPTION]\n');
		console.log('b, build         Compile the build directory.');
		console.log('i, init          Initialize config + file structure.');
		console.log('--help           Display a list of available commands.');
		break;
	default:
		console.log('Not a valid argument.');
		console.log('Type msgo --help for a list of valid commands.');
		break;
}

// Initialize the file structure (if not already in place);
async function init() {
	const pwd = await fs.readdir('./');

	if (!pwd.includes('msgo.json')) {
		await fs.writeFile('msgo.json', JSON.stringify(initialConfig));
		console.log('Created msgo.json');
	}

	if (!pwd.includes('src')) {
		const sample = await fs.readFile(__dirname + '/sample');
		await fs.mkdir('src/sample', { recursive: true });
		await fs.writeFile('src/sample/index.md', sample);
		console.log('Created sample app');
	}
}

// Compile source folder to HTML
async function build() {
	// Check for config file before building
	const pwd = await fs.readdir('./');
	if (!pwd.includes('msgo.json')) {
		console.error(
			'Error: Missing config file.\nRun msgo -init before building.'
		);
		return;
	}

	// Delete existing build directory
	if (pwd.includes('build'))
		await fs.rmdir('./build', { recursive: true, force: true });

	// Create build directory
	await fs.mkdir('./build');
	await fs.mkdir('./build/assets');

	// Copy assets into src
	await fs.copySync(__dirname + '/src/assets', './build/assets', {
		overwrite: true,
	});

	// Read config from msgo.json
	const config = JSON.parse(await fs.readFile('./msgo.json'));
	const links = [];

	const src = await fs.readdir('./src');

	for (const folder of src) {
		const files = await fs.readdir(`./src/${folder}`);
		for (const file of files) {
			if (folder !== 'assets') {
				// Take first part of file name for html name (this will be the url)
				const [path] = file.split('.');

				const data = await fs.readFile(
					`./src/${folder}/${file}`,
					'utf8'
				);

				// Break out metadata at deliminator
				const [meta, markdown] = data.split('@@@');

				// Convert Meta tags to object
				const metaObj = meta.split(/\n/).reduce((acc, el) => {
					if (el.length) {
						const [key, value] = el.split('=');
						acc[key] = value.trim();
					}
					return acc;
				}, {});
				metaObj.siteName = config.name;
				metaObj.url = `${folder}/${path}.html`;

				// Store metaObj for each blog
				// Used to generate index & sitemap
				links.push(metaObj);

				// Read Markdown and generate HTML
				const html = parseHTML(markdown, metaObj);

				// Create sub directory
				await fs.mkdir(`./build/${folder}`);

				// Write HTML to file
				await fs.writeFile(`./build/${folder}/${path}.html`, html);
			}
		}
	}

	await generateSiteMap({ config, links });
	const indexPage = await generateIndexPage({ config, links });
	await fs.writeFile('./build/index.html', indexPage);
}

function parseHTML(markdown, metaObj) {
	// Generte meta tags and HTML
	const metaTags = generateMetaTags(metaObj);
	const parsed = marked.parse(markdown);

	return `
	<!DOCTYPE html>
	<html lang="en">
	${metaTags}
	<link rel="stylesheet" href="assets/style.css">
	<title>${metaObj.title}</title>
	</head>
	<body>${parsed}</body>
	</html>
	`;
}

async function generateIndexPage({ config, links }) {
	// Push links to index page
	const blogList = links.map((metaObj) => {
		return `<li><a href="./${metaObj.url}">${metaObj.title}</a> - ${metaObj.description}</li>`;
	});

	return `
	<!DOCTYPE html>
	<html lang="en">
	<link rel="stylesheet" href="assets/style.css">
	<title>${config.name}</title>
	</head>

	<body>${blogList.join('')}</body>
	</html>
	`;
}

async function generateSiteMap({ config, links }) {
	const [today] = new Date().toISOString().split('T');

	console.log(links);
	// Push articles to sitemap
	sitemap = links.map((metaObj) => {
		return `<url><loc>${config.baseUrl}/${
			metaObj.url || ''
		}</loc><lastmod>${metaObj.date || today}</lastmod></url>`;
	});

	console.log(sitemap);

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

function generateMetaTags({ description, image, siteName, title, url }) {
	// Create meta tags for social links
	return `
	<!-- Base meta tags -->
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="${description || ''}" />
	<meta name="language" content="english" />
	<meta name="title" content="${title || ''}" />
	<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, maximum-scale=1.0, user-scalable=2">	
	
	<!-- OpenGraph -->
	<meta property="og:description" content="${description || ''}" />
	<meta property="og:image" content="${image}" />
	<meta property="og:site_name" content="${siteName || ''}" />
	<meta property="og:title" content=${title || ''} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="${url || ''}" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:description" content="${description || ''}" />
	<meta name="twitter:image" content="${image || ''}" />
	<meta name="twitter:title" content="${title || ''}" />
	`;
}
