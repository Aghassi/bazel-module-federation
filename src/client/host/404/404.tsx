import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <br></br>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
