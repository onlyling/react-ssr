const path = require('path');
const packageJson = require('../package.json');

const publicPath = packageJson.publicPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const resolveRootPath = (dir) => {
    return path.join(__dirname, '../', dir);
};
const resolveSrcPath = (dir) => {
    return resolveRootPath(`app/web/${dir}`);
};

module.exports = {
    publicPath,
    shouldUseRelativeAssetPaths,
    resolveRootPath,
    resolveSrcPath
};
