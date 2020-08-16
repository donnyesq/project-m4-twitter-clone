import React from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components/macro";
import moment from "moment";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "../constants";

import Tweet from "./Tweet";
import Spinner from "./Spinner";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  border-right: 1px solid gainsboro;
  padding-right: 40px;
`;

const Banner = styled.img`
  height: 300px;
  width: 1000px;
`;

const Avatar = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin: 60px;
  border: 2px solid white;
  position: absolute;
  top: 33%;
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
`;

const InfoWrapper = styled.div`
  padding-top: 30px;
  padding-left: 30px;
`;

const StyledLi = styled.li`
  border-bottom: 1px solid gainsboro;

  &:first-child {
    padding-top: 20px;
  }
`;

const Profile = ({ pageTitle, setPageTitle }) => {
  const [tweets, setTweets] = React.useState(null);
  const { handle } = useParams();
  const [currentUser, setCurrentUser] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    if (currentUser) {
      setPageTitle(currentUser.profile.displayName);
    }
  }, []);

  React.useEffect(() => {
    fetch(`/api/${handle}/profile`, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setCurrentUser(data);
        setTweets(null);
      })
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      fetch(`/api/${currentUser.profile.handle}/feed`, { method: "GET" })
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
          history.push("/error");
        });
    }
  }, [currentUser]);

  return !currentUser ? (
    <Spinner />
  ) : (
    <ProfileWrapper>
      <Banner src={currentUser.profile.bannerSrc} />
      <Avatar src={currentUser.profile.avatarSrc} />

      {currentUser.profile.isBeingFollowedByYou ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledButton>Following</StyledButton>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledButton>Follow</StyledButton>
        </div>
      )}

      <InfoWrapper>
        <div style={{ margin: "0 0 10px 0" }}>
          <h3>{currentUser.profile.displayName}</h3>
          <div style={{ display: "flex" }}>
            <p>@{currentUser.profile.handle}</p>
            {currentUser.profile.isFollowingYou && (
              <span
                style={{
                  backgroundColor: "gainsboro",
                  borderRadius: "5px",
                  color: "gray",
                  padding: "0 3px 0 3px",
                  marginLeft: "10px",
                }}
              >
                Follows you
              </span>
            )}
          </div>
        </div>

        <p style={{ marginBottom: "10px" }}>{currentUser.profile.bio}</p>

        <div style={{ display: "flex", marginBottom: "10px" }}>
          <FiMapPin style={{ marginRight: "5px" }} />
          <p>{currentUser.profile.location}</p>
          <FiCalendar style={{ margin: "0 5px" }} />
          <p>
            Joined: {moment(currentUser.profile.joined).format("MMMM YYYY")}
          </p>
        </div>

        <div style={{ display: "flex" }}>
          <p>
            <span style={{ fontWeight: "bold" }}>
              {currentUser.profile.numFollowing}
            </span>{" "}
            Following
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>
              {currentUser.profile.numFollowers}
            </span>{" "}
            Followers
          </p>
        </div>
      </InfoWrapper>

      <ul style={{ margin: 0, borderRight: "1px solid gainsboro" }}>
        <StyledLi>
          {tweets &&
            tweets.tweetIds.map((tweetId) => {
              let foundTweet = tweets.tweetsById[tweetId];
              return (
                <Tweet
                  key={tweetId}
                  tweet={foundTweet}
                  aria-label="View Tweet"
                />
              );
            })}
        </StyledLi>
      </ul>
    </ProfileWrapper>
  );
};

export default Profile;
