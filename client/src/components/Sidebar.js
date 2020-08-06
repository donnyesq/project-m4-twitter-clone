import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar-nav">
      <Router>
        <Logo style={{ height: "50px" }} />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/123">Profile</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </Router>
    </aside>
  );
};

export default Sidebar;
