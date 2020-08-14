import React from "react";
import Tweet from "./Tweet";
import TextArea from "./TextArea";

import styled from "styled-components";

const HomefeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  border-right: 1px solid gainsboro;
  padding-right: 40px;
`;

const StyledLi = styled.li`
  border-bottom: 1px solid gainsboro;

  &:first-child {
    padding-top: 20px;
  }
`;

const Homefeed = ({ pageTitle, setPageTitle }) => {
  const [tweets, setTweets] = React.useState(null);

  const postTweet = (data) => {
    setTweets({ ...tweets, data });
    console.log("data from homefeed", data.tweet.status);
  };

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
  }, [tweets]);

  React.useEffect(() => {
    setPageTitle("Home");
  }, []);

  return !tweets ? (
    <div>Loading Tweets...</div>
  ) : (
    <HomefeedWrapper>
      <TextArea postTweet={postTweet} />
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
