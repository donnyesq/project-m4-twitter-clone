import React from "react";
import styled, { css, keyframes } from "styled-components";

import { FiLoader } from "react-icons/fi";

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${spin} 2s linear infinite;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <FiLoader />
    </SpinnerContainer>
  );
};

export default Spinner;
