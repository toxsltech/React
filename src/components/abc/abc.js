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
import RightSidebar from "../../components/right-sidebar/right-sidebar"

// import * as session from "../../utils/session";
// import { confirmAlert } from "react-confirm-alert";
// import * as constant from "../../globals/constant";
// import history from "../../history";
// import apibase from "../../globals/config";

export default class Abc extends React.Component {
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
      <div>
        <Header />


        <div className="conatiner-fluid">
          <div className="row m-0">
            <div className="col-md-9 p-0">
              <div className="youzer">
                <header id="yz-profile-header" className="yz-profile-header yz-hdr-v2 yz-header-overlay">
                  <div className="yz-header-cover"
                    style={{
                      "background-image": "url(" + "https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg" + ")",
                      "background-size": "cover"
                    }}
                  // style="background-image: url(&quot;https://olympus.crumina.net/wp-content/uploads/buddypress/members/1/cover-image/5c220b12b44cd-bp-cover-image.jpg&quot;); background-size: cover;"
                  >
                    <div className="yz-cover-content">
                      <div className="yz-profile-photo yz-photo-circle yz-photo-border"><a href="#" className="yz-profile-img"><img src="https://olympus.crumina.net/wp-content/uploads/avatars/1/5c24a6689aa5b-bpfull.jpg" className="avatar user-1-avatar avatar-150 photo" alt="Profile Photo" /></a></div>
                      <div className="yz-inner-content">
                        <div className="yz-name">
                          <h2>John Smith<i className="fa fa-check-circle yz-account-verified yz-big-verified-icon"></i></h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="yz-header-content">
                    <div className="yz-user-statistics yz-statistics-bg">
                      <ul>
                        <li>
                          <h3 className="yz-sdescription"><img src="/assets/img/gpa.png" />&nbsp;GPA</h3>
                        </li>
                        <li>
                          <a href="#">
                            <h3 className="yz-sdescription mb-0"><img src="/assets/img/chat.png" />&nbsp;Send Message</h3>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </header>
              </div>
              <div className="profile-section pt-5 pb-5">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3 pl-0 pr-0 collapse width show" id="sidebar">
                      <div className="list-group border-0 text-center text-md-left accordion" id="exampleAccordion">
                        <div id="exItem1Header"><a className="list-group-item d-inline-block collapsed" data-toggle="collapse" data-target="#exItem1" aria-expanded="false" aria-controls="exItem1" href="/student/"><img src="/assets/img/profile.png" /> <span className="d-none d-md-inline">Profile</span> </a></div>
                        <div id="exItem1" className="collapse show" aria-labelledby="exItem1Header" data-parent="#exampleAccordion" aria-expanded="false"><a className="list-group-item active" role="tab" data-toggle="tab" href="/student/">Get to know me </a><a href="#demo" className="list-group-item">Demographics </a><a className="list-group-item" role="tab" href="/student/grades">Grades</a><a className="list-group-item" role="tab" href="/student/test-score">Test Scores</a></div>
                        <div id="exItem2Header"><a className="list-group-item d-inline-block collapsed" data-target="#exItem2" aria-expanded="false" aria-controls="exItem2" href="/student/college-applied"><img src="/assets/img/collage.png" /> <span className="d-none d-md-inline">Colleges Applied</span></a></div>
                        <div id="exItem3Header"><a className="list-group-item d-inline-block collapsed" data-target="#exItem3" aria-expanded="false" aria-controls="exItem3" href="/student/portfolio"><img src="/assets/img/portfolio.png" /> <span className="d-none d-md-inline">Portfolio</span></a></div>
                        <div id="exItem3" className="collapse" aria-labelledby="exItem3Header" data-parent="#exampleAccordion"><a href="#" className="list-group-item" data-parent="#exItem3">Drawing</a><a href="#" className="list-group-item" data-parent="#exItem3">Painting</a><a href="#" className="list-group-item" data-parent="#exItem3">Sketches</a><a href="#" className="list-group-item" data-parent="#exItem3">MixMedia</a></div>
                        <div id="exItem3Header"><a className="list-group-item d-inline-block collapsed" data-target="#exItem4" aria-expanded="false" aria-controls="exItem4" href="/student/extra-curricular"><img src="/assets/img/extra.png" /> <span className="d-none d-md-inline">Extracurricular</span></a></div>
                        <div id="exItem4" className="collapse" aria-labelledby="exItem3Header" data-parent="#exampleAccordion"><a className="list-group-item" data-parent="#exItem4">Sports &amp; Recreation</a><a className="list-group-item" data-parent="#exItem4">Academic Competitions</a><a className="list-group-item" data-parent="#exItem4">Music &amp; Performing</a><a className="list-group-item" data-parent="#exItem4">Arts</a><a className="list-group-item" data-parent="#exItem4">Voluntering</a><a className="list-group-item" data-parent="#exItem4">Speech</a><a className="list-group-item" data-parent="#exItem4">Social Studies</a></div>
                        <a href="counsellor.php" className="list-group-item d-inline-block collapsed"><img src="/assets/img/consurn.png" /> <span className="d-none d-md-inline">Counselor</span></a><a href="#exItem4" className="list-group-item d-inline-block collapsed" data-toggle="collapse" aria-expanded="false"><img src="/assets/img/teacher.png" /> <span className="d-none d-md-inline">Teacher</span></a>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tab-content">
                        <div className="tab-pane active" id="get">
                          <div className="card">
                            <div className="card-header">
                              <h4>Activites</h4>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-striped middlealign">

