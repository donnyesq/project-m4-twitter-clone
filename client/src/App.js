import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import Homefeed from "./components/Homefeed";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import TweetDetails from "./components/TweetDetails";
import Sidebar from "./components/Sidebar";

import GlobaStyle from "./components/GlobalStyle";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <GlobaStyle />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Router>
          <Switch>
            <Route exact path="/">
              <Homefeed />
            </Route>

            <Route path="/notifications">
              <Notifications />
            </Route>

            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
