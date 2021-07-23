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

export default class Survay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showCounselor: false,
      role: "",
      schoolDistrict: "",
      studentType: "",
      counselorType: "",
      fullName: "",
      success: false,
      submitted: false,
    };
  }
  formHandler = (e) => {
    this.setState({ submitted: false });
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      email,
      showCounselor,
      role,
      schoolDistrict,
      studentType,
      counselorType,
      fullName,
    } = this.state;
    if (showCounselor && (counselorType == "" || schoolDistrict == "")) {
      return;
    }
    if (email == "" || role == "" || studentType == "" || fullName == "") {
      return;
    }
    let data = {
      name: fullName ? fullName : "",
      email: email ? email : "",
      role: role ? role : "",
      school_district: schoolDistrict ? schoolDistrict : "",
      options: counselorType ? counselorType : "",
      user_type: studentType ? studentType : "",
    };
    UserService.addSurvay(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ success: true });
            showNotification("success", resp.data.message);
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  render() {
    const {
      email,
      showCounselor,
      role,
      schoolDistrict,
      studentType,
      counselorType,
      fullName,
      submitted,
    } = this.state;
    return (
      <section className="sign-up-area ptb-100 mt-3">
        <div className="shape shape-1">
          <img src="/assets/img/shape/1.png" alt="Shape" />
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
        <div className="container innerarea">
          <div className="row">
            <div className="col-md-6">
              <div className="survay full-width pl-4 pr-4 pt-5 pb-5">
                <div className="form-heading text-center">
                  <h2 className="form-title mb-3">
                    Please let us know more about youself!
                  </h2>
                  <br />
                </div>
                <form onSubmit={(e) => this.submitHandler(e)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mb-4">
                        <label>*Who are you?</label>
                        <br />
                        <span>
                          <input
                            type="radio"
                            name="role"
                            value="student"
                            onClick={() => {
                              this.setState({
                                showCounselor: false,
                              });
                            }}
                            onChange={(e) => this.formHandler(e)}
                          />{" "}
                          Student
                        </span>
                        <br />
                        <span>
                          <input
                            type="radio"
                            name="role"
                            value="parent"
                            onClick={() => {
                              this.setState({
                                showCounselor: false,
                              });
                            }}
                            onChange={(e) => this.formHandler(e)}
                          />{" "}
                          Parent
                        </span>
                        <br />
                        <span>
                          <input
                            type="radio"
                            name="role"
                            value="counselor"
                            onClick={() => {
                              this.setState({
                                showCounselor: true,
                              });
                            }}
                            onChange={(e) => this.formHandler(e)}
                          />{" "}
                          Counselor
                        </span>
                        <br />

                        {role == "" && submitted ? (
                          <span className="text-danger">Please choose</span>
                        ) : (
                          ""
                        )}
                      </div>
                      {showCounselor == true ? (
                        <div>
                          <div className="form-group mb-4">
                            <label>*Please indicate School District</label>
                            <input
                              className="form-control"
                              type="text"
                              name="schoolDistrict"
                              onChange={(e) => this.formHandler(e)}
                              value={schoolDistrict}
                            />
                            {schoolDistrict == "" &&
                            submitted &&
                            showCounselor ? (
                              <span className="text-danger">Please fill</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <hr />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-4">
                        <label>*Select if you are a student/Parent</label>
                        <br />
                        <span>
                          <input
                            type="radio"
                            name="studentType"
                            value="senior"
                            onChange={(e) => this.formHandler(e)}
                          />{" "}
                          Rising Senior
                        </span>
                        <br />
                        <span>
                          <input
                            type="radio"
                            name="studentType"
                            value="junior"
                            onChange={(e) => this.formHandler(e)}
                          />{" "}
                          Rising Junior
                        </span>
                        <br />
                        {studentType == "" && submitted ? (
                          <span className="text-danger">Please choose</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                      <div className="form-group mb-4">
                        <label>
                          {showCounselor ? "*" : ""}
                          If you are a counselor, please select one of three
                          options.
                        </label>
                        <select
                          name="counselorType"
                          onChange={(e) => this.formHandler(e)}
                          className="form-control"
                          value={counselorType}
                          disabled={!showCounselor}
                        >
                          <option>How many students</option>
                          <option value="lessThan20">less than 20</option>
                          <option value="20-50">20-50</option>
                          <option value="moreThan50">more than 50 </option>
                        </select>
                        {counselorType == "" && submitted && showCounselor ? (
                          <span className="text-danger">Please select</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label>*Full Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => this.formHandler(e)}
                        />
                        {fullName == "" && submitted ? (
                          <span className="text-danger">Please enter name</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label>*Email Address</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Your Email Address"
                          value={email}
                          onChange={(e) => this.formHandler(e)}
                          pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                          title="Please include ."
                        />
                        {email == "" && submitted ? (
                          <span className="text-danger">
                            Please enter email
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="col-12 mt-3 text-center">
                      <button
                        className="default-btn btn-lg btn-block"
                        type="submit"
                      >
                        Keep me updated!
                      </button>
                    </div>
                    <br />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="sidebox">
                <img
                  src={base + "/assets/img/banner.webp"}
                  className="full-width"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
