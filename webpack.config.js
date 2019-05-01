const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
          },
          {
              test: /\.vue$/,
              use: 'vue-loader'
          }
        ],
      },
      plugins: [
          new VueLoaderPlugin()
      ],
      devtool: 'source-map'
};