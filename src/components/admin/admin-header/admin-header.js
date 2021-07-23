/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
import * as session from "../../../utils/session";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
import history from "../../../history";



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

    componentDidMount = ()=>{
        this.getAdminNotification();
    }

    logout = () => {
        localStorage.clear();
        history.push("/");
    }

    getAdminNotification = ()=>{
        UserService.getNotification().then(resp=>{
            let response = resp?.data;
            if(response?.success){
              this.setState({notificationArray:response.data.notifications,notificationCount:response.data.count})
            }
          });
    }

    render() {
        const { messaageCount,notificationArray,notificationCount } = this.state;
        return (
            <div>
                <div className="nav-header">
                    <a href="#" className="brand-logo">
                        <img className="logo-abbr" src="/assets/img/logo-white-2.png" alt="" />
                        <img className="logo-compact" src="/assets/img/logo-white.png" alt="" />
                        <img className="brand-title" src="/assets/img/logo-white.png" alt="" />
                    </a>

                    <div className="nav-control outer-div-hamburger">
                        <div className="hamburger">
                            <span className="line"></span><span className="line"></span><span className="line"></span>
                        </div>
                    </div>
                </div>
                <div className="header1">
                    <div className="header1-content">
                        <nav className="navbar navbar-expand">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className="header1-left">
                                    <div className="search_bar dropdown">
                                        <span className="search_icon p-3 c-pointer" data-toggle="dropdown">
                                            <i className="fa fa-search"></i>
                                        </span>
                                        <div className="dropdown-menu p-0 m-0">
                                            <form>
                                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <ul className="navbar-nav header1-right">
                                    <li className="nav-item dropdown notification_dropdown">
                                        <a className="nav-link bell ai-icon" href="#" role="button" data-toggle="dropdown">
                                            <svg id="icon-user" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                            </svg>
                                            <div className="pulse-css"></div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <ul  className="list-unstyled">
                                            {notificationArray.map((data,index)=>(
                                                <li key={index} className="media dropdown-item">
                                                    <span className="success"><i className="ti-user"></i></span>
                                                    <div className="media-body">
                                                        <img
                                                            src={data.from?data.from.profile_img?apibase+"/"+data.from.profile_img:"":""}
                                                            alt=""
                                                            width="32"
                                                        />
                                                        <a href="#">
                                                            <p><strong>{data.title?data.title:""}</strong>
                                                            </p>
                                                        </a>
                                                    </div>
                                                    <span className="notify-time">3:20 am</span>
                                                </li>  
                                                ))}                                              
                                            </ul>
                                            <Link className="all-notification" to="/admin/notification">See all notifications <i
                                                className="ti-arrow-right"></i></Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown header-profile">
                                        <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                                            <img src="/assets/img/10.jpg" width="20" alt="" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link to="/admin/profile" className="dropdown-item ai-icon">
                                                <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                <span className="ml-2">Profile </span>
                                            </Link>
                                            {/* <a  className="dropdown-item ai-icon">
                                                <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                <span className="ml-2">Setting </span>
                                            </a> */}
                                            <a onClick={this.logout} className="dropdown-item ai-icon">
                                                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                <span className="ml-2">Logout </span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
