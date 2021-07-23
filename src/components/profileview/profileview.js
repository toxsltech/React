/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";
import URL from "../../globals/config"
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import Header from "../header/header"
import RightSidebar from "../right-sidebar/right-sidebar"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


// import * as session from "../../utils/session";
// import { confirmAlert } from "react-confirm-alert";
// import * as constant from "../../globals/constant";
// import history from "../../history";
// import apibase from "../../globals/config";

export default class Profileview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_img:"",
      gender:"",
      first_name:"",
      last_name:"",
      cover_image:"",
      bio_description:"",
      email:"",
      mobile_no:"",
      imgSelected:"",
      coverimgSelected:"",
      role:0,
      subjects:[],
      subjectId:"",
      subjectName:"",
      teacherId:""
    };
  }

  componentDidMount = ()=>{
    this.loadUserDetails();
    let userDetails = localStorage.getItem("user");
    userDetails = JSON.parse(userDetails);
    this.setState({role:userDetails.role,teacherId:userDetails._id});
    this.getAllSubjects();
  }

  getAllSubjects = ()=>{
    UserService.getAllSubjects().then(response=>{
      if(response.data.success){
        this.setState({subjects:response.data.data})
      }
    })
  }
  
  loadUserDetails = ()=>{
    UserService.getProfile().then(response=>{
      if(response.data.success){
        this.setState({userDetails:response.data.data,
          profile_img:response.data.data.profile_img?URL+"/"+response.data.data.profile_img:"",
          gender:response.data.data.gender,
          first_name:response.data.data.first_name,
          last_name:response.data.data.last_name,
          cover_image:response.data.data.cover_image?URL+"/"+response.data.data.cover_image:"",
          bio_description:response.data.data.bio_description,
          email:response.data.data.email,
          mobile_no:response.data.data.mobile_no
        })
      }
      if(this.state.role===5){
        UserService.getTeacherById().then(response=>{
          if(response.data.success && response.data.data){
              this.setState({subjectId:response.data.data.subject._id,subjectName:response.data.data.subject.title})
          }
        });
      }
    }).catch(err=>{
      showNotification('success',err?err:constant.ERRORMSG);
    })
  }

  changeHandle = (e)=>{
    const {name,value} = e.target;
    this.setState({[name]:value})
  }
  
  imageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ profile_img: event.target.files[0] });
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ imgSelected: event.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  coverImageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ cover_image: event.target.files[0] });
      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ coverimgSelected: event.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  submitHandle = async()=>{
    let formData = new FormData();
    formData.append("bio_description",this.state.bio_description);
    if(typeof this.state.cover_image=='object'){
      formData.append("cover_image",this.state.cover_image);
    }
    if(typeof this.state.profile_img=='object'){
      formData.append("profile_img",this.state.profile_img);
    }
    formData.append("mobile_no",this.state.mobile_no?this.state.mobile_no:'');
    formData.append("first_name",this.state.first_name);
    formData.append("last_name",this.state.last_name);
    formData.append("email",this.state.email);
    formData.append("gender",this.state.gender);
    if(this.state.subjectId){
      formData.append("subjectId",this.state.subjectId);
    }
    UserService.updateusersProfile(formData).then(response=>{
      if(response.data.success){
        this.loadUserDetails();
        document.getElementById("closeModal").click();
        this.props.imgaeGetFromProps(response.data.data.profile_img);
        this.props.coverimgaeGetFromProps(response.data.data.cover_image);
      }
    }).catch(err=>{
      showNotification("danger",err?err:constant.ERRORMSG);
    })
  }

  deleteHandler = (type) => {
     UserService.removeImage(type).then(response => {
      if (response.data.success) {
        this.loadUserDetails();
      }
    }).catch(err => {
      showNotification("danger", constant.ERRORMSG);
    }) 
  };

  render() {
    const {
      profile_img,
      gender,
      first_name,
      last_name,
      cover_image,
      bio_description,
      email,
      mobile_no,
      imgSelected,
      coverimgSelected,
      role,
      subjects,
      subjectName,
      subjectId
    } = this.state;
    return (
      <div>
        <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-md-12 align-self-center">
    <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">{role==1?"Student":role==5?"Teacher":"Counselor"}</h3>
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb m-0 p-0">
                                        <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                        <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/profileview'} className="breadcrumb-item text-muted active">{first_name?first_name:""} {last_name?last_name:""}</Link></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
        <div id="myModal" className="modal profile-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lgss" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="mb-0">Edit Profile</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-">
                      <label>Profile Image</label>
                      <div className="uploadimageprofile ">
                        <div className="smalluserimage relative relative1 ">
                          <div className="hover-icon hover-icon-new">
                        <a onClick={() => this.deleteHandler('1')}><i className="fa fa-close" title="remove image"></i></a></div>
                          <img src={imgSelected?imgSelected:profile_img} onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    base + "/assets/img/user.jpg";
                                }} />
                        </div>
                        <input type="file" id="uploads" className="d-none" accept=".png, .jpg, .jpeg"
                            name="profileImg"
                            onChange={(e) => {
                              this.imageHandler(e);
                            }}/>
                        <label htmlFor="uploads" className="default-btn savebtn mt-2">Upload Image</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-">
                      <label>Cover Image</label>
                      <div className="uploadimageprofile ">
                        <div className="coverimage relative relative1">
                        <div className="hover-icon hover-icon-new">
                        <a onClick={() => this.deleteHandler('2')}><i className="fa fa-close" title="remove image"></i></a></div>
                          <img src={coverimgSelected?coverimgSelected:cover_image} onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    base + "/assets/img/user.jpg";
                                }}/>
                        </div>
                        <input type="file" id="upload" className="d-none" accept=".png, .jpg, .jpeg"
                            name="profileImg"
                            onChange={(e) => {
                              this.coverImageHandler(e);
                            }}/>
                        <label htmlFor="upload" className="default-btn savebtn mt-2">Upload Image</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input className="form-control" type="text" value={first_name} name="first_name" onChange={(e)=>this.changeHandle(e)}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-control" type="text" value={last_name} name="last_name" onChange={(e)=>this.changeHandle(e)}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                          <label className="form-control" type="text" name="email" onChange={(e)=>this.changeHandle(e)}>{email}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input className="form-control" type="text" minLength="5" maxLength="15" value={mobile_no} name="mobile_no" required onKeyDown={(e) => {
                              return (e.keyCode >= 48 && e.keyCode <= 57) ||
                                (e.keyCode >= 96 && e.keyCode <= 105) ||
                                e.keyCode == 8 ||
                                e.keyCode == 46 ||
                                e.keyCode == 190 ||
                                (e.keyCode >= 37 && e.keyCode <= 40)
                                ? ""
                                : e.preventDefault();
                            }} onChange={(e)=>this.changeHandle(e)} />
                        {/*     <PhoneInput
												country={'us'}
                        value={mobile_no}
                        name="mobile_no"
												onChange={(value, data, event, formattedValue) => this.setState({ mobile_no: value, countryCode: `+${data.dialCode}`, phoneNo: value.slice(data.dialCode.length) })}
												className="form-control"
											/> */}

                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                <div className="form-group profile">
                  <label>Gender</label>
                  <select className="form-control" value={gender} name="gender" onChange={(e)=>this.changeHandle(e)}>
                    <option value="">Select option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                </div>
                {role===5?
                <div className="col-md-6">
                <div className="form-group ">
                  <label>Subject</label>
                  <select className="form-control" value={subjectId} name="subjectId" onChange={(e)=>this.changeHandle(e)}>
                    <option value="">Select option</option>
                {subjects.map((sub,index)=>(
                <option key={index} value={sub._id}>{sub.title}</option>
                ))}
                  </select>
                </div>
                </div>
                :""}
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea  rows="5" type="text" value={bio_description} name="bio_description" onChange={this.changeHandle}>bio data</textarea>
                </div>
                <div className="text-right">
                  
                  <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button>&nbsp;
                <button type="button" className="default-btn savebtn" onClick={this.submitHandle}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="conatiner-fluid">
          <div className="row m-0">
            <div className="col-md-12 p-0">
              <div className="profile-section pt-5 pb-5">
                <div className="container-fluid">
                  <div className="row">
                    
                    <div className="col-md-12">
                      <div className="tab-content">
                        <div className="tab-pane active" id="get">
                          <div className="card">
                            <div className="card-header">
                              <h4>User Profile</h4>
                            </div>
                            <div className="card-body">
                              <div className="row biography">
                                <div className="col-md-6 mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Full Name
                                        </h5>
    <p className="text-muted">{first_name?first_name:""} {last_name?last_name:""}</p>
                                  </div>
                                </div>

                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Email
                                                </h5>
                                    <p className="text-muted">{email?email:""}</p>
                                  </div>
                                </div>
{/* 
                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Mobile Number
                                        </h5>
                                    <p className="text-muted">{mobile_no?mobile_no:""}</p>
                                  </div>
                                </div> */}

                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Gender
                                        </h5>
                                    <p className="text-muted">{gender?gender:""}</p>
                                  </div>
                                </div>
                                <div className="col-md-12  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Bio
                                        </h5>
                                    <p className="text-muted">{bio_description?bio_description:""}</p>
                                  </div>
                                </div>
                                {role===5?
                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Subject
                                        </h5>
                                    <p className="text-muted">{subjectName?subjectName:""}</p>
                                  </div>
                                </div>
                                :""}
                              </div>
                              <div className="text-right">
                                <a href="#myModal" data-toggle="modal" data-target="#myModal" className="default-btn savebtn"><i className="fa fa-pencil"></i> Edit Profile</a>
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
        </div >
      </div >
    );
  }
}
