import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import rootStore from "../src/redux/store/appStore";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App></App>
    </Provider>
  </React.StrictMode>
);
