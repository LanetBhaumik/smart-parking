import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

const composeEnhancer =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const enhancer = composeEnhancer(applyMiddleware(thunk));

const token = localStorage.getItem("token");
const INITIAL_STATE = {
  auth: {
    token: "",
    error_msg: "",
    role: "",
  },
  parkings: [
    {
      _id: "parking_id",
      name: "parking_name",
      slots: "parking_slots",
      rate: "parking_rate",
      address: "parking_address",
      pincode: "parking_pincode",
      owner: "parking_owner",
    },
  ],
  alert: {
    alert: false,
    severity: "info",
    message: "",
  },
};
if (token) INITIAL_STATE.auth.token = token;
export default createStore(reducer, INITIAL_STATE, enhancer);
