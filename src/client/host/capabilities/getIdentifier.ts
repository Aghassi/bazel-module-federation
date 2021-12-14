export default (path) =>
  path === "/" || typeof path === "undefined" ? "default" : path;
