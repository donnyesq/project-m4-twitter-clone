import React, { createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

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
        return <div>***Something went wrong***</div>;
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
