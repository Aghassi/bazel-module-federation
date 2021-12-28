import React from "react";
import { Link } from "react-router-dom";
import SubComponent from "./dep";
/**
 * Defines a secondary route
 */

export default () => (
  <div>
    Secondary Route. <SubComponent />
    <br></br>
    <Link to="/">Go to homepage</Link>
  </div>
);
