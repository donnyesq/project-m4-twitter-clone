import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 1000px;
  border-bottom: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
`;

const Title = styled.h3`
  margin: 15px;
`;

const Header = ({ pageTitle, setPageTitle }) => {
  return (
    <StyledDiv>
      <Title>{pageTitle}</Title>
    </StyledDiv>
  );
};

export default Header;
