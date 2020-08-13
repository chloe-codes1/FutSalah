import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import UserProvider from "./provider/UserProvider";
import AdminUserProvider from "./provider/AdminUserProvider";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Admin from "views/AdminPage/Admin.js";
import AdminInfo from "views/AdminPage/AdminInfo.js";
import AdminMatchInfo from "views/AdminPage/AdminMatchInfo.js";
import Components from "views/Components/Components.js";
import Profile from "views/ProfilePage/ProfilePage.js";
import TeamInfo from "views/TeamInfoPage/TeamInfoPage.js";
import SearchTeam from "views/SearchTeamPage/SearchTeamPage.js";
import MyTeam from "views/TeamMangementPage/MyTeamPage.js";
import TeamMatch from "views/TeamMatchPage/TeamMatchPage.js";

var hist = createBrowserHistory();

//export const UserDispatch = createContext();
//const [state, dispatch] = useReducer(reducer, initialState);

ReactDOM.render(
  <Fragment>
    <UserProvider>
      <Router history={hist}>
        <Switch>
          <Route exact path="/teamInfo/:id" component={TeamInfo} />
          <Route exact path="/searchTeam" component={SearchTeam} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/myteam" component={MyTeam} />
          <Route exact path="/match" component={TeamMatch} />
          <Route exact path="/" component={Components} />
        </Switch>
      </Router>
    </UserProvider>
    <AdminUserProvider>
      <Router history={hist}>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/:id" component={AdminInfo} />
          <Route exact path="/admin/:id/match/:id" component={AdminMatchInfo} />
        </Switch>
      </Router>
    </AdminUserProvider>
  </Fragment>,
  document.getElementById("root")
);
