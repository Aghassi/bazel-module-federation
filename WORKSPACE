workspace(
    name = "bazel_module_federation",
    managed_directories = {"@npm": ["node_modules"]},
)

NODE_VERSION = "16.13.0"

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "ddb78717b802f8dd5d4c01c340ecdc007c8ced5c1df7db421d0df3d642ea0580",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/4.6.0/rules_nodejs-4.6.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

# NOTE: this rule installs nodejs, npm, and yarn, but does NOT install
# your npm dependencies into your node_modules folder.
# You must still run the package manager to do this.
node_repositories(
    node_version = NODE_VERSION,
    package_json = ["//:package.json"],
)

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    links = {
        "@carto/utils": "//src/utils",
    },
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "67d6020374627f60c6c1e5d5e1690fcdc4fa39952de8a727d3aabe265ca843be",
    strip_prefix = "rules_swc-0.1.0",
    url = "https://github.com/aspect-build/rules_swc/archive/v0.1.0.tar.gz",
)

# Fetches the rules_swc dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

# Fetches a pre-built Rust-node binding from
# https://github.com/swc-project/swc/releases.
# If you'd rather compile it from source, you can use rules_rust, fetch the project,
# then register the toolchain yourself. (Note, this is not yet documented)
load("@aspect_rules_swc//swc:repositories.bzl", "swc_register_toolchains")

swc_register_toolchains(
    name = "swc",
    swc_version = "v1.2.118",
)

# Fetches a NodeJS interpreter, needed to run the swc CLI.
# You can skip this if you already register a nodejs toolchain.
load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "node16",
    node_version = NODE_VERSION,
)

# Fetches the npm packages needed to run @swc/cli
load("@swc_cli//:repositories.bzl", _swc_cli_deps = "npm_repositories")

_swc_cli_deps()

# Skylib

http_archive(
    name = "bazel_skylib",
    sha256 = "c6966ec828da198c5d9adbaa94c05e3a1c7f21bd012a0b29ba8ddbccb2c93b0d",
    urls = [
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
    ],
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

# Rules Go is needed by Rules Docker
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "2b1641428dff9018f9e85c0384f03ec6c10660d935b750e3fa1492a281a53b0f",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.29.0/rules_go-v0.29.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.29.0/rules_go-v0.29.0.zip",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains(version = "1.17.1")

http_archive(
    name = "bazel_gazelle",
    sha256 = "de69a09dc70417580aabf20a28619bb3ef60d038470c7cf8442fafcf627c21cb",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
    ],
)

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")

gazelle_dependencies()

# Install Rules Docker for building containers
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "92779d3445e7bdc79b961030b996cb0c91820ade7ffa7edca69273f404b085d5",
    strip_prefix = "rules_docker-0.20.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.20.0/rules_docker-v0.20.0.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    _container_repositories = "repositories",
)

_container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", _container_deps = "deps")

_container_deps()

# Pull containers

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "node",
    digest = "sha256:861ae5fa5b05b54090ed780bc1bafac0846c55a7001180dffebbc18ae790b3cf",
    registry = "registry.hub.docker.com",
    repository = "library/node",
    tag = "%s-bullseye" % NODE_VERSION,
)

# Buildifier for linting
http_archive(
    name = "com_google_protobuf",
    sha256 = "9b4ee22c250fe31b16f1a24d61467e40780a3fbb9b91c3b65be2a376ed913a1a",
    strip_prefix = "protobuf-3.13.0",
    urls = [
        "https://github.com/protocolbuffers/protobuf/archive/v3.13.0.tar.gz",
    ],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "ae34c344514e08c23e90da0e2d6cb700fcd28e80c02e23e4d5715dddcb42f7b3",
    strip_prefix = "buildtools-4.2.2",
    urls = [
        "https://github.com/bazelbuild/buildtools/archive/refs/tags/4.2.2.tar.gz",
    ],
)

git_repository(
    name = "com_github_ash2k_bazel_tools",
    commit = "4daedde3ec61a03db841c8a9ca68288972e25a82",
    remote = "https://github.com/ash2k/bazel-tools.git",
)

load("@com_github_ash2k_bazel_tools//multirun:deps.bzl", "multirun_dependencies")

multirun_dependencies()

http_archive(
    name = "rules_spa",
    sha256 = "6f02952ef6d7fa6b491b89b2a8c12e728bc51f418e9eaa9f94a7f4e89fb9f80f",
    strip_prefix = "rules_spa-0.0.7",
    url = "https://github.com/aghassi/rules_spa/archive/v0.0.7.tar.gz",
)

# Fetches the rules_spa dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@rules_spa//spa:repositories.bzl", "rules_spa_dependencies")

rules_spa_dependencies()
