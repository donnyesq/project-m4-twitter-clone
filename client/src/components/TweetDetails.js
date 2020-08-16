import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useParams } from "react-router";
import Spinner from "./Spinner";

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

const TweetDetails = ({ pageTitle, setPageTitle }) => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = React.useState(null);
  const [numOfLikes, setNumOfLikes] = React.useState(null);
  const [isLiked, setIsLiked] = React.useState(null);

  React.useEffect(() => {
    if (tweet) {
      setNumOfLikes(tweet.numLikes);
      setIsLiked(tweet.isLiked);
    }
  }, [tweet]);

  const toggleLike = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isLiked) {
      setNumOfLikes(numOfLikes + 1);
      setIsLiked(!isLiked);
      console.log("numoflikes", numOfLikes);
    } else {
      setNumOfLikes(numOfLikes - 1);
      setIsLiked(!isLiked);
      console.log("numoflikes", numOfLikes);
    }
  };

  const pressToggleLike = (event) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();

      if (!isLiked) {
        setNumOfLikes(numOfLikes + 1);
        setIsLiked(!isLiked);
        console.log("numoflikes", numOfLikes);
      } else {
        setNumOfLikes(numOfLikes - 1);
        setIsLiked(!isLiked);
        console.log("numoflikes", numOfLikes);
      }
    }
  };

  React.useEffect(() => {
    setPageTitle("Meow");
  }, []);

  React.useEffect(() => {
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
  }, []);

  return !tweet ? (
    <Spinner />
  ) : (
    <TweetWrapper>
      <div>
        <Avatar src={tweet.author.avatarSrc} alt="photo" />
      </div>

      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ marginRight: "10px" }} tabIndex="0">
            {tweet.author.displayName}
          </h3>
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
            <FiHeart onClick={toggleLike} onKeyPress={pressToggleLike} />
            {numOfLikes > 0 && <span>{numOfLikes}</span>}
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
