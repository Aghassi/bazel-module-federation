load("@npm//webpack:index.bzl", "webpack")

# Defines this as an importable module area for shared macros and configs

def build_road(name, entry, chdir):
    build_name = name + "_road"
    webpack(
        name = build_name,
        chdir = chdir,
        args = [
            "--env name=" + build_name,
            "--env entry=./" + entry,
            "--output-path=$(RULEDIR)",
            "--config=../../../bazel/js/webpack.road.config.js"
        ],
        data = [
            "@npm//:node_modules",
            "//:package.json",
            "//bazel/js:webpack.road.config.js",
            entry
        ],
        output_dir = True
    )