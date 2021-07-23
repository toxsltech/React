/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
// import base from "../../globals/base";
import { Link } from "react-router-dom";
import * as session from "../../utils/session";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  logouthandler = () => {
    confirmAlert({
      message: "Are you sure to Logout? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmDelete(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmDelete = () => {
    session.clearSession();
    if(this.history){
      this.history.push("/");
    }else{
     window.location.href = "/"
    }
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        {/* this.state. */}

        <div className="top-nav">
          <div className="navbar-area fixed-top">
            <div className="mobile-nav">
              <Link to="/home" className="logo">
                <img src="/assets/img/logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="main-nav top-nav-style-2">
              <nav className="navbar navbar-custom navbar-expand-md navbar-light">
                <div className="container">
                  <Link to="/home" className="navbar-brand">
                    <img src="/assets/img/logo.png" alt="Logo" />
                  </Link>

                  <div
                    className="collapse navbar-collapse mean-menu"
                    id="navbarSupportedContent"
                  >
                    {session.getIsAuthenticated() ? (
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link to="/home" className="nav-link active">
                            Home
                          </Link>
                        </li>

                        <li className="nav-item dropdown">
                          <a
                            href="#"
                            className="nav-link"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Notification <i className="fa fa-bell-o"></i>
                            <span className="circle-bell">20</span>
                          </a>

                          <div
                            className="dropdown-menu animated fadeInDown"
                            id="notification-dropdown"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <div className="dropdown-header">
                              <span className="triangle"></span>
                              <span className="heading">Notifications</span>
                              <span
                                className="count ng-binding"
                                id="dd-notifications-count"
                              >
                                1613
                              </span>
                            </div>
                            <div className="dropdown-body">
                              <div
                                className="notification new ng-scope"
                                ng-repeat="notification in newNotifications.slice().reverse() track by notification.timestamp"
                              // style=""
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Keanu Reeves
                                  </span>{" "}
                                  shared your answer
                                </div>
                              </div>
                              <div
                                className="notification new ng-scope"
                                ng-repeat="notification in newNotifications.slice().reverse() track by notification.timestamp"
                              // style=""
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="https://imagemoved.files.wordpress.com/2011/07/no-strings-attached-natalie-portman-19128381-850-1280.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Natalie Portman
                                  </span>{" "}
                                  upvoted your answer
                                </div>
                              </div>
                              <div
                                className="notification ng-scope"
                                ng-repeat="notification in readNotifications.slice().reverse() track by $index"
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Keanu Reeves
                                  </span>{" "}
                                  shared your question
                                </div>
                              </div>
                              <div
                                className="notification ng-scope"
                                ng-repeat="notification in readNotifications.slice().reverse() track by $index"
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Keanu Reeves
                                  </span>{" "}
                                  shared your post
                                </div>
                              </div>
                              <div
                                className="notification ng-scope"
                                ng-repeat="notification in readNotifications.slice().reverse() track by $index"
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Keanu Reeves
                                  </span>{" "}
                                  shared your post
                                </div>
                              </div>
                              <div
                                className="notification ng-scope"
                                ng-repeat="notification in readNotifications.slice().reverse() track by $index"
                              >
                                <div className="notification-image-wrapper">
                                  <div className="notification-image">
                                    <img
                                      src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAANfAAAAJDE1MzNiYjM1LWVjYzUtNDcwZi1hMmExLTQ5ZDVjYzViMDkzYQ.jpg"
                                      alt=""
                                      width="32"
                                    />
                                  </div>
                                </div>
                                <div className="notification-text ng-binding">
                                  <span className="highlight ng-binding">
                                    Fauzan Khan
                                  </span>{" "}
                                  upvoted your question
                                </div>
                              </div>
                            </div>
                            <div className="dropdown-footer">
                              <a href="#">View All</a>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            Messages <i className="fa fa-comments-o"></i>
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown">
                            User Name
                          </a>
                          <div className="dropdown-menu smallwidth">
                            <a className="dropdown-item">Profile</a>
                            <a
                              onClick={() => this.logouthandler()}
                              className="dropdown-item"
                            >
                              Log Out
                            </a>
                          </div>
                        </li>
                      </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <a href="index.php" className="nav-link active">
                              Home
                          </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              About Us
                          </a>
                          </li>

                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Contact Us
                          </a>
                          </li>
                          <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                              Sign Up
                          </Link>
                          </li>
                          <li className="others-option">
                            <Link to="/login" className="default-btn">
                              Log In
                          </Link>
                          </li>
                        </ul>
                      )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
