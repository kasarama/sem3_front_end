import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import facade from "./apiFacade";
import LogIn from "./components/LogIn";
import LoggedIn from "./components/LoggedIn";
import Home from "./components/Home";
import Offer from "./components/Offer";
import Package from "./components/Package";
import Header from "./components/Header";
import Register from "./components/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [activeUser, setActiveUser] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setActiveUser(res.username);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrMsg(e.message));
        } else {
          setErrMsg("Network error has occurred: could not log in");
          console.log("Network error! Could not log in");
        }
      });
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/offer">
            <Offer />
          </Route>
          <Route exact path="/pack">
            <Package demoPack={facade.getDemoPack}/>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <LogIn login={login} />
          </Route>
          <Route exact path="/account">
            <LoggedIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
