/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import base from "../../../globals/base";
import * as UserService from "../../../services/userServices";
import showNotification from "../../../services/notificationService";
import * as constant from "../../../globals/constant";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Student_SIDEBAR } from "../../../globals/constant";

export default class StudentExtraCurricular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_activity: false,
      showMain: "",
      which_model: "",
      activity_array: [],
      activity_type: "",
      position_description: "",
      organization_name: "",
      describe_activity: "",
      participation_grade_level: [],
      timing_of_participation: [],
      hour_spent_week: "",
      week_spent_year: "",
      participate_similar_activity: "",
      submitted: false,
      loading: false,
      id: "",
      show: true,
      loaded: false,
    };
  }
  resetActivity = () => {
    this.setState({
      activity_type: "",
      position_description: "",
      organization_name: "",
      describe_activity: "",
      participation_grade_level: [],
      timing_of_participation: [],
      hour_spent_week: "",
      week_spent_year: "",
      participate_similar_activity: "",
    });
  };

  UNSAFE_componentWillMount = () => {
    let id = null;
    if (this.props.match.params.id && this.props.siteView != "Student") {
      this.props.history.push("/home");
    }
    if (this.props.siteView == "Student") {
      if (this.props.match.params.id) {
        id = this.props.match.params.id;
        this.setState({ view: "Student", studentId: id, loaded: true }, () => {
          this.getActivityArrayById();
        });
      }
    } else {
      this.getActivityArray();
    }
  };

  getActivityArrayById = () => {
    this.setState({ loading: true });
    let id = this.state.studentId;
    UserService.getActivitiesById(id)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState(
              { activity_array: response.data, loading: false },
              () => {
                if (this.state.activity_array.length <= 0) {
                  this.setState({ show: false });
                }
              }
            );
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getActivityArray = () => {
    this.setState({ loading: true });
    UserService.getActivities()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState(
              { activity_array: response.data, loading: false },
              () => {
                if (this.state.activity_array.length <= 0) {
                  this.setState({ show: false });
                }
              }
            );
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type == "checkbox") {
      if (this.state[name].indexOf(value) !== -1) {
        this.state[name].splice(this.state[name].indexOf(value), 1);
      } else {
        this.state[name].push(value);
      }
      this.setState({ [name]: this.state[name] });
    } else {
      this.setState({ [name]: value });
    }
  };

  deleteHandler = (e, id) => {
    confirmAlert({
      message: "Do you want to delete? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmDelete = (id) => {
    this.setState({ loading: true, add_activity: false, showMain: "" });
    UserService.deleteActivity(id)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ loading: false });
            this.getActivityArray();
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  editStateHandler = (i) => {
    const { activity_array } = this.state;
    this.setState({ add_activity: true, which_model: "edit" });
    this.setState({
      activity_type: activity_array[i].activity_type
        ? activity_array[i].activity_type
        : "",
      position_description: activity_array[i].position_description
        ? activity_array[i].position_description
        : "",
      organization_name: activity_array[i].organization_name
        ? activity_array[i].organization_name
        : "",
      describe_activity: activity_array[i].activity_description
        ? activity_array[i].activity_description
        : "",
      participation_grade_level: activity_array[i].participation_grade_levels
        ? activity_array[i].participation_grade_levels
        : [],
      timing_of_participation: activity_array[i].timing_of_participation
        ? activity_array[i].timing_of_participation
        : [],
      hour_spent_week: activity_array[i].hours_spent_per_week
        ? activity_array[i].hours_spent_per_week
        : "",
      week_spent_year: activity_array[i].weeks_spent_per_year
        ? activity_array[i].weeks_spent_per_year
        : "",
      participate_similar_activity: activity_array[i].similar_activity
        ? activity_array[i].similar_activity
        : "",
    });
  };

  submitHandler = (e, type) => {
    this.setState({ submitted: true, loading: true });
    e.preventDefault();
    const {
      add_activity,
      activity_array,
      activity_type,
      position_description,
      organization_name,
      describe_activity,
      participation_grade_level,
      timing_of_participation,
      hour_spent_week,
      week_spent_year,
      participate_similar_activity,
      id,
    } = this.state;

    if (activity_type == "") {
      this.setState({ loading: false });
      return;
    }
    let data = {
      activity_type: activity_type,
      position_description: position_description,
      organization_name: organization_name,
      activity_description: describe_activity,
      participation_grade_levels: participation_grade_level,
      timing_of_participation: timing_of_participation,
      hours_spent_per_week: hour_spent_week,
      weeks_spent_per_year: week_spent_year,
      similar_activity: participate_similar_activity,
    };
    if (type == "add") {
      UserService.addActivity(data)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success) {
              this.setState({
                success: true,
                loading: false,
                submitted: false,
              });
              showNotification("success", response.message);
              document.getElementById("close1").click();
              this.getActivityArray();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    } else {
      let id = this.state.id;
      UserService.editActivity(data, id)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success) {
              this.setState({
                success: true,
                loading: false,
                submitted: false,
              });
              showNotification("success", response.message);
              document.getElementById("close1").click();
              this.getActivityArray();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    }
  };
  render() {
    const {
      loading,
      showMain,
      add_activity,
      activity_array,
      activity_type,
      position_description,
      organization_name,
      describe_activity,
      participation_grade_level,
      timing_of_participation,
      hour_spent_week,
      week_spent_year,
      participate_similar_activity,
      which_model,
      submitted,
      show,
      loaded,
      view,
    } = this.state;
    const { siteView, studentId } = this.props;
    return (
      <div>
        <div className="modal" id="activities" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="mb-0">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="close1"
                  >
                    &times;
                  </button>
                </h4>
                {showMain == "add" && add_activity ? (
                  <div>
                    <hr />
                    <div id="accordion" className="myaccordion">
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h2 className="mb-0">
                            <button className="d-flex align-items-center justify-content-between btn btn-link">
                              {which_model == "add"
                                ? "Add Activity"
                                : "Edit Activity"}
                            </button>
                          </h2>
                        </div>
                        <div className="collapsed">
                          <div className="card-body">
                            <div className="form-group">
                              <label>
                                Activity type{" "}
                                {activity_type == "" && submitted ? (
                                  <span className="text-danger">
                                    {" "}
                                    <sup>*</sup>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </label>
                              <select
                                className="form-control"
                                name="activity_type"
                                value={activity_type}
                                onChange={(e) => this.handleChange(e)}
                              >
                                <option value="">Please select one</option>
                                <option value="Arts or music">
                                  Arts or music
                                </option>
                                <option value="Clubs">Clubs</option>
                                <option value="Community engagement">
                                  Community engagement
                                </option>
                                <option value="Family responsibilities">
                                  Family responsibilities
                                </option>
                                <option value="Hobbies">Hobbies</option>
                                <option value="Sports">Sports</option>
                                <option value="Work or volunteering">
                                  Work or volunteering
                                </option>
                                <option value="Other experiences that have been meaningful to you">
                                  Other experiences that have been meaningful to
                                  you
                                </option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Position/Leadership description</label>
                              <input
                                className="form-control"
                                type="text"
                                name="position_description"
                                value={position_description}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>

                            <div className="form-group">
                              <label>Organization Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="organization_name"
                                value={organization_name}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                Please describe this activity, including what
                                you accomplished and any recognition you
                                received, etc.
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="describe_activity"
                                value={describe_activity}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </div>

                            <div className="form-group">
                              <label>Participation grade levels</label>
                              <div>
                                <span className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="9"
                                    checked={
                                      participation_grade_level.indexOf("9") !=
                                      -1
                                    }
                                    name="participation_grade_level"
                                    value="9"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="9"
                                  >
                                    9
                                  </label>
                                </span>
                                &nbsp;&nbsp;
                                <span className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    name="participation_grade_level"
                                    id="10"
                                    value="10"
                                    onChange={(e) => this.handleChange(e)}
                                    checked={
                                      participation_grade_level.indexOf("10") !=
                                      -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="10"
                                  >
                                    10
                                  </label>
                                </span>
                                &nbsp;&nbsp;
                                <span className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    name="participation_grade_level"
                                    id="11"
                                    value="11"
                                    onChange={(e) => this.handleChange(e)}
                                    checked={
                                      participation_grade_level.indexOf("11") !=
                                      -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="11"
                                  >
                                    11
                                  </label>
                                </span>
                                &nbsp;&nbsp;
                                <span className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    name="participation_grade_level"
                                    id="12"
                                    value="12"
                                    onChange={(e) => this.handleChange(e)}
                                    checked={
                                      participation_grade_level.indexOf("12") !=
                                      -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="12"
                                  >
                                    12
                                  </label>
                                </span>
                                &nbsp;&nbsp;
                                <span className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="Postgraduate"
                                    name="participation_grade_level"
                                    value="PostGraduate"
                                    onChange={(e) => this.handleChange(e)}
                                    checked={
                                      participation_grade_level.indexOf(
                                        "PostGraduate"
                                      ) != -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="Postgraduate"
                                  >
                                    Post-graduate
                                  </label>
                                </span>
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Timing of participation</label>
                              <div>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="schoolYear"
                                    checked={
                                      timing_of_participation.indexOf(
                                        "During school year"
                                      ) != -1
                                    }
                                    name="timing_of_participation"
                                    value="During school year"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="schoolYear"
                                  >
                                    During school year
                                  </label>
                                </div>

                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="schoolBreak"
                                    value="During school break"
                                    name="timing_of_participation"
                                    onChange={(e) => this.handleChange(e)}
                                    checked={
                                      timing_of_participation.indexOf(
                                        "During school break"
                                      ) != -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="schoolBreak"
                                  >
                                    During school break
                                  </label>
                                </div>

                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="allyear"
                                    onChange={(e) => this.handleChange(e)}
                                    name="timing_of_participation"
                                    value="All year"
                                    checked={
                                      timing_of_participation.indexOf(
                                        "All year"
                                      ) != -1
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="allyear"
                                  >
                                    All year
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Hours spent per week</label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={hour_spent_week}
                                    name="hour_spent_week"
                                    onChange={(e) => this.handleChange(e)}
                                    onKeyDown={(e) => {
                                      return e.keyCode >= 189
                                        ? e.preventDefault()
                                        : "";
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Weeks spent per year</label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={week_spent_year}
                                    name="week_spent_year"
                                    onChange={(e) => this.handleChange(e)}
                                    onKeyDown={(e) => {
                                      return e.keyCode >= 189
                                        ? e.preventDefault()
                                        : "";
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>
                                I intend to participate in a similar activity in
                                college.
                              </label>
                              <div>
                                <span>
                                  <input
                                    type="radio"
                                    name="participate_similar_activity"
                                    value="true"
                                    checked={
                                      participate_similar_activity == "true"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => this.handleChange(e)}
                                  />{" "}
                                  Yes
                                </span>
                                &nbsp;&nbsp;
                                <span>
                                  <input
                                    type="radio"
                                    name="participate_similar_activity"
                                    value="false"
                                    checked={
                                      participate_similar_activity == "false"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => this.handleChange(e)}
                                  />{" "}
                                  No
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              {which_model == "add" ? (
                                <button
                                  type="button"
                                  onClick={(e) => this.submitHandler(e, "add")}
                                  className="default-btn"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => this.submitHandler(e, "edit")}
                                  className="default-btn"
                                >
                                  Update
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="viewactivities" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="card">
                  <div className="card-header">
                    <h4>
                      {activity_type}{" "}
                      <span className="float-right">
                        <button
                          type="button"
                          data-dismiss="modal"
                          aria-label="Close"
                          className="close"
                          onClick={() => {
                            this.resetActivity();
                            this.setState({ showMain: "" });
                          }}
                        >
                          <span aria-hidden="true">&times;</span>
                          {/* <i className="fa fa-trash"></i> */}
                        </button>
                      </span>
                    </h4>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped text-left">
                        <tbody>
                          <tr>
                            <th> Position/Leadership description</th>
                            <td className="text-right">
                              {" "}
                              {position_description
                                ? position_description
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>Organization Name</th>
                            <td className="text-right">
                              {" "}
                              {organization_name ? organization_name : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              Please describe this activity, including what you
                              accomplished and any recognition you received,
                              etc.
                            </th>
                            <td className="text-right">
                              {" "}
                              {describe_activity ? describe_activity : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>Participation grade levels</th>
                            <td className="text-right">
                              {" "}
                              {participation_grade_level.length > 0
                                ? participation_grade_level.map(
                                    (data, index, arr) =>
                                      data +
                                      (arr.length - 1 === index ? "" : ", ")
                                  )
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>Timing of participation</th>
                            <td className="text-right">
                              {" "}
                              {timing_of_participation.length > 0
                                ? timing_of_participation.map(
                                    (data, index, arr) =>
                                      data +
                                      (arr.length - 1 === index ? "" : ", ")
                                  )
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>Hours spent per week</th>

                            <td className="text-right">
                              {" "}
                              {hour_spent_week ? hour_spent_week : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>Weeks spent per year</th>
                            <td className="text-right">
                              {" "}
                              {week_spent_year ? week_spent_year : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              {" "}
                              I intend to participate in a similar activity in
                              college.
                            </th>
                            <td className="text-right">
                              {" "}
                              {participate_similar_activity
                                ? participate_similar_activity == "true"
                                  ? "Yes"
                                  : "No"
                                : "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane active" id="get">
          <div className="row">
            {siteView === "Student" ? (
              <div
                className="col-md-12 pl-3 pr-0 collapse width show profile-sidebar"
                id="sidebar"
              >
                <div
                  className="new list-group border-0 text-center text-md-left accordion d-flex flex-row border-top-0"
                  id="exampleAccordion"
                >
                  {loaded
                    ? Student_SIDEBAR.map((data, index) => (
                        <div key={index}>
                          <div id="exItem1Header">
                            <Link
                              to={data.route + studentId}
                              className="list-group-item d-inline-block collapsed"
                              data-toggle={data.subMenu ? "collapse" : ""}
                              data-target={"#exItem" + data.id}
                              aria-expanded="false"
                              aria-controls="exItem1"
                            >
                              <img src={base + data.img} />
                              <span className="d-none d-xl-inline">
                                {data.name}
                              </span>
                            </Link>
                          </div>
                          {data.subMenu ? (
                            <div
                              id={"exItem" + data.id}
                              className="collapse sub-menu-sec"
                              aria-labelledby="exItem1Header"
                              data-parent="#exampleAccordion"
                              aria-expanded="false"
                            >
                              {data.subMenu.map((sub, index) => (
                                <Link
                                  key={index}
                                  to={sub.route + studentId}
                                  className="list-group-item"
                                  role="tab"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            ) : (
              loaded
            )}
            <div
              className={
                view == "Student" ? "col-md-12 inner_box mt-4" : "col-md-12"
              }
            >
              <div className="page-breadcrumb new">
                <div className="row">
                  <div className="col-md-12 align-self-center">
                    <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                      Extra Curricular Activities
                    </h3>
                    <div className="d-flex align-items-center">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 p-0">
                          <li className="breadcrumb-item">
                            <Link
                              to={"/home/" + studentId}
                              className="text-muted"
                            >
                              Home
                            </Link>
                          </li>
                          <li
                            className="breadcrumb-item text-muted active"
                            aria-current="page"
                          >
                            <Link
                              to={"/home/extra-curricular/" + studentId}
                              className="breadcrumb-item text-muted active"
                            >
                              Activities
                            </Link>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aboutme-profile mt-4">
                <div className="card">
                  <div className="page-title card-header">
                    <h5>Activities</h5>
                  </div>
                  {view == "Student" ? (
                    activity_array.length <= 0 ? (
                      <div className="card-body ">
                        <div className="nodata text-center">
                          <img
                            src={base + "/assets/img/nodata.png"}
                            className="img-fluid"
                          />
                          <h4 className="font300">No Activities Added</h4>
                          <br />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <ul className="inlineblock">
                          {activity_array.map((data, index) => (
                            <li key={index}>
                              <div className="activitytab d-md-flex align-items-center">
                                <div
                                  className="title title-new"
                                  data-toggle="modal"
                                  data-target="#viewactivitiy"
                                  onClick={() => {
                                    this.setState({
                                      id: data._id,
                                      showMain: "show",
                                    });
                                    this.editStateHandler(index);
                                  }}
                                >
                                  <a>
                                    {data.activity_type
                                      ? data.activity_type
                                      : "Activity" + index + 1}
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {showMain == "show" ? (
                          <div
                            className="modal"
                            id="viewactivitiy"
                            data-backdrop="static"
                          >
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="card">
                                    <div className="card-header">
                                      <h4>
                                        {activity_type}{" "}
                                        <span className="float-right">
                                          <button
                                            type="button"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            className="close"
                                            onClick={() => {
                                              this.resetActivity();
                                              this.setState({ showMain: "" });
                                            }}
                                          >
                                            <span aria-hidden="true">
                                              &times;
                                            </span>
                                            {/* <i className="fa fa-trash"></i> */}
                                          </button>
                                        </span>
                                      </h4>
                                    </div>
                                    <div className="card-body p-0">
                                      <div className="table-responsive">
                                        <table className="table table-striped text-left">
                                          <tbody>
                                            <tr>
                                              <th>
                                                {" "}
                                                Position/Leadership description
                                              </th>
                                              <td className="text-right">
                                                {" "}
                                                {position_description
                                                  ? position_description
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>Organization Name</th>
                                              <td className="text-right">
                                                {" "}
                                                {organization_name
                                                  ? organization_name
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>
                                                Please describe this activity,
                                                including what you accomplished
                                                and any recognition you
                                                received, etc.
                                              </th>
                                              <td className="text-right">
                                                {" "}
                                                {describe_activity
                                                  ? describe_activity
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>
                                                Participation grade levels
                                              </th>
                                              <td className="text-right">
                                                {" "}
                                                {participation_grade_level.length >
                                                0
                                                  ? participation_grade_level.map(
                                                      (data, index, arr) =>
                                                        data +
                                                        (arr.length - 1 ===
                                                        index
                                                          ? ""
                                                          : ", ")
                                                    )
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>Timing of participation</th>
                                              <td className="text-right">
                                                {" "}
                                                {timing_of_participation.length >
                                                0
                                                  ? timing_of_participation.map(
                                                      (data, index, arr) =>
                                                        data +
                                                        (arr.length - 1 ===
                                                        index
                                                          ? ""
                                                          : ", ")
                                                    )
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>Hours spent per week</th>

                                              <td className="text-right">
                                                {" "}
                                                {hour_spent_week
                                                  ? hour_spent_week
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>Weeks spent per year</th>
                                              <td className="text-right">
                                                {" "}
                                                {week_spent_year
                                                  ? week_spent_year
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                            <tr>
                                              <th>
                                                {" "}
                                                I intend to participate in a
                                                similar activity in college.
                                              </th>
                                              <td className="text-right">
                                                {" "}
                                                {participate_similar_activity
                                                  ? participate_similar_activity ==
                                                    "true"
                                                    ? "Yes"
                                                    : "No"
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  ) : (
                    <div className="card-body">
                      <p>
                        Reporting activities can help colleges better understand
                        your life outside of the classroom. Examples of
                        activities might include:
                      </p>
                      <div className="about-title mb-3">
                        <ul className="mb-0">
                          <li>
                            <i className="flaticon-right-arrow"></i> Arts or
                            music
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Clubs
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Community
                            engagement
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Family
                            responsibilities <a href="#">(learn more)</a>
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Hobbies
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Sports
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Work or
                            volunteering
                          </li>
                          <li>
                            <i className="flaticon-right-arrow"></i> Other
                            experiences that have been meaningful to you
                          </li>
                        </ul>
                      </div>
                      {activity_array.length <= 0 ? (
                        <div className="row">
                          <div className="col-xl-8">
                            <div className="form-group">
                              <label>
                                Do you have any activities that you wish to
                                report?
                              </label>
                              <div>
                                <span>
                                  <input
                                    type="radio"
                                    name="agree"
                                    onChange={() => {
                                      this.setState({
                                        show: true,
                                      });
                                    }}
                                  />{" "}
                                  Yes
                                </span>
                                &nbsp;&nbsp;
                                <span>
                                  <input
                                    type="radio"
                                    name="agree"
                                    onChange={() => {
                                      this.setState({
                                        show: false,
                                        add_activity: false,
                                      });
                                    }}
                                  />{" "}
                                  No
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {show ? (
                        <div>
                          <hr />
                          <h5 className="font500">
                            Please list your activities in the order of their
                            importance to you.
                          </h5>
                        </div>
                      ) : (
                        ""
                      )}
                      {activity_array.length > 0 ? (
                        <ul className="inlineblock">
                          {activity_array.map((data, index) => (
                            <li key={index}>
                              <div className="activitytab d-md-flex align-items-center">
                                <div
                                  className="title"
                                  data-toggle="modal"
                                  data-target="#viewactivities"
                                  onClick={() => {
                                    this.setState({
                                      id: data._id,
                                      showMain: "show",
                                    });
                                    this.editStateHandler(index);
                                  }}
                                >
                                  <a>
                                    {data.activity_type
                                      ? data.activity_type
                                      : "Activity" + index + 1}
                                  </a>
                                </div>
                                <div className="rightdata">
                                  <button
                                    type="button"
                                    className="edit-btn default-btn "
                                  >
                                    <i
                                      title="Edit"
                                      className="fa fa-pencil"
                                      data-toggle="modal"
                                      data-target="#activities"
                                      onClick={() => {
                                        this.editStateHandler(index);
                                        this.setState({
                                          id: data._id,
                                          showMain: "add",
                                        });
                                      }}
                                    ></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="edit-btns default-btn student-btn"
                                  >
                                    <i
                                      title="Delete"
                                      className="fa fa-trash"
                                      onClick={(e) =>
                                        this.deleteHandler(e, data._id)
                                      }
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                      {/* {showMain == "show" ? ( */}

                      {/* ) : (
                    ""
                  )} */}

                      {show ? (
                        <div>
                          <hr />

                          <h4>
                            <button
                              id="add"
                              className="default-btn add-more uppercase"
                              type="button"
                              data-toggle="modal"
                              data-target="#activities"
                              onClick={() => {
                                this.setState({
                                  which_model: "add",
                                  add_activity: true,
                                  showMain: "add",
                                });
                                this.resetActivity();
                              }}
                            >
                              {activity_array.length <= 0
                                ? "+ Add Activity"
                                : "+ Add more Activities"}
                            </button>
                          </h4>
                        </div>
                      ) : (
                        ""
                      )}

                      <div id="items"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="preloader">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
