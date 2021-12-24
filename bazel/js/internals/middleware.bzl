load("@build_bazel_rules_nodejs//:index.bzl", "js_library")

# For now, a proxy for js_library
def build_middleware(**kwargs):
    js_library(
        **kwargs
    )
