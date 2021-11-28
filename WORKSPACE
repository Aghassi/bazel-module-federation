workspace(
    name = "bazel_module_federation",
    managed_directories = {"@npm": ["node_modules"]},
)

NODE_VERSION = "16.13.0"

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "cfc289523cf1594598215901154a6c2515e8bf3671fd708264a6f6aefe02bf39",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/4.4.6/rules_nodejs-4.4.6.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install", "node_repositories")

# NOTE: this rule installs nodejs, npm, and yarn, but does NOT install
# your npm dependencies into your node_modules folder.
# You must still run the package manager to do this.
node_repositories(
    package_json = ["//:package.json"],
     node_version = NODE_VERSION,
)

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Skylib

http_archive(
    name = "bazel_skylib",
    urls = [
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
    ],
    sha256 = "c6966ec828da198c5d9adbaa94c05e3a1c7f21bd012a0b29ba8ddbccb2c93b0d",
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
bazel_skylib_workspace()

# Install Rules Docker for building containers
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "92779d3445e7bdc79b961030b996cb0c91820ade7ffa7edca69273f404b085d5",
    strip_prefix = "rules_docker-0.20.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.20.0/rules_docker-v0.20.0.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    _container_repositories = "repositories",
)

_container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", _container_deps = "deps")

_container_deps()

# Pull containers

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "node",
    registry = "registry.hub.docker.com",
    repository = "library/node",
    tag = "%s-bullseye" % NODE_VERSION,
    digest = "sha256:861ae5fa5b05b54090ed780bc1bafac0846c55a7001180dffebbc18ae790b3cf"
)
