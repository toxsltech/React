/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React from "react";
import * as UserService from "../../../services/userServices";
import apibase from "../../../globals/config";
import base from "../../../globals/base";
import Paginate from "../../pagination/pagination";
let serveUrl = apibase;

export default class GroupMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMembers:[],
      totalCount:0,
      group:"",
      search:"",
      offset:"0",
      limit:"9"
    };
  }
  
  componentDidMount = () => {
    if(this.props.match.params.id){
      let id = this.props.match.params.id;
      this.setState({group:id});
      this.getUserList(id);
    }
  };

  getUserList = (id,search)=>{
    id = this.state.group?this.state.group:id;
    search = search?search:this.state.search;
    let limit = this.state.limit?this.state.limit:'9';
    let offset = this.state.offset?this.state.offset:'0';
    UserService.getGroupDetails(id,search,limit,offset).then((resp)=>{
      let response = resp.data;
      if(response.success){
        this.setState({groupMembers:response.data.data,totalCount:response.data.count})
      }
    })
  }
  
  searchHandler =(e)=>{
    this.setState({search:e.target.value});
    this.getUserList(this.state.group,e.target.value)
  }
  
  render() {
    const {
      groupMembers,totalCount,search
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">
              Group Users{" "}
              <div className="d-flex align-items-center btn-add-group mb-5">
                <div className="ui left icon input swdh10">
                <input
                    className="prompt srch10 mr-3"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => this.searchHandler(e)}
                    name="search"
                    value={search}
                  />
                  <i className="fa fa-search icon icon1"></i>
                </div>
              </div>
            </h4>
          </div>
        </div>
        <div className="row">
          {groupMembers.length
            ? groupMembers.map((data, index) => (
                <div className="col-md-6 col-xl-4">
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
                                  <h4 className="">
                                    {data.first_name.charAt().toUpperCase() +
                                      data.first_name.slice(1) +
                                      " " +
                                      data.last_name.charAt().toUpperCase() +
                                      data.last_name.slice(1)}
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
              ))
            : ""}
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
        </div>
    );
  }
}
