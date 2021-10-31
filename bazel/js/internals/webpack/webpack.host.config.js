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
        remotes: {
          // app_02: "app_02@http://localhost:3002/remoteEntry.js",
          // app_03: "app_03@http://localhost:3003/remoteEntry.js",
          // app_04: "app_04@http://localhost:3004/remoteEntry.js",
          // app_05: "app_05@http://localhost:3005/remoteEntry.js",
        },
        shared,
      }),
    ],
  };
};
