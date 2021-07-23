/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import * as session from "../../../utils/session";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
import history from "../../../history";
import Paginate from "../../pagination/pagination";
import Switch from "react-switch";

export default class TeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      role: "5",
      password: "",
      email: "",
      emailid:"",
      username:"",
      confirmPassword: "",
      submitted: false,
      errorConfirmPassword: "",
      errorPassword: "",
      errorEmail: "",
      userLists: [],
      page: 1,
      limit: 10,
      search: "",
      totalCount: 0,
      showingPageNo: 1,
      userDetails: "",
      offset:0
    };
  }

  UNSAFE_componentWillMount = () => {
    this.getUserList('',this.state.limit,0);
  };

  getUserList = (search, limit, offset) => {
    
    limit = this.state.limit ? this.state.limit : "10";
    offset = offset?offset:0
    UserService.teacherList(search, limit, offset).then((resp) => {
      if (resp) {
        resp = resp.data;
        if (resp.success) {
          this.setState({
            userLists: resp.data.data,
            totalCount: resp.data.count,
          });
        }
      }
    });
  };


  resetModal = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      emailid:"",username:"",
      confirmPassword: "",
      submitted:false
    });
  };


  handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.getUserList(value, 10, 0);
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    this.setState({ offset: selected });
    this.getUserList(this.state.search, 10, selected);
  };

  editUserDetails = (id) => {
    this.props.history.push(`/admin/edit-teacher/${id}`);
  };

  viewDetails = (data) => {
    this.setState({ userDetails: data });
  };

  handleChange =    (checked, id) => {
    UserService.updateStatus({ is_active: checked }, id)
      .then((response) => {
        if (response?.data?.success) {
          // showNotification("success", response.data.message);
          this.getUserList(this.state.search,this.state.limit,this.state.offset);
        }
      })
      .catch((err) => {
        // showNotification("danger", constant.ERRORMSG);
      });
  };

  submitHandle = () => {
    if(!this.state.username ){
      showNotification("danger", "please fill username.");
      return;
    }
    if(!this.state.emailid ){
      showNotification("danger", "please select emailid");
      return;}
   
   const{ username,emailid}=this.state
  
   var obj = {
    username:username,
    email:emailid,
   }
    
     UserService.sendInvite(obj).then((resp) => {
      
      if (resp.data && resp.data.success) {
        
        // showNotification("success", resp.data.message);
        document.getElementById("closemodel").click();
        this.setState({emailid:"",
       username:""
        })
      }else{
        // showNotification("danger", resp.data.message);
      }
     
    }); 
  };
  handle=(e)=>
  {
    const {name,value} = e.target
    this.setState({
      [name]:value
    });
  }
  

  formHandler = (e) => {
    
    this.setState({ submitted: false 
    });
    

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
      confirmPassword,emailid,username,
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
    UserService.signTeacher(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            // showNotification("success", "Teacher added successfully");
            
            document.getElementById("editMilestone").click();
            this.getUserList('',this.state.limit,0);
            
            this.resetModal();
          }
        }
      })
      .catch((err) => {
        // showNotification("danger", constant.ERRORMSG);
      });
  };




  render() {
    const { userLists, totalCount, userDetails ,messaageCount,
      data,
      role,
      firstName,
      lastName,
      password,
      email, emailid,
      username,
      confirmPassword,
      submitted,
      errorConfirmPassword,
      errorPassword,
      errorEmail,} = this.state;
    return (
      <div>
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4> Teacher List</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/admin/teacher-list">teacherList</Link>
                  </li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div
                    id="list-view"
                    className="tab-pane fade active show col-lg-12"    >
                   
                
                   <div className="card">
                <div className="card-header w-100">
                        <h4 className="card-title w-100">
                        
                        <div className="float-right">
                        <a className="btn btn-primary mr-2"
                            data-toggle="modal"
                            title="Send Invite"
                            data-target="#editMilesto"
                            onClick={() => {
                              this.resetModal();
                            }} >
                           Send Invite
                          </a>
                        <a className="btn btn-primary"
                            data-toggle="modal"
                            title="Add New Teacher"
                            data-target="#editMilestone"
                            onClick={() => {
                              this.resetModal();
                            }}
                          >
                            Add New Teacher
                          </a>
                          </div>
                          </h4>
                      </div>      
                       <div className="card-body">
                         <div className="row">

                          <div className="col-lg-4">
                            <div className="form-group">
                              
                              <input 
                                placeholder="Search" 
                                type="text" 
                                name="search"
                                className="form-control" 
                                value={this.state.search} 
                                onChange={this.handleSearch}
                                style={{height:'38px'}}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                          </div>
                          <div className="col-lg-4"></div>
                        </div>
                        <div className="table-responsive">
                          <table
                            id="example3"
                            className="table table-striped table-responsive-sm"
                          >
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Activate/Deactivate</th>
                                <th>Action</th>
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
                                  {record?.is_active}
                                  <td>
                                    <Switch
                                      onChange={(e) =>
                                        this.handleChange(e, record._id)
                                      }
                                      checked={record?.is_active}
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <a
                                      data-toggle="modal"
                                      data-target="#myModal"
                                      onClick={(e) => this.viewDetails(record)}
                                      className="btn btn-sm btn-primary"
                                    >
                                      <i className="la la-eye" title="View"></i>
                                    </a>
                                    &nbsp;
                                    <a
                                      onClick={(e) =>
                                        this.editUserDetails(record._id)
                                      }
                                      className="btn btn-sm btn-primary"
                                      title="Edit"
                                    >
                                      <i className="la la-pencil"></i>
                                    </a>
                                    &nbsp;
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {totalCount > 10 ? (
                            <Paginate
                              page={
                                totalCount
                                  ? totalCount < 10
                                    ? 1
                                    : totalCount / 10
                                  : ""
                              }
                              handlePageClick={(data) =>
                                this.handlePageChange(data)
                              }
                              forcepage={this.state.showingPageNo - 1}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>All Teachers</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="index.html">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/admin/teacher-list">Teacher List</Link>
                  </li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div
                    id="list-view"
                    className="tab-pane fade active show col-lg-12"
                  >     <div className="card">
                <div className="card-header w-100">
                        <h4 className="card-title w-100">
                        
                        <div class="float-right">
                        <a className="btn btn-primary mr-2"
                            data-toggle="modal"
                            title="Send Invite"
                            data-target="#editMilesto"
                          >
                           Send Invite
                          </a>
                        <a className="btn btn-primary"
                            data-toggle="modal"
                            title="Add New Teacher"
                            data-target="#editMilestone"
                            onClick={() => {
                              this.resetModal();
                            }}
                          >
                            Add New Teacher
                          </a>
                          </div>
                          </h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="example3"
                            className="table table-striped table-responsive-sm"
                          >
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Activate/Deactivate</th>
                                <th>Action</th>
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
                                  {record?.is_active}
                                  <td>
                                    <Switch
                                      onChange={(e) =>
                                        this.handleChange(e, record._id)
                                      }
                                      checked={record?.is_active}
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <a
                                      data-toggle="modal"
                                      data-target="#myModal"
                                      onClick={(e) => this.viewDetails(record)}
                                      className="btn btn-sm btn-primary"
                                    >
                                      <i className="la la-eye" title="View"></i>
                                    </a>
                                    &nbsp;
                                    <a
                                      onClick={(e) =>
                                        this.editUserDetails(record._id)
                                      }
                                      className="btn btn-sm btn-primary"
                                      title="Edit"
                                    >
                                      <i className="la la-pencil"></i>
                                    </a>
                                    &nbsp;
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {totalCount > 10 ? (
                            <Paginate
                              page={
                                totalCount
                                  ? totalCount < 10
                                    ? 1
                                    : totalCount / 10
                                  : ""
                              }
                              handlePageClick={(data) =>
                                this.handlePageChange(data)
                              }
                              forcepage={this.state.showingPageNo - 1}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}


        <div className="modal" id="editMilestone">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                                <h3 className="modal-title">
                                 Add New Teacher
                                </h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                              </div>

                              <form
                                onSubmit={(e) => {
                                  this.signUpHandler(e);
                                }}
                              >
                              <div className="modal-body">

                             
                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={firstName}
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
                                 
                                  <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="email"
                                        value={email}
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
                                        value={password}
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
                                        value={confirmPassword}
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
                                </div>
                            </div>
                                  <div className="modal-footer">
                                    <button
                                      className="default-btn"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                </div>
                              </form>
                          </div>
                        </div>
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
                        
                              placeholder="Enter User Name"
                             
                              required
                              name="username"
                              value={username}
                              onChange={this.handle}
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
                              name="emailid"
                              required
                              value={emailid}
                              placeholder="Enter Friend's Email "
                              onChange={this.handle}
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
                              smartest way to organize your college
                              applications. And if you are a teacher or a
                              counselor, that's even better ! You can guide the
                              students and help them choose the right college.
                              Join now for free !"
                            </p>
                          </div> 
                        </div>
                      </div>
                      
                    </div>
                    <div class="modal-footer">
                      <button id="close1"
                       type="button" 
                    class="default-btn bg-danger"
                     // data-dismiss="modal"
                          required
                          onClick={this.submitHandle}
                          >Send Invite</button></div>
                     
                  </form>
                </div>
              </div>
            </div>


        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View Profile</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">First Name</label>
                      <label
                        className="form-control"
                        type="text"
                        name="first_name"
                      >
                        {userDetails.first_name}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Last Name</label>
                      <label
                        className="form-control"
                        type="text"
                        name="first_name"
                      >
                        {userDetails.last_name}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Email</label>
                      <label
                        className="form-control"
                        type="text"
                        name="first_name"
                      >
                        {userDetails.email}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                 OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