                                  <tr>
                                    <td> <div className="d-flex"><h6><input className="checkbox" type="checkbox" /> &nbsp; Activity Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm default-btn blue">Save</a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>
                                  <tr>
                                    <td> <div className="d-flex"><h6><input className="checkbox" type="checkbox" /> &nbsp; Activity Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm default-btn blue">Save</a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>
                                  <tr>
                                    <td> <div className="d-flex"><h6><input className="checkbox" type="checkbox" /> &nbsp; Activity Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm default-btn blue">Save</a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>
                                  <tr>
                                    <td> <div className="d-flex"><h6><input className="checkbox" type="checkbox" /> &nbsp; Activity Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm default-btn blue">Save</a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>


                                </table>
                              </div>
                            </div>
                          </div>


                          <div className="card">
                            <div className="card-header">
                              <h4>Letter of Recommendation</h4>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-striped middlealign">
                                  <tr>
                                    <td><input className="form-control small-width" placeholder="Enter Subject" type="text" /></td>
                                    <td> <input className="form-control small-width" placeholder="Enter Teacher Name" type="text" /></td>
                                    <td><a href="#" className="btn btn-sm default-btn pink">Add</a></td> </tr>

                                  <tr>
                                    <td> <div className="d-flex"><h6>Subject Name</h6></div></td>
                                    <td> <div className="d-flex"><h6>Teacher Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm btn-info blue"><i className="fa fa-pencil"></i></a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>
                                  <tr>
                                    <td> <div className="d-flex"><h6>Subject Name</h6></div></td>
                                    <td> <div className="d-flex"><h6>Teacher Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm btn-info blue"><i className="fa fa-pencil"></i></a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>

                                  <tr>
                                    <td> <div className="d-flex"><h6>Subject Name</h6></div></td>
                                    <td> <div className="d-flex"><h6>Teacher Name</h6></div></td>
                                    <td><a href="#" className="btn btn-sm btn-info blue"><i className="fa fa-pencil"></i></a>&nbsp;<a href="#" className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></a></td>
                                  </tr>

                                </table>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header">
                              <h4>Essays</h4>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-12">
                                  <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-body">
                                      <div className="mt-3">
                                        <h5>Title here</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        <p className="text-dark"><i className="fa fa-clock-o"></i>&nbsp; 40:00 Mins Left</p>
                                      </div>
                                      <div className="mt-3">
                                        <div className="comment-text">
                                          <textarea type="text" className="form-control rounded" />
                                        </div>
                                        <div className="mt-3 d-flex">
                                          <a href="javascript:void();" className="default-btn">Submit</a></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-12">
                                  <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-body">
                                      <div className="mt-3">
                                        <h5>Title here</h5>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                        <p className="text-dark"><i className="fa fa-clock-o"></i>&nbsp; 40:00 Mins Left</p>
                                      </div>
                                      <div className="mt-3">
                                        <div className="comment-text">
                                          <div className="form-control rounded autoheight">
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p><p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RightSidebar />
          </div>
        </div>

      </div>
    );
  }
}
