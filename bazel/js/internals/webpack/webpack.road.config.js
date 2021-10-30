const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const deps = require("../../../../package.json").dependencies;

/**
 * Webpack configuration used to generate a unique road
 *
 * @param {Record<string, boolean|string}
 * @returns {import('webpack').Configuration} a Webpack configuration
 */
module.exports = ({ entry, production, name }) => {
  return {
    entry: entry,
    cache: false,

    mode: production ? "production" : "development",
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
        name,
        filename: "remoteEntry.js",
        exposes: {
          "./route": entry,
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
};
