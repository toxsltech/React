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

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Session.getUser(),
    };
  }
  UNSAFE_componentWillMount = () => { };

  render() {
    const { user } = this.state;
    return this.props.chatHistory.map((data, index) => (
      <li
        key={index}
        className={`media animated ${
          data.sender._id === user._id
            ? "sent fadeInRight"
            : "received fadeInLeft"
          }`}
      >
        {data.sender._id !== user._id ? (
          <div className="avatar">
            <img
              src={
                data.sender.profile_img
                  ? serveUrl + "/" + data.sender.profile_img
                  : base + "/assets/img/user.jpg"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = base + "/assets/img/user.jpg";
              }}
              alt="User Image"
              className="avatar-img rounded-circle"
            />
          </div>
        ) : (
            ""
          )}
        <div className="media-body">
          <div className="msg-box">
            <div>
              <p>{data.message}</p>
              <ul className="chat-msg-info">
                <li>
                  <div className="chat-time">
                    <span>
                      <Moment date={data.created_at} format="hh:mm" />
                      {/* {data.created_at} */}
                      {/* </Moment> */}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    ));
  }
}
