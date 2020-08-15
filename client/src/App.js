import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import Homefeed from "./components/Homefeed";
import Notifications from "./components/Notifications";
import CurrentUserProfile from "./components/CurrentUserProfile";
import TweetDetails from "./components/TweetDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import GlobaStyle from "./components/GlobalStyle";

import { CurrentUserContext } from "./components/CurrentUserContext";

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  const [pageTitle, setPageTitle] = React.useState("");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <GlobaStyle />
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Header pageTitle={pageTitle} setPageTitle={setPageTitle} />
            <Switch>
              <Route exact path="/notifications">
                <Notifications />
              </Route>

              <Route exact path="/bookmarks">
                <Bookmarks />
              </Route>
              <Route exact path="/tweet/:tweetId">
                <TweetDetails
                  pageTitle={pageTitle}
                  setPageTitle={setPageTitle}
                />
              </Route>
              <Route exact path="/me">
                <CurrentUserProfile
                  pageTitle={pageTitle}
                  setPageTitle={setPageTitle}
                  currentUser={currentUser}
                />
              </Route>

              <Route exact path="/">
                <Homefeed pageTitle={pageTitle} setPageTitle={setPageTitle} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
