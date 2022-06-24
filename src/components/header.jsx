/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import $ from "jquery";

import base from "../globals/base";
import { Link } from "react-router-dom";
import showNotification from "../services/notificationService";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { LOGIN } from "../globals/constant";
import * as session from "../utils/session";
import * as AdminServices from "../services/adminService";
import { LOGOUT } from "../globals/constant";
import * as Session from "../utils/session";
import { confirmAlert } from "react-confirm-alert"; // Import
import { clearStorage } from "../utils/session";
import * as adminServices from "../services/adminService";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import apiBase from "../globals/config";
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
let serverurl = apiBase;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: "",
      adminNotify: "",
      countNotification: 0,
      adminDetails: "",
      firstName: "",
      lastName: "",
      profileImg: "",
    };
  }

  componentDidMount = () => {
    this.adminDetail();
  };

  adminDetail = () => {
    adminServices.adminDetail().then((resp) => {
      if (resp) {
        this.setState({
          firstName: resp.data.data.firstName,
          lastName: resp.data.data.lastName,
          email: resp.data.data.email,
          phoneNo: resp.data.data.phoneNo,
          gender: resp.data.data.gender,
          profileImg: resp.data.data.profileImg,
        });
        this.setState({ adminId: resp.data.data._id });
      }
    });
  };

  logout = () => {
    confirmAlert({
      title: "Confirm",
      message: LOGOUT,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmLogout(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  loadVendor = () => {
    const script = document.createElement("script");
    script.src = "assets/js/vendor.min.js";
    script.async = true;
    document.head.appendChild(script);
  };
  loadApp = () => {
    const script = document.createElement("script");
    script.src = "assets/js/app.min.js";
    script.async = true;
    document.head.appendChild(script);
  };

  confirmLogout = () => {
    clearStorage();
    this.props.history.push("/login");
  };
  handler = () => {
    if ($("body").hasClass("enlarged")) {
      $("body").removeClass("enlarged");
    } else {
      $("body").addClass("enlarged");
    }
    $(".toggleOptions").click(function () {
      $(".toggleOptions").toggleClass("active");
      $(".toggleOptions .nav-second-level").toggleClass("in");
    });
  };

  render() {
    const { firstName, profileImg } = this.state;
    return (
      <div id="wrapper" className="wrapper admin-panel">
        <div className="navbar-custom-admin">
          <div className="logo-box">
            <a to="/dashboard" href="#0" className="logo text-center">
              <img
                src={base + "assets/images/full_Logoo.png"}
                className="img-fluid"
                alt="logo-img"
                width={580}
              ></img>
            </a>
          </div>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button
                className="button-menu-mobile waves-effect waves-light"
                onClick={this.handler}
              >
                <i className="fa fa-bars"></i>
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ml-lg-auto">
            <li className="nav-item dropdown">
              <Navbar bg="white" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <img
                  src={serverurl + profileImg}
                  className="rounded-circle w-30"
                  alt="btwf"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = base + "assets/images/default.jpeg";
                  }}
                />

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title={firstName} id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/profile">
                          <span className="text-black">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            Profile
                          </span>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/changePassword">
                          <span className="text-black">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            Change Password
                          </span>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={this.logout}>
                        <span className="text-black">
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                          Logout
                        </span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
