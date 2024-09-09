import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = ({ message, type }) => (
  <div className={`popup ${type}`}>
    <p>{message}</p>
    <div className="timer-line"></div>
  </div>
);

export const showToast = (message, type) => {
  toast(<CustomToast message={message} type={type} />, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

const Popup = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="dark"
    />
  );
};

export default Popup;
