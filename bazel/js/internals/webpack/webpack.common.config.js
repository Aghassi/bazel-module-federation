module.exports = ({ production }) => {
  return {
    cache: false,

    mode: production ? "production" : "development",
    devtool: "source-map",

    optimization: {
      minimize: false,
    },

    output: {
      filename: production ? "[name].[contenthash].js" : "[name].js",
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
  };
};
