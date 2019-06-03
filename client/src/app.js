import React, { useState } from "react";
import { LoadOffences } from "./offences";
import { Register } from "./register";
import { Login } from "./login";
import { LoadSearch } from "./search";
import { LoadGraph } from "./search/graph";
import { Main } from "./main";
import { NavBar } from "./components/nav";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

export function App() {
  const [JWT, setJWT] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar JWT={JWT} setJWT={e => setJWT(e)} />
        <div className="py-4">
          <Route exact path="/" render={props => <Main JWT={JWT} />} />
          <Route exact path="/offences" component={LoadOffences} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setTokenJWT={e => setJWT(e)} />}
          />
          <Route
            exact
            path="/search"
            render={props =>
              JWT !== "" ? (
                <LoadSearch {...props} JWT={JWT} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/graph"
            render={props =>
              JWT !== "" ? (
                <LoadGraph {...props} JWT={JWT} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </div>
      </div>
    </Router>
  );
}
