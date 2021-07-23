/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import axios from "axios";
import URL from "../globals/config";
import * as session from "../utils/session";
import history from "../history";
import { APIBLOCK } from "../globals/constant";
import showNotification from "../services/notificationService";

/**Create a instance of axios with a custom config */
export const http = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

/**Add a request interceptor */
http.interceptors.request.use(
  function (config) {
    /*  var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (date === "2020-12-14") {
      showNotification("danger", APIBLOCK);
      return false;
    } */
    const token = session.getSessionToken();
    if (token) config.headers.Authorization = `Bearer ` + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**Add a response interceptor */
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (404 === error.response.status) {
        showNotification("danger", error.response.data.message);
      }
      if (400 === error.response.status) {
        showNotification("danger", error.response.data.message);
      }
      if (401 === error.response.status || 403 === error.response.status) {
        /**Add a 401 response interceptor*/
        session.clearSession();
        history.push("/");
      } else {
        return Promise.reject(error);
      }
    }
  }
);
