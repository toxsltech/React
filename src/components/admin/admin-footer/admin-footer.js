/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
// import "../admin-counsellorList/node_modules/react-confirm-alert/src/react-confirm-alert.css";
import * as session from "../../../utils/session";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
import history from "../../../history";
const io = require("socket.io-client");
const socket = io.connect(apibase);

// import { Link } from "react-router-dom";

// let serveUrl = apibase;

export default class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: session.getUser(),
      messaageCount: "",
      notificationArray: [],
      notificationCount: "",
    };
  }

  render() {
    const { messaageCount } = this.state;
    return (
      <div className="footer">
        <div className="container">
          <div className="row m-0">
            <div className="col-md-12">
              <div className="copyright text-center">
                <p>Copyright © {new Date().getFullYear()} Unekey </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
