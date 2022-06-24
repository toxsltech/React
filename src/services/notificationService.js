/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const showNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "danger":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "default":
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      break;
  }
};

export default showNotification;
