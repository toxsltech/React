/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React from "react";
import { Link } from "react-router-dom";
import apibase from "../../globals/config";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import * as Session from "../../utils/session";

let serveUrl = apibase;

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Session.getUser(),
      notificationArray: [],
      notificationCount: "",
    };
  }
  componentDidMount = () => {
    this.getNotification();

    this.props.isView(true);
  };

  getNotification = () => {
    UserService.getNotification().then((resp) => {
      let response = resp.data;
      if (response.success) {
        this.setState({
          notificationArray: response.data.notifications,
          notificationCount: response.data.count,
        });
      }
    });
  };

  render() {
    const { user, notificationArray, notificationCount } = this.state;
    return (
      <div>
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-md-12 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Counselor
              </h3>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to={"/home"} className="text-muted">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item text-muted active"
                      aria-current="page"
                    >
                      <Link
                        to={"/home/notification"}
                        className="breadcrumb-item text-muted active"
                      >
                        Notification
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Notifications</h5>
          </div>
          {notificationArray.length ? (
            <div className="card-body">
              {notificationArray.map((data, index) => (
                <div key={index} className="notification">
                  <div className="notification-image-wrapper">
                    <div className="notification-image">
                      <img
                        src={
                          data.from
                            ? data.from.profile_img
                              ? apibase + "/" + data.from.profile_img
                              : ""
                            : ""
                        }
                        alt=""
                        width="32"
                      />
                    </div>
                  </div>
                  <div className="notification-text">
                    {data.title ? data.title : ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data-found">No data found</p>
          )}
        </div>
      </div>
    );
  }
}
