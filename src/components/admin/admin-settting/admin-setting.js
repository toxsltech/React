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
export default class AdminSetting extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            userProfile:"",
            first_name:"",
            last_name:"",
            email:""
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
                    this.setState({userProfile:resp.data});
                    
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
        this.setState({first_name:this.state.userProfile.first_name,last_name:this.state.userProfile.last_name,email:this.state.userProfile.email});
    }

    handleChange = (e)=>{
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    handleSubmit = ()=>{
        
        UserService.updateProfile({first_name:this.state.first_name, last_name:this.state.last_name}).then(resp=>{
            if(resp  && resp.data){
                // showNotification("success",resp.data.success);
                document.getElementById("close1").click()
                this.getUserList();
            }
        });
    }

    render() {
        const {userProfile,first_name,
        last_name,
        email} = this.state;
        return (
            <div>
            
        <div className="content-body">
             
            <div className="container-fluid">
                
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Edit Profile</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active"><a href="">Profile</a></li>
                            <li className="breadcrumb-item active"><a href="">Edit Profile</a></li>
                        </ol>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                        
                        <div className="profile-sidebar">
                            <div className="card card-topline-aqua">
                                <div className="card-body text-center">
                                        <div className="profile-userpic">
                                            <img src="assets/img/dp.jpg" className="img-responsive" alt=""/> 
                                        </div>
                                        <div className="profile-usertitle ">
                                            <div className="profile-usertitle-name"> John Deo </div>
                                        </div>
                                        <div className="profile-desc">
                                            Hello I am John Deo a Professor in xyz College Surat. I love to work with
                                            all my college staff and seniour professors.
                                        </div>
                                </div>
                            </div>
                            
                            <div className="card">
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col-md-12">
                                            <h4>Address</h4>
                                            <p>456, Pragri flat, varacha road, Surat
                                                <br/> Gujarat, India.</p>
                                        </div>
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
                                                                <p className="text-muted">John Deo</p>
                                                            </div>
                                                            <div className="col-md-3 col-6 b-r"> <strong>Mobile</strong>
                                                                <br/>
                                                                <p className="text-muted">(123) 456 7890</p>
                                                            </div>
                                                            <div className="col-md-3 col-6 b-r"> <strong>Email</strong>
                                                                <br/>
                                                                <p className="text-muted">johndeo@example.com</p>
                                                            </div>
                                                            <div className="col-md-3 col-6"> <strong>Location</strong>
                                                                <br/>
                                                                <p className="text-muted">India</p>
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