// const CracoAntDesignPlugin = require("craco-antd");
 
// module.exports = {
//     plugins: [
//       {
//         plugin: CracoAntDesignPlugin,
//         options: {
//           customizeTheme: {
//             '@primary-color': '#6793FF',
//             '@info-color': '#6793FF',
//             '@success-color': '#5CC689',
//             '@processing-color': '#EE7D52',
//             '@error-color': '#EE7D52',
//             '@highlight-color': '#B170FF',
//             '@warning-color': '#FFAE80',
//             '@white': '#fff',
//             '@black': '#000',
//             '@link-color': '#FFAE80',
//             '@border-radius-base': '2px',
//             '@layout-sider-background': '#fff',
//             '@layout-body-background': '#fff',
//           },
//           strictMath: true,
//           noIeCompat: true,
//         },
//       },
//     ],
//   };

const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
            '@primary-color': '#6793FF',
            '@info-color': '#6793FF',
            '@success-color': '#5CC689',
            '@processing-color': '#EE7D52',
            '@error-color': '#EE7D52',
            '@highlight-color': '#B170FF',
            '@warning-color': '#FFAE80',
            '@white': '#fff',
            '@black': '#000',
            '@link-color': '#FFAE80',
            '@btn-border-radius-base': '15px',
            '@btn-default-color': '@warning-color',
            '@border-radius-base': '15px',
            '@layout-sider-background': '#fff',
            '@layout-body-background': '#fff',
            '@heading-color': '@primary-color',
            '@shadow-color' : 'rgba(16, 30, 115, 0.08)',
           },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};