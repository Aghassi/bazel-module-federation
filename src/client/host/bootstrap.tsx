/** file to be used to bootstrap the app */
import React from "react";
import ReactDOM from "react-dom";
import FederatedRoute from "./FederatedRoute";
import { BrowserRouter, Route, Link } from "react-router-dom";

const path = window.location.pathname;
// Find a better way to hydrate this as it isn't really "clean"
const config = window.global.config;
const CDN_URL = config.CDN_URL;

/**
 * Grab all routes and their paths and declare them as lazy imports
 * Map each route path to a given lazy import to be navigated to
 */
const reactRouterRoutes = [];
for (const route in Object.keys(config)) {
  if (route !== "CDN_URL") {
    const rrRoute = (
      <Route
        {...`path=${route}`}
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
    <BrowserRouter>{...reactRouterRoutes}</BrowserRouter>
    <Route path="*" element={<NoMatch />} />
  </React.StrictMode>,
  document.getElementById("root")
);
