import React from "react";
import { Link } from "react-router-dom";
import SubComponent from "./dep";
import { useSelector } from "react-redux";
/**
 * Defines a secondary route
 */

export default () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      Secondary Route. <SubComponent />
      <br></br>
      <Link to="/">Go to homepage</Link>
      <span>{count}</span>
    </div>
  );
};
