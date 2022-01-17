# bazel-module-federation

Proof of concept for using Bazel to back a webpack module federation website

## Setup

1. `yarn` for local development
1. `yarn bazel COMMAND` for running any bazel based commands

## Run

### Local development

```sh
yarn ibazel run //:dev
```

### Docker

If you want to try the federated site, you can do the following

1. Make sure [Docker](https://docker.io) is running on your machine.
1. `yarn bazel build //...`
1. `yarn bazel run //src/server:server_image`
1. `docker-compose up -d`

You can then navigate to `http://localhost:8080/` to see the default route and `http://localhost:8080/secondary` route.

When done, run `docker-compose down`

It is recommended you use [StackBuild plugin](https://marketplace.visualstudio.com/items?itemName=StackBuild.bazel-stack-vscode) for VSCode to get good Bazel integration.

## Create a new Route (currently MacOS only)

To create a new route, you can use the helper shell script:

```bash
./create_route my-route-name
```

This will:

- Create a new directory under `src/client/routes` with an associated React component and `BUILD.bazel` file
- Associate the route to the `routes` config in `src/client/routes/BUILD.bazel` file
