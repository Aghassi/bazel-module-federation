# Shared Bazel Framework via Macros

## How does this become a framework?

Our POC would need to become a set of exposed macros that can:

- Provide a server (optionally with capability to augment functionality)
- Provide a host application (client-side runtime for loading federated routes)
- A builder for routes (federated modules that expose React components by default)
- A builder for modules (components that are leveraged by multiple routes)
- A builder for middleware (isolated functionality for the route service)

This set of macros should **not declare it's dependencies or dependency versions**. Instead,
the user can set up their workspace and include this within their project, and also the
peer dependencies for the workspace relative to the project (we can provide a script that makes
this easy, or investigate Gazelle). **By default**, we will pull in a proven set of dependencies that we have in our examples effectively, and build a React-based application that creates:

- development server
- A portable service as a Docker container
- A file-structure-opinionated CDN blob (js, minified, compressed)

The above outputs can be released independently, and the versioning/release is something
the downstream engineers are responsible for.

## Building-blocks

| Canonical name     | Responsibility                                                                                                                                                                                                     | Default behavior                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client             | Provides ability to dynamically reference a module federation container and render the exposed route, client-side routing (more client-side feature possible in future)                                            | React with `react-router` to navigate between federated routes, transpiled with SWC and bundled by Webpack.                                                            |
| Server             | Returns HTML templates for routes that bootstrap the application (features like SSR possible in future). Configurable via CLI args/flags or environment variables.                                                 | Returns HTML page with client bundle and preloaded route federation `remoteEntry`. Internal middleware supported to augment functionality                              |
| Routes             | Exposes a module federation container that presents a loadable route to consumers.                                                                                                                                 | Default exports a React component. Transpiled with SWC and bundled with Webpack (hard requirement, no other bundlers currently implement this Module Federation spec.) |
| Development Server | Stands up the `Server` and provides a "CDN" That hosts assets for `Client` and all `Routes`, keeping CDN and Server isolated from compilation. The `Server` thus must need to know where CDN assets are sourced on | Client-side code is hosted through a simple `http-server`, and localhost port is passed to server via `CDN_HOST` environment variable                                  |

## High-level usage design

A project could look like this:

```txt=
|
|- routes/
|  | - default.tsx
|  | - BUILD.bazel
|  | - secondary/
|  |     - secondary.tsx
|  |     - BUILD.bazel
|- BUILD.bazel
|
|
```

```python=

js_app(
    name="company",
    routes=[
        "//app/routes:..."   # <-- determines if you need SSG/SSR/Login Auth...
    ],
    # middlewares= {
    #     "ssr": "//middleware:ssr" # <-- maps to @middleware/ssr, leveraged by server
    # }
    # middleware_performance_threshold = "2s",
    domain = "company.com"
)

```

Routes should be `internal` by default, and teams must commit to when they should be visible to end users (word tbd). Enforce that routes cannot collide

```json=
{
   "public":{
        "/": {
            "entry": "remoteEntry.[hash].js",
            "ssr": true
            "public": true
            "deprecated": true,
            "reroute": "/new/"
        },
        "secondary/": {
            "entry": "remoteEntry.[hash].js",
            "login": {
                "access_level": "mfa"
            }
        },
        "experimental_secret": {
            "entry": "remoteEntry.[hash].js",
        },
    },
}
```

We should make a design in which middlewares are not the goto, but the exception for teams.

## Other frontend frameworks

Our frameworks knows how to:

- Produce routes that are federated with a pre-defined route entry
- Produce a client that can load a federated route (within react context)

Having said this, we are not making a restriction on which framework is here, since
federation is native to Webpack. As long as the inputs to routes can be run through
SWC, then it will be federated relative to the host. We can thus produce a host client
that can correctly render the output of a federated route.
