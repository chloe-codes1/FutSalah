import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import UserProvider from "./provider/UserProvider";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import Profile from "views/ProfilePage/ProfilePage.js";
import SearchTeam from "views/SearchTeamPage/SearchTeamPage.js";
import MyTeam from "views/TeamMangementPage/MyTeamPage.js";

var hist = createBrowserHistory();

//export const UserDispatch = createContext();
//const [state, dispatch] = useReducer(reducer, initialState);

ReactDOM.render(
  <UserProvider>
    <Router history={hist}>
      <Switch>
        <Route exact path="/searchTeam" component={SearchTeam} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/myteam" component={MyTeam} />
        <Route exact path="/" component={Components} />
      </Switch>
    </Router>
  </UserProvider>,
  document.getElementById("root")
);
