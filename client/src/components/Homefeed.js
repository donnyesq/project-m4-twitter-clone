import React, { useContext } from "react";
import Tweet from "./Tweet";
import TextArea from "./TextArea";

import { CurrentUserContext } from "./CurrentUserContext";

import styled from "styled-components";

const HomefeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  border-right: 1px solid gainsboro;
  padding-right: 40px;
`;

const Title = styled.h3`
  margin: 15px;
`;

const Avatar = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const StyledLi = styled.li`
  border-bottom: 1px solid gainsboro;

  &:first-child {
    padding-top: 20px;
  }
`;

const Homefeed = () => {
  const [tweets, setTweets] = React.useState(null);
  const { currentUser, status } = useContext(CurrentUserContext);

  React.useEffect(() => {
    fetch("/api/me/home-feed", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return !tweets ? (
    <div>Loading Tweets...</div>
  ) : (
    <HomefeedWrapper>
      <Title>Home</Title>
      <Avatar src={currentUser.profile.avatarSrc} alt="photo" />
      <TextArea />
      <ul style={{ margin: 0, borderRight: "1px solid gainsboro" }}>
        <StyledLi>
          {tweets.tweetIds.map((tweetId) => {
            let foundTweet = tweets.tweetsById[tweetId];
            return <Tweet key={tweetId} tweet={foundTweet} />;
          })}
        </StyledLi>
      </ul>
    </HomefeedWrapper>
  );
};

export default Homefeed;
