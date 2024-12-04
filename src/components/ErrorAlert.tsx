import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorAlert = (message: any, onClose?: any) => {
  return toast.error(message, {
    autoClose: 1250,
    onClose: onClose,
  });
};
