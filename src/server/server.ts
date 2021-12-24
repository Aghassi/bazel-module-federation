/** the server code that will render the HTML */

import getPageTemplate from "./getPageTemplate";
import * as http from "http";

// From //src/client/routes:__pkg__, used to give server route context
import { routeManifest } from "@carto/routes";

// From //src/utils:__pkg__
import { getRemoteEntryScript } from "@carto/utils";

/**
 * Handles routes and returns
 */
const requestListener: http.RequestListener = function (req, res): void {
  const path = req.url || "/";

  // Filter out favicon or missing routes
  const remoteScript = getRemoteEntryScript(
    req.url || "/",
    routeManifest,
    process.env.CDN_HOST
  );

  if (remoteScript === null) {
    res.writeHead(404);
    res.end(`Route not found: ${path}`);
  } else {
    res.writeHead(200);
    // In standard processing, this logical path will return an HTML page
    //  containing the following:
    //
    //  - A root div for the React tree to render in (see ./getPageTemplate)
    //  - A fetch of the main app within head
    //  - A fetch of the remoteEntry script for the target page within head
    res.end(
      getPageTemplate({
        head: [
          `<script src="${process.env.CDN_HOST}/app.main.js"></script>`,
          remoteScript,
        ],
        config: routeManifest,
      })
    );
  }
};

console.log("Server started on port 8080!");

const server = http.createServer(requestListener);
server.listen(8080);
