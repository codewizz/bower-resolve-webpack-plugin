'use strict';

const path = require('path');
const pluginName = 'bower-resolve-webpack-plugin';

const defaultOptions = {
    extensions: ['.js']
};

function matchModule(filename, extensions) {
    const ext = path.extname(filename);
    return extensions.includes(ext);
}

module.exports = class BowerResolvePlugin {
    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options);
    }

    apply(resolver) {
        // Webpack 4
        if (Object.prototype.hasOwnProperty.call(resolver, 'hooks')) {
            resolver.hooks.existingDirectory.tapAsync(pluginName, (request, resolveContext, callback) => {
                if (request.path !== request.descriptionFileRoot) {
                    return callback();
                }

                let mainModule = null;

                if (request.descriptionFilePath.endsWith('bower.json')) {
                    let source = request.descriptionFileData;
                    let modules = typeof source['main'] == 'string'
                        ? [source['main']]
                        : source['main'];

                    if (!modules) {
                        return callback();
                    }

                    mainModule = modules.find(module => matchModule(module, this.options.extensions));
                }

                if (!mainModule) {
                    return callback();
                }

                let object = Object.assign({}, request, {
                    path: path.resolve(request.path, mainModule)
                });

                return resolver.doResolve(resolver.hooks.undescribedRawFile, object, 'using path: ' + mainModule, resolveContext, callback);
            });
        // Webpack 2 or 3
        } else {
            resolver.plugin('existing-directory', function (request, callback) {
                if (request.path !== request.descriptionFileRoot) {
                    return callback();
                }

                let mainModule = null;

                if (request.descriptionFilePath.endsWith('bower.json')) {
                    let source = request.descriptionFileData;
                    let modules = typeof source['main'] == 'string'
                        ? [source['main']]
                        : source['main'];

                    if (! modules) {
                        return callback();
                    }

                    mainModule = modules.find(module => matchModule(module, this.options.extensions));
                }

                if (! mainModule) {
                    return callback();
                }

                let object = Object.assign({}, request, {
                    path: path.resolve(request.path, mainModule)
                });

                return resolver.doResolve('undescribed-raw-file', object, 'using path: ' + mainModule, callback);
            });
        }
    }
}
