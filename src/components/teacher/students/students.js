/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
import apibase from "../../../globals/config";
import base from "../../../globals/base";
import Paginate from "../../pagination/pagination";

let serveUrl = apibase;

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentArray: [],
      searchStudent: "",
      loading: false,
      limit: "9",
      count: null,
      totalCount: "",
    };
  }

  formHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  UNSAFE_componentWillMount = () => {
    const { limit } = this.state;
    this.getStudents(limit);
  };

  getStudents = (limit, offset, filter) => {
    let limit1 = limit ? limit : "9";
    UserService.getNewStudentLeft(limit1, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({
              studentArray: response.data.students,
              count: response.data.students.length,
              totalCount: response.data.count,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  
  searchHandler = (e) => {
    const { name, value } = e.target;
    const { limit } = this.state;
    this.setState({ [name]: value });
    this.getStudents(limit, "", value);
  };
  handlePageChange = (data) => {
    const { limit } = this.state;
    let selected = data.selected;
    this.setState({ showingPageNo: selected });
    this.getStudents(limit, selected);
  };
  viewProfile = (id) => {
    let data = {
      view: "Student",
      studentId: id,
    };
    this.props.callback(data);
  };

  addStudent = (id)=>{
    UserService.updateStudentList({student_id:id}).then(response=>{
      response = response.data;
      if(response.success){
        this.getStudents(); 
        showNotification('success', response.message);
      }
    })
  }

  render() {
    const { studentArray, searchStudent, totalCount } = this.state;
    return (
      <div>
        <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-12 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">All Students List</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/students'} className="breadcrumb-item text-muted active">Students List</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">
              Students List{" "}
              <span className="float-right">
                <div className="ui left icon input swdh10">
                  <input
                    className="prompt srch10"
                    type="text"
                    placeholder="Search name or email..."
                    name="searchStudent"
                    value={searchStudent}
                    onChange={(e) => this.searchHandler(e)}
                  />
                  <i className="fa fa-search icon icon1"></i>
                </div>
              </span>
            </h4>
          </div>
        </div>
        <div className="row">
          {studentArray.length
            ? studentArray.map((data, index) => (
                <div key={index} className="col-md-6 col-xl-4">
                  <div className="iq-card">
                    <div className="iq-card-body profile-page p-0">
                      <div className="profile-header-image">
                        <div className="profile-info p-4">
                          <div className="user-detail">
                            <div className="d-flex flex-wrap justify-content-between align-items-start">
                              <div className="profile-detail text-center">
                                <div className="profile-img">
                                  <img
                                    src={serveUrl + "/" + data.profile_img}
                                    alt="profile-img"
                                    className="avatar-110 img-fluid"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        base + "/assets/img/user.jpg";
                                    }}
                                  />
                                </div>
                                <div className="user-data-block">
                                <div className="hover-icon relativeicon" title="Add Student" onClick={()=>this.addStudent(data._id)}><a><i className="fa fa-plus"></i></a></div>
                                  <h4 className="">
                                    {data.first_name? data.first_name.charAt().toUpperCase()+
                                      data.first_name.slice(1).substring(0,5)+
                                      " ":'' +
                                      data.last_name.charAt().toUpperCase() +
                                      data.last_name.slice(1).substring(0,5)}
                                  </h4>
                                  <Link
                                    to={"/home/" + data._id}
                                    onClick={() => this.viewProfile(data._id)}
                                    className="default-btn"
                                  >
                                    View Profile
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
          {totalCount > 9 ? (
            <Paginate
              page={totalCount ? (totalCount < 9 ? 1 : totalCount / 9) : ""}
              handlePageClick={(data) => this.handlePageChange(data)}
              forcepage={this.state.showingPageNo - 1}
            />
          ) : (
            ""
          )}
      </div>
    );
  }
}
