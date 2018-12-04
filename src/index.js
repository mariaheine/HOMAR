import React from "react";
import ReactDOM from "react-dom";
import App from "./content/App.jsx";
// import "./index.css";

import rootReducer from "./reduxStore/reducers/rootReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
