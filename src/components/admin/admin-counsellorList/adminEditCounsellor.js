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

export default class EditCounsellor extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            user_id:"",
            first_name:"",
            last_name:"",
            email:"",
            gender:"",
            profile_img:""
        }
    }

    UNSAFE_componentWillMount = ()=>{
        if(this.props.match.params.id){
            this.setState({user_id:this.props.match.params.id});
            this.getSingleUserDetails(this.props.match.params.id);
        }else{
            this.props.history.push("/admin/user-list")
        }
    }

    getSingleUserDetails = (id)=>{
        UserService.getUserDetails(id).then(resp=>{
            resp = resp.data;
            if(resp.success){
                this.setState({
                    first_name:resp.data.first_name,
                    last_name:resp.data.last_name,
                    email:resp.data.email,
                    gender:resp.data.gender,
                    profile_img:resp.data.profile_img
                });
            }
        });
    }

    handleChange = (e)=>{
        const {name, value} = e.target;
        this.setState({[name]:value});
    }

    updateUserProfile = (e)=>{
        e.preventDefault();
        UserService.updateProfile(this.state).then(resp=>{
            resp = resp.data;
            if(resp.success){
                // showNotification("success",resp.message);
                this.props.history.push("/admin/counsellor-list")
            }else{
                // showNotification("danger",resp.message);
            }
        })
    }

    render() {
        const {first_name, last_name,email,gender,profile_img,user_id} = this.state;
        return (
            <div className="content-body">
            <div className="container-fluid">
                
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Edit Counselor</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to="/admin/counsellor-list">Counselor</Link></li>
                            <li className="breadcrumb-item active"><Link to={"/admin/edit-counsellor/"+user_id}>Edit Counselor</Link></li>
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-xxl-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Basic Info</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateUserProfile}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" name="last_name" value={last_name} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                         <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Gender</label>
                                                <select className="form-control" value={gender} name="gender" onChange={this.handleChange} required>
                                                    <option value="">Select</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Email</label>
                                                <label type="text" className="form-control" name="email">{email}</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                                            <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

    }
}