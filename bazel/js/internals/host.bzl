load("@npm//webpack:index.bzl", "webpack")

# Defines this as an importable module area for shared macros and configs

def build_host(entry, data):
    """
    Macro that allows easy building of the main host of a SPA

    Args:
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """
    webpack(
        name = "build_host",
        args = [
            "--env name=host",
            "--env entry=" + entry,
            "--output-path=$(RULEDIR)",
            "--config=$(rootpath //bazel/js/internals/webpack:host_config)"
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:host_config",
        ] + data,
        output_dir = True
    )