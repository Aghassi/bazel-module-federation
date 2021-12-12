load("@npm//webpack:index.bzl", "webpack")
load("@aspect_rules_swc//swc:swc.bzl", "swc")

# Defines this as an importable module area for shared macros and configs

def build_host(entry, data):
    """
    Macro that allows easy building of the main host of a SPA

    Args:
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """

    [
        swc(
            name = "transpile_" + s.replace(".jsx", ""),
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
            "--env entry=$(location :transpile_host)",
            "--output-path=$(@D)",
            "--config=$(rootpath //bazel/js/internals/webpack:host_config)",
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:host_config",
            "//bazel/js/internals/webpack:webpack_shared_configs",
        ] + [
            "//src/client/host:transpile_" + out
            for out in data
        ],
        output_dir = True,
    )
