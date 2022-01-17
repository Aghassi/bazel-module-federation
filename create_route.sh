#!/bin/bash

if [ $# -eq 0 ]; then
  echo "USAGE: ./create_route [ROUTE_NAME]"
  exit 1
fi

ROUTE_NAME=$1

if [ -d "src/client/routes/$ROUTE_NAME" ]; then
  echo "Route $ROUTE_NAME already created, exiting..."
  exit 0
fi

mkdir src/client/routes/$ROUTE_NAME

echo "load(\"//bazel/js:defaults.bzl\", \"build_road\")

build_road(
    name = \"$ROUTE_NAME\",
    data = [
        \"$ROUTE_NAME.tsx\",
    ],
    entry = \"./\$(execpath $ROUTE_NAME.tsx)\",
)
" > src/client/routes/$ROUTE_NAME/BUILD.bazel

echo "import React from \"react\";
/**
 * Defines the $ROUTE_NAME route
 */

export default () => (
  <div>
    I am route: $ROUTE_NAME
  </div>
);" > src/client/routes/$ROUTE_NAME/$ROUTE_NAME.tsx

sed -i '' 's|additional_root_paths = \[|additional_root_paths = \[\n\t\t\"%s/'"$ROUTE_NAME"'\" \% package_name\(\),|' src/client/routes/BUILD.bazel
sed -i '' 's|srcs = \[|srcs = \[\n\t\t\"//src/client/routes/'"$ROUTE_NAME"'\",|' src/client/routes/BUILD.bazel
