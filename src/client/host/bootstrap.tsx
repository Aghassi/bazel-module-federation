/** file to be used to bootstrap the app */
import React from "react";
import ReactDOM from "react-dom";
import FederatedRoute from "./FederatedRoute";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
          <React.Suspense fallback={<>...</>}>
            <FederatedRoute path={route} />
          </React.Suspense>
        }
      />
    );

    reactRouterRoutes.push(rrRoute);
  }
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

// root element is defined on the server side
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {reactRouterRoutes}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
