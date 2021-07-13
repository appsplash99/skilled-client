import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LibraryContextProvider } from "./context/libraryState";
import { ToastProvider } from "./context/toastState";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <LibraryContextProvider>
      <ToastProvider>
        <Router>
          <App />
        </Router>
      </ToastProvider>
    </LibraryContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
