load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "node",
    repository = "library/node",
    tag = "16.13.0-bullseye"
)