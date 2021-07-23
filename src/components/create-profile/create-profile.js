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
import apibase from "../../globals/config";
import ReactPaginate from "react-paginate";

let serveUrl = apibase;

export default class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      gender: "",
      firstName: "",
      lastName: "",
      profileImg: "",
      imgSelected: base + "/assets/img/user.jpg",
      submitted: false,
      create_profile: "",
      loading: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    this.setState({ loading: true });
    if (session.getToken()) {
      UserService.getUserDetail()
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.setState(
                {
                  userDetail: response.data,
                  firstName: response.data.first_name,
                  lastName: response.data.last_name,
                  loading: false,
                  create_profile: response.create_profile,
                },
                () => {
                  if (this.state.create_profile) {
                    this.props.history.push("/");
                  } else {
                    this.setState({ loading: false });
                  }
                }
              );
            }
          }
        })
        .catch((err) => {
          // showNotification("danger", constant.ERRORMSG);
        });
    } else {
      this.props.history.push("/");
    }
  };
  formHandler = (e) => {
    this.setState({ submitted: false });
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  imageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ profileImg: event.target.files[0] });
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ imgSelected: event.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      bio,
      gender,
      name,
      profileImg,
      imgSelected,
      firstName,
      lastName,
    } = this.state;
    if (gender == "" || firstName == "" || lastName == "" || profileImg == "") {
      return;
    }

    const formData = new FormData();
    formData.append("gender", gender ? gender : "");
    formData.append("bio_description", bio ? bio : "");
    formData.append("first_name", firstName ? firstName : "");
    formData.append("last_name", lastName ? lastName : "");
    formData.append("image", profileImg ? profileImg : "");

    UserService.updateProfile(formData)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            session.setUser(JSON.stringify(response.data));
            this.props.history.push("/home");
          }
        }
      })
      .catch((err) => {
        // showNotification("danger", constant.ERRORMSG);
      });
  };
  render() {
    const {
      bio,
      gender,
      firstName,
      lastName,
      profileImg,
      imgSelected,
      submitted,
      loading,
    } = this.state;
    return (
      <div>
        {" "}
        <div className="page-title-area item-bg-1">
          <div className="container">
            <div className="page-title-content">
              <h2>Create Profile</h2>
              <ul>
                <li>
                  <a>
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
              <div className="col-md-7 mx-auto">
                <div className="multi-step-form">
                  <div className="steps">
                    <button className="active" type="button" disabled>
                      Personal Details
                    </button>
                  </div>
                  <br />
                  <form onSubmit={(e) => this.submitHandler(e)}>
                    <fieldset aria-label="Step One" tabIndex="-1" id="step-1">
                      <h2>Add Personal Details</h2>
                      <div className="avatar-upload1">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                            name="profileImg"
                            onChange={(e) => {
                              this.imageHandler(e);
                            }}
                          />
                          <label htmlFor="imageUpload"></label>
                        </div>
                        <div className="avatar-preview">
                          <div
                            // style={{
                            //   "background-image":
                            //     "url(" + profileImg && !imgSelected
                            //       ? serveUrl + profileImg
                            //       : imgSelected
                            //       ? imgSelected
                            //       : base + "/assets/img/team/7.jpg" + ")",
                            // }}
                            style={{
                              "backgroundImage": "url(" + imgSelected + ")",
                            }}
                          ></div>
                        </div>

                        {profileImg == "" && submitted ? (
                          <span className="text-danger">
                            Please choose profile picture
                          </span>
                        ) : (
                            ""
                          )}
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              value={firstName}
                              id="first-name"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {firstName == "" && submitted ? (
                              <span className="text-danger">
                                Please fill first Name
                              </span>
                            ) : (
                                ""
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="first-name">Last Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              value={lastName}
                              id="first-name"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {lastName == "" && submitted ? (
                              <span className="text-danger">
                                Please fill last name
                              </span>
                            ) : (
                                ""
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender" className="mr-3">
                          Gender
                        </label>
                        <span>
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          Male
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          Female
                        </span>
                        {gender == "" && submitted ? (
                          <span className="text-danger">
                            Please choose gender
                          </span>
                        ) : (
                            ""
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="description ">Add Bio </label>
                        <textarea
                          className="form-control"
                          name="bio"
                          value={bio}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        ></textarea>
                      </div>

                      <p>
                        <button className="default-btn" type="submit">
                          Submit
                        </button>
                      </p>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <div className="preloader">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}
