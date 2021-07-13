import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toggleToast } from "../utils/cutomToastStyles";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  return <ToastContext.Provider value={{ ToastContainer, toast, toggleToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
