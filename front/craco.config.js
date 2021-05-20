// craco.config.js

const CracoLessPlugin = require('craco-less');

module.exports = {
              plugins: [
                {
                  plugin: CracoLessPlugin,
                  options: {
                    lessLoaderOptions: {
                      lessOptions: {
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
                  },
                },
              ]
            }