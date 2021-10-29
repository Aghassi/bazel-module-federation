const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const deps = require("../../package.json").dependencies;
module.exports = {
  entry: "./host.jsx",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".jsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("esbuild-loader"),
        exclude: /node_modules/,
        options: {
          loader: "jsx", // Remove this if you're not using JSX
          target: "es2015", // Syntax to compile to (see options below for possible values)
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      filename: "appEntry.js",
      remotes: {
        // app_02: "app_02@http://localhost:3002/remoteEntry.js",
        // app_03: "app_03@http://localhost:3003/remoteEntry.js",
        // app_04: "app_04@http://localhost:3004/remoteEntry.js",
        // app_05: "app_05@http://localhost:3005/remoteEntry.js",
      },
      shared: {
        ...deps,
        "react-router-dom": {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        react: {
          singleton: true,
        },
      },
    }),
  ],
};
