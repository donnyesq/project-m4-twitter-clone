import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CurrentUserContext } from "./components/CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserContext.Provider>
      <App />
    </CurrentUserContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
