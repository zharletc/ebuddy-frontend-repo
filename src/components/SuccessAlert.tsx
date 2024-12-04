import {  toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const SuccessAlert = (message: any, onClose?: any) => {
  return toast.success(message, {
    autoClose: 1250,
    onClose: onClose,
  });
};
