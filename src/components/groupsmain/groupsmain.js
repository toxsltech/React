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

export default class Groups extends React.Component {
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

                <div class="modal" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Create Post</h4>
                                <button type="button" class="close" data-dismiss="modal">×</button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="sel1">Post Title</label>
                                            <input class="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="sel1">Description</label>
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">

                                <button type="button" class="default-btn bg-danger" >Post</button>
                            </div>
                        </div>
                    </div>
                </div>


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
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex align-content-between justify-content-between">
                                                        <h4 class="mb-4  ">Group Name</h4>
                                                        <span>
                                                            <a href="#myModal" data-toggle="modal" data-target="#myModal" class="default-btn">
                                                                <i class="fa fa-plus mr-2"></i>Create Post</a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                                            <div class="iq-card-body">
                                                                <div class="user-post-data">
                                                                    <div class="d-flex flex-wrap">
                                                                        <div class="media-support-user-img mr-3">
                                                                            <img class="rounded-circle img-fluid" src="assets/img/03.jpg" alt="" />
                                                                        </div>
                                                                        <div class="media-support-info mt-2">
                                                                            <h5 class="mb-0 d-inline-block"><a href="#" class="">Barb Ackue</a></h5>

                                                                            <p class="mb-0 text-primary">1 hour ago</p>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div class="mt-3">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                                                </div>
                                                                <hr />
                                                                <div class="d-flex justify-content-between align-items-center">
                                                                    <div class="like-block position-relative d-flex align-items-center">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="like-data">
                                                                                <div class="dropdown">
                                                                                    <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                        <img src="assets/img/01.png" class="img-fluid" alt="" />
                                                                                    </span>
                                                                                    <div class="dropdown-menu">
                                                                                        <a class="ml-2 mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Like"><img src="assets/img/01.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Love"><img src="assets/img/02.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Happy"><img src="assets/img/03.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="HaHa"><img src="assets/img/04.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Think"><img src="assets/img/05.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sade"><img src="assets/img/06.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lovely"><img src="assets/img/07.png" class="img-fluid" alt="" /></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="total-like-block ml-2 mr-3">
                                                                                <div class="dropdown">
                                                                                    <a href="javascript:void();">
                                                                                        <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            140 Likes
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="comment-area mt-3">
                                                                    <form class="comment-text d-flex align-items-center" action="javascript:void(0);">
                                                                        <input type="text" class="form-control rounded" />
                                                                        <div class="comment-attagement d-flex">
                                                                            <a href="javascript:void();" class="default-btn btn_reply">Reply</a></div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="col-sm-12">
                                                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                                            <div class="iq-card-body">
                                                                <div class="user-post-data">
                                                                    <div class="d-flex flex-wrap">
                                                                        <div class="media-support-user-img mr-3">
                                                                            <img class="rounded-circle img-fluid" src="assets/img/03.jpg" alt="" />
                                                                        </div>
                                                                        <div class="media-support-info mt-2">
                                                                            <h5 class="mb-0 d-inline-block"><a href="#" class="">Barb Ackue</a></h5>

                                                                            <p class="mb-0 text-primary">1 hour ago</p>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div class="mt-3">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                                                </div>
                                                                <hr />
                                                                <div class="d-flex justify-content-between align-items-center">
                                                                    <div class="like-block position-relative d-flex align-items-center">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="like-data">
                                                                                <div class="dropdown">
                                                                                    <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                        <img src="assets/img/01.png" class="img-fluid" alt="" />
                                                                                    </span>
                                                                                    <div class="dropdown-menu">
                                                                                        <a class="ml-2 mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Like"><img src="assets/img/01.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Love"><img src="assets/img/02.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Happy"><img src="assets/img/03.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="HaHa"><img src="assets/img/04.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Think"><img src="assets/img/05.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sade"><img src="assets/img/06.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lovely"><img src="assets/img/07.png" class="img-fluid" alt="" /></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="total-like-block ml-2 mr-3">
                                                                                <div class="dropdown">
                                                                                    <a href="javascript:void();">
                                                                                        <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            140 Likes
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="comment-area mt-3">
                                                                    <form class="comment-text d-flex align-items-center" action="javascript:void(0);">
                                                                        <input type="text" class="form-control rounded" />
                                                                        <div class="comment-attagement d-flex">
                                                                            <a href="javascript:void();" class="default-btn btn_reply">Reply</a></div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                                            <div class="iq-card-body">
                                                                <div class="user-post-data">
                                                                    <div class="d-flex flex-wrap">
                                                                        <div class="media-support-user-img mr-3">
                                                                            <img class="rounded-circle img-fluid" src="assets/img/03.jpg" alt="" />
                                                                        </div>
                                                                        <div class="media-support-info mt-2">
                                                                            <h5 class="mb-0 d-inline-block"><a href="#" class="">Barb Ackue</a></h5>

                                                                            <p class="mb-0 text-primary">1 hour ago</p>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div class="mt-3">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus</p>
                                                                </div>
                                                                <hr />
                                                                <div class="d-flex justify-content-between align-items-center">
                                                                    <div class="like-block position-relative d-flex align-items-center">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="like-data">
                                                                                <div class="dropdown">
                                                                                    <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                        <img src="assets/img/01.png" class="img-fluid" alt="" />
                                                                                    </span>
                                                                                    <div class="dropdown-menu">
                                                                                        <a class="ml-2 mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Like"><img src="assets/img/01.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Love"><img src="assets/img/02.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Happy"><img src="assets/img/03.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="HaHa"><img src="assets/img/04.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Think"><img src="assets/img/05.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Sade"><img src="assets/img/06.png" class="img-fluid" alt="" /></a>
                                                                                        <a class="mr-2" href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lovely"><img src="assets/img/07.png" class="img-fluid" alt="" /></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="total-like-block ml-2 mr-3">
                                                                                <div class="dropdown">
                                                                                    <a href="javascript:void();">
                                                                                        <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                                                            140 Likes
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="comment-area mt-3">
                                                                    <form class="comment-text d-flex align-items-center" action="javascript:void(0);">
                                                                        <input type="text" class="form-control rounded" />
                                                                        <div class="comment-attagement d-flex">
                                                                            <a href="javascript:void();" class="default-btn btn_reply">Reply</a></div>
                                                                    </form>
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
