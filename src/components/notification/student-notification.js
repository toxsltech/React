/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import Moment from "react-moment";
import base from "../../globals/base";
import apibase from "../../globals/config";
import * as Session from "../../utils/session";

let serveUrl = apibase;

export default class StudentNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Session.getUser(),
    };
  }
  UNSAFE_componentWillMount = () => {};

  render() {
    const { user } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h5>Student Notifications</h5>
        </div>
        <div className="card-body">
          <div className="notification new">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text">
              <span className="highlight  ">Keanu Reeves</span> shared your answer
              <span className="float-right badge badge-success">New</span>
            </div>
          </div>

          <div className="notification new">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="https://imagemoved.files.wordpress.com/2011/07/no-strings-attached-natalie-portman-19128381-850-1280.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Natalie Portman</span> upvoted your
              answer
              <span className="float-right badge badge-success">New</span>
            </div>
          </div>
          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Keanu Reeves</span> shared your question
            </div>
          </div>
          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Keanu Reeves</span> shared your post
            </div>
          </div>
          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Keanu Reeves</span> shared your post
            </div>
          </div>

          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Keanu Reeves</span> shared your question
            </div>
          </div>
          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              <span className="highlight  ">Keanu Reeves</span> shared your post
            </div>
          </div>
          <div className="notification  ">
            <div className="notification-image-wrapper">
              <div className="notification-image">
                <img
                  src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg"
                  alt=""
                  width="32"
                />
              </div>
            </div>
            <div className="notification-text  ">
              shared your post
            </div>
          </div>

          <ul className="pagination justify-content-end mt-4">
            <li className="page-item">
              <a className="page-link" href="">
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="">
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
