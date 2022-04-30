const fse = require('fs-extra')
const yargs = require('yargs/yargs')

const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
// const imageminGifsicle = require('imagemin-gifsicle');

const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const compressableFormats = new Set(['jpg', 'JPG', 'png', 'PNG']);
exports.compressableFormats = compressableFormats;

function filterFunc(src, dest) {
    if (src === 'src/assets' || !compressableFormats.has(src.split('.').pop())) {
        return true;
    }
    return false;
}

async function preProcess() {
    if (!argv.dontCompressImages) {
        compressImages();
        await fse.copy('src/assets', 'build/assets/', { filter: filterFunc })
    } else {
        await fse.copy('src/assets', 'build/assets/');
    }
    
};

async function compressImages() {
    if (!argv.dontGenerateWebp) {
        await imagemin(['./src/assets/*.{jpg,JPG,png,PNG}'], {
            destination: 'build/assets',
            plugins: [
                imageminWebp({
                    method: 6,
                    quality: 60
                }),
                // imageminGifsicle({
                //     optimizationLevel: 3
                // })
            ]
        });
    }
    
    await imagemin(['./src/assets/*.{jpg,JPG,png,PNG}'], {
		destination: 'build/assets',
		plugins: [
            imageminPngquant({
                quality: [0.5,0.8]
            }),
            imageminJpegoptim({
                progressive: true,
                max: 90,
            })
        ]
	});
}

preProcess();