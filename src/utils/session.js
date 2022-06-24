/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */

const accessTokenKey = "accessToken";
const accessUserData = "accessUserData";
const userKey = "user";
const userTypeKey = "userType";
const isAuthenticated = "isAuthenticated";

export const setStorage = (accessToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
};
export const clearStorage = () => {
  localStorage.removeItem(accessTokenKey);
};
export const setStorageData = (accessData) => {
  localStorage.setItem(accessUserData, accessData);
};

export const clearSession = () => {
  localStorage.removeItem(accessTokenKey);
};
export const clearisAuthenticated = () => {
  localStorage.removeItem(isAuthenticated);
};
export const clearStorageData = () => {
  localStorage.removeItem(accessUserData);
};
export const clearStorageID = () => {
  localStorage.removeItem("uniqueId");
};

export const getSession = () => {
  return localStorage.getItem(accessTokenKey);
};
export const getStorageData = () => {
  return localStorage.getItem(accessUserData);
};

export const clearSessionData = () => {
  localStorage.removeItem(accessUserData);
};

export const setUserType = (type) => {
  localStorage.setItem(userTypeKey, type);
};

export const setToken = (accessToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
};

export const getSessionToken = () => {
  let token;
  if (localStorage.getItem(accessTokenKey)) {
    token = localStorage.getItem(accessTokenKey);
  } else {
    // token = localStorage.getItem(accessUserToken);
  }
  return token;
};

export const checkSession = () => {
  return getSession().accessToken && getSession().user && getSession().userType
    ? true
    : false;
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

export const clearAuthenticated = () => {
  localStorage.removeItem(isAuthenticated);
};
