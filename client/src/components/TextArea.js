import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import Homefeed from "./Homefeed";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  width: 100%;
  border-bottom: 5px solid gainsboro;
  border-right: 1px solid gainsboro;
`;

const Avatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 20px;
`;

const StyledInput = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
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

  &:focus {
    outline: none;
  }
`;

const TextArea = ({ postTweet }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [userInput, setUserInput] = React.useState("");

  const handleChange = (event) => {
    let input = event.target.value;
    setUserInput(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        postTweet(data);
        const form = document.querySelector("#form");
        form.value = "";
        setUserInput("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <StyledDiv>
      <div style={{ display: "flex" }}>
        <Avatar src={currentUser.profile.avatarSrc} alt="photo" />
        <StyledInput
          id="form"
          placeholder="What's happening?"
          type="text"
          style={{ width: "100%" }}
          onChange={handleChange}
        ></StyledInput>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton onClick={handleSubmit}>Meow</StyledButton>
      </div>
    </StyledDiv>
  );
};

export default TextArea;
