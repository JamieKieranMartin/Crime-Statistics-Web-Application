import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar(props) {
  return (
    <nav className="border-bottom">
      <div className="navContainer">
        <NavLink activeClassName="active" to="/">
          <h1>crime.io</h1>
        </NavLink>
        <NavLink exact activeClassName="active" to="/offences">
          Offences
        </NavLink>
      </div>
      {props.JWT === "" ? (
        <div>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink
            to="/"
            onClick={() => {
              props.setJWT("");
              alert("Successfully Logged Out");
            }}
          >
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
}
