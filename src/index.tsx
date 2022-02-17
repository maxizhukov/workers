import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App";
import "./i18next";
import Store from "./redux/store";

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      {/* Show loading until languages will be not initialized */}
      <Suspense fallback={<p>Loading</p>}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
