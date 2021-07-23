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
import { Student_SIDEBAR } from "../../../globals/constant";
import ReactPaginate from "react-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import Paginate from "../../pagination/pagination";
import loadOptions from "./loadOptions";
import config from "../../../globals/config";
export default class StudentCollegeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeDetails: "",
      collegeId: "",
      view: "",
      studentId: "",
      loaded: false,
    };
  }

  componentDidMount = () => {
    if (this.props.siteView == "Student" && this.props.studentId) {
      if (this.props.match.params.id) {
        this.setState({
          view: "Student",
          studentId: this.props.studentId,
          loaded: true,
        });
      }
    }
    window.scrollTo(0, 0);
    if (this.props.match.params.id) {
      this.setState({ collegeId: this.props.match.params.id });
      this.getCollegeDetails(this.props.match.params.id);
    }
  };

  onChange = (datas, types) => {
    this.setState({ [types]: datas });
    let obj = {};
    // if (types == "dream_collegeSelect") {
    //   obj = { $addToSet: { dream: [{ value: datas }] } };
    // }
    // if (types == "safety_collegeSelect") {
    //   obj = { $addToSet: { safety: [{ value: datas }] } };
    // }
    // if (types == "target_collegeSelect") {
    //   obj = { $addToSet: { target: [{ value: datas }] } };
    // }
    if (types == "dream_collegeSelect") {
      obj = { dream: [{ value: datas }] };
    }
    if (types == "safety_collegeSelect") {
      obj = { safety: [{ value: datas }] };
    }
    if (types == "target_collegeSelect") {
      obj = { target: [{ value: datas }] };
    }
    UserService.addCollegeSelect(obj)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            // showNotification("success",response.message)
          }
        }
      })
      .catch((err) => {
        console.log(err, "err");
        showNotification("danger", constant.ERRORMSG);
      });
  };

  getCollegeDetails = async (collegeId) => {
    UserService.getCollegeDetails(collegeId)
      .then((response) => {
        if (response.data.success)
          this.setState({
            collegeDetails: response?.data?.data ?? response?.data?.colleges[0],
          });
      })
      .catch((err) => {
        showNotification("danger", err ? err : constant.ERRORMSG);
      });
  };

  render() {
    const { collegeDetails, collegeId, loaded, view, studentId } = this.state;
    return (
      <div>
        <div className="row">
          {view === "Student" ? (
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
            <div className="page-breadcrumb">
              <div className="row">
                <div className="col-md-12 align-self-center">
                  <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                    College
                  </h3>
                  <span class="float-right">
                    <div className="absolutedropdownicon relativediv">
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
                              collegeDetails?.collegeUnitId ??
                                collegeDetails?._id,
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
                              collegeDetails?.collegeUnitId ??
                                collegeDetails?._id,
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
                              collegeDetails?.collegeUnitId ??
                                collegeDetails?._id,
                              "target_collegeSelect"
                            )
                          }
                        >
                          Target
                        </a>
                      </div>
                    </div>
                  </span>

                  <div className="d-flex align-items-center">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb m-0 p-0">
                        <li className="breadcrumb-item">
                          <Link to={"/home"} className="text-muted">
                            Home
                          </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                          <Link
                            to={"/home/college-applied/" + studentId}
                            className="text-muted"
                          >
                            College Applied
                          </Link>
                        </li>

                        <li
                          className="breadcrumb-item text-muted active"
                          aria-current="page"
                        >
                          <Link
                            to={"/home/college-details/" + collegeId}
                            className="breadcrumb-item text-muted active"
                          >
                            {collegeDetails?.name}
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
                    <div className="col-xl-4 col-md-4 mb-3 text-center">
                      <img
                        src={
                          collegeDetails?.campusImage ??
                          config + "/" + collegeDetails?.img
                        }
                      ></img>
                    </div>
                    <div className="col-xl-8  col-md-8 mb-3 text-left table-responsive">
                      <table className="table table-striped tablecustom">
                        <tbody>
                          <tr>
                            <th>College Id</th>
                            <td>
                              {collegeDetails?.collegeId ?? collegeDetails?._id}
                            </td>
                          </tr>
                          <tr>
                            <th>College Name</th>
                            <td>
                              <b>{collegeDetails?.name}</b>
                            </td>
                          </tr>
                          {collegeDetails?.city ? (
                            <tr>
                              <th>Address</th>
                              <td>{collegeDetails?.city}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          {collegeDetails?.region ? (
                            <tr>
                              <th>Region</th>
                              <td>{collegeDetails?.region}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <th>Calendar System</th>
                            <td>{collegeDetails?.calendarSystem}</td>
                          </tr>{" "}
                          <tr>
                            <th>College Website</th>
                            <td>
                              <a
                                href={
                                  "https://" +
                                  collegeDetails?.applicationWebsite
                                }
                                target="_blank"
                              >
                                {collegeDetails?.applicationWebsite}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th>Private</th>
                            <td>{collegeDetails?.isPrivate ? "Yes" : "No"}</td>
                          </tr>
                          <tr>
                            <th>Course Year</th>
                            <td>{collegeDetails?.typeYear}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {collegeDetails?.longDescription ? (
                      <div className="col-xl-12 mb-3 text-justify">
                        <h5>About</h5>
                        <p>{collegeDetails?.longDescription}</p>
                      </div>
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
    );
  }
}
