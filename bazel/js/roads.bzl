load("@npm//webpack:index.bzl", "webpack")

# Defines this as an importable module area for shared macros and configs

def build_road(name, entry, data):
    build_name = name + "_road"
    webpack(
        name = build_name,
        args = [
            "--env name=" + build_name,
            "--env entry=" + entry,
            "--output-path=$(RULEDIR)",
            "--config=$(rootpath //bazel/js:webpack.road.config.js)"
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js:webpack.road.config.js",
        ] + data,
        output_dir = True
    )