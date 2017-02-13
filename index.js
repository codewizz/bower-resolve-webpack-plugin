var path = require('path');

module.exports = class BowerResolvePlugin {
    constructor(options) {
        this.options = options;
    }

    apply(resolver) {
        resolver.plugin('existing-directory', function (request, callback) {
            var mainModule = null;

            if (request.descriptionFilePath.endsWith('bower.json')) {
                var source = request.descriptionFileData;
                var modules = typeof source['main'] == 'string'
                    ? [source['main']]
                    : source['main'];

                mainModule = modules.find(module => { return module.endsWith('.js') });
            }

            if (! mainModule) {
                return callback();
            }

            var obj = Object.assign({}, request, {
                path: path.resolve(request.path, mainModule)
            });

            return resolver.doResolve('file', obj, 'bower resolve: ' + mainModule, callback);
        });
    }
}