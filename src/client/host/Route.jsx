import React from "react";
import getIdentifier from "./capabilities/getIdentifier";
import DynamicComponent from "./DynamicComponent";

export default function Route({ path }) {
  const identifier = getIdentifier(path)
  return (
    <DynamicComponent
      system={{
        url: `${window.routeManifest.CDN_HOST}/${identifier}/${window.routeManifest[path]}`,
        scope: `${identifier}_road`,
        module: "./route",
      }}
    />
  );
}
