module.exports = ({ head = [""] }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    ${head.join("\n")}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
