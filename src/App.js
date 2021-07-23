/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { Fragment, useEffect, useState } from "react";
import * as loadjs from "loadjs";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Main from "./components/main/main";
import history from "./history";
import base from "./globals/base";
import Abc from "./components/abc/abc";

import groupsmain from "./components/groupsmain/groupsmain";

import "./assets/css/animate.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/flaticon.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/imagelightbox.min.css";
import "./assets/css/jquery.fancybox.min.css";
import "./assets/css/meanmenu.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/responsive.css";
import "./assets/css/style.css";
// import * from 'react-select/dist/css/react-select.css';

import { Route, Switch, BrowserRouter, Redirect, Router } from "react-router-dom";
import Home from "./components/student/student-main/student-main";
import { PrivateRoute } from "./privateRoute";
import Admin from "./components/admin/admin-main/admin-main";

export default function App() {
  const [user_view1, setUser_view1] = useState(true)


  const recallNotifyy = (data) => {
    if (data != user_view1)
      setUser_view1(data)

  }


  useEffect(() => {
    history.listen((location, action) => {
      loadAllJS();
    });
    loadAllJS();
    setRoute();
  }, [200]);
  const setRoute = () => { };
  const loadAllJS = () => {
    loadjs([
      base + "/assets/js/jquery.fancybox.min.js",
      base + "/assets/js/jquery.jquery.meanmenu.js",
      base + "/assets/js/calender.js",
      base + "/assets/js/imagelightbox.min.js",
      base + "/assets/js/owl.carousel.js",
      base + "/assets/js/wow.min.js",
      base + "/assets/js/custom.js",
    ]);
    loadjs([base + "/assets/js/custom.js"]);
  };
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/abc" component={Abc} />

        <Route path="/admin" component={Admin} />
        <Route exact path="/groupsmain" component={groupsmain} />
        <PrivateRoute path="/home" component={() => <Home recallNotifyy={recallNotifyy} user_vieww={user_view1} />} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
