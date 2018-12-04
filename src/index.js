import React from "react";
import ReactDOM from "react-dom";
import App from "./content/App.jsx";
// import "./index.css";

import rootReducer from "./reduxStore/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'

/* 
 We could have many diffrent store enhancers/middleware here
 Thunk lets us return a function inside our action creators
 which can then interact with the database
 */
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
