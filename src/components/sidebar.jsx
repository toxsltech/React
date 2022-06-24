/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { useState, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import * as Session from "../utils/session";
import showNotification from "../services/notificationService";
import jwt from "jwt-decode";
export default function Sidebar(props) {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);

  const logout = () => {
    confirmAlert({
      title: "Constant.TITLE",
      message: "Constant.LOGOUT",
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmLogout(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const confirmLogout = () => {
    Session.clearSession();
    Session.clearSessionData();
    showNotification("success", "Constant.NOTIFICATION");
    props.history.push("/login");
  };
  const test = () => {
    setShow(!show);
  };
  const test1 = () => {
    setHide(!hide);
  };

  return (
    <div className="left-side-menu">
      <div className="slimscroll-menu">
        <div id="sidebar-menu-admin">
          <ul className="metismenu" id="side-menu">
            <li>
              <NavLink exact={true} activeClassName="active" to="/dashboard/">
                <i className="fa fa-home"></i> <span>Dashboard </span>
              </NavLink>
            </li>

            <li className="toggleOptions">
              <a className="aa" onClick={test1}>
                <i className="fa fa-users"></i> <span> Seller Management </span>
                <span
                  className={
                    hide
                      ? "fa fa-angle-right menu-arrow2"
                      : "fa fa-angle-down menu-arrow2 "
                  }
                  aria-hidden="true"
                ></span>
              </a>
              <ul
                className={
                  hide
                    ? "nav-second-level collapse in toggle_box "
                    : "nav-second-level collapse in toggle_box show "
                }
                aria-expanded="false"
              >
                <li className="toggleOptions">
                  <NavLink to="/seller-dashboard">
                    <i className="fa fa-clipboard"></i>
                    <span>Seller Dashboard </span>
                  </NavLink>
                </li>
                <li className="toggleOptions">
                  <NavLink to="/sellers">
                    <i className="fa fa-users"></i> <span>Sellers</span>
                  </NavLink>
                </li>
                <li className="toggleOptions">
                  <NavLink to="/product/">
                    <i className="fa fa-shopping-basket"></i>
                    <span>Products </span>
                  </NavLink>
                </li>
                <li className="toggleOptions">
                  <NavLink to="/seller-request/">
                    <i className="fas fa-user-shield"></i>
                    <span> Seller Request </span>
                  </NavLink>
                </li>
                <li className="toggleOptions">
                  <NavLink to="/seller-produts/">
                    <i className="fas fa-user-shield"></i>
                    <span> Latest products updates </span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="toggleOptions">
              <a className="aa" onClick={test}>
                <i className="fa fa-users"></i> <span> Report Management </span>
                <span
                  className={
                    show
                      ? "fa fa-angle-right menu-arrow2"
                      : "fa fa-angle-down menu-arrow2 "
                  }
                  aria-hidden="true"
                ></span>
              </a>
              <ul
                className={
                  show
                    ? "nav-second-level collapse in toggle_box "
                    : "nav-second-level collapse in toggle_box show "
                }
                aria-expanded="false"
              >
                <li className="toggleOptions">
                  <NavLink to="/repoted-Posts/">
                    <i className="fa fa-clipboard"></i>
                    <span>Reported Posts </span>
                  </NavLink>
                </li>
                <li className="toggleOptions">
                  <NavLink to="/repoted-Users/">
                    <i className="fa fa-user-times"></i>
                    <span>Reported Users </span>
                  </NavLink>
                </li>
              </ul>
            </li>

            {jwt(localStorage.getItem("accessToken")).role === 2 ? (
              <li className="toggleOptions">
                <NavLink to="/admin-list/">
                  <i className="fa fa-user"></i> <span>Admin List </span>
                </NavLink>
              </li>
            ) : null}
            {/* <li className="toggleOptions">
              <NavLink to="/products/">
                <i className="fab fa-product-hunt"></i><span>Product</span>
              </NavLink>
            </li> */}
            <li className="toggleOptions">
              <NavLink to="/users/">
                <i className="fa fa-users"></i> <span>Users </span>
              </NavLink>
            </li>
            <li className="toggleOptions">
              <NavLink to="/product-categories/">
                <i className="fa fa-list"></i> <span>Categories</span>
              </NavLink>
            </li>
            <li className="toggleOptions">
              <NavLink to="/product-SubCategories/">
                <i className="fa fa-list"></i> <span>Sub-categories</span>
              </NavLink>
            </li>
            <li className="toggleOptions">
              <NavLink to="/verification-queue">
                <i className="fa fa-text"></i> <span>Verification Queue</span>
              </NavLink>
            </li>
            <li className="toggleOptions">
              <NavLink to="/personalized-notification">
                <i className="fa fa-bell"></i>
                <span>Personalized notification</span>
              </NavLink>
            </li>
            <li className="toggleOptions">
              <NavLink to="/contact-us">
                <i className="fa fa-id-card"></i> <span>Contact Us</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
}
