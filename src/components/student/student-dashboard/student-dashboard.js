/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React from "react";
import { Route, Switch } from "react-router-dom";
import history from "../../../history";
import * as Session from "../../../utils/session";
import StudentLeftSidebar from "../student-left-sidebar/student-left-sidebar";
import base from "../../../globals/base";
import { ROUTES } from "../../../globals/constant";
import apibase from "../../../globals/config";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";

let serveUrl = apibase;

export default class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Session.getUser(),
      role: null,
      loaded: false,
      cover_image: "",
      profile_img: "",
      user_view: false,
    };
  }

  componentWillMount = () => {
    this.setState({
      View: this.props.siteView,
    });
    let token = Session.getToken();
    if (token) {
      this.setState({
        token,
        role: jwt(token).role,
        loaded: true,
      });
      this.loadUserDetails();
    } else {
      this.setState({ loaded: true });
    }
    if (this.props.match.params.id) {
      this.setState({ View: "special" });
    }
  };

  parentCall = () => {
    if (this.props.match.params.id) {
      this.setState({ View: "special" });
      this.getSpecificUser(this.props.match.params.id);
    }
  };
  getSpecificUser = (id) => {
    this.setState({ loading: true });
    UserService.getSpecificUser(id)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({
              user: response.data,
              loading: false,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  loadUserDetails = () => {
    UserService.getProfile()
      .then((response) => {
        if (response.data.success) {
          this.setState({
            cover_image: response.data.data.cover_image
              ? serveUrl + "/" + response.data.data.cover_image
              : "https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg",
            profile_img: response.data.data.profile_img
              ? serveUrl + "/" + response.data.data.profile_img
              : "https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg",
          });
        }
      })
      .catch((err) => {
        showNotification("success", err ? err : constant.ERRORMSG);
      });
  };

  imgaeGetFromProps = (image) => {
    this.setState({
      profile_img: image
        ? serveUrl + "/" + image
        : "https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg",
    });
  };
  coverimgaeGetFromProps = (image) => {
    this.setState({
      cover_image: image
        ? serveUrl + "/" + image
        : "https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg",
    });
  };

  callNotify = (data) => {
    if (data != this.state.user_view) {
      this.setState({ user_view: data });
    }
    this.props.recallNotify(true);
  };

  render() {
    const { user, role, loaded, cover_image, profile_img } = this.state;
    return (
      <div className="col-xl-9 col-lg-8 p-0">
        <div className="youzer">
          <header
            id="yz-profile-header"
            className="yz-profile-header yz-hdr-v2 yz-header-overlay"
          >
            <div
              className="yz-header-cover"
              style={{
                backgroundImage: "url(" + cover_image + ")",
                backgroundSize: "cover",
              }}
            >
              <div className="yz-cover-content">
                <div className="yz-profile-photo yz-photo-circle yz-photo-border">
                  <a className="yz-profile-img">
                    <img
                      src={
                        profile_img
                          ? profile_img
                          : base + "/assets/img/user.jpg"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = base + "/assets/img/user.jpg";
                      }}
                      className="avatar user-1-avatar avatar-150 photo"
                      alt="Profile Photo"
                    />
                  </a>
                </div>
                <div className="yz-inner-content">
                  <div className="yz-name">
                    <h2>
                      {user && user.first_name ? user.first_name : "User"}
                      {user && user.first_name && user.last_name
                        ? " " + user.last_name
                        : ""}
                      <i className="fa fa-check-circle yz-account-verified yz-big-verified-icon"></i>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="yz-header-content">
              <div className="yz-user-statistics yz-statistics-bg">
                <ul>
                  {/* <li>
                    <h3 className="yz-sdescription">
                      <img src={base + "/assets/img/gpa.png"} />
                      &nbsp;GPA
                    </h3>
                  </li> */}

                  <li>
                    <Link
                      to="/home/chat"
                      className="default-btn custom-padding-button"
                    >
                      <h3 className="yz-sdescription m-0 ">
                        <img src={base + "/assets/img/chat.png"} />
                        &nbsp;Send Message
                      </h3>
                    </Link>
                  </li>
                  {/* <li>
                    <a
                      href="#editMilesto"
                      data-toggle="modal"
                      data-target="#editMilesto"
                      className="plus-icon"
                      className="default-btn custom-padding-button"
                    >
                      <h3 className="yz-sdescription m-0 ">
                        <img src={base + "/assets/img/chat.png"} />
                        &nbsp;Send Invites
                      </h3>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </header>
        </div>

        <div className="modal" id="editMilesto">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Send Invite</h4>

                <button
                  type="button"
                  className="close"
                  id="closemodel"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>User Name</h3>
                        <input
                          className="form-control"
                          type="text"
                          name="mileStone"
                          placeholder="Enter User Name"

                          // onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <h3>Email </h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="mileStone"
                          // value={mileStone}
                          placeholder="Enter Friend's Email "
                          // onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <h3></h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <p>
                          "Hey ! Have I told you about Unekey yet? Its the
                          smartest way to organize your college applications.
                          And if you are a teacher or a counselor, that's even
                          better ! You can guide the students and help them
                          choose the right college. Join now for free !"
                        </p>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="d-flex flex-wrap justify-content-end">
                    <button
                      type="button"
                      className="default-btn mr-2"
                      data-dismiss="modal"
                      // onClick={this.updateSingleEvent}
                    >
                      Send Invite
                    </button>{" "}
                  </div>
                  &nbsp;
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="profile-section pt-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <StudentLeftSidebar
                siteView={this.props.siteView}
                studentId={this.props.studentId}
                callback={(data) => this.props.callback(data)}
              />

              <div className="col-md-9 col-77">
                <div className="tab-content">
                  <Route history={history}>
                    <Switch>
                      {loaded
                        ? ROUTES.map((data, index) =>
                            data.role.includes(role) ? (
                              <Route
                                key={index}
                                path={data.path}
                                render={(props) => (
                                  <data.component
                                    key={index}
                                    callback={(data) =>
                                      this.props.callback(data)
                                    }
                                    siteView={this.props.siteView}
                                    studentId={this.props.studentId}
                                    imgaeGetFromProps={this.imgaeGetFromProps}
                                    coverimgaeGetFromProps={
                                      this.coverimgaeGetFromProps
                                    }
                                    isView={this.callNotify}
                                    result={this.user_view}
                                    // test={()=>this.test()}
                                    {...props}
                                  />
                                )}
                                // component={data.component}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </Switch>
                  </Route>
                  <div className="tab-pane fade" id="get">
                    <div className="card">
                      <div className="card-body">
                        <div className="row biography">
                          <div className="col-md-6">
                            <div className="float-left">
                              <img src=" assets/img/user.svg" />
                            </div>
                            <div className="userinfo-main">
                              <h5 className="mb-2">Full Name</h5>
                              <p className="text-muted">Michael V. Buttars</p>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="float-left">
                              <img src=" assets/img/email.png" />
                            </div>
                            <div className="userinfo-main">
                              <h5 className="mb-2">Email</h5>
                              <p className="text-muted">
                                michaelvbuttars@example.com
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="aboutme-profile mt-4">
                      <div className="card">
                        <div className="page-title card-header d-flex align-items-center">
                          <h5>About Me</h5>
                          <button className="default-btn ml-auto editinfo">
                            <i className="fa fa-pencil"></i>
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="editdescription">
                            <div className="form-group">
                              <label>Add bio</label>
                              <textarea
                                className="form-control"
                                placeholder="Hello I am Michael V. Buttars .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                              ></textarea>
                            </div>
                            <a
                              href="#"
                              className="default-btn savebtn"
                              style={{ display: "none" }}
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="grades">
                    <div className="card">
                      <div className="page-title card-header">
                        <h5>Grades and Course </h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <b>GPA</b>
                            <a href="#" className="float-right">
                              A+
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>AP/IB</b>
                            <a href="#" className="float-right">
                              AP
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>Sbjects</b>
                            <span className="float-right">
                              {" "}
                              <ul className="clinic-gallery listdata">
                                <li>
                                  <a href="#">Maths</a>
                                </li>
                                <li>
                                  <a href="#">Maths</a>
                                </li>
                                <li>
                                  <a href="#">Maths</a>
                                </li>
                                <li>
                                  <a href="#">Maths</a>
                                </li>
                              </ul>
                            </span>
                          </li>
                          <li className="list-group-item">
                            <b>Honors</b>
                            <a href="#" className="float-right">
                              Loreum Ipsum
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>SAT Scores</b>
                            <a href="#" className="float-right">
                              70%
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>ACT Scores</b>
                            <a href="#" className="float-right">
                              85%
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>AP Exams</b>
                            <a href="#" className="float-right">
                              Loreum Ipsum
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
