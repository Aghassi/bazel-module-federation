load("//bazel/js/internals:module.bzl", _build_module = "build_module")
load("@build_bazel_rules_nodejs//:index.bzl", _js_library = "js_library", _nodejs_binary = "nodejs_binary", _pkg_web = "pkg_web")

# export so the load statement hits the default path
build_module = _build_module
pkg_web = _pkg_web
js_library = _js_library
nodejs_binary = _nodejs_binary
