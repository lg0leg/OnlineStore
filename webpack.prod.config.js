const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv],
              },
            },
          },
        ],
      },
    ],
  },
};
