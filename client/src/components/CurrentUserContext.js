import React, { createContext } from "react";
import { useHistory } from "react-router";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const history = useHistory();

  React.useEffect(() => {
    fetch("/api/me/profile", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((user) => {
        setStatus("success");
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log(error);
        history && history.push("/error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
