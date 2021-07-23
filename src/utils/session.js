/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

const accessTokenKey = "accessToken";
const accessUserToken = "accessUserToken";
const userKey = "user";
const userTypeKey = "userType";
const isAuthenticated = "isAuthenticated";

export const setSession = (accessToken, user) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(userKey, user);
};
export const setUserSession = (accessUser, user) => {
  localStorage.setItem(accessUserToken, accessUser);
  localStorage.setItem(userKey, user);
};

export const setUser = (user) => {
  localStorage.setItem(userKey, user);
};

export const setUserType = (type) => {
  localStorage.setItem(userTypeKey, type);
};

export const setToken = (accessToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
};

export const getToken = () => {
  return localStorage.getItem(accessTokenKey);
};

export const clearSession = () => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(userKey);
  localStorage.removeItem(isAuthenticated);
};

export const getSession = () => {
  let accessToken;
  if (localStorage.getItem(accessTokenKey)) {
    accessToken = localStorage.getItem(accessTokenKey);
  } else {
    accessToken = localStorage.getItem(accessUserToken);
  }
  let userType = localStorage.getItem(userTypeKey);
  let user = JSON.parse(localStorage.getItem(userKey));
  return {
    accessToken,
    user,
    userType,
  };
};

export const getSessionToken = () => {
  let token;
  if (localStorage.getItem(accessTokenKey)) {
    token = localStorage.getItem(accessTokenKey);
  } else {
    token = localStorage.getItem(accessUserToken);
  }
  return token;
};

export const getSessionUserId = () => {
  let user = localStorage.getItem(userKey);
  user = JSON.parse(user);
  return user && user.id ? user.id : null;
};

export const getUserType = () => {
  let user = localStorage.getItem(userTypeKey);
  return user;
};
export const getUser = () => {
  let user = JSON.parse(localStorage.getItem(userKey));
  return user;
};

export const checkSession = () => {
  return getSession().accessToken && getSession().user && getSession().userType
    ? true
    : false;
};

export const setisAuthenticated = (state) => {
  localStorage.setItem(isAuthenticated, state);
};

export const getIsAuthenticated = () => {
  let isAuthenticated = false;
  if (localStorage.getItem("isAuthenticated")) {
    isAuthenticated = true;
  }
  return isAuthenticated;
};
