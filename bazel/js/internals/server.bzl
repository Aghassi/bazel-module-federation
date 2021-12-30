load("//bazel/docker:defaults.bzl", "container_image", "container_layer")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library", "nodejs_binary", "pkg_web")
load("@aspect_rules_swc//swc:swc.bzl", "swc")

def convert_filename(filename):
    return filename.replace("//", "").replace("/", "_").replace(":", "_").split(".")[0]

# Defines this as an importable module area for shared macros and configs

def build_server(name, srcs, data, **kwargs):
    """
    Macro that construct the http server for the project

    Args:
        name: name of the package
        srcs: source files from the package
        data: any dependencies needed to build
        kwargs: any other inputs to js_library
    """

    # list of all transpilation targets from SWC to be passed to webpack
    deps = [
        ":transpile_" + convert_filename(file)
        for file in srcs
    ]

    [
        swc(
            name = "transpile_" + convert_filename(s),
            # output_dir = True if ":" in s else False,
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

    js_library(
        name = name,
        srcs = deps + data,
        **kwargs
    )

def server(name, route_manifest_module):
    build_server(
        name = "%s_build" % name,
        srcs = [
            "//bazel/js/internals/server:server_code",
        ],
        data = [
            "//bazel/js/internals/utils",
            route_manifest_module,
        ],
    )

    nodejs_binary(
        name = "%s_dev" % name,
        chdir = "%s/server" % native.package_name(),
        data = [
            ":%s_build" % name,
        ],
        entry_point = "server.js",
        visibility = ["//visibility:public"],
    )

    # This layer links the server container to the routes being
    # Changed so it can have the route manifest
    container_layer(
        name = "route_manifest_layer",
        directory = "/home/node/node_modules/@carto/routes",
        files = [
            route_manifest_module,
        ],
    )

    # This layer links the server container to the routes being
    # Changed so it can have the route manifest
    container_layer(
        name = "utils_layer",
        directory = "/home/node/node_modules/@carto/utils",
        files = [
            "//bazel/js/internals/utils",
        ],
    )

    # This layer container the server files
    container_layer(
        name = "server_source_layer",
        directory = "/home/node",
        files = [
            ":%s_server" % name,
        ],
    )

    # This builds the final image for use and sets the directory to /home/node
    container_image(
        name = "%s_server_image" % name,
        base = "@node//image",
        layers = [
            ":server_source_layer",
            ":route_manifest_layer",
            ":utils_layer",
        ],
        workdir = "/home/node",
    )
