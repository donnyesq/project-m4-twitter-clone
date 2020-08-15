import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";

import TweetDetails from "./TweetDetails";

import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

const TweetWrapper = styled.div`
  display: flex;
  width: 900px;
  padding-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TweetMedia = styled.img`
  border-radius: 20px;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 40px 0;
  width: 500px;
`;

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    cursor: pointer;
  }
`;

const Tweet = ({ tweet }) => {
  const history = useHistory();

  console.log("tweet", tweet);

  const handleTweetClick = (event) => {
    event.preventDefault();

    history.push(`/tweet/${tweet.id}`);
  };

  const handleTweetEnter = (event) => {
    event.preventDefault();

    if (event.key === "Enter") history.push(`/tweet/${tweet.id}`);
  };

  return (
    <TweetWrapper
      tabIndex="0"
      onClick={handleTweetClick}
      onKeyPress={handleTweetEnter}
    >
      <div>
        <Avatar src={tweet.author.avatarSrc} alt="photo" />
      </div>

      <div style={{ paddingLeft: "15px" }}>
        <div style={{ display: "flex" }}>
          <h3 style={{ marginRight: "10px" }}>{tweet.author.displayName}</h3>
          <p style={{ marginRight: "10px", color: "gray" }}>
            @{tweet.author.handle}
          </p>
          <span style={{ marginRight: "10px", color: "gray" }}>.</span>
          <p style={{ marginRight: "10px", color: "gray" }}>
            {moment(tweet.timestamp).format("MMM Do YYYY")}
          </p>
        </div>

        <div>
          {tweet.status}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "600px",
              margin: "10px 10px 10px 0",
            }}
          >
            {tweet.media.length > 0 && <TweetMedia src={tweet.media[0].url} />}
          </div>
        </div>

        <StyledNav>
          <StyledAnchor href="#">
            <FiMessageCircle />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiRepeat />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiHeart onClick />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiShare />
          </StyledAnchor>
        </StyledNav>
      </div>
    </TweetWrapper>
  );
};

export default Tweet;
