/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React from "react";
import { Link } from "react-router-dom";
import apibase from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import * as Session from "../../../utils/session";
import Paginate from "../../pagination/pagination";
let serveUrl = apibase;

export default class AdminNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Session.getUser(),
      notificationArray: [],
      notificationCount: "",
    };
  }
  componentDidMount = ()=>{
    this.getNotification();
  }

  getNotification = () => {
    UserService.getNotification().then(resp=>{
      let response = resp.data;
      if(response.success){
        this.setState({notificationArray:response.data.notifications,notificationCount:response.data.count})
      }
    });
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    this.setState({ offset: selected });
    this.getNotification("",10,selected);
};

  render() {
    const { user,notificationArray,notificationCount } = this.state;
    return (
      <div>
        <div className="content-body">
            <div className="container-fluid">
                    
                <div className="row page-titles mx-0">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>Notifications</h4>
                        </div>
                    </div>
                    <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to="/admin/notification">Notifications</Link></li>
                            
                        </ol>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row tab-content">
                            <div id="list-view" className="tab-pane fade active show col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Notifications </h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                       
                                       
                                       
                                        {notificationArray.length?
                                            <div className="card-body" >


                                            


                                              
                                            {notificationArray.map((data,index)=>(
                                            <div key={index} className="notification">
                                                <div className="notification-image-wrapper">
                                                <div className="notification-image">
                                                    <img
                                                    src={data.from?data.from.profile_img?apibase+"/"+data.from.profile_img:"":""}
                                                    alt=""
                                                    width="32"
                                                    />
                                                </div>
                                                </div>
                                                <div className="notification-text">
                                                {data.title?data.title:""}
                                                </div>
                                            </div>
                                            ))}
                                            
                                            
                                            </div>
                                            :<p className="no-data-found">No data found</p>}
                                            {notificationCount > 10 ? (
                                                <Paginate
                                                page={notificationCount ? (notificationCount < 10 ? 1 : notificationCount / 10) : ""}
                                                handlePageClick={(data) => this.handlePageChange(data)}
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

      
      </div>

    );
  }
}
