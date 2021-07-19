import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer"; // ./reducer/index.js

export default createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger)
);
