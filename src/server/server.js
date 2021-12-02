/** the server code that will render the HTML */

const getPageTemplate = require("./getPageTemplate");

const http = require("http");
const path = require("path");
const fs = require("fs");

const config = require("@carto/routes");

const getIdentifier = (path) =>
  path === "/" || typeof path === "undefined" ? "default" : path;

const getRemoteEntryScript = (remoteEntryPath) => {
  const identifier = getIdentifier(remoteEntryPath);
  const manifestIndex = remoteEntryPath.substring(1) || "/";

  return `<script src="${process.env.CDN_HOST}${path.join(
    "/",
    identifier,
    config[manifestIndex]
  )}"></script>`;
};

/**
 *
 * @param {import('http').ClientRequest} req request
 * @param {import('http').ServerResponse} res response
 */
const requestListener = function (req, res) {
  console.log(`PATH REQUESTED: ${req.url}`);
  if (req.url.startsWith("/favicon.ico")) {
    res.writeHead(404);
  } else if (req.url.startsWith("/__dev__/")) {
    const filePath = req.url.replace("/__dev__/", "");
    console.log(`ASSET REQUEST URL: ${filePath}`);

    const fileToFetch = path.resolve("../..", "src/client/client", filePath);

    console.log(fileToFetch);

    res.writeHead(200);
    res.end(fs.readFileSync(fileToFetch));
  } else {
    res.writeHead(200);
    res.end(
      getPageTemplate({
        path: req.url,
        head: [
          `<script src="${process.env.CDN_HOST}/app.main.js"></script>`,
          getRemoteEntryScript(req.url || "/"),
        ],
      })
    );
  }
};

const server = http.createServer(requestListener);
server.listen(8080);

if (process.env.CDN_HOST === "/__dev__/") {
  console.log("Development server started on port 8080");
}
