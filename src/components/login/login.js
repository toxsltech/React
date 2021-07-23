/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import base from "../../globals/base";
import * as session from "../../utils/session";
import history from "../../history";
import * as Session from "../../utils/session";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      errorEmail: "",
      submitted: false,
    };
  }
  formHandler = (e) => {
    this.setState({ submitted: false });

    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginHandler = async (e) => {
    // const { history } = this.props;
    e.preventDefault();
    let emailRegx = /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = this.state;
    if (password == "" || email == "") {
      return;
    }
    if (emailRegx.test(email).toString() == "false") {
      this.setState({
        errorEmail: "Invalid Email",
      });
      return;
    }
    let data = {
      email: email,
      password: password,
    };
    UserService.login(data)
      .then(async (resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            await session.setSession(
              response.data.token,
              JSON.stringify(response.data.userData)
            );
            await session.setisAuthenticated(true);

            if (response.data.userData.create_profile) {
              if(response.data.userData.role==4){
                this.props.history.push("/admin/dashboard");
              }else 
              if (
                response.data.userData.role == 1 ||
                response.data.userData.role == 3 ||
                response.data.userData.role == 5
              ) {
                this.props.history.push("/home");
              }
            } else {
              this.props.history.push("/create-profile");
            }
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  render() {
    const { email, password, submitted, errorEmail } = this.state;
    
    return (
      <div>
        <div className="page-title-area item-bg-1">
          <div className="container">
            <div className="page-title-content">
              <h2>Log In</h2>
              <ul>
                <li>
                  <Link to="/">
                    Home
                    <i className="fa fa-chevron-right"></i>
                  </Link>
                </li>
                <li>Log In</li>
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
            <img src={base + "/assets/img/shape/5.png"} alt="Shape" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="contact-form-action">
                  <div className="form-heading text-center">
                    <h3 className="form-title">Log In to your account!</h3>
                  </div>
                  <form onSubmit={(e) => this.loginHandler(e)}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                            required
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
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                            required
                          />
                          {password == "" && submitted ? (
                            <span className="text-danger">
                              Please fill Password
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 form-condition">
                        
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <a className="forget" >
                          Forgot password?
                        </a>
                      </div>
                      <div className="col-12 text-center">
                        <button className="default-btn" type="submit">
                          Log In
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="account-desc text-center">
                          Not a member?
                          <Link to="/signup">Sign Up</Link>
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
