import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import UserProvider from "./provider/UserProvider";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import Profile from "views/ProfilePage/ProfilePage.js";
import TeamInfo from "views/TeamInfoPage/TeamInfoPage.js";

var hist = createBrowserHistory();

//export const UserDispatch = createContext();
//const [state, dispatch] = useReducer(reducer, initialState);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/teamInfo" component={TeamInfo} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
