/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from "react";
import { Link } from "react-router-dom";
import base from "../../../globals/base";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import Paginate from "../../pagination/pagination";

export default class StudentCounselorDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          counselor:"",
          counselorId:""
        };
    }

    componentDidMount = ()=>{
      window.scrollTo(0, 0);
      if(this.props.match.params.id){
        this.setState({counselorId:this.props.match.params.id});
          this.getCounselorDetails(this.props.match.params.id)
      }
    }

    getCounselorDetails = (id)=>{
      UserService.getSpecificUser(id).then(response=>{
        response = response.data;
        if(response.success){
          this.setState({counselor:response.data.data})
        }
      })
    }

    render() {
      const {counselor,counselorId} = this.state;
        return (
            <div>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-md-12 align-self-center">
                            <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Counselor</h3>
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb m-0 p-0">
                                        <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                        <li className="breadcrumb-item" aria-current="page"><Link to={'/home/StudentCounselor'} className="text-muted">Counselor</Link></li>
                                        <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/StudentCounselor/StudentCounselorDetails/'+counselorId} className="breadcrumb-item text-muted active">{counselor.first_name?counselor.first_name:""} {counselor.last_name?counselor.last_name:""}</Link></li>
                                    </ol>
                                </nav>
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
                              <h4>Counselor Profile</h4>
                            </div>
                            <div className="card-body">
                              <div className="row biography">
                                <div className="col-md-6 mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Full Name
                                        </h5>
    <p className="text-muted">{counselor.first_name?counselor.first_name:""} {counselor.last_name?counselor.last_name:""}</p>
                                  </div>
                                </div>

                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Email
                                                </h5>
                                    <p className="text-muted">{counselor.email?counselor.email:""}</p>
                                  </div>
                                </div>

                                {/* <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Mobile Number
                                        </h5>
                                    <p className="text-muted">{counselor.mobile_no?counselor.mobile_no:""}</p>
                                  </div>
                                </div> */}

                                <div className="col-md-6  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Gender
                                        </h5>
                                    <p className="text-muted">{counselor.gender?counselor.gender:""}</p>
                                  </div>
                                </div>

                                <div className="col-md-12  mb-3">
                                  <div className="userinfo-main">
                                    <h5 className="mb-2">
                                      Bio
                                        </h5>
                                    <p className="text-muted">{counselor.bio_description?counselor.bio_description:""}</p>
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
        </div >
            </div>
        );
    }
                
}