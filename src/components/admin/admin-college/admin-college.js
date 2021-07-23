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
import moment from "moment";
import Calendar from "react-calendar";
import Select from "react-select";
import CreatableSelect, { makeCreatableSelect } from "react-select/creatable";

import "react-calendar/dist/Calendar.css";

export default class CollegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLists: [],
      offset: 0,
      limit: 10,
      search: "",
      totalCount: 0,
      showingPageNo: 1,
      mileStone: "",
      type: "",
      MileStoneDescription: "",
      collegeId: "",
      endDate: "",
      mileStoneArr: [],
      milestoneId: "",
      isSubmit: false,
      collegeIds: "",
      respCount: 0,
      newmileStone: {},
      oldMilestone: "",
      isEditable: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.getUserList("", this.state.limit, 0);
  };

  getUserList = (search, limit, offset) => {
    UserService.getAll(limit, offset, search).then((resp) => {
      if (resp) {
        let response = resp.data;

        this.setState({ userLists: response });
        this.setState({ respCount: response.length });
      }
    });
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    this.setState({ offset: selected });
    this.getUserList(this.state.search, 10, selected);
  };

  editUserDetails = (id) => {
    this.props.history.push(`/admin/edit-user/${id}`);
  };

  handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.getUserList(value, 10, 0);
  };

  submitHandle = () => {
    if (!this.state.mileStone) {
      showNotification("danger", "please fill milestone.");
      return;
    }
    if (!this.state.type) {
      showNotification("danger", "please select type.");
      return;
    }
    if (!this.state.endDate) {
      showNotification("danger", "please fill endDate.");
      return;
    }
    let id = this.state.collegeId;

    let obj = {
      type: this.state.type,
      MileStoneDescription: this.state.MileStoneDescription,
      mileStone: this.state.mileStone,
      endDate: this.state.endDate,
    };
    UserService.addAdminMilestone(id, obj).then((resp) => {
      if (resp?.data && resp?.data?.success) {
        // showNotification("success", resp.data.message);
        document.getElementById("close1").click();
        this.setState({
          mileStone: "",
          endDate: "",
          MileStoneDescription: "",
          type: "",
        });
        this.setState({
          newmileStone: {
            value: "",
            label: "",
          },
        });
      } else {
        showNotification("danger", resp.data.message);
      }
    });
  };

  setIsEditableForStudent = (data) => {
    this.setState({ isEditable: !this.state.isEditable });
    const collegeId = data.collegeId;

    const obj = {
      id: data._id,
      mileStone: data.mileStone,
      isEditable: this.state.isEditable,
    };

    UserService.setIsEditableForStudent(collegeId, obj).then((resp) => {
      UserService.calendarSingleEventsAdmin(this.state.collegeIds).then(
        (resp) => {
          if (resp && resp?.data?.success) {
            this.setState({ mileStoneArr: resp.data.data });
          }
        }
      );
    });
  };

  singleCollegeEvents = (id) => {
    this.setState({
      collegeIds: id,
    });
    UserService.calendarSingleEvents(id).then((resp) => {
      if (resp && resp?.data?.success) {
        this.setState({ mileStoneArr: resp.data.data.data });
      }
    });
  };

  calendarSingleEventsAdmin = (id) => {
    this.setState({
      collegeIds: id,
    });
    UserService.calendarSingleEventsAdmin(id).then((resp) => {
      if (resp && resp?.data?.success) {
        this.setState({ mileStoneArr: resp.data.data });
      }
    });
  };

  viewSingleEvents = (data) => {
    this.setState({
      milestoneId: data._id,
      MileStoneDescription: data.MileStoneDescription,
      mileStone: data.mileStone,
      type: data.type,
      endDate: data.endDate,
      oldMilestone: data.mileStone,
    });
  };

  deleteSingleEvents = (data) => {
    let body = { mileStone: data.mileStone };

    let id = this.state.collegeIds;
    if (data) {
      UserService.deleteMileStoneAdmin(id, body).then((resp) => {
        if (resp?.data?.success) {
          this.calendarSingleEventsAdmin(this.state.collegeIds);
          // showNotification("success", resp.data.message);
          document.getElementById("closemodel").click();
        }
      });
    }
  };

  // updateSingleEvent = (e) => {
  //   e.preventDefault();
  //   const { milestoneId, endDate, type, mileStone } = this.state;
  //   UserService.updateMilestone({ milestoneId, endDate, type, mileStone }).then(
  //     (resp) => {
  //       if (resp.data.success) {
  //         showNotification("success", resp.data.message);
  //         document.getElementById("closemodel").click();
  //         this.calendarSingleEventsAdmin(this.state.collegeIds)
  //         // document.getElementById("closeviewMilestone").click();
  //       }
  //     }
  //   );
  // };

  updateSingleEvent = (e) => {
    e.preventDefault();
    let id = this.state.collegeIds;
    const {
      milestoneId,
      endDate,
      type,
      mileStone,
      oldMilestone,
      MileStoneDescription,
    } = this.state;
    var obj = {
      milestoneId: milestoneId,
      endDate: endDate,
      type: type,
      MileStoneDescription: MileStoneDescription,
      updatedMilestone: mileStone,
      mileStone: oldMilestone,
    };
    UserService.updateMilestoneAdmin(id, obj).then((resp) => {
      if (resp?.data?.success) {
        // showNotification("success", resp.data.message);
        document.getElementById("closemodel").click();
        this.calendarSingleEventsAdmin(this.state.collegeIds);
        // document.getElementById("closeviewMilestone").click();
      }
    });
  };

  loadData(type, e) {
    let oldoffset = this.state.offset;
    let newoffset = 0;

    if (type === "prev") {
      newoffset = oldoffset < 1 ? 0 : oldoffset - 1;
    } else {
      newoffset = oldoffset + 1;
    }

    if (type !== "prev" && this.state.respCount < this.state.limit) {
      return;
    }

    this.setState({
      offset: newoffset,
    });

    if (oldoffset !== newoffset) {
      this.getUserList("", this.state.limit, newoffset);
    }
  }
  handleInputChange = (inputValue, actionMeta) => {
    if (inputValue !== null) {
      this.setState({
        mileStone: inputValue.value,
      });
      this.setState({
        newmileStone: {
          value: inputValue.value,
          label: inputValue.value,
        },
      });
    } else {
      this.setState({
        newmileStone: {
          value: "",
          label: "",
        },
      });
    }
  };
  // componentDidMount = () => {
  //   UserService.getauthColleges().then((resp) => {
  //     this.setState({ userLists: resp.data.message });
  //   });
  // };

  render() {
    const {
      userLists,
      endDate,
      totalCount,
      mileStone,
      type,
      mileStoneArr,
      isSubmit,
      MileStoneDescription,
    } = this.state;
    return (
      <div>
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>All Collegess</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/admin/college-list">Colleges</Link>
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
                      <div className="card-header">
                        <h4 className="card-title"> </h4>
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
                                style={{ height: "38px" }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4"></div>
                          <div className="col-lg-4"></div>
                        </div>
                        <div className="table-responsive">
                          <table
                            id="example3"
                            className="table table-striped table-responsive-sm"
                          >
                            <thead>
                              <tr>
                                <th>Image </th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Milestone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(
                                "asdasdasdsda",
                                this.state.userLists
                              )}
                              {userLists.map((record, key) => (
                                <tr key={key}>
                                  <td>
                                    <img
                                      className="avatar-img rounded-circle setuser-img"
                                      width="35"
                                      src={record?.img ?? record?.img}
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
                                  <td>{record.name} </td>
                                  <td>{record.city}</td>
                                  <td>
                                    <a
                                      data-toggle="modal"
                                      title="Add Milestone"
                                      className="btn btn-sm btn-primary"
                                      data-target="#addMilestone"
                                      onClick={(e) =>
                                        this.setState({
                                          collegeId: record.collegeUnitId
                                            ? record.collegeUnitId
                                            : record._id,
                                          type: "",
                                          mileStone: "",
                                          endDate: "",
                                          newmileStone: {
                                            value: "",
                                            label: "",
                                          },
                                        })
                                      }
                                    >
                                      <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                    &nbsp;
                                    <a
                                      onClick={(e) =>
                                        this.calendarSingleEventsAdmin(
                                          record.collegeUnitId
                                            ? record.collegeUnitId
                                            : record._id
                                        )
                                      }
                                      className="btn btn-sm btn-primary"
                                      data-toggle="modal"
                                      title="View Milestone"
                                      data-target="#viewMilestone"
                                    >
                                      <i
                                        className="la la-eye"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <ul className="pagination m-0">
                            <li className="previous">
                              <a
                                onClick={this.loadData.bind(this, "prev")}
                                className="page-link arrow"
                                tabindex="0"
                                role="button"
                                aria-disabled="true"
                                aria-label="Previous page"
                              >
                                ←Previous
                              </a>
                            </li>
                            <li className="page-link arrow text-danger">
                              <a
                                onClick={this.loadData.bind(this, "next")}
                                tabindex="0"
                                role="button"
                                aria-disabled="false"
                                aria-label="Next page"
                              >
                                Next→
                              </a>
                            </li>
                          </ul>
                          {/* {totalCount} */}
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

        <div className="modal" id="addMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add New Milestone</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
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
                        <label>Select Milestone</label>
                        {/* <select
                         className="form-control"
                         name="mileStone"
                         onChange={this.handleChange}
                         value={mileStone}
                         required
                       >  
                         <option value="">Select</option>
                         <option value="Application Deadline">Application Deadline</option> */}
                        {/* <option value="Submit Application">Submit Application</option>
                         <option value="Review and Refine Essays">Review and Refine Essays</option>
                         <option value="Inform Teachers and Counselors">Inform Teacher and Counselors</option>
                         <option value="Create Draft Application">Create Draft Application</option> */}
                        {/* </select> */}
                        <CreatableSelect
                          isClearable
                          onChange={this.handleInputChange}
                          // onInputChange={this.handleInputChange}
                          options={[
                            {
                              value: "Application Deadline",
                              label: "Application Deadline",
                              // name:'mileStone'
                            },
                          ]}
                          value={this.state.newmileStone}
                          placeholder="Select or enter milestone"
                        />
                        {/* <Select 
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
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>Description</h3>
                        <input
                          className="form-control"
                          type="text"
                          name="MileStoneDescription"
                          value={MileStoneDescription}
                          placeholder="Description"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Select Milestone Type</label>
                        <select
                          className="form-control"
                          name="type"
                          onChange={this.handleChange}
                          value={this.state.type}
                          required
                        >
                          <option value="">Select</option>
                          <option value="College">College</option>
                          <option value="Essay">Essay</option>
                          <option value="Letters of Recommendation">
                            Letters of recommendation
                          </option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label> Milestone End Date</label>
                        <input
                          className="form-control"
                          type="date"
                          min={moment(new Date()).format("YYYY-MM-DD")}
                          name="endDate"
                          value={endDate}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <div className="text-right">
                    <button
                      type="button"
                      className="default-btn"
                      onClick={this.submitHandle}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal" id="viewMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">View Milestone</h4>
                <button
                  type="button"
                  className="close"
                  id="closeviewMilestone"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive scrolledarea minheight250">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Editable</th>
                            <th>Type</th>
                            <th>Milestone</th>
                            <th>End Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mileStoneArr.map((data, key) => (
                            <tr key={key}>
                              <td>
                                {data.mileStone === "Application Deadline" ? (
                                  " "
                                ) : (
                                  <input
                                    type="checkbox"
                                    className="btn btn-sm btn-primary"
                                    checked={data.isEditable}
                                    //  value={this.state.isEditable}
                                    // defaultValue={}
                                    onChange={this.setIsEditableForStudent.bind(
                                      this,
                                      data
                                    )}
                                  />
                                )}
                              </td>
                              <td>{data.type}</td>
                              <td>{data.mileStone}</td>
                              <td className="nowrap">
                                {moment(data.endDate).format("MM-DD-YYYY")}
                              </td>
                              <td>
                                <a
                                  onClick={(e) => this.viewSingleEvents(data)}
                                  className="btn btn-sm btn-primary"
                                  data-toggle="modal"
                                  title="Edit Milestone"
                                  data-target="#editMilestone"
                                >
                                  <i
                                    className="la la-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                &nbsp;
                                <a
                                  onClick={(e) => this.deleteSingleEvents(data)}
                                  className="btn btn-sm btn-primary"
                                  title="Delete Milestone"
                                >
                                  <i
                                    className="la la-trash"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                          {mileStoneArr.length === 0 && (
                            <tr>
                              <td colSpan={4}>
                                <span className="text-center">
                                  No record found
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="editMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Milestone</h4>
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
                        <h3>Milestone</h3>

                        {mileStone === "Application Deadline" ? (
                          <input
                            className="form-control"
                            type="text"
                            name="mileStone"
                            readOnly
                            value={mileStone}
                            placeholder="Edit Milestone"
                            onChange={this.handleChange}
                          />
                        ) : (
                          <input
                            className="form-control"
                            type="text"
                            name="mileStone"
                            value={mileStone}
                            placeholder="Edit Milestone"
                            onChange={this.handleChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>Description</h3>
                        <input
                          className="form-control"
                          type="text"
                          name="MileStoneDescription"
                          value={MileStoneDescription}
                          placeholder="Description "
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>Milestone Type</h3>
                        <select
                          className="form-control"
                          name="type"
                          onChange={this.handleChange}
                          value={type}
                          required
                        >
                          <option value="">Select</option>
                          <option value="College">College</option>
                          <option value="Essay">Essay</option>
                          <option value="Letters of Recommendation">
                            Letters of recommendation
                          </option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>End Date</h3>
                        <input
                          className="form-control"
                          value={moment(endDate).format("YYYY-MM-DD")}
                          min={moment(new Date()).format("YYYY-MM-DD")}
                          required
                          name="endDate"
                          type="date"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                </div>

                <div className="modal-footer text-right">
                  <button
                    type="button"
                    className="default-btn"
                    onClick={this.updateSingleEvent}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
