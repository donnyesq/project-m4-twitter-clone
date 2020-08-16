import React from "react";
import { useHistory } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Error = () => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <ErrorWrapper>
      <FiAlertTriangle style={{ fontSize: "60px" }} />
      <h1>An unknown error has occurred.</h1>
      <p>
        Please try{" "}
        <a
          onClick={goBack}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          refreshing
        </a>{" "}
        the page, or contact support if the problem persists.
      </p>
    </ErrorWrapper>
  );
};

export default Error;
