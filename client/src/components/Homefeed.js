import React from "react";
import Tweet from "./Tweet";

const Homefeed = () => {
  const [tweets, setTweets] = React.useState(null);

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
        console.log("data from homepage", data);
        setTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return !tweets ? (
    <div>Loading Tweets...</div>
  ) : (
    <ul>
      <li>
        {console.log(tweets)}
        {tweets.tweetIds.map((tweetId) => {
          let foundTweet = tweets.tweetsById[tweetId];
          console.log("found tweet", foundTweet);
          return <Tweet tweet={foundTweet} />;
        })}
        ;
      </li>
    </ul>
  );
};

export default Homefeed;
