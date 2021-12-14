/** the server code that will render the HTML */

const getPageTemplate = require("./getPageTemplate");

const http = require("http");

// From //src/client/routes:__pkg__, used to give server route context
const config = require("@carto/routes");

// From //src/utils:__pkg__
const { getRemoteEntryScript } = require("@carto/utils");

/**
 * Handles routes and returns
 * @type {import('http').RequestListener}
 */
const requestListener = function (req, res) {
  // Filter out favicon or missing routes
  const remoteScript = getRemoteEntryScript(req.url || "/", config);

  if (remoteScript === null) {
    res.writeHead(404);
    res.end(`Route not found: ${req.url}`);
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
        path: req.url,
        head: [
          `<script src="${process.env.CDN_HOST}/app.main.js"></script>`,
          getRemoteEntryScript(req.url || "/", config),
        ],
      })
    );
  }
};

console.log("Server started on port 8080");

const server = http.createServer(requestListener);
server.listen(8080);
