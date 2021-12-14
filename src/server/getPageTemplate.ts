/**
 * Gets HTML page template
 */
export default ({ head = [""] }: { head: string[] }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    ${head.join("\n")}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
};
