# Bower Webpack Plugin
Use [Bower](https://bower.io/) with [Webpack v2](https://webpack.js.org/).

## What

Enhances ``enhanced-resolver`` plugin to be able to understand ``bower.json`` description file when main field is an array. Plugin iterates over all defined libraries in the array, finds javascript file and resolves it as a module file. Keep in mind, you are still responsible to manually require any other non-javascript files associated with the bower package.

## Usage
Install the plugin:
```
npm install bower-resolve-webpack-plugin
```
Add the plugin to your Webpack configuration:
```javascript
  const BowerResolvePlugin = require("bower-resolve-webpack-plugin");

  resolve: {
    plugins: [new BowerResolvePlugin()],
    modules: [
        'bower_components'
    ],
    descriptionFiles: ['bower.json', 'package.json'],
    mainFields: ['main', 'browser']
  },
```

## Caveats
This plugin has been developed to work with Webpack 2, for similar plugins that work with Webpack 1 use [Bower Plugin](https://github.com/lpiepiora/bower-webpack-plugin).

## About CodeWizz
CodeWizz is a web development agency based in Lithuania. You'll find more information [on our website](https://codewizz.com).

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.