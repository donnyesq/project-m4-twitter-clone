import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import moment from "moment";

import TweetDetails from "./TweetDetails";

import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

const TweetWrapper = styled.div`
  /* display: flex; */
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
  console.log("tweet", tweet);
  const history = useHistory();
  const [numOfLikes, setNumOfLikes] = React.useState(tweet.numLikes);
  const [isLiked, setIsLiked] = React.useState(tweet.isLiked);

  const handleTweetClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    history.push(`/tweet/${tweet.id}`);
  };

  const handleTweetEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.key === "Enter") history.push(`/tweet/${tweet.id}`);
  };

  const toggleLike = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isLiked) {
      setNumOfLikes(numOfLikes + 1);
      setIsLiked(!isLiked);
    } else {
      setNumOfLikes(numOfLikes - 1);
      setIsLiked(!isLiked);
    }
  };

  const pressToggleLike = (event) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();

      if (!isLiked) {
        setNumOfLikes(numOfLikes + 1);
        setIsLiked(!isLiked);
      } else {
        setNumOfLikes(numOfLikes - 1);
        setIsLiked(!isLiked);
      }
    }
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    history.push(`/${tweet.author.handle}/profile`);
  };

  return (
    <TweetWrapper
      tabIndex="0"
      onClick={handleTweetClick}
      onKeyPress={handleTweetEnter}
    >
      {tweet.isRetweeted ? (
        <div style={{ padding: "5px", color: "gray" }}>
          <FiRepeat />
          {tweet.author.displayName} Remeowed
        </div>
      ) : null}

      <div style={{ display: "flex" }}>
        <div>
          <Avatar
            onClick={handleProfileClick}
            src={tweet.author.avatarSrc}
            alt="photo"
          />
        </div>

        <div style={{ paddingLeft: "15px" }}>
          <div style={{ display: "flex" }}>
            <h3
              onClick={handleProfileClick}
              style={{ marginRight: "10px" }}
              tabIndex="0"
            >
              {tweet.author.displayName}
            </h3>
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
              {tweet.media.length > 0 && (
                <TweetMedia src={tweet.media[0].url} />
              )}
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
              <FiHeart onClick={toggleLike} onKeyPress={pressToggleLike} />
              {numOfLikes > 0 && <span>{numOfLikes}</span>}
            </StyledAnchor>
            <StyledAnchor href="#">
              <FiShare />
            </StyledAnchor>
          </StyledNav>
        </div>
      </div>
    </TweetWrapper>
  );
};

export default Tweet;
