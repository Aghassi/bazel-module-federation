load("@npm//webpack:index.bzl", "webpack")
load("@aspect_rules_swc//swc:swc.bzl", "swc")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_web")

# Defines this as an importable module area for shared macros and configs

def build_host(entry, data, srcs, **kwargs):
    """
    Macro that allows easy building of the main host of a SPA

    Args:
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """

    # list of all transpilation targets from SWC to be passed to webpack
    deps = [
        ":transpile_" + files.replace("//", "").replace("/", "_").split(".")[0]
        for files in srcs
    ] + data

    [
        swc(
            name = "transpile_" + s.replace("/", "_").split(".")[0],
            args = [
                "-C jsc.parser.jsx=true",
            ],
            srcs = [s],
        )
        for s in srcs
    ]
    webpack(
        name = "host_build",
        args = [
            "--env name=host",
            "--env entry=./$(location :transpile_host)",
            "--output-path=$(@D)",
            "--config=$(rootpath //bazel/js/internals/webpack:host_config)",
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:host_config",
            "//bazel/js/internals/webpack:webpack_shared_configs",
        ] + deps,
        output_dir = True,
    )

    visibility = kwargs.pop("visibility", [])

    pkg_web(
        name = "host",
        srcs = [
            ":host_build",
        ],
        additional_root_paths = ["%s/host_build" % native.package_name()],
        visibility = visibility,
    )
