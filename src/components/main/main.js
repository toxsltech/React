/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { useEffect, Fragment } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Home from "../home/home";
import Header from "../header/header";
import Footer from "../footer/footer";
import history from "../../history";
import Survay from "../survay/survay";
import { PrivateRoute } from "../../privateRoute";
import CreateProfile from "../create-profile/create-profile";
import StudentMain from "../student/student-main/student-main";
import jwt from "jwt-decode";
import * as Session from "../../utils/session";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshHeader: false,
      createProfile: true,
    };
  }
  componentDidMount = () => {
    let token = Session.getToken();
    let user = Session.getUser();

    if (token && user) {
      token = jwt(Session.getToken());
      if (token.role == "1" || token.role == "3") {
        if (user.create_profile) this.props.history.push("/home");
      } else {
      }
    }
  };
  render() {
    return (
      <Route history={history}>
        <Header />
        <Switch>
          <Route path="/survay" component={Survay} />
          <Route path="/create-profile" component={CreateProfile} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Route>
    );
  }
}
