/**
 * Gets HTML page template
 */
export default ({
  head = [""],
  config = {},
}: {
  head: string[];
  config: Record<string, string>;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <script>
      window.config=${JSON.stringify(config)}
    </script>
    <meta charset="UTF-8">
    ${head.join("\n")}
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
};
