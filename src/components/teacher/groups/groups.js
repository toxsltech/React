/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React from "react";
import * as session from "../../../utils/session";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import apibase from "../../../globals/config";
import base from "../../../globals/base";
import showNotification from "../../../services/notificationService";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import loadOptions from "./loadOptions";
import Paginate from "../../pagination/pagination";
import { Link } from "react-router-dom";
let serveUrl = apibase;

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      description: "",
      add_student: "",
      submitted: false,
      loading: false,
      groupId: "",
      image: "",
      limit: "9",
      groupsArray: [],
      count: null,
      totalCount: "",
      search_group: "",
      error_groupName: "",
      viewStudent:"",
      view:3
    };

  }
  componentWillMount = ()=>{
    let userRole = localStorage.getItem("user");
    userRole = JSON.parse(userRole);
    this.setState({view:userRole.role});
  }
  searchHandler = (e) => {
    const { name, value } = e.target;
    const { limit } = this.state;
    this.setState({ [name]: value });
    this.getGroups(limit, "", value);
  };
  formHandler = (e) => {
    this.setState({ submitted: false });

    const { name, value } = e.target;
    if (name == "group_name") {
      this.setState({ error_groupName: "" });
    }
    this.setState({
      [name]: value,
    });
  };
  componentDidMount = () => {
  
    const { limit } = this.state;
    this.getGroups(limit);
  };
  getGroups = (limit, offset, filter) => {
    let limit1 = limit ? limit : "9";
    offset = offset ? offset : "0";
    UserService.getGroups(limit1, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              groupsArray: response.data.data,
              count: response.data.data.length,
              totalCount: response.data.count,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  saveHandler = (e, type, index) => {
    e.preventDefault();
    let add_student1 = [];

    const {
      group_name,
      description,
      add_student,
      submitted,
      loading,
      image,
      groupId,
    } = this.state;
    this.setState({ loading: true, submitted: true });
    if (group_name == "") {
      this.setState({ loading: false });
      return;
    }
    let add_student2 = "";
    if(Array.isArray(add_student)){
      add_student.map((data, index) => {
        add_student1.push(data.value);
      });
      add_student2 = add_student1.join();

    }

    const formData = new FormData();
    formData.append("membersArray",add_student?JSON.stringify(add_student):[])
    formData.append("name", group_name ? group_name : "");
    formData.append("description", description ? description : "");
    formData.append("members", add_student2 ? add_student2 : "");
    formData.append("image", image ? image : "");
    if (type === "add") {
      UserService.addGroup(formData)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.setState({ loading: false });
              this.getGroups();
              document.getElementById("close1").click();
            } else {
              this.setState({
                error_groupName: "This Group name already exists",
              });
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    } else {
      let id = groupId;
      UserService.editGroup(formData, id)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.setState({ loading: false });
              this.getGroups();
              showNotification("success",response.message);
              document.getElementById("close2").click();
            } else {
              this.setState({
                error_groupName: "This Group name already exists",
              });
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    }
  };

  resetmodel = () => {
    this.setState({
      group_name: "",
      description: "",
      add_student: "",
      submitted: false,
      loading: false,
      groupId: "",
      image: "",
    });
  };
  onChange = (data, type) => {
    this.setState({ [type]: data });
  };
  handlePageChange = (data) => {
    const { limit } = this.state;
    let selected = data.selected;
    this.setState({ showingPageNo: selected });
    this.getGroups(limit, selected);
  };

  loadValues = (data)=>{
    let arr=[]
    data.members.map((result)=>(
      arr.push({label:`${result.first_name} ${result.last_name}`,value:result._id})
      
      ))
    this.setState({
      groupId:data._id,
      description:data.description,
      group_name:data.name,
      add_student:arr
    });
  }

  viewMembers = (id)=>{
    this.props.history.push("/home/groups/members/"+id);
  }
  
  render() {
    const {
      group_name,
      groupsArray,
      description,
      add_student,
      submitted,
      totalCount,
      loading,
      search_group,
      error_groupName,
      view
    } = this.state;
    
    return (
      <div>
             <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-12 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">{view==1?"Groups":'My Groups'}</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={view==1?'/home/groups':'/home/groups'} className="breadcrumb-item text-muted active">{view==1?"Groups":'My Groups'}</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
         <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Create Group</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                  onClick={() => this.resetmodel()}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                        Group Name{" "}
                        {group_name == "" && submitted ? (
                          <span className="text-danger">
                            {" "}
                            <sup>*</sup>
                          </span>
                        ) : (
                            ""
                          )}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="group_name"
                        value={group_name}
                        onChange={(e) => this.formHandler(e)}
                      />
                      {error_groupName ? (
                        <span className="text-danger">{error_groupName}</span>
                      ) : (
                          ""
                        )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Add Students</label>
                      <AsyncPaginate
                        value={add_student}
                        loadOptions={loadOptions}
                        isMulti
                        // closeMenuOnSelect={false}
                        onChange={(data) => this.onChange(data, "add_student")}
                        additional={{
                          page: 1,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(e) => this.formHandler(e)}
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
                  onClick={() => this.resetmodel()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  onClick={(e) => this.saveHandler(e, "add")}
                >
                  Create
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="editModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Update Group</h4>
                <button
                  type="button"
                  className="close"
                  id="close2"
                  data-dismiss="modal"
                  onClick={() => this.resetmodel()}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">
                        Group Name{" "}
                        {group_name == "" && submitted ? (
                          <span className="text-danger">
                            {" "}
                            <sup>*</sup>
                          </span>
                        ) : (
                            ""
                          )}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="group_name"
                        value={group_name}
                        onChange={(e) => this.formHandler(e)}
                      />
                      {error_groupName ? (
                        <span className="text-danger">{error_groupName}</span>
                      ) : (
                          ""
                        )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Add Students</label>
                      <AsyncPaginate
                        value={add_student}
                        loadOptions={loadOptions}
                        isMulti
                        // closeMenuOnSelect={false}
                        onChange={(data) => this.onChange(data, "add_student")}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(e) => this.formHandler(e)}
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
                  onClick={() => this.resetmodel()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  onClick={(e) => this.saveHandler(e, "editGroup")}
                >
                  Update
                </button>
               
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
   
          <div className="col-md-12 ">
            <h4 className="d-flex justify-content-between align-items-baseline " >
              Groups{" "}
              <div className="d-flex align-items-center btn-add-group mb-5">
                <div className="ui left icon input swdh10">
                  <input
                    className="prompt srch10 mr-3 mt-0"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => this.searchHandler(e)}
                    name="search_group"
                    value={search_group}
                  />
                  <i className="fa fa-search icon icon1 icon-new"></i>&nbsp;
                  {view!=1?
                  <a
                    href="#myModal"
                    data-toggle="modal"
                    data-target="#myModal"
                    className="default-btn ml-auto"
                  >
                    <i className="fa fa-plus"></i> Add Group
                  </a>
                  :""}
                </div>
                &nbsp;&nbsp;
              </div>
            </h4>
          </div>
        </div>
        <div className="row">
          {groupsArray.length > 0
            ? groupsArray.map((data, index) => (
              <div key={index} className="col-md-6 col-xl-4">
                <div className="iq-card" >
                  <div className="iq-card-body text-center relative">
                    <div className="group-new  " >
                      {view!=1?
                  <div className="absoluteicons abs-icon">
                          <a data-toggle="modal" data-target="#editModal" className="btn btn-sm btn-primary default-btn" onClick={()=>this.loadValues(data)}>
                            <i className="fa fa-pencil">
                              </i>
                              </a>
                        </div>
                        :''}
                    <div className="group-info pt-3 pb-3 edit-pad">
                      <h4>{data.name ? data.name.length>=20?data.name.substring(0,20)+'...' : data.name:''}</h4>
                      <p>{data.description ? data.description.length>=20?data.description.substring(0,20)+'...' : data.description:''}</p>
                    </div>
                    {data.members ? (
                      <div className="iq-media-group ">
                     
                        <div className="group-member mb-3">
                          
                          {data.members.slice(0, 5).map((data, index) => (
                       
                              <img
                              key={index}
                                className="img-fluid avatar-40 rounded-circle iq-media"
                                src={serveUrl + "/" + data.profile_img}
                                alt=""
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    base + "/assets/img/user.jpg";
                                }}
                              />
                     
                          ))}
                        </div>
                      </div>
                  
                    ) : (
                        ""
                      )}
                      </div>
                    <Link to={{ pathname: `/home/group-details/${data._id}` }} className="default-btn">
                      view
                      </Link>
                  </div>
                </div>
              </div>
            ))
            : ""}
        </div>
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
    );
  }
}

