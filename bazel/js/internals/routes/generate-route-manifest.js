const fs = require("fs");
const path = require("path");

// Create the object to represent the manifest
const manifest = {
  "/": "index.sha.js",
};

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
const getFilesInDirectory = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

const routeDirs = getDirectories(
  "bazel-out/k8-fastbuild/bin/src/client/routes/routes"
);

// For each folder we read, check what it is and
// determine the route mapping
routeDirs.forEach((dir) => {
  const remoteEntry = getFilesInDirectory(
    `bazel-out/k8-fastbuild/bin/src/client/routes/routes/${dir}`
  ).filter((file) => !file.endsWith(".map") && file.startsWith("remote"));

  switch (dir) {
    case "default":
      manifest["/"] = `${remoteEntry}`;
      break;
    default:
      manifest[`${dir}`] = `${remoteEntry}`;
      break;
  }
});

// Finally write out the manifest
fs.writeFileSync(
  // TODO: determine a better way to find bazel-out
  `${path.resolve(
    process.cwd(),
    "bazel-out/k8-fastbuild/bin/src/client/routes"
  )}/route.manifest.json`,
  JSON.stringify(manifest, null, 2)
);
