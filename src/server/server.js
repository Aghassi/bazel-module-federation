/** the server code that will render the HTML */

const getPageTemplate = require("./getPageTemplate");

const http = require("http");
const path = require("path");
const fs = require("fs");

const config = require("@carto/routes");

const { getRemoteEntryScript } = require("@carto/utils");

/**
 *
 * @param {import('http').ClientRequest} req request
 * @param {import('http').ServerResponse} res response
 */
const requestListener = function (req, res) {
  // Filter out favicon from spurious logic
  if (req.url.startsWith("/favicon.ico")) {
    res.writeHead(404);
  } else if (req.url.startsWith("/__dev__/")) {
    // Currently, in development mode, we bundle all client
    //  assets with the server and set CDN_HOST to '/__dev__/'
    //  as an indicator that the dependencies are co-located.
    //  In this situtation, we deliver the assets in the same
    //  file structure but from local

    const filePath = req.url.replace("/__dev__/", "");

    const fileToFetch = path.resolve("../..", "src/client/client", filePath);

    res.writeHead(200);
    res.end(fs.readFileSync(fileToFetch, "utf-8"));
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

if (process.env.CDN_HOST.includes("__dev__")) {
  console.log("Development server started on port 8080");
}
const server = http.createServer(requestListener);
server.listen(8080);
