load("@npm//webpack:index.bzl", "webpack")
load("@aspect_rules_swc//swc:swc.bzl", "swc")

# Defines this as an importable module area for shared macros and configs

def build_route(name, entry, data):
    """
    Macro that allows easy composition of routes from a multi route spa

    Args:
        name: name of a route (route)
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """
    build_name = name + "_route"

    # list of all transpilation targets from SWC to be passed to webpack
    deps = [
        ":transpile_" + files.replace("//", "").replace("/", "_").split(".")[0]
        for files in data
    ]

    [
        swc(
            name = "transpile_" + s.replace("//", "").replace("/", "_").split(".")[0],
            args = [
                "-C jsc.parser.jsx=true",
                "-C jsc.parser.syntax=typescript",
                "-C jsc.transform.react.runtime=automatic",
                "-C jsc.transform.react.development=false",
                "-C module.type=commonjs",
            ],
            srcs = [s],
        )
        for s in data
    ]

    webpack(
        name = name,
        args = [
            "--env name=" + build_name,
            "--env entry=./$(execpath :transpile_" + name + ")",
            "--output-path=$(@D)",
            "--config=$(rootpath //bazel/js/internals/webpack:route_config)",
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:route_config",
            "//bazel/js/internals/webpack:webpack_shared_configs",
        ] + deps,
        output_dir = True,
        visibility = ["//src/client/routes:__pkg__"],
    )
