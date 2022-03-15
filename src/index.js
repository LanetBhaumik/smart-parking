import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";

// for date and time
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
