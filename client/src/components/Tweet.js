import React from "react";
import styled from "styled-components";
import moment from "moment";

import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

const TweetWrapper = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

const Tweet = ({ tweet }) => {
  return (
    <TweetWrapper>
      <div>
        <Avatar src={tweet.author.avatarSrc} alt="photo" />
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h3>{tweet.author.displayName}</h3>
          <p>@{tweet.author.handle}</p>
          <p>{moment(tweet.timestamp).format("MMM Do YYYY")}</p>
        </div>

        <div>
          {tweet.status}
          {tweet.media.length > 0 ? <img src={tweet.media.url} /> : null}
        </div>

        <StyledNav>
          <a>
            <FiMessageCircle />
          </a>
          <a>
            <FiRepeat />
          </a>
          <a>
            <FiHeart />
          </a>
          <a>
            <FiShare />
          </a>
        </StyledNav>
      </div>
    </TweetWrapper>
  );
};

export default Tweet;
