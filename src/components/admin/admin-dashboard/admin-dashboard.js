/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
import { PieChart } from "react-minimal-pie-chart";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as session from "../../../utils/session";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
import history from "../../../history";
import Switch from "react-switch";
const io = require("socket.io-client");
const socket = io.connect(apibase);
// import { Link } from "react-router-dom";

// let serveUrl = apibase;

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      userLists: [],
    };
  }

  componentWillMount = () => {
    UserService.getDashboardData().then((response) => {
      if (response?.data?.success) {
        this.setState({ data: response.data.data });
      }
    });
    UserService.getNewUserList().then((response) => {
      if (response?.data?.success) {
        this.setState({ userLists: response.data.data });
      }
    });
  };

  editUserDetails = (id) => {
    this.props.history.push(`/admin/edit-user/${id}`);
  };

  viewDetails = (data) => {
    this.setState({ userDetails: data });
  };

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
    let emailRegx = /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      errorEmail,
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
    if (emailRegx.test(email).toString() == "false") {
      this.setState({
        errorEmail: "Invalid Email",
      });
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
            // showNotification("success", "Signed Up Successfully");
            // this.props.history.push("/login");
            document.getElementById("editMilestone").click();
          }
        }
      })
      .catch((err) => {
        // showNotification("danger", constant.ERRORMSG);
      });
  };

  render() {
    const {
      messaageCount,
      data,
      role,
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      submitted,
      errorConfirmPassword,
      errorPassword,
      errorEmail,
    } = this.state;

    const { userLists, totalCount, userDetails } = this.state;
    return (
      <div>
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-6">
                <div className="widget-stat card bg-success">
                  <div className="card-body">
                    <div className="media">
                      <span className="mr-3">
                        <i className="la la-users"></i>
                      </span>
                      <Link to="/admin/user-list">
                        <div className="media-body text-white">
                          <p className="mb-1">Total Students</p>
                          <h3 className="text-white">
                            {data?.totalUserCount?.totalCount}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-6">
                <div className="widget-stat card bg-warning">
                  <div className="card-body">
                    <div className="media">
                      <span className="mr-3">
                        <i className="la la-user"></i>
                      </span>
                      <Link to="/admin/counsellor-list">
                        <div className="media-body text-white">
                          <p className="mb-1">Total Counselors</p>
                          <h3 className="text-white">
                            {data?.totalCounsellorCount?.totalCount}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-6">
                <div className="widget-stat card bg-primary">
                  <div className="card-body">
                    <div className="media">
                      <span className="mr-3">
                        <i className="la la-graduation-cap"></i>
                      </span>

                      <Link to="/admin/teacher-list">
                        <div className="media-body text-white">
                          <p className="mb-1">Total Teachers</p>
                          <h3 className="text-white">
                            {data?.teacherCount?.totalCount}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="row tab-content">
                  <div
                    id="list-view"
                    className="tab-pane fade active show col-lg-12"
                  >
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">New Users Joined</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="example3"
                            className="table table-striped table-responsive-sm"
                          >
                            <thead>
                              <tr>
                                <th>
                                  <b>Image</b>{" "}
                                </th>
                                <th>
                                  <b>Name</b>
                                </th>
                                <th>
                                  <b>Email</b>
                                </th>
                                <th>
                                  <b>User Type</b>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {userLists.map((record, key) => (
                                <tr key={key}>
                                  <td>
                                    <img
                                      className="avatar-img rounded-circle setuser-img"
                                      width="35"
                                      src={apibase + "/" + record.profile_img}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          base + "/assets/img/user.jpg";
                                      }}
                                      alt="User Image"
                                      className="avatar-img rounded-circle setuser-img"
                                    />
                                  </td>

                                  <td>
                                    {record.first_name} {record.last_name}
                                  </td>
                                  <td>{record.email}</td>
                                  <td>
                                    {record.role == 1
                                      ? "Student"
                                      : record.role == 3
                                      ? "Counselor"
                                      : "Teacher"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           

             {/* <div className="modal" id="editMilestone">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">New User</h4>
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div className="contact-form-action signup">
                              <div className="form-heading text-center">
                                <h3 className="form-title">
                                  Create an account!
                                </h3>
                              </div>
                              <form
                                onSubmit={(e) => {
                                  this.signUpHandler(e);
                                }}
                              >
                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={(e) => this.formHandler(e)}
                                        value={firstName}
                                      />
                                      {firstName == "" && submitted ? (
                                        <span className="text-danger">
                                          Please fill First Name
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12 ">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={(e) => this.formHandler(e)}
                                        value={lastName}
                                      />
                                      {lastName == "" && submitted ? (
                                        <span className="text-danger">
                                          Please fill Last Name
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <span>
                                        <input
                                          type="radio"
                                          name="role"
                                          value="1"
                                          onChange={(e) => this.formHandler(e)}
                                        />{" "}
                                        Student
                                      </span>
                                      &nbsp;&nbsp;
                                      <span>
                                        <input
                                          type="radio"
                                          name="role"
                                          value="3"
                                          onChange={(e) => this.formHandler(e)}
                                        />{" "}
                                        Counselor
                                      </span>
                                      &nbsp;&nbsp;
                                      <span>
                                        <input
                                          type="radio"
                                          name="role"
                                          value="5"
                                          onChange={(e) => this.formHandler(e)}
                                        />{" "}
                                        Teacher
                                      </span>
                                      &nbsp;&nbsp;
                                      {role == "" && submitted ? (
                                        <span className="text-danger">
                                          Please choose one
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={(e) => this.formHandler(e)}
                                        // required
                                        // pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                                        title="Please include ."
                                      />
                                      {email == "" && submitted ? (
                                        <span className="text-danger">
                                          Please fill Email
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {email && errorEmail && submitted ? (
                                        <span className="text-danger">
                                          {errorEmail}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => this.formHandler(e)}
                                      />
                                      {password == "" && submitted ? (
                                        <span className="text-danger">
                                          Please fill Password
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {password &&
                                      errorPassword &&
                                      submitted ? (
                                        <span className="text-danger">
                                          {errorPassword}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-sm-12 ">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={(e) => this.formHandler(e)}
                                      />
                                      {confirmPassword == "" && submitted ? (
                                        <span className="text-danger">
                                          Please fill Confirm Password
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {confirmPassword &&
                                      errorConfirmPassword &&
                                      submitted ? (
                                        <span className="text-danger">
                                          {errorConfirmPassword}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-12 text-center">
                                    <button
                                      className="default-btn"
                                      type="submit"
                                    >
                                      Sign Up
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}


          </div>
        </div>
      </div>
    );
  }
}
