import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/offer">
          Offer
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/pack">
          Package
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/register">
          Register
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/login">
          Log in
        </NavLink>
      </li>

      <li>
        <button className="active">Log out</button>
      </li>
    </ul>
  );
}
