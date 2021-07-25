import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { LibraryContextProvider } from "./context/libraryState";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LibraryContextProvider>
        <Router>
          <App />
        </Router>
      </LibraryContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
