const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  experiments: {
    topLevelAwait: true,
    asyncWebAssembly: true,
  },    
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};
