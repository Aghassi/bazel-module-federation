import React from "react";
import getIdentifier from "./capabilities/getIdentifier";
import DynamicComponent from "./DynamicComponent";

export default function FederatedRoute({ path, url }) {
  const identifier = getIdentifier(path);
  console.log(path);
  return (
    <DynamicComponent
      system={{
        scope: `${identifier}_road`,
        module: "./route",
        url,
      }}
    />
  );
}
