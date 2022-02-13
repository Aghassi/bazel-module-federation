/** file to be used to bootstrap the app */
import React from "react";
import ReactDOM from "react-dom";
import FederatedRoute from "./FederatedRoute";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { NoMatch } from "@internal/404";
import { getRemoteEntryUrl } from "@carto/utils";
const path = window.location.pathname;
// Find a better way to hydrate this as it isn't really "clean"
const config = window.config;
const CDN_URL = config.CDN_HOST;

/**
 * Grab all routes and their paths and declare them as lazy imports
 * Map each route path to a given lazy import to be navigated to
 */
const reactRouterRoutes = [];
for (const route of Object.keys(config)) {
  if (route !== "CDN_HOST") {
    const props = {
      path: route,
      key: config[route],
    };

    const rrRoute = (
      <Route
        {...props}
        element={
          <FederatedRoute
            path={route}
            url={getRemoteEntryUrl(route, config, CDN_URL)}
          />
        }
      />
    );

    reactRouterRoutes.push(rrRoute);
  }
}

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/nothing-here">404</Link>
          </li>
        </ul>
      </nav>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

// root element is defined on the server side
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {reactRouterRoutes}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
