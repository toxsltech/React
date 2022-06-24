/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./history";
import store from "./store";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import baseUrl from "./globals/base";
import Footer from "./components/footer";
import "./assets/css/plugins/bootstrap.min.css";
import * as loadjs from "loadjs";
import PostDetail from "./components/postDetail";
import jwt from "jwt-decode";
import PersonalizedNotification from "./components/personalizedNotification";
import Product from "./components/product";
import Productdetail from "./components/productdetail";
import SellerDashboard from "./components/sellerdashboard";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("accessToken") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("accessToken") &&
      jwt(localStorage.getItem("accessToken")).role === 2 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);
function Main(props) {
  const [profileImg, setProfileImg] = useState();
  const [firstName, setFirstName] = useState();
  const adminData = (propData) => {
    if (profileImg != propData.profileImg) {
      setProfileImg(propData.profileImg);
    }
    if (firstName != propData.firstName) {
      setFirstName(propData.firstName);
    }
  };
  useEffect(() => {
    handleClick();
  });
  const handleClick = () => {
    loadjs([baseUrl + "assets/js/jquery-3.5.1.slim.min.js"]);
    setTimeout(function () {
      loadjs([
        baseUrl + "assets/js/popper.min.js",
        baseUrl + "assets/js/bootstrap.min.js",
        baseUrl + "assets/js/scripts.js",
      ]);
    }, 500);
  };

  return (
    <div className="App">
      <Route>
        <PrivateRoute component={() => <Header history={props.history} />} />
        <PrivateRoute component={Sidebar} history={props.history} />
        <Switch>
          <PrivateRoute path="/post/:id" component={PostDetail} />
          <PrivateRoute
            path="/personalized-notification"
            component={PersonalizedNotification}
          />
          <PrivateRoute path="/product" component={Product} />
          <PrivateRoute path="/productdetail/:id" component={Productdetail} />
          <PrivateRoute
            path="/profile"
            component={() => <Profile adminData={adminData} />}
          />
          <PrivateRoute path="/seller-dashboard" component={SellerDashboard} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
        <Footer />
      </Route>
    </div>
  );
}

export default Main;
