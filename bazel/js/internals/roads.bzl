load("@npm//webpack:index.bzl", "webpack")

# Defines this as an importable module area for shared macros and configs

def build_road(name, entry, data):
    """
    Macro that allows easy composition of routes from a multi route spa

    Args:
        name: name of a road (route)
        entry: the entry file to the route
        data: any dependencies the route needs to build
    """
    build_name = name + "_road"
    webpack(
        name = "routes"  if name == "default" else name,
        args = [
            "--env name=" + build_name,
            "--env entry=" + entry,
            "--output-path=$(@D)",
            "--config=$(rootpath //bazel/js/internals/webpack:road_config)"
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js/internals/webpack:road_config",
        ] + data,
        output_dir = True
    )