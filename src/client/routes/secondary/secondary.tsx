import React from "react";
import { Link } from "react-router-dom";
import SubComponent from "./dep";
/**
 * Defines a secondary route
 */

export default () => (
  <div>
    Secondary Road. <SubComponent />
    <Link to="/">Go to homepage</Link>
  </div>
);
