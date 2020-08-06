import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="sidebar-nav">
      <Router>
        <Logo style={{ height: "50px" }} />
        <ul>
          <li>
            <FiHome />
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <FiUser />
            <NavLink to="/123">Profile</NavLink>
          </li>
          <li>
            <FiBell />
            <NavLink to="/notifications">Notifications</NavLink>
          </li>
          <li>
            <FiBookmark />
            <NavLink to="/bookmarks">Bookmarks</NavLink>
          </li>
        </ul>
      </Router>
    </aside>
  );
};

export default Sidebar;
