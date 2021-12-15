module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write"],
  "*.{yml,yaml}": ["prettier --write"],
  "*.{bazel,bzl}": ["bazel run //:buildifier"],
  "*.sh": ["prettier --write"],
  "*.gitignore": ["prettier --write"],
};
