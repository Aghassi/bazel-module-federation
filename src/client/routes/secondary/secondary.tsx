import React from "react";
import { Link } from "react-router-dom";
import SubComponent from "./dep";
import { useSelector } from "react-redux";
import { getCounterSelector } from "@carto/utils/redux";
/**
 * Defines a secondary route
 */

export default () => {
  const count = useSelector(getCounterSelector);

  return (
    <div>
      Secondary Route. <SubComponent />
      <br></br>
      <Link to="/">Go to homepage</Link>
      <span>{count}</span>
    </div>
  );
};
