import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./App";
import { CurrentUserProvider } from "./components/CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
