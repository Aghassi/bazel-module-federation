load("//bazel/js/internals:host.bzl", _build_host = "build_host")
load("//bazel/js/internals:roads.bzl", _build_road = "build_road")
load("@build_bazel_rules_nodejs//:index.bzl", _pkg_web = "pkg_web")

# export so the load statement hits the default path
build_road = _build_road
build_host = _build_host
pkg_web = _pkg_web
