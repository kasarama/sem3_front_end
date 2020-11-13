import { NavLink, useHistory } from "react-router-dom";
export default function Header({ loggedIn, admin, logout, activeUser }) {
  const history = useHistory();

  function onClick(e) {
    e.preventDefault();
    logout();
    history.push("/");
  }
  return (
    <ul className="header">
      <div>
        {!admin ? (
          <li>
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!admin ? (
          <li>
            <NavLink activeClassName="active" to="/offer">
              Offer
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!admin ? (
          <li>
            <NavLink activeClassName="active" to="/pack">
              Demo Package
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!admin && !loggedIn ? (
          <li>
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {loggedIn && !admin ? (
          <li>
            <NavLink activeClassName="active" to="/account">
              Account
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!admin ? (
          <li>
            <NavLink activeClassName="active" to="/newpack">
              New Package
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {admin ? (
          <li>
            <NavLink activeClassName="active" to="/orders">
              Orders
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {admin ? (
          <li>
            <NavLink activeClassName="active" to="/users">
              Users
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {admin ? (
          <li>
            <NavLink activeClassName="active" to="/statistics">
              Statisticks
            </NavLink>
          </li>
        ) : (
          ""
        )}

        {!admin && !loggedIn ? (
          <li>
            <NavLink activeClassName="active" to="/login">
              Log in
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </div>

      {admin || loggedIn ? (
        <div>
          <button className="active" onClick={onClick}>
            Log out
          </button>
          <h4 style={{ color: "#008CBA" }}>
            You are logged in as {activeUser}
          </h4>
        </div>
      ) : (
        ""
      )}
    </ul>
  );
}
