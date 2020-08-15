import React from "react";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import moment from "moment";
import { FiMapPin, FiCalendar } from "react-icons/fi";

import Tweet from "./Tweet";

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
  top: 25%;
`;

const InfoWrapper = styled.div`
  padding-top: 100px;
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
  console.log("handle", handle);
  const [currentUser, setCurrentUser] = React.useState(null);

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
        return <div>***Something went wrong***</div>;
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
          return <div>***Something went wrong***</div>;
        });
    }
  }, [currentUser]);

  return !currentUser ? (
    <div>Loading Profile...</div>
  ) : (
    <ProfileWrapper>
      <Banner src={currentUser.profile.bannerSrc} />
      <Avatar src={currentUser.profile.avatarSrc} />

      <InfoWrapper>
        <h3>{currentUser.profile.displayName}</h3>
        <p>@{currentUser.profile.handle}</p>
        <div style={{ display: "flex" }}>
          <FiMapPin />
          <p>{currentUser.profile.location}</p>
          <FiCalendar />
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
              return <Tweet key={tweetId} tweet={foundTweet} />;
            })}
        </StyledLi>
      </ul>
    </ProfileWrapper>
  );
};

export default Profile;
