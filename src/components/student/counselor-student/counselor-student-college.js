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
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import Paginate from "../../pagination/pagination";
import { Student_SIDEBAR } from "../../../globals/constant";
import loadOptions from "./loadOptions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default class StudentColleges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college_list_array: [],
      offset: 0,
      alllimit: 9,
      myCollegeLimit: 6,
      searchCollege: "",
      loading: false,
      dream_collegeSelect: [],
      safety_collegeSelect: [],
      target_collegeSelect: [],
      dreamCollegeArray: [],
      safetyCollegeArray: [],
      targetCollegeArray: [],
      dreamCount: "",
      safetyCount: "",
      targetCount: "",
      dCount: "",
      sCount: "",
      tCount: "",
      targetshowingPageNo: "1",
      safetyshowingPageNo: "1",
      dreamshowingPageNo: "1",
      view: "",
      studentId: "",
      dreamIcon: true,
      safetyIcon: false,
      targetIcon: false,
      loaded: false,
    };
  }
  resetActivity = () => {};
  UNSAFE_componentWillMount = () => {
    let id = null;
    if (this.props.match.params.id && this.props.siteView != "Student") {
      this.props.history.push("/home");
    }
    if (this.props.siteView == "Student") {
      if (this.props.match.params.id) {
        id = this.props.match.params.id;
        this.setState({ view: "Student" });
      }
    }
    const { alllimit, myCollegeLimit } = this.state;
    if (
      this.props.match.params.id &&
      this.props.siteView != "Student" &&
      !this.props.studentId
    ) {
      this.props.history.push("/home");
    }
    if (this.props.siteView == "Student" && this.props.studentId) {
      if (this.props.match.params.id) {
        id = this.props.match.params.id;
        this.setState({ view: "Student", studentId: id, loaded: true }, () => {
          this.getDreamCollegeSelectedById();
          this.getSafetyCollegeSelectedById();
          this.getTargetCollegeSelectedById();
        });
      }
    } else {
      this.getColleges(alllimit);
      this.getDreamCollegeSelected();
      this.getSafetyCollegeSelected();
      this.getTargetCollegeSelected();
    }
  };
  getDreamCollegeSelectedById = (offset, filter) => {
    const { myCollegeLimit, studentId } = this.state;

    UserService.getSelectedCollegesById(
      myCollegeLimit,
      offset,
      filter,
      "dream",
      studentId
    )
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            let arr = response.colleges;
            this.setState({
              dreamCollegeArray: response.colleges,
              dreamCount: response.collegeCount,
            });
            this.setState({ dream_collegeSelect: [] });
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                dream_collegeSelect: [...prevState.dream_collegeSelect, data1],
              }));
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getSafetyCollegeSelectedById = (offset, filter) => {
    const { myCollegeLimit, studentId } = this.state;
    UserService.getSelectedCollegesById(
      myCollegeLimit,
      offset,
      filter,
      "safety",
      studentId
    )
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({
              safetyCollegeArray: response.colleges,
              safetyCount: response.collegeCount,
            });

            let arr = response.colleges;
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                safety_collegeSelect: [
                  ...prevState.safety_collegeSelect,
                  data1,
                ],
              }));
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getTargetCollegeSelectedById = (offset, filter) => {
    const { myCollegeLimit, studentId } = this.state;
    UserService.getSelectedCollegesById(
      myCollegeLimit,
      offset,
      filter,
      "target",
      studentId
    )
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({
              targetCollegeArray: response.colleges,
              targetCount: response.collegeCount,
            });
            let arr = response.colleges;
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                target_collegeSelect: [
                  ...prevState.target_collegeSelect,
                  data1,
                ],
              }));
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getDreamCollegeSelected = (offset, filter) => {
    const { myCollegeLimit } = this.state;

    UserService.getSelectedColleges(myCollegeLimit, offset, filter, "dream")
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            let arr = response.colleges;
            this.setState(
              {
                dreamCollegeArray: response.colleges,
                dreamCount: response.collegeCount,
              },
              () => {
                this.setState({ dream_collegeSelect: [] });
              }
            );

            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                dream_collegeSelect: [...prevState.dream_collegeSelect, data1],
              }));
            });
          } else {
            this.setState({ dreamCollegeArray: [], dreamCount: 0 });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getSafetyCollegeSelected = (offset, filter) => {
    const { myCollegeLimit } = this.state;
    UserService.getSelectedColleges(myCollegeLimit, offset, filter, "safety")
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState(
              {
                safetyCollegeArray: response.colleges,
                safetyCount: response.collegeCount,
              },
              () => {
                this.setState({ safety_collegeSelect: [] });
              }
            );

            let arr = response.colleges;
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                safety_collegeSelect: [
                  ...prevState.safety_collegeSelect,
                  data1,
                ],
              }));
            });
          } else {
            this.setState({ safetyCollegeArray: [], safetyCount: 0 });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getTargetCollegeSelected = (offset, filter) => {
    const { myCollegeLimit } = this.state;
    UserService.getSelectedColleges(myCollegeLimit, offset, filter, "target")
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState(
              {
                targetCollegeArray: response.colleges,
                targetCount: response.collegeCount,
              },
              () => {
                this.setState({ target_collegeSelect: [] });
              }
            );
            let arr = response.colleges;
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId,
              };
              this.setState((prevState) => ({
                target_collegeSelect: [
                  ...prevState.target_collegeSelect,
                  data1,
                ],
              }));
            });
          } else {
            this.setState({ targetCollegeArray: [], targetCount: 0 });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getColleges = (limit, offset, filter) => {
    UserService.getColleges(limit, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ college_list_array: response.colleges });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  onChange = (datas, types) => {
    this.setState({ [types]: datas });
    let obj = {};
    if (types == "dream_collegeSelect") {
      obj = { $addToSet: { dream: [{ value: datas }] } };
    }
    if (types == "safety_collegeSelect") {
      obj = { $addToSet: { safety: [{ value: datas }] } };
    }
    if (types == "target_collegeSelect") {
      obj = { $addToSet: { target: [{ value: datas }] } };
    }
    UserService.addCollegeSelect(obj)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              success: true,
              loading: false,
            });
            this.getDreamCollegeSelected();
            this.getSafetyCollegeSelected();
            this.getTargetCollegeSelected();
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  showmore = (e) => {
    const {
      offset,
      alllimit,
      filter,
      limits,
      college_list_array,
      searchCollege,
    } = this.state;
    this.setState({ offset: offset + 1 }, () => {
      UserService.getColleges(alllimit, offset, searchCollege)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              let arr = this.state.college_list_array.concat(response.colleges);
              this.setState({ college_list_array: arr }, () => {});
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    });
  };
  _searchHandler = (e) => {
    const { name, value } = e.target;
    const { alllimit } = this.state;
    this.setState({ [name]: value });
    this.getColleges(alllimit, "", value);
  };
  saveCollegeSelect = (e) => {
    e.preventDefault();
    let dream_collegeSelect1 = [];
    let safety_collegeSelect1 = [];
    let target_collegeSelect1 = [];

    this.setState({ loading: true });
    const {
      loading,
      dream_collegeSelect,
      safety_collegeSelect,
      target_collegeSelect,
    } = this.state;
    dream_collegeSelect.map((data, index) => {
      dream_collegeSelect1.push(data.data);
    });
    safety_collegeSelect.map((data, index) => {
      safety_collegeSelect1.push(data.data);
    });
    target_collegeSelect.map((data, index) => {
      target_collegeSelect1.push(data.data);
    });
    let data = {
      dream: dream_collegeSelect,
      safety: safety_collegeSelect,
      target: target_collegeSelect,
    };
    UserService.addCollegeSelect(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              success: true,
              loading: false,
            });
            this.getDreamCollegeSelected();
            this.getSafetyCollegeSelected();
            this.getTargetCollegeSelected();
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  resetCollegeSelect = () => {
    this.setState({
      dream_collegeSelect: [],
      safety_collegeSelect: [],
      target_collegeSelect: [],
    });
  };
  handlePageChange = (data, type) => {
    let selected = data.selected;
    selected = selected + 1;
    // this.setState({ selectedPage: selected });
    if (type === "dream") {
      this.setState({ dreamshowingPageNo: selected });
      this.getDreamCollegeSelected(selected);
    } else if (type === "safety") {
      this.setState({ safetyshowingPageNo: selected });

      // this.getSafetyCollegeSelected(selected);
    } else {
      this.setState({ targetshowingPageNo: selected });

      // this.getTargetCollegeSelected(selected);
    }
  };
  deleteHandler = (id, type) => {
    UserService.removeCollgeCat(id, type)
      .then((response) => {
        if (response.data.success) {
          showNotification("success", response.message);
          this.getDreamCollegeSelected();
          this.getSafetyCollegeSelected();
          this.getTargetCollegeSelected();
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  clickIcon = (value, type) => {
    if (value) {
      this.setState({
        dreamIcon: false,
        safetyIcon: false,
        targetIcon: false,
        [type + "Icon"]: false,
      });
    } else {
      this.setState({
        dreamIcon: false,
        safetyIcon: false,
        targetIcon: false,
        [type + "Icon"]: true,
      });
    }
  };

  pageChange = (id) => {
    this.props.history.push("/home/college-details/" + id);
  };

  render() {
    const {
      view,
      college_list_array,
      searchCollege,
      loading,
      dream_collegeSelect,
      safety_collegeSelect,
      target_collegeSelect,
      dreamCollegeArray,
      targetCollegeArray,
      safetyCollegeArray,
      targetshowingPageNo,
      dreamshowingPageNo,
      safetyshowingPageNo,
      dreamCount,
      safetyCount,
      targetCount,
      dreamIcon,
      safetyIcon,
      loaded,
      targetIcon,
    } = this.state;
    const { siteView, studentId } = this.props;
    return (
      <div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Choose Catagory</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="sel1">Dreams</label>
                      <AsyncPaginate
                        value={dream_collegeSelect}
                        loadOptions={loadOptions}
                        isMulti
                        onChange={(data) =>
                          this.onChange(data, "dream_collegeSelect")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="sel1">Safety</label>
                      <AsyncPaginate
                        value={safety_collegeSelect}
                        loadOptions={loadOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(data) =>
                          this.onChange(data, "safety_collegeSelect")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="sel1">Target</label>
                      <AsyncPaginate
                        value={target_collegeSelect}
                        loadOptions={loadOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(data) =>
                          this.onChange(data, "target_collegeSelect")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="sel1">Status</label>
                      <AsyncPaginate
                        value={safety_collegeSelect}
                        loadOptions={loadOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(data) =>
                          this.onChange(data, "safety_collegeSelect")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={(e) => {
                    this.saveCollegeSelect(e);
                  }}
                  className="default-btn"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    this.resetCollegeSelect();
                  }}
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {siteView == "Student" ? (
          <div className="col-md-3 pl-0 pr-0 collapse width show" id="sidebar">
            <div
              className="list-group border-0 text-center text-md-left accordion"
              id="exampleAccordion"
            >
              {Student_SIDEBAR.map((data, index) => (
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
                      <span className="d-none d-md-inline">{data.name}</span>
                    </Link>
                  </div>
                  {data.subMenu ? (
                    <div
                      id={"exItem" + data.id}
                      className="collapse"
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
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-md-12 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Collage Applied
              </h3>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li className="breadcrumb-item">
                      <Link to={"/home"} className="text-muted">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item text-muted active"
                      aria-current="page"
                    >
                      <Link
                        to={"/home/college-applied"}
                        className="breadcrumb-item text-muted active"
                      >
                        College Applied
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-pane in active" id="ucla">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-xl-3 col-md-4 mb-3 text-center">
                  <div className="outerarea">
                    <h5>UC Berkeley</h5>
                    <div className="progress" data-percentage="74">
                      <span className="progress-left">
                        <span className="progress-bar"></span>
                      </span>
                      <span className="progress-right">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">
                        <div>
                          74%
                          <br />
                          <span>completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3  col-md-4 mb-3 text-center">
                  <div className="outerarea pinkbox">
                    <h5>Stranford</h5>
                    <div className="progress" data-percentage="82">
                      <span className="progress-left pinkbar">
                        <span className="progress-bar"></span>
                      </span>
                      <span className="progress-right pinkbar">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">
                        <div>
                          82%
                          <br />
                          <span>completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3  col-md-4 mb-3 text-center">
                  <div className="outerarea bluebox">
                    <h5>Oxford</h5>
                    <div className="progress" data-percentage="90">
                      <span className="progress-left bluebar">
                        <span className="progress-bar"></span>
                      </span>
                      <span className="progress-right bluebar">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">
                        <div>
                          90%
                          <br />
                          <span>completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 mb-3 text-center">
                  <div className="outerarea greenbox">
                    <h5>UCLA</h5>
                    <div className="progress" data-percentage="67">
                      <span className="progress-left greenbar">
                        <span className="progress-bar"></span>
                      </span>
                      <span className="progress-right greenbar">
                        <span className="progress-bar"></span>
                      </span>
                      <div className="progress-value">
                        <div>
                          67%
                          <br />
                          <span>completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div id="accordion" className="myaccordion">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="d-flex align-items-center justify-content-between btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => this.clickIcon(dreamIcon, "dream")}
                      >
                        Dream
                        <span className="fa-stack fa-sm">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i
                            className={
                              dreamIcon
                                ? "fa fa-minus fa-stack-1x fa-inverse"
                                : "fa fa-plus fa-stack-1x fa-inverse"
                            }
                          ></i>
                        </span>
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="row pt-3">
                        {dreamCollegeArray && dreamCollegeArray.length
                          ? dreamCollegeArray.map((data, index) => (
                              <div key={index} className="col-xl-4 col-md-6">
                                <Link
                                  to={{
                                    pathname: `/home/college-details/${data.collegeUnitId}`,
                                  }}
                                >
                                  <div className="single-services">
                                    <img
                                      src={
                                        data.campusImage
                                          ? data.campusImage
                                          : " "
                                      }
                                      alt=""
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        this.pageChange(data.collegeUnitId)
                                      }
                                    />
                                    <div className="service-text">
                                      <h3
                                        style={{ cursor: "pointer" }}
                                        className="text-white"
                                        onClick={(e) =>
                                          this.pageChange(data.collegeUnitId)
                                        }
                                      >
                                        {data.name ? data.name : "College Name"}
                                      </h3>
                                    </div>
                                    <div className="hover-icon hover-icon-new">
                                      <a
                                        onClick={() =>
                                          this.deleteHandler(
                                            data.collegeUnitId,
                                            "dream"
                                          )
                                        }
                                      >
                                        <i className="fa fa-close"></i>
                                      </a>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))
                          : "Please Add "}
                      </div>
                      {dreamCount > 6 ? (
                        <Paginate
                          page={
                            dreamCount
                              ? dreamCount < 6
                                ? 1
                                : dreamCount / 6
                              : ""
                          }
                          handlePageClick={(data) =>
                            this.handlePageChange(data, "dream")
                          }
                          forcepage={this.state.dreamshowingPageNo - 1}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="d-flex align-items-center justify-content-between btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                        onClick={() => this.clickIcon(safetyIcon, "safety")}
                      >
                        Safety
                        <span className="fa-stack fa-sm">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i
                            className={
                              safetyIcon
                                ? "fa fa-minus fa-stack-1x fa-inverse"
                                : "fa fa-plus fa-stack-1x fa-inverse"
                            }
                          ></i>
                        </span>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="row pt-3">
                        {safetyCollegeArray.length
                          ? safetyCollegeArray.map((data, index) => (
                              <div key={index} className="col-xl-4 col-md-6">
                                <div className="single-services">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    src={data.campusImage}
                                    alt=""
                                    onClick={(e) =>
                                      this.pageChange(data.collegeUnitId)
                                    }
                                  />

                                  <div className="service-text">
                                    <h3
                                      style={{ cursor: "pointer" }}
                                      className="text-white"
                                      onClick={(e) =>
                                        this.pageChange(data.collegeUnitId)
                                      }
                                    >
                                      {data.name ? data.name : "College Name"}
                                    </h3>
                                  </div>
                                  <div className="hover-icon hover-icon-new">
                                    <a
                                      onClick={() =>
                                        this.deleteHandler(
                                          data.collegeUnitId,
                                          "safety"
                                        )
                                      }
                                    >
                                      <i className="fa fa-close"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))
                          : "Please Add "}
                      </div>
                      {safetyCount > 6 ? (
                        <Paginate
                          page={
                            safetyCount
                              ? safetyCount < 6
                                ? 1
                                : safetyCount / 6
                              : ""
                          }
                          handlePageClick={(data) =>
                            this.handlePageChange(data, "safety")
                          }
                          forcepage={this.state.safetyshowingPageNo - 1}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="d-flex align-items-center justify-content-between btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                        onClick={() => this.clickIcon(targetIcon, "target")}
                      >
                        Target
                        <span className="fa-stack fa-sm">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i
                            className={
                              targetIcon
                                ? "fa fa-minus fa-stack-1x fa-inverse"
                                : "fa fa-plus fa-stack-1x fa-inverse"
                            }
                          ></i>
                        </span>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="row pt-3">
                        {targetCollegeArray.length
                          ? targetCollegeArray.map((data, index) => (
                              <div key={index} className="col-xl-4 col-md-6">
                                <Link
                                  to={{
                                    pathname: `/home/college-details/${data.collegeUnitId}`,
                                  }}
                                >
                                  <div className="single-services">
                                    <img
                                      style={{ cursor: "pointer" }}
                                      src={data.campusImage}
                                      alt=""
                                      onClick={(e) =>
                                        this.pageChange(data.collegeUnitId)
                                      }
                                    />

                                    <div className="service-text">
                                      <h3
                                        style={{ cursor: "pointer" }}
                                        className="text-white"
                                        onClick={(e) =>
                                          this.pageChange(data.collegeUnitId)
                                        }
                                      >
                                        {data.name ? data.name : "College Name"}
                                      </h3>
                                    </div>
                                    <div className="hover-icon hover-icon-new">
                                      <a
                                        onClick={() =>
                                          this.deleteHandler(
                                            data.collegeUnitId,
                                            "target"
                                          )
                                        }
                                      >
                                        <i className="fa fa-close"></i>
                                      </a>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))
                          : "Please Add "}
                      </div>
                      {targetCount > 6 ? (
                        <Paginate
                          page={
                            targetCount
                              ? targetCount < 6
                                ? 1
                                : targetCount / 6
                              : ""
                          }
                          handlePageClick={(data) =>
                            this.handlePageChange(data, "target")
                          }
                          forcepage={this.state.targetshowingPageNo - 1}
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

          {view == "Student" ? (
            ""
          ) : (
            <div className="card mt-3">
              <div className="card-header ">
                <h5 className="">
                  All Colleges{" "}
                  <span className="float-right">
                    <span className="mb-2">
                      <div className="ui left icon input swdh10">
                        <input
                          className="prompt srch10 mt-0"
                          type="text"
                          placeholder="Search..."
                          name="searchCollege"
                          value={searchCollege}
                          onChange={(e) => {
                            this._searchHandler(e);
                          }}
                        />
                        <i className="fa fa-search icon icon1 icon-new"></i>
                      </div>
                    </span>
                  </span>
                </h5>
              </div>
              <div className="card-body">
                <div className="row pt-3">
                  {college_list_array.length
                    ? college_list_array.map((data, index) => (
                        <div key={index} className="col-xl-4 col-md-6">
                          <div className="single-services">
                            <div className="absolutedropdownicon">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-plus"></i>
                              </a>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a
                                  className="dropdown-item"
                                  onClick={(datas) =>
                                    this.onChange(
                                      data.collegeUnitId,
                                      "dream_collegeSelect"
                                    )
                                  }
                                >
                                  Dream
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={(datas) =>
                                    this.onChange(
                                      data.collegeUnitId,
                                      "safety_collegeSelect"
                                    )
                                  }
                                >
                                  Safety
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={(datas) =>
                                    this.onChange(
                                      data.collegeUnitId,
                                      "target_collegeSelect"
                                    )
                                  }
                                >
                                  Target
                                </a>
                              </div>
                            </div>

                            <img
                              style={{ cursor: "pointer" }}
                              src={data.campusImage}
                              alt=" "
                              onClick={(e) =>
                                this.pageChange(data.collegeUnitId)
                              }
                            />

                            <div className="service-text">
                              <h3
                                className="text-white"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  this.pageChange(data.collegeUnitId)
                                }
                              >
                                {data.name},{""}
                                {data.city}
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))
                    : "No Result"}
                  {college_list_array.length > 7 ? (
                    <div className="col-md-12 text-center">
                      <button
                        className="default-btn"
                        type="button"
                        onClick={(e) => this.showmore(e)}
                      >
                        Show more
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
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
