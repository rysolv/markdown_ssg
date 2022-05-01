const fs = require("fs");
const path = require("path");

/**
 * This callback type is called `filterFunc` and is displayed as a global symbol.
 *
 * @callback filterFunc
 * @param {string} src
 * @returns {boolean}
 */

// Credits: https://stackoverflow.com/a/22185855/8816118
/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 * @param {filterFunc} filterFunc Determines if a file/directory should be copied.
 */
const copyRecursiveSync = function (src, dest, filterFunc) {
	const exists = fs.existsSync(src);
	const stats = exists && fs.statSync(src);
	const isDirectory = exists && stats.isDirectory();
	if (filterFunc && !filterFunc(src)) {
		return;
	}
	if (isDirectory) {
		fs.mkdirSync(dest);
		fs.readdirSync(src).forEach(function (childItemName) {
		copyRecursiveSync(
			path.join(src, childItemName),
			path.join(dest, childItemName)
		);
		});
	} else {
		fs.copyFileSync(src, dest);
	}
};

exports.copyRecursiveSync = copyRecursiveSync;
