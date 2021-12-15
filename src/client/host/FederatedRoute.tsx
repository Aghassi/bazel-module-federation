import React from "react";
import { getIdentifier } from "@carto/utils";
import DynamicComponent from "./DynamicComponent";

export default function FederatedRoute({ path, url }) {
  const identifier = getIdentifier(path);
  console.log(`Federated Route:`, path, url);
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
