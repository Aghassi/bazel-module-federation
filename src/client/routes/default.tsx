import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines a main route
 */
export default () => (
  <div>
    Main Road
    <br></br>
    <Link to="/secondary">Go to second page</Link>
  </div>
);
