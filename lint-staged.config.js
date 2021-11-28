module.exports = {
  "*.{js,jsx}": ["prettier --write"],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write"],
  "*.{yml,yaml}": ["prettier --write"],
  "*.{bazel,bzl}": ["bazel run //:buildifier"],
};
