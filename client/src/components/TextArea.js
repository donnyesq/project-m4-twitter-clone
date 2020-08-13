import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  border-bottom: 5px solid gainsboro;
`;

const StyledInput = styled.input`
  border: none;
  height: 100%;
  border-top: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
`;

const StyledButton = styled.button`
  background-color: ${COLORS.primary};
  border-radius: 30px;
  color: white;
  border: none;
  padding: 5px;
  width: 100px;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const TextArea = () => {
  return (
    <StyledDiv>
      <StyledInput type="text" style={{ width: "100%" }}></StyledInput>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton>Meow</StyledButton>
      </div>
    </StyledDiv>
  );
};

export default TextArea;
