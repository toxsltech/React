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
import config from "../../../globals/config";

export default class StudentCounselor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counselor:"",
      counselorId:""
    };
  }

  componentWillMount = ()=>{
    this.counselorLists();
  }
  
  counselorLists = ()=>{
    // auth/getCounselorListAssignToStudent
    UserService.getCounselorListAssignToStudent().then(response=>{
      if(response){
        
        response = response.data;
        if(response.success && response.data && response.data.data){
          this.setState({counselor:response.data.data.counselor	,
            // counselorId:response.data.data.created_by._id
          }
          )
        }
      }
    })
  }

  viewDetails = (id)=>{
    this.props.history.push("/home/StudentCounselor/StudentCounselorDetails/"+id)
  }

  render() {
    const {counselor,counselorId
    } = this.state;
    return (
      <div >
        <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-12 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1"></h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/StudentCounselor'} className="breadcrumb-item text-muted active">Counselor</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">
              Counselor{" "}
              <span className="float-right">
                <div className="ui left icon input swdh10">
                  
                </div>
              </span>
            </h4>
          </div>
        </div>
        {counselor?
        <div className="row">
              {counselor.map((data,key)=>(
                <div className="col-md-6 col-xl-4" key={key}>
                  <div className="iq-card">
                    <div className="iq-card-body profile-page p-0" style={{cursor:'pointer'}} onClick={(e)=>this.viewDetails(data._id)}>
                      <div className="profile-header-image">
                        <div className="profile-info p-4">
                          <div className="user-detail">
                            <div className="d-flex flex-wrap justify-content-between align-items-start">
                              <div className="profile-detail text-center" >
                                <div className="profile-img">
                                  <img
                                  src={data?data.profile_img?config+"/"+data.profile_img:'':""}
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
                                  <h4 className="">
                                  
                                  {data?data.first_name?data.first_name:"":""} {data?data.last_name?data.last_name:"":""}&nbsp;
                                  </h4>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        :'No Record found'}
      </div>
    );
  }
}
