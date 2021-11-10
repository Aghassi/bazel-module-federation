/** the server code that will render the HTML */

const getPageTemplate = require("./getPageTemplate");

const http = require("http");

/**
 * 
 * @param {import('http').ClientRequest} req request
 * @param {import('http').ServerResponse} res response
 */
const requestListener = function (req, res) {
  console.log(req.url);
  res.writeHead(200);
  res.end(getPageTemplate({
    head: [
      `<script src="http://localhost:3000/host/main.js"></script>`
    ]
  }));
};

const server = http.createServer({
  cors: 
}, requestListener);
server.listen(8080);