import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

const composeEnhancer =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const enhancer = composeEnhancer(applyMiddleware(thunk));

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const INITIAL_STATE = {
  auth: {
    error_msg: "",
  },
  alert: {
    status: false,
  },
};
if (token) {
  INITIAL_STATE.auth.token = token;
  INITIAL_STATE.auth.role = role;
}
export default createStore(reducer, INITIAL_STATE, enhancer);
