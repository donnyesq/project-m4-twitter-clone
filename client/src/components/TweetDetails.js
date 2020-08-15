import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useParams } from "react-router";

import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

const TweetWrapper = styled.div`
  display: flex;
  width: 900px;
  margin: 20px;

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

const TweetDetails = ({ incomingTweet, pageTitle, setPageTitle }) => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = React.useState(null);

  React.useEffect(() => {
    setPageTitle("Meow");
  }, []);

  React.useEffect(() => {
    if (!incomingTweet) {
      fetch(`/api/tweet/${tweetId}`, { method: "GET" })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          setTweet(data.tweet);
        })
        .catch((error) => {
          console.log(error);
          return <div>***Something went wrong***</div>;
        });
    }
  }, []);

  return !tweet ? (
    <div>Loading Tweet...</div>
  ) : (
    <TweetWrapper>
      <div>
        <Avatar src={tweet.author.avatarSrc} alt="photo" />
      </div>

      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ marginRight: "10px" }}>{tweet.author.displayName}</h3>
          <p style={{ marginRight: "10px", color: "gray" }}>
            @{tweet.author.handle}
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
        <p style={{ marginRight: "10px", color: "gray" }}>
          {moment(tweet.timestamp).format("hh:mm A")}
          <span style={{ marginRight: "10px", color: "gray" }}>.</span>
          {moment(tweet.timestamp).format("MMM DD YYYY")}
          <span style={{ marginRight: "10px", color: "gray" }}>.</span>
          <span>Critter Web App</span>
        </p>

        <StyledNav>
          <StyledAnchor href="#">
            <FiMessageCircle />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiRepeat />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiHeart />
          </StyledAnchor>
          <StyledAnchor href="#">
            <FiShare />
          </StyledAnchor>
        </StyledNav>
      </div>
    </TweetWrapper>
  );
};

export default TweetDetails;
