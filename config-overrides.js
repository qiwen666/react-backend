const path = require('path');
const { override, overrideDevServer, addWebpackAlias, adjustStyleLoaders, addWebpackModuleRule }  = require('customize-cra')

module.exports = override(
    addWebpackAlias({
      '@': path.resolve(__dirname, "src")
    }),
    
    addWebpackModuleRule({
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.resolve(__dirname, './src/assets/variable/style.scss')
            ]
          }
        }
      ]
    })
    // adjustStyleLoaders(rule => {
    //   if (rule.test.toString().includes('scss')) {
    //     rule.use.push({
    //       loader: require.resolve('sass-resources-loader'),
    //       options: {
    //         resources: "./src/assets/variable/style.scss"
    //       }
    //     });
    //   }
    // })
  );
  // devServer: overrideDevServer()

// module.exports = function override(config) {
//   config.resolve.alias = {
//     "@": path.resolve(__dirname, "src")
//   },
//   config.module.rules = [
//     {
//       test: /\.s[ac]ss$/,
//       use: [
//         {
//           loader:'style-loader'
//         }, {
//           loader: 'css-loader'
//         }, {
//           loader: 'sass-loader'
//         }, {
//           loader: "sass-resources-loader",
//           options: {
//             resources: [
//               path.resolve(__dirname, './src/assets/variable/_variable.scss')
//             ]
//           }
//         }
//       ]
//     }
//   ]
//   return config
// }

  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,                          //使用babel-loader解析js文件和jsx文件
  //       exclude: /node_modules/,
  //       loader: 'babel-loader'
  //     },
  //     {
  //       test: /\.s[ac]ss$/,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         "style-loader",
  //         // Translates CSS into CommonJS
  //         "css-loader",
  //         // Compiles Sass to CSS
  //         {
  //           loader: "sass-loader",
  //           options: {
  //             sourceMap: true,
  //             sourceMapContents: false
  //           }
  //         }
  //       ],
  //     },
  //     {
  //       test: /\.(gif|jpg|png|jpeg)$/,           // 解析图片
  //       use: [
  //         {
  //           loader: 'url-loader',
  //           options: {
  //             limit: 3400,
  //             name: '[name].[ext]'
  //           }
  //         }],
  //       exclude: /node_modules/
  //     }
  //   ]

  // }


