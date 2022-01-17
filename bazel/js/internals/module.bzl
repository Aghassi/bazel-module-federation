load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@npm//@bazel/typescript:index.bzl", "ts_project")

# Defines this as an importable module area for shared macros and configs

def build_module(package_name, srcs, deps, **kwargs):
    """
    Macro that allows easy construction of a TS module that can be shared across the project

    Args:
        package_name: name of the package
        srcs: source files from the package
        deps: any dependencies needed to build
        **kwargs: any other inputs to js_library
    """

    # list of all transpilation targets from SWC to be passed to webpack
    ts_project(
        name = "transpiled_pkg",
        srcs = srcs,
        deps = deps,
        declaration = True,
        tsconfig = {
            "compilerOptions": {
                "declaration": True,
            },
        },
    )

    js_library(
        name = native.package_name().split("/")[-1],
        package_name = package_name,
        srcs = [
            ":transpiled_pkg",
        ],
        **kwargs
    )
