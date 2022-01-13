import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@carto/utils/redux/counterSlice";
import { getCounterSelector } from "@carto/utils/redux";

/**
 * Defines a main route
 */
export default () => {
  const count = useSelector(getCounterSelector);
  const dispatch = useDispatch();

  return (
    <div>
      Main Route
      <br></br>
      <Link to="/secondary">Go to second page</Link>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
};
