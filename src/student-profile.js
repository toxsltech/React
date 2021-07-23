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

export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  formHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    let data = {
      email: email,
      password: password,
    };
    UserService.login(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            session.setSession(
              response.data.token,
              JSON.stringify(response.data.userData)
            );
            session.setisAuthenticated(true);
            showNotification("success", response.message);
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="page-title-area item-bg-1">
          <div className="container">
            <div className="page-title-content">
              <h2>Create Profile</h2>
              <ul>
                <li>
                  <a href="index.html">
                    Home
                    <i className="fa fa-chevron-right"></i>
                  </a>
                </li>
                <li>Create Profile</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="sign-up-area ptb-100">
          <div className="shape shape-1">
            <img src="/assets/img/shape/1.png" alt="Shape" />
          </div>

          <div className="shape shape-4">
            <img src="/assets/img/shape/4.png" alt="Shape" />
          </div>
          <div className="shape shape-7">
            <img src="/assets/img/shape/7.png" alt="Shape" />
          </div>
          <div className="shape shape-11">
            <img src="/assets/img/shape/7.png" alt="Shape" />
          </div>
          <div className="shape shape-10">
            <img src="/assets/img/shape/6.png" alt="Shape" />
          </div>
          <div className="shape shape-3">
            <img src="/assets/img/shape/3.png" alt="Shape" />
          </div>
          <div className="shape shape-9">
            <img src="/assets/img/shape/5.png" alt="Shape" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-7 mx-auto">
                <div className="multi-step-form">
                  <div className="steps">
                    <button className="active" type="button" disabled>
                      Personal Details
                    </button>
                  </div>
                  <br />
                  <form action="#" method="post">
                    <fieldset aria-label="Step One" tabIndex="-1" id="step-1">
                      <h2>Add Personal Details</h2>
                      <div className="avatar-upload1">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                          />
                          <label for="imageUpload"></label>
                        </div>
                        <div className="avatar-preview">
                          <div
                            id="imagePreview"
                            style="background-image: url(assets/img/team/7.jpg);"
                          ></div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="first-name">Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="first-name"
                              id="first-name"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="gender" className="mr-3">
                          Gender
                        </label>
                        <span>
                          <input type="radio" name="gender" /> Male
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <input type="radio" name="gender" /> Female
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="description ">Add Bio </label>
                        <textarea className="form-control" required></textarea>
                      </div>

                      <p>
                        <a
                          className="default-btn"
                          type="submit"
                          href="student-profile.php"
                        >
                          Submit
                        </a>
                      </p>
                    </fieldset>
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
