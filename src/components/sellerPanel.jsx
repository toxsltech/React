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
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import * as loadjs from "loadjs";
import baseUrl from "../globals/base";
import Locationlist from "./locationlist";
import Notifications from "./notifications";

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

function SellerPanel(props) {
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
        <PrivateRoute component={() => <NewHeader history={props.history} />} />
        <PrivateRoute component={() => <NewSidebar history={props.history} />} />
        <Switch>
          <Route path="/seller/profile" component={() => <NewProfile />} />
          <Route path="/seller/locationlist" component={Locationlist} />
          <Route path="/seller/notifications" component={Notifications} />
          <Route render={() => <Redirect to="/seller" />} />
        </Switch>
        <Footer />
      </Route>
    </div>
  );
}

export default SellerPanel;
