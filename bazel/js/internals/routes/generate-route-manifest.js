const fs = require("fs");
const path = require("path");

// Create the object to represent the manifest
const manifest = {
  "/": "index.sha.js",
};

// For each folder we read, check what it is and
// determine the route mapping
// for (folder in folders) {
//   switch (folder) {
//     case "default":
//       manifest["/"] = "index.sha.js";
//       break;
//     default:
//       manifest[`${key}`] = "key.sha.js";
//       break;
//   }
// }

// Finally write out the manifest
fs.writeFileSync(
  // TODO: determine a better way to find bazel-out
  `${path.resolve(
    process.cwd(),
    "bazel-out/k8-fastbuild/bin/src/client/routes"
  )}/route.manifest.json`,
  JSON.stringify(manifest, null, 2)
);
