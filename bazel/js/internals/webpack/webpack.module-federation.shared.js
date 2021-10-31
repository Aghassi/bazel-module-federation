const deps = require("../../../../package.json").dependencies;
module.exports = {
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
};
