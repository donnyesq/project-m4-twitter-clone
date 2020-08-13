import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

import { COLORS } from "../constants";

const StyledAside = styled.aside`
  min-width: 180px;
  border-right: 1px solid gainsboro;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  margin: 20px 0 10px 0;
  height: 30px;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: bold;
  text-decoration: none;
  color: #000;
  padding: 10px;

  &:hover {
    background-color: #cab8f8;
    color: ${COLORS.primary};
    border-radius: 30px;
    cursor: pointer;
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

const StyledUl = styled.ul`
  padding: 0;
`;

const StyledLi = styled.li`
  margin: 5px 0 5px 5px;
  padding: 8px;
`;

const StyledButton = styled.button`
  background-color: ${COLORS.primary};
  border-radius: 30px;
  color: white;
  border: none;
  padding: 5px;
  width: 80%;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Sidebar = () => {
  return (
    <StyledAside className="sidebar-nav">
      <StyledLogo />
      <StyledDiv>
        <StyledUl>
          <StyledLi>
            <StyledNavLink exact to="/">
              <FiHome style={{ marginRight: "10px" }} />
              Home
            </StyledNavLink>
          </StyledLi>
          <StyledLi>
            <StyledNavLink to="/123">
              <FiUser style={{ marginRight: "10px" }} />
              Profile
            </StyledNavLink>
          </StyledLi>
          <StyledLi>
            <StyledNavLink to="/notifications">
              <FiBell style={{ marginRight: "10px" }} />
              Notifications
            </StyledNavLink>
          </StyledLi>
          <StyledLi>
            <StyledNavLink to="/bookmarks">
              <FiBookmark style={{ marginRight: "10px" }} />
              Bookmarks
            </StyledNavLink>
          </StyledLi>
        </StyledUl>

        <StyledButton>Meow</StyledButton>
      </StyledDiv>
    </StyledAside>
  );
};

export default Sidebar;
