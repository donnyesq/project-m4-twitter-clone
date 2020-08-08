import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import Homefeed from "./components/Homefeed";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import TweetDetails from "./components/TweetDetails";
import Sidebar from "./components/Sidebar";

import { CurrentUserContext } from "./components/CurrentUserContext";

import GlobaStyle from "./components/GlobalStyle";

const App = () => {
  return (
    <div className="App">
      <GlobaStyle />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path="/notifications">
              <Notifications />
            </Route>

            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>

            <Route exact path="/">
              <Homefeed />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
