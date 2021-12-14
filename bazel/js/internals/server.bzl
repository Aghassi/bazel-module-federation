load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@aspect_rules_swc//swc:swc.bzl", "swc")

# Defines this as an importable module area for shared macros and configs

def build_server(name, srcs, data, **kwargs):
    """
    Macro that allows easy composition of routes from a multi route spa

    Args:
        package_name: name of the package
        srcs: source files from the package
        data: any dependencies needed to build
        kwargs: any other inputs to js_library
    """

    # list of all transpilation targets from SWC to be passed to webpack
    deps = [
        ":transpile_" + files.replace("//", "").replace("/", "_").split(".")[0]
        for files in srcs
    ]

    [
        swc(
            name = "transpile_" + s.replace("//", "").replace("/", "_").split(".")[0],
            args = [
                "-C jsc.parser.jsx=true",
                "-C jsc.parser.syntax=typescript",
                "-C jsc.target=es2015",
                "-C module.type=commonjs",
            ],
            srcs = [s],
        )
        for s in srcs
    ]

    visibility = kwargs.pop("visibility", ["//visibility:public"])

    js_library(
        name = name,
        srcs = deps + data,
        visibility = visibility,
        **kwargs
    )