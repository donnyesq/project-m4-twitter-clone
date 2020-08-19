import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import Spinner from "./Spinner";

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

const StyledTextArea = styled.textarea`
  border: none;
  resize: none;
`;

const StyledButton = styled.button`
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

const TextArea = ({ postTweet }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [userInput, setUserInput] = React.useState("");
  const [characterCounter, setCharacterCounter] = React.useState(280);
  const [disableButton, setDisableButton] = React.useState(false);

  const handleChange = (event) => {
    let input = event.target.value;
    setUserInput(input);
    setCharacterCounter(280 - input.length);
    if (input.length > 280) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
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

  return !currentUser ? (
    <Spinner />
  ) : (
    <StyledDiv>
      <div style={{ display: "flex" }}>
        <Avatar src={currentUser.profile.avatarSrc} alt="photo" />
        <StyledTextArea
          id="form"
          placeholder="What's happening?"
          type="text"
          style={{ width: "100%" }}
          onChange={handleChange}
        ></StyledTextArea>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ color: disableButton ? "red" : "black" }}>
          {characterCounter}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <StyledButton
            onClick={handleSubmit}
            disabled={disableButton}
            style={{
              backgroundColor: disableButton ? COLORS.inactive : COLORS.primary,
            }}
          >
            Meow
          </StyledButton>
        </div>
      </div>
    </StyledDiv>
  );
};

export default TextArea;
