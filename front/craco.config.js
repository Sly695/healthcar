// craco.config.js

const CracoLessPlugin = require('craco-less');

module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
       options: {
         lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
           modifyVars: {
            'primary-color': '#6793FF',
            'info-color': '#6793FF',
            'success-color': '#5CC689',
            'processing-color': '#EE7D52',
            'error-color': '#EE7D52',
            'highlight-color': '#B170FF',
            'warning-color': '#FFAE80',
            'white': '#fff',
            'black': '#000',
            'link-color': '#FFAE80',
            'border-radius-base': '2px',
            'layout-sider-background': '#fff',
           },
           javascriptEnabled: true,
         },
       },
      }],
    }],

  }