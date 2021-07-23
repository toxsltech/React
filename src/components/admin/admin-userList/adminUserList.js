/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { useEffect } from "react";
import base from "../../../globals/base";
import { confirmAlert } from "react-confirm-alert";
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
// import Select2 from 'react-select2-wrapper';
import Select from 'react-select'
declare var $;

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: [],
      firstName: "",
      lastName: "",
      role: "1",
      password: "",
      email: "",
      confirmPassword: "",
      submitted: false,
      emailid:"",
      username:"",
      errorConfirmPassword: "",
      errorPassword: "",
      errorEmail: "",
      offset: 0,
      limit: 10,
      search: "",
      totalCount: 0,
      showingPageNo: 1,
      userDetails: "",
      assignDetails: {
        type: "",
      },
      teacherArray:[],
      counsellorArray:[],
      type:{
        value:'0',
        label:'Select Type',
        name:'type'
      }
    };
  }

  UNSAFE_componentWillMount = () => {
    this.getUserList("", this.state.limit, this.state.offset);
  };
  componentDidMount(){
    this.getTeacherList()
    this.getCounsellorList()
  }

  getUserList = (search, limit, offset) => {
    
    limit = this.state.limit ? this.state.limit : "10";
    offset = offset;
    UserService.userList(search, limit, offset).then((resp) => {
      resp = resp.data;
      if (resp.success) {
        this.setState({
          userLists: resp.data.students,
          totalCount: resp.data.count,
        });
      }
    });
  };
  
  getCounsellorList = () => {
    
    UserService.getcounsellor().then((resp) => {
      resp = resp.data;
      if (resp.success) {
        var arr=[]
          
          for(let data of resp.data.data){

            var obj = {
              value:data._id,
              label:data.first_name + " "+ data.last_name,
              name:'counselor'
            }
            arr.push(obj)
          }
          this.setState({
            counsellorArray: arr
          });
      }
    });
  };

  
  getTeacherList = () => {
    
    UserService.getTeacherList().then((resp) => {
      if (resp) {
        resp = resp?.data;
        
        if (resp?.success) {

          var arr=[]
          
          for(let data of resp.data.data){

            var obj = {
              value:data._id,
              label:data.first_name + " "+ data.last_name,
              name:'teacher'
            }
            arr.push(obj)
          }
          this.setState({
            teacherArray: arr
          });
        }
      }
    });
  };

   assignTeacher = (data) => {
     
    UserService.assignTeacher(data).then((resp) => {
      if (resp) {
        resp = resp?.data;
        
        if (resp?.success) {
          // showNotification("success", resp.message)
          
          $('#myModalAssign').modal('hide');
        }
      }
    });
  };  
  
  assignCounsellor = (data) => {
    UserService.assignCounsellor(data).then((resp) => {
      if (resp) {
        resp = resp?.data;
        
        if (resp?.success) {
          // showNotification("success", resp.message)
          $('#myModalAssign').modal('hide');
        }
      }
    });
  };

  changeAssignTeacher=(e)=>
  {
    
    
    const {name,value,label}=e;
    if(name=='type'){
      this.setState({
        type:{
          value:value,
          label:label,
          name:'type'
        }
  
      });
    }
    

    this.setState((prevState) => ({
      assignDetails: {
        ...prevState.assignDetails,
        [name]: value,
      },
    }));
  }

  
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
  
  handlePageChange = (data) => {
    let selected = data.selected;
    this.setState({ offset: selected });
    this.getUserList(this.state.search, 10, selected);
  };

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
    let emailRegx =
      /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    UserService.signStudent(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;

          if (response.success == true) {
            // showNotification("success", "Student added successfully");
            // this.props.history.push("/login");
            document.getElementById("editMilestone").click();
            this.getUserList('',this.state.limit,0);
            this.resetModal()
          }
        }
      })
      .catch((err) => {
        // showNotification("danger", constant.ERRORMSG);
      });
  };

  editUserDetails = (id) => {
    this.props.history.push(`/admin/edit-user/${id}`);
  };

  viewDetails = (data) => {
    this.setState({ userDetails: data });
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
  




  handleChange = (checked, id) => {
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

  editAssignDetails(user) {

    
    this.setState({
      type:{
        value:'0',
        label:'Select Type',
        name:'type'
      }

    });
    this.setState({
      submitted: false,
    });
    this.setState((prevState) => ({
      assignDetails: {
        ...prevState.assignDetails,
        id: user._id,
        counselor:'',
        teacher:'',
        type:''
      },
    }));
  }
  changeAssign = (evt) => {
    const { target } = evt;
    this.setState((prevState) => ({
      assignDetails: {
        ...prevState.assignDetails,
        [target.name]: target.value,
      },
    }));
    
  };
  submitAssignDetails(e) {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
    
    if(this.state.assignDetails.type==''){
      showNotification("danger", 'please select type')
      return;
    }
    if(this.state.assignDetails.type=='1'){
      if(this.state.assignDetails.teacher == undefined || this.state.assignDetails.teacher==''){
        showNotification("danger", 'please select teacher')
        return;
      }
    }else{
      if(this.state.assignDetails.counselor == undefined || this.state.assignDetails.counselor==''){
        showNotification("danger", 'please select counselor')
        return;
      }
    }
    
    
    if (this.state.assignDetails.type == '1') {
      
      this.assignTeacher({ id: this.state.assignDetails.teacher, student: this.state.assignDetails?.id })
    } else {
      this.assignCounsellor({ id: this.state.assignDetails.counselor, student: this.state.assignDetails?.id })
    }
    // document.getElementById("editMilestone").click();
  }
  handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.getUserList(value, 10, 0);
  };

  render() {
    const {
      userLists,
      totalCount,
      userDetails,
      role,
      firstName,
      lastName,
      password,
      emailid,username,
      email,
      confirmPassword,
      submitted,
      errorConfirmPassword,
      errorPassword,
      errorEmail,
      teacherArray,
      counsellorArray
    } = this.state;
    
    return (
      <div>
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4> Student List</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/admin/user-list">Students</Link>
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
                  >
                    <div className="card">
                      <div className="card-header w-100">
                        <h4 className="card-title w-100">
                          <div class="float-right">
                            <a
                              className="btn btn-primary mr-2"
                              data-toggle="modal"
                              title="Send Invite"
                              data-target="#editMilesto"
                              onClick={() => {
                                this.resetModal();
                              }}>
                              Send Invite
                            </a>
                            <a
                              className="btn btn-primary"
                              data-toggle="modal"
                              title="Add New Student"
                              data-target="#editMilestone"
                              onClick={() => {
                                this.resetModal();
                              }}
                            >
                              Add New Student
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
                                <th>
                                  <b>Image</b>{" "}
                                </th>
                                <th>
                                  <b>Name</b>
                                </th>
                                <th>
                                  <b>Email</b>
                                </th>
                                <th>
                                  <b>Activate/Deactivate</b>
                                </th>
                                <th>
                                  <b>Action</b>
                                </th>
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
                                    <a
                                      data-toggle="modal"
                                      data-target="#myModalAssign"
                                      onClick={(e) =>
                                        this.editAssignDetails(record)
                                      }
                                      className="btn btn-sm btn-primary"
                                    >
                                      <i
                                        className="la la-graduation-cap"
                                        title="Assign"
                                      ></i>
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
                        
                          required
                          name="username"
                          value={username}
                          onChange={this.handle}
                          placeholder="Enter User Name"

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
                          smartest way to organize your college applications.
                          And if you are a teacher or a counselor, that's even
                          better ! You can guide the students and help them
                          choose the right college. Join now for free !"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer text-right">
                
                      <button id="close1"
                       type="button" 
                    class="default-btn bg-danger"
                     // data-dismiss="modal"
                          required
                          onClick={this.submitHandle}
                          >Send Invite
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="modal" id="editMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Add New Student</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                 
                >
                  &times;
                </button>
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
                          name="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => this.formHandler(e)}
                          // required
                          // pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                          title="Please include ."
                        />
                        {email == "" && submitted ? (
                          <span className="text-danger">Please fill Email</span>
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
                          value={password}
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
                  <button className="default-btn" type="submit">
                    Save
                  </button>
                </div>
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
                <form
                  onSubmit={(e) => {
                    this.signUpHandler(e);
                  }}
                >
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
                </form>
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


        
        <div className="modal" id="myModalAssign">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Assign Teacher/Counselor</h4>
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
                <form
                  onSubmit={(e) => {
                    this.submitAssignDetails(e);
                  }}
                >
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        
                        <Select 
                          options={[
                            {
                              value:'0',
                              label:'Select Type',
                              name:'type'
                            },
                            {
                              value:'1',
                              label:'Teacher',
                              name:'type'
                            },
                            {
                              value:'2',
                              label:'Counselor',
                              name:'type'
                            }
                          ]} 
                          value={this.state.type}
                          onChange={this.changeAssignTeacher} 
                          placeholder="Select Type"
                        />
                        {/* {this.state.assignDetails.type == "" && submitted && (
                          <span className="text-danger">
                            Please select Type
                          </span>
                        )} */}
                      </div>
                    </div>

                    {this.state.assignDetails.type === "1" && (
                      <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                         
                          
                          <Select 
                            options={teacherArray} 
                            onChange={this.changeAssignTeacher} 
                            placeholder="Select Teacher"
                          />
                          {/* {this.state.assignDetails.teacher == "" &&
                            submitted && (
                              <span className="text-danger">
                                Please select Teacher
                              </span>
                            )} */}
                        </div>
                      </div>
                    )}
                    {this.state.assignDetails.type === "2" && (
                      <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                          
                          <Select 
                            options={counsellorArray} 
                            onChange={this.changeAssignTeacher} 
                            placeholder="Select Counselor"
                          />
                          {/* {this.state.assignDetails.counselor == "" &&
                            submitted && (
                              <span className="text-danger">
                                Please select Counselor
                              </span>
                            )} */}
                        </div>
                      </div>
                    )}

                    <div className="col-12 text-center">
                      <br></br>
                      <button className="default-btn" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

