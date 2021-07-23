/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import Header from "../header/header"

export default class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      role: "",
      password: "",
      email: "",
      confirmPassword: "",
      submitted: false,
      errorConfirmPassword: "",
      errorPassword: "",
    };
  }
  formHandler = (e) => {
    this.setState({ submitted: false });

    let FullNameRegx = new RegExp("^[a-z,A-Z,.'-]+$");
    var { name, value } = e.target;
    if (name == "firstName" || name == "lastName") {
      if (FullNameRegx.test(value).toString() === "true") {
        this.setState({ [name]: value });
      } else {
        value = "";
        this.setState({ [name]: value });
      }
    } else if (name == "password" || name == "confirmPassword") {
      this.setState({ errorPassword: "" });
      this.setState({ errorConfirmPassword: "" });

      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  signUpHandler = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      role,
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      submitted,
      errorConfirmPassword,
      errorPassword,
    } = this.state;

    if (
      firstName == "" ||
      role == "" ||
      lastName == "" ||
      password == "" ||
      confirmPassword == "" ||
      email == ""
    ) {
      return;
    }
    if (password.length < 9) {
      this.setState({
        errorPassword: "Password must be 9 character long",
      });
      return;
    }
    if (password != confirmPassword) {
      this.setState({
        errorConfirmPassword: "Confirm Password does not match",
      });
      return;
    }
    let data = {
      first_name: firstName,
      last_name: lastName,
      role: role,
      email: email,
      password: password,
    };
    UserService.signUp(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            showNotification("success", "Signed Up Successfully");
            this.props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  componentDidMount = ()=>{
    this.getRecentActivities();
  }
  getRecentActivities = ()=>{
    try{
      UserService.listActivities()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            showNotification("success", "Signed Up Successfully");
            this.props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
    }catch(err){
      showNotification("danger", constant.ERRORMSG);
    }
  }
  viewRecentActivities = ()=>{
    try{
      UserService.viewActivities()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            showNotification("success", "Signed Up Successfully");
            this.props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
    }catch(err){
      showNotification("danger", constant.ERRORMSG);
    }
  }
  deleteRecentActivities = ()=>{
    try{
      UserService.deleteActivities()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            showNotification("success", "Signed Up Successfully");
            this.props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
    }catch(err){
      showNotification("danger", constant.ERRORMSG);
    }
  }

  render() {
    const {
      role,
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      submitted,
      errorConfirmPassword,
      errorPassword,
    } = this.state;
    return (

      <div className="col-md-3 p-0 siebarmain">
        <div id="sticky-sidebar" className="widget-area">
          <div className="widget widget-peru-posts-thumb">
            <h3 className="widget-title">Recent activities</h3>
            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg1" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">John likes smith's pic.</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg2" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Achieving Best Business Awards</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg3" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Seminar for Best Marketing Strategy</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg4" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Achieving Best Business Awards</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>
          </div>

          <div className="widget widget-peru-posts-thumb">
            <div className="responsive-calendar">
              <div className="controls">
                <a className="pull-left" data-go="prev">
                  <div className="btn">
                    <i className="fa fa-chevron-left icon-chevron-rotate"></i>
                  </div>
                </a>
                <h4>
                  <span data-head-year></span> <span data-head-month></span>
                </h4>
                <a className="pull-right" data-go="next">
                  <div className="btn">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </div>
              <hr />
              <div className="day-headers">
                <div className="day header">Mon</div>
                <div className="day header">Tue</div>
                <div className="day header">Wed</div>
                <div className="day header">Thu</div>
                <div className="day header">Fri</div>
                <div className="day header">Sat</div>
                <div className="day header">Sun</div>
              </div>
              <div className="days" data-group="days"></div>
            </div>
          </div>
        </div>
        <div id="sticky-sidebars" className="widget-area">
          <div className="widget widget-peru-posts-thumb">
            <h3 className="widget-title">Recent Notifications</h3>
            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg1" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">John likes smith's pic.</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg2" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Achieving Best Business Awards</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg3" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Seminar for Best Marketing Strategy</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>

            <article className="item">
              <a href="#" className="thumb">
                <span className="fullimage cover bg4" role="img"></span>
              </a>
              <div className="info">
                <h4 className="title usmall">
                  <a href="#">Achieving Best Business Awards</a>
                </h4>
                <time dateTime="2019-06-30">5 mins ago</time>
              </div>

              <div className="clear"></div>
            </article>
          </div>

          <div className="widget widget-peru-posts-thumb">
            <div className="responsive-calendar">
              <div className="controls">
                <a className="pull-left" data-go="prev">
                  <div className="btn">
                    <i className="fa fa-chevron-left icon-chevron-rotate"></i>
                  </div>
                </a>
                <h4>
                  <span data-head-year></span> <span data-head-month></span>
                </h4>
                <a className="pull-right" data-go="next">
                  <div className="btn">
                    <i className="fa fa-chevron-right"></i>
                  </div>
                </a>
              </div>
              <hr />
              <div className="day-headers">
                <div className="day header">Mon</div>
                <div className="day header">Tue</div>
                <div className="day header">Wed</div>
                <div className="day header">Thu</div>
                <div className="day header">Fri</div>
                <div className="day header">Sat</div>
                <div className="day header">Sun</div>
              </div>
              <div className="days" data-group="days"></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
