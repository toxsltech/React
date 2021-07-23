/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import moment from "moment";
import { Link } from "react-router-dom";
import URL from "../../../globals/config";
export default class AdminProfile extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            userProfile:"",
            first_name:"",
            last_name:"",
            email:"",
            profile_img:"",
            bio_description:""
        }
    }

    UNSAFE_componentWillMount = ()=>{
        this.getUserList();
    }

    getUserList = ()=>{
        UserService.getProfile().then(resp=>{
            if(resp){
                resp = resp.data;
                if(resp.success){
                    this.setState({userProfile:resp.data,
                        profile_img:resp.data.profile_img?URL+"/"+resp.data.profile_img:"",
                    });
                    
                }

            }
        })
    }

    handlePageChange = (data) => {
        let selected = data.selected;
        this.setState({ offset: selected });
        this.getUserList();
    };

    viewProfile = ()=>{
        this.setState({first_name:this.state.userProfile.first_name,
            last_name:this.state.userProfile.last_name,
            email:this.state.userProfile.email,
            bio_description:this.state.userProfile.bio_description,
        });
    }

    handleChange = (e)=>{
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    handleSubmit = ()=>{
        let formData = new FormData();
        if(typeof this.state.profile_img=='object'){
            formData.append("image",this.state.profile_img);
          }
          formData.append("first_name",this.state.first_name);
          formData.append("last_name",this.state.last_name);
          formData.append("bio_description",this.state.bio_description);
          
        UserService.updateProfile(formData).then(resp=>{
            if(resp  && resp.data){
                // showNotification("success",resp.data.success);
                document.getElementById("close1").click()
                this.getUserList();
            }
        });
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

    render() {
        const {userProfile,first_name,
        last_name,
        imgSelected,
        profile_img,
        bio_description,
        email} = this.state;
        return (
            <div>
            
        <div className="content-body">
             
            <div className="container-fluid">
                
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Profile</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to="/admin/profile">Profile</Link></li>
                        </ol>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                        
                        <div className="profile-sidebar">
                            <div className="card card-topline-aqua">
                                <div className="card-body text-center">
                                        <div className="profile-userpic">
                                            <img src={profile_img?profile_img:""} className="img-responsive" alt="" onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                            base + "/assets/img/user.jpg";
                            
                        }}/> 
                      
                                        </div>
                                        <div className="profile-usertitle ">
        <div className="profile-usertitle-name"> {userProfile.first_name} {userProfile.last_name}</div>
                                        </div>
                                        <div className="profile-desc">
                                        {userProfile.bio_description}
                                        </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="profile-content">
                            <div className="row">
                                
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            
                                            <div className="tab-content">
                                                <div className="tab-pane fontawesome-demo active" id="tab1">
                                                    <div id="biography">
                                                        <div className="row">
                                                            <div className="col-md-3 col-6 b-r"> <strong>Full Name</strong>
                                                                <br/>
                                                                <p className="text-muted"> {userProfile.first_name} {userProfile.last_name}</p>
                                                            </div>
                                                            <div className="col-md-3 col-6 b-r"> <strong>Email</strong>
                                                                <br/>
                                                                <p className="text-muted"> {userProfile.email}</p>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                                    <div className="card-body">
                                                        <h4>About Me</h4>
                                                        <ul className="list-group list-group-unbordered">
                                                            <li className="list-group-item">
                                                                <b>Email </b>
                                                                <div className="profile-desc-item pull-right">{userProfile.email}</div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <b>Full Name</b>
                                                                <div className="profile-desc-item pull-right">{userProfile.first_name} {userProfile.last_name}</div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <b>Gender </b>
                                                                <div className="profile-desc-item pull-right">{userProfile.gender}</div>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <b>D.O.B </b>
                                                                <div className="profile-desc-item pull-right">{moment(userProfile.dob).format("YYYY-MM-DD")}</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-right mb-4">
                                    <a data-toggle="modal"
                    data-target="#myModal" onClick={this.viewProfile} className="btn btn-primary">Edit Profile</a>
                                </div>
                                        </div>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Update Profile</h4>
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
                      <label htmlFor="sel1">
                       First Name
                      </label>
                         <img src={imgSelected?imgSelected:profile_img} className="h-100 w-100" onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                            base + "/assets/img/user.jpg";
                            
                        }} /> 
                        <input type="file" id="uploads" accept=".png, .jpg, .jpeg"
                            name="profileImg"
                            onChange={(e) => {
                            this.imageHandler(e)
                        }}/>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                       First Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                       Last Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                       Email
                      </label>
                      <input
                      readOnly
                        className="form-control"
                        type="text"
                        name="email"   
                        value={email}                     
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                       Bio Description
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="bio_description"   
                        onChange={this.handleChange}
                        value={bio_description}             
                      ></textarea>
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
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  onClick={this.handleSubmit}
                >
                  Update
                </button>
                
              </div>
            </div>
          </div>
        </div>
            </div>
        )
    }

}