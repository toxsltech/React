/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import Loading from "react-fullscreen-loading";
import * as adminServices from "../services/adminService";
import showNotification from "../services/notificationService";
import * as storage from "../utils/session";
import * as constant from "../globals/constant";
import { clearStorage } from "../utils/session";
import { Link } from "react-router-dom";

export default function Notifications() {

    return (
     

<div className="content-page-admin">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row page-titles align-items-center">
              <div className="col-md-12 align-self-center">
                <h3 className="text-themecolor mb-0 mt-0">Notification</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                  <li className="breadcrumb-item active">Notification</li>
                </ol>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body tr-single-body">
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="products notifications">
                      <div className="product product-sm p-4">
                        <figure className="noti-media mb-0">
                          <i className="fa fa-bell" />
                        </figure>
                        <div className="product-body">
                          <h5 className="product-title mb-0">John Doe</h5>
                          <p>You have deliverd Yellow button front tea top to john Doe at 12:00pm</p>
                        </div>
                        <div className="mega-action">
                          <p>3 min ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
}