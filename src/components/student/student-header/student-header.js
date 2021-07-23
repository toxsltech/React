/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
// import "../../admin/admin-counsellorList/node_modules/react-confirm-alert/src/react-confirm-alert.css";
import * as session from "../../../utils/session";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
const io = require("socket.io-client");
const socket = io.connect(apibase);

// import { Link } from "react-router-dom";

// let serveUrl = apibase;

export default class StudentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: session.getUser(),
      messaageCount: "",
      notificationArray: [],
      notificationCount: "",
    };
  }
  UNSAFE_componentWillMount = () => {
    this.props.history.listen((location, action) => {
      this.getMessageCount();
      this.getNotification();
    });
    this.getMessageCount();
    this.getNotification();
  };
  
  componentDidMount = ()=>{
    this.getNotification();

  }

  getNotification = () => {
    UserService.getNotificationsCount().then(resp=>{
      if(resp){
        let response = resp.data;
        if(response.success){
          this.setState({notificationArray:response.data.notifications,notificationCount:response.data.count})
        }

      }
    });
  };

  getMessageCount = () => {
    UserService.getMessageCount()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ messaageCount: response.data.count });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  abc = () => {
    this.setState(
      {
        refreshHeader: true,
      },
      () => {
        this.setState({ refreshHeader: false });
      }
    );
  };
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
  UNSAFE_componentWillMount = () => {
    socket.emit("getNotification");
    socket.on("receiveNotification", (resp) => {
    });
  };
  confirmDelete = () => {
    session.clearSession();
    this.props.history.push("/");
  };
  render() {
    const { messaageCount,notificationArray,notificationCount } = this.state;
    return (
      <div className="top-nav">
        <div className="navbar-area">
          <div className="mobile-nav new-mobile-nav">
            <Link to="/home" className="logo">
              <img src={base + "/assets/img/logo.png"} alt="Logo" />
            </Link>
            
          </div>
          <div className="main-nav top-nav-style-2 new-main-nav">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <Link to="/home" className="navbar-brand" >
                  <img src={base + "/assets/img/logo.png"} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to="/home" className="nav-link">Home</Link>
                    </li>

                    <li className="nav-item dropdown noicon">
                     
                      <a
                        className="nav-link "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Notification  <i className="fa fa-bell-o"></i>
                        {notificationCount>0?<span className="circle-bell">{notificationCount?notificationCount:''}</span>:''}
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
                            {notificationCount?notificationCount:''}
                          </span>
                        </div>
                        <div className="dropdown-body">
                          {notificationArray.map((data,key)=>(
                          <div key={key}
                            className="notification new ng-scope"
                            ng-repeat="notification in newNotifications.slice().reverse() track by notification.timestamp"
                          >
                            <div className="notification-image-wrapper">
                              <div className="notification-image">
                                <img
                                  src={data.from?data.from.profile_img?apibase+"/"+data.from.profile_img:"":""}
                                  alt=""
                                  width="32"
                                />
                              </div>
                            </div>
                            <div className="notification-text ng-binding">
                              
                            {data.title?data.title:""}
                            </div>
                          </div>
                          ))}
                        </div>
                        <div className="dropdown-footer">
                          <Link to="/home/notification">View All</Link>
                        </div>
                      </div>
                    </li>
                    {/* <li className="nav-item">
                      <Link to="/home/chat" className="nav-link">
                        Messages <i className="fa fa-comments-o"></i>
                        {messaageCount ? (
                          <span className="circle-bell">{messaageCount}</span>
                        ) : (
                          ""
                        )}
                      </Link>
                    </li> */}
                    <li className="nav-item dropdown">
                      <a className="dropdown-toggle" data-toggle="dropdown">
                        {this.state.user && this.state.user.first_name
                          ? this.state.user.first_name
                          : "User"}
                      </a>
                      <div className="dropdown-menu smallwidth">
                        <Link to="/home/profileview" className="dropdown-item">Edit Profile</Link>
                        <a
                          className="dropdown-item"
                          onClick={() => this.logouthandler()}
                        >
                          Log Out
                        </a>
                      </div>
                    </li>
                  </ul>
                  {/* <!-- <div className="others-option">
									<div className="searchBox">
							            <input className="searchInput" type="text" name="" placeholder="Search">
							            <button className="searchButton" href="#">
							                <i className="fa fa-search"></i>
							            </button>
							        </div>
								</div> --> */}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
