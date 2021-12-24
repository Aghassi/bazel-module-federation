load("//bazel/js/internals:host.bzl", _build_host = "build_host")
load("//bazel/js/internals:routes.bzl", _build_route = "build_route")
load("//bazel/js/internals:module.bzl", _build_module = "build_module")
load("//bazel/js/internals:server.bzl", _build_server = "build_server")
load("//bazel/js/internals:generate_route_manifest.bzl", _generate_route_manifest = "generate_route_manifest")
load("@build_bazel_rules_nodejs//:index.bzl", _js_library = "js_library", _nodejs_binary = "nodejs_binary", _pkg_web = "pkg_web")

# export so the load statement hits the default path
build_route = _build_route
build_module = _build_module
build_server = _build_server
build_host = _build_host
generate_route_manifest = _generate_route_manifest
pkg_web = _pkg_web
js_library = _js_library
nodejs_binary = _nodejs_binary
