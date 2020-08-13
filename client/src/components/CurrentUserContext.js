import React, { createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    fetch("/api/me/profile", { method: "GET" })
      .then((response) => response.json())
      .then((user) => {
        setStatus("success");
        setCurrentUser(user);
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
