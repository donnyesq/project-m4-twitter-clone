import React from "react";
import { u1F4A3 as Bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const Error = () => {
  return (
    <div>
      <Bomb />
      <h1>An unknown error has occurred.</h1>
      <p>
        Please try refreshing the page, or contact support if the problem
        persists.
      </p>
    </div>
  );
};

export default Error;
