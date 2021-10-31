const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const deps = require("../../../../package.json").dependencies;
const webpackCommonConfig = require("./webpack.common.config");
const shared = require("./webpack.module-federation.shared");

/**
 * Webpack configuration used to generate a unique road
 *
 * @param {Record<string, boolean|string}
 * @returns {import('webpack').Configuration} a Webpack configuration
 */
module.exports = ({ entry, production, name }) => {
  return {
    entry,
    ...webpackCommonConfig({ production }),
    plugins: [
      new ModuleFederationPlugin({
        name,
        filename: "remoteEntry.[contenthash].js",
        exposes: {
          "./route": entry,
        },
        shared,
      }),
    ],
  };
};
