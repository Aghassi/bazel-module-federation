const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const webpackCommonConfig = require("./webpack.common.config");
const shared = require("./webpack.module-federation.shared");

/**
 * Webpack configuration used to generate a unique road
 *
 * @param {Record<string, boolean|string}
 * @returns {import('webpack').Configuration} a Webpack configuration
 */
module.exports = ({ entry, production }) => {
  return {
    entry,
    ...webpackCommonConfig({ production }),
    plugins: [
      new ModuleFederationPlugin({
        name: "app",
        filename: "appEntry.js",
        library: { type: "var", name: "app" },
        remotes: {},
        shared,
      }),
    ],
  };
};
