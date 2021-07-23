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

// import * as session from "../../utils/session";
// import { confirmAlert } from "react-confirm-alert";
// import * as constant from "../../globals/constant";
// import history from "../../history";
// import apibase from "../../globals/config";

export default class SignUp extends React.Component {
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
      errorEmail: "",
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
            showNotification("success", "Signed Up Successfully");
            this.props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
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
      errorEmail,
    } = this.state;
    return (
      <div>
        <div className="page-title-area item-bg-1">
          <div className="container">
            <div className="page-title-content">
              <h2>Sign Up</h2>
              <ul>
                <li>
                  <Link to="">
                    Home
                    <i className="fa fa-chevron-right"></i>
                  </Link>
                </li>
                <li>Sign Up</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="sign-up-area ptb-100">
          <div className="shape shape-1">
            <img src={base + "/assets/img/shape/1.png"} alt="Shape" />
          </div>

          <div className="shape shape-4">
            <img src={base + "/assets/img/shape/4.png"} alt="Shape" />
          </div>
          <div className="shape shape-7">
            <img src={base + "/assets/img/shape/7.png"} alt="Shape" />
          </div>
          <div className="shape shape-11">
            <img src={base + "/assets/img/shape/7.png"} alt="Shape" />
          </div>
          <div className="shape shape-10">
            <img src={base + "/assets/img/shape/6.png"} alt="Shape" />
          </div>
          <div className="shape shape-3">
            <img src={base + "/assets/img/shape/3.png"} alt="Shape" />
          </div>
          <div className="shape shape-9">
            <img src={base + "/assets/img/shape/5.png"} salt="Shape" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="contact-form-action signup">
                  <div className="form-heading text-center">
                    <h3 className="form-title">Create an account!</h3>
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
                            <span className="text-danger">{errorEmail}</span>
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
                          {password && errorPassword && submitted ? (
                            <span className="text-danger">{errorPassword}</span>
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
                        <button className="default-btn" type="submit">
                         Sign Up
                        </button>
                      </div>
                      <div className="col-12 ">
                        <p className="account-desc text-center">
                          Already have an account?
                          <Link to="/login"> Log In</Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
