/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from "react";
import * as Session from "./utils/session";
import { Route, Redirect } from "react-router-dom";

import jwt from "jwt-decode";

export class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      role: null,
      loaded: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    let token = Session.getToken();
    if (token) {
      this.setState({
        token,
        role: jwt(token).role,
        loaded: true,
      });
    } else {
      this.setState({ loaded: true });
    }
  };

  render() {
    const { component: Component, ...props } = this.props;
    const { token, role, loaded } = this.state;
    return loaded ? (
      <Route
        {...props}
        render={(props) =>
          token && role ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
        }
      />
    ) : (
        ""
      );
  }
}
