load("@npm//webpack:index.bzl", "webpack")

# Defines this as an importable module area for shared macros and configs

def build_host(entry, data):
    """
    Macro that allows easy building of the main host of a SPA

    Args:
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """

    # list of all transpilation targets from SWC to be passed to webpack
    deps = [
        ":transpile_" + files.replace("//", "").replace("/", "_").split(".")[0]
        for files in data
    ]

    [
        swc(
            name = "transpile_" + s.replace("/", "_").split(".")[0],
            args = [
                "-C jsc.parser.jsx=true",
            ],
            srcs = [s],
        )
        for s in data
    ]

    webpack(
        name = "host_build",
        args = [
            "--env name=host",
            "--env entry=" + entry,
            "--output-path=$(@D)",
            "--config=$(rootpath //bazel/js/internals/webpack:host_config)",
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:host_config",
            "//bazel/js/internals/webpack:webpack_shared_configs",
        ] + data,
        output_dir = True,
    )
