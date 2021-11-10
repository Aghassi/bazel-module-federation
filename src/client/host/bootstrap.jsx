/** file to be used to bootstrap the app */
import React from "react";
import ReactDOM from "react-dom";
import Route from './Route';

const path = window.location.pathname;
// root element is defined on the server side
ReactDOM.render(<Route path={path.substring(1) || '/'} />, document.getElementById("root"));
