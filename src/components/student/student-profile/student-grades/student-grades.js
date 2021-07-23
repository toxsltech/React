/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import * as UserService from "../../../../services/userServices";
import * as constant from "../../../../globals/constant";
import showNotification from "../../../../services/notificationService";

// let serveUrl = apibase;

export default class StudentGrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      testArray: [],
      gradeArray: [],
    };
  }
  componentDidMount = () => {
    this.getUserData();
    this.getGradeArray();
  };

  getUserData = () => {
    this.setState({ loading: true });

    UserService.getTestTaken()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            let test = response.data;
            let indexArray = [];
            this.setState({ testArray: test, loading: false });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getGradeArray = () => {
    this.setState({ loading: true });
    UserService.getGrades()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ gradeArray: response.data, loading: false });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  render() {
    const { add_activity, testArray, gradeArray } = this.state;
    return (
      <div className="tab-pane active" id="test-scores">
        <div className="card">
          <div className="page-title card-header">
            <h5>
              Grades and Course
              <span className="float-right">
                <button
                  type="button"
                  className="default-btn"
                  onClick={() => {
                    this.props.history.push("/student/test-score");
                  }}
                >
                  + Click here to add grades
                </button>
              </span>{" "}
            </h5>
          </div>
          <div className="card-body p-0">
            {gradeArray.length <= 0 ? (
              <div className="nodata text-center">
                <img src={"/assets/img/nodata.png"} className="img-fluid" />
                <h4 className="font300">No Grades Added</h4>
                <br />
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped text-left">
                  <tr>
                    <th>Grades</th>
                    <th className="text-right">Cumulative Gpa</th>
                  </tr>

                  {gradeArray.map((data, index) => (
                    <tr>
                      <td>{data.grade}</td>
                      <td className="text-right">{data.gpa}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
        {testArray.length > 0 ? (
          <div className="card">
            <div className="card-body">
              <div className="datashown text-center">
                <div className="card">
                  {testArray.map((data, index) => (
                    <div>
                      <div className="card-header">
                        <h4>
                          {data.test_type === "act"
                            ? "Act"
                            : data.test_type === "sat"
                            ? "Sat"
                            : data.test_type === "ap"
                            ? "Ap"
                            : ""}{" "}
                        </h4>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          {data.test_type === "act" ? (
                            <table className="table table-striped text-left">
                              <tr>
                                <th>Highest Composite score</th>
                                <td className="text-center">
                                  {data.act_high_composite_score
                                    ? data.act_high_composite_score
                                    : "..."}
                                </td>
                              </tr>
                              <tr>
                                <th>Highest English score</th>
                                <td className="text-center">
                                  {data.act_high_english_score
                                    ? data.act_high_english_score
                                    : "..."}
                                </td>
                              </tr>
                              <tr>
                                <th>Highest Math score</th>
                                <td className="text-center">
                                  {data.act_highest_math_score
                                    ? data.act_highest_math_score
                                    : "..."}
                                </td>
                              </tr>
                              <tr>
                                <th>Highest Reading score</th>
                                <td className="text-center">
                                  {data.act_highest_reading_score
                                    ? data.act_highest_reading_score
                                    : "..."}
                                </td>
                              </tr>

                              <tr>
                                <th>Highest Science score</th>
                                <td className="text-center">
                                  {data.act_highest_science_score
                                    ? data.act_highest_science_score
                                    : "..."}
                                </td>
                              </tr>

                              <tr>
                                <th>Highest Writing score</th>
                                <td className="text-center">
                                  {data.act_highest_writing_score
                                    ? data.act_highest_writing_score
                                    : "..."}
                                </td>
                              </tr>
                            </table>
                          ) : data.test_type === "sat" ? (
                            <table className="table table-striped text-left">
                              <tr>
                                <th>Highest Reading score</th>
                                <td>
                                  {data.sat_high_critical_reading_score
                                    ? data.sat_high_critical_reading_score
                                    : "..."}
                                </td>
                              </tr>

                              <tr>
                                <th>Highest Math score</th>
                                <td>
                                  {data.sat_highest_math_score
                                    ? data.sat_highest_math_score
                                    : "..."}
                                </td>
                              </tr>

                              <tr>
                                <th>Highest Writing score</th>
                                <td>
                                  {data.sat_highest_writing_score
                                    ? data.sat_highest_writing_score
                                    : "..."}
                                </td>
                              </tr>
                            </table>
                          ) : (
                            <table className="table table-striped text-left">
                              <tr>
                                <th>Ap Score</th>
                                <td className="text-center">
                                  {data.ap_score ? data.ap_score : "..."}
                                </td>
                              </tr>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
