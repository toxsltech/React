/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import * as UserService from "../../../../services/userServices";
import * as constant from "../../../../globals/constant";
import showNotification from "../../../../services/notificationService";
import moment from "moment";
// import apibase from "../../globals/config";
import base from "../../../../globals/config";

// let serveUrl = apibase;

export default class StudentTestScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_test_taken: false,
      show_act_test: false,
      show_sat_test: false,
      show_ap_test: false,
      test_international_applicants: "",
      test_is: "",
      test_which: [],
      act_scores: [],
      act_writing_test: "",
      act_settings: "",
      act_composite_score: "",
      act_international_applicants: "",
      act_composite_date: "",
      act_english_score: "",
      act_english_date: "",
      act_math_score: "",
      act_math_date: "",
      act_reading_score: "",
      act_reading_date: "",
      act_science_score: "",
      act_science_date: "",
      act_writing_score: "",
      act_writing_date: "",
      sat_scores: [],
      sat_reading_score: "",
      sat_reading_date: "",
      sat_math_score: "",
      sat_math_date: "",
      sat_writing_score: "",
      sat_writing_date: "",
      ap_number: [],
      ap_date_taken: "",
      ap_subject: "",
      ap_score: "",
      submitted: false,
      test_options: [
        { name: "ACT Tests" },
        { name: "SAT Tests" },
        { name: "AP Subject Tests" },
      ],
      test_selectedValue: [],
      response_test_selectedValue: [],
      act_options: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
      ],
      act_selectedValue: [],
      response_act_selectedValue: [],
      sat_options: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
      ],
      sat_selectedValue: [],
      reponse_sat_selectedValue: [],
      ap_options: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
      ],
      ap_selectedValue: [],
      reponse_ap_selectedValue: [],
    };
  }
  componentDidMount = () => {
    this.getUserData();
  };
  getUserData = () => {
    UserService.getTestTaken()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            let user = response.data;
            this.setState(
              {
                test_is: user.test_taken,
                response_test_selectedValue: user.all_test,
                test_international_applicants: user.usa_study,
                response_act_selectedValue: user.act_past_score_report,
                act_writing_test: user.act_writing_test,
                act_settings: user.future_act_setting,
                act_composite_score: user.act_high_composite_score,
                act_composite_date: user.act_composite_date,
                act_international_applicants: user.act_international_applicants,
                act_english_score: user.act_high_english_score,
                act_english_date: user.act_english_date,
                act_math_score: user.act_highest_math_score,
                act_math_date: user.act_math_date,
                act_reading_score: user.act_highest_reading_score,
                act_reading_date: user.act_reading_date,
                act_science_score: user.act_highest_science_score,
                act_science_date: user.act_science_date,
                act_writing_score: user.act_highest_writing_score,
                act_writing_date: user.act_writing_date,
                reponse_sat_selectedValue: user.sat_past_score_report,
                sat_reading_score: user.sat_high_critical_reading_score,
                sat_reading_date: user.sat_critical_reading_date,
                sat_math_score: user.sat_highest_math_score,
                sat_math_date: user.sat_math_date,
                sat_writing_score: user.sat_highest_writing_score,
                sat_writing_date: user.sat_writing_date,
                reponse_ap_selectedValue: user.ap_past_score_report,
                ap_date_taken: user.ap_taken_planned_date,
                ap_subject: user.ap_subject,
                ap_score: user.ap_score,
              },
              () => {
                for (
                  let i = 0;
                  i < this.state.response_test_selectedValue.length;
                  i++
                ) {
                  let selectedValue = {
                    name: this.state.response_test_selectedValue[i],
                  };
                  this.setState((prevState) => ({
                    test_selectedValue: [
                      ...prevState.test_selectedValue,
                      selectedValue,
                    ],
                  }));
                }
                for (
                  let i = 0;
                  i < this.state.reponse_ap_selectedValue.length;
                  i++
                ) {
                  let selectedValue = {
                    name: this.state.reponse_ap_selectedValue[i],
                  };
                  this.setState((prevState) => ({
                    ap_selectedValue: [
                      ...prevState.ap_selectedValue,
                      selectedValue,
                    ],
                  }));
                }
                for (
                  let i = 0;
                  i < this.state.reponse_sat_selectedValue.length;
                  i++
                ) {
                  let selectedValue = {
                    name: this.state.reponse_sat_selectedValue[i],
                  };
                  this.setState((prevState) => ({
                    sat_selectedValue: [
                      ...prevState.sat_selectedValue,
                      selectedValue,
                    ],
                  }));
                }
                for (
                  let i = 0;
                  i < this.state.response_act_selectedValue.length;
                  i++
                ) {
                  let selectedValue = {
                    name: this.state.response_act_selectedValue[i],
                  };
                  this.setState((prevState) => ({
                    act_selectedValue: [
                      ...prevState.act_selectedValue,
                      selectedValue,
                    ],
                  }));
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
  test_taken_open = () => {
    this.setState({ show_test_taken: true });
  };
  test_taken_close = () => {
    this.setState({ show_test_taken: false });
  };
  test_taken_toggle = () => {
    this.setState({ show_test_taken: !this.state.show_test_taken });
  };

  act_open = () => {
    this.setState({ show_act_test: true });
  };
  act_close = () => {
    this.setState({ show_act_test: false });
  };
  act_toggle = () => {
    this.setState({ show_act_test: !this.state.show_act_test }, () => { });
  };

  sat_open = () => {
    this.setState({ show_sat_test: true });
  };
  sat_close = () => {
    this.setState({ show_sat_test: false });
  };
  sat_toggle = () => {
    this.setState({ show_sat_test: !this.state.show_sat_test });
  };

  ap_open = () => {
    this.setState({ show_ap_test: true });
  };
  ap_close = () => {
    this.setState({ show_ap_test: false });
  };
  ap_toggle = () => {
    this.setState({ show_ap_test: !this.state.show_ap_test });
  };
  formHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  resetTestTaken = () => {
    this.setState({
      submitted: false,
      test_is: "",
      test_which: [],
      test_international_applicants: "",
    });
  };
  resetAct = () => {
    this.setState({
      submitted: false,
      act_scores: [],
      act_writing_test: "",
      act_settings: "",
      act_composite_score: "",
      act_international_applicants: "",
      act_composite_date: "",
      act_english_score: "",
      act_english_date: "",
      act_math_score: "",
      act_math_date: "",
      act_reading_score: "",
      act_reading_date: "",
      act_science_score: "",
      act_science_date: "",
      act_writing_score: "",
      act_writing_date: "",
    });
  };
  resetSat = () => {
    this.setState({
      submitted: false,
      sat_scores: [],
      sat_reading_score: "",
      sat_reading_date: "",
      sat_math_score: "",
      sat_math_date: "",
      sat_writing_score: "",
      sat_writing_date: "",
    });
  };
  resetAp = () => {
    this.setState({
      submitted: false,
      ap_number: [],
      ap_date_taken: "",
      ap_subject: "",
      ap_score: "",
    });
  };
  saveHandler = (e) => {
    this.setState({ submitted: true });
    e.preventDefault();
    const {
      test_international_applicants,
      test_is,
      test_which,
      act_scores,
      act_writing_test,
      act_settings,
      act_composite_score,
      act_international_applicants,
      act_composite_date,
      act_english_score,
      act_english_date,
      act_math_score,
      act_math_date,
      act_reading_score,
      act_reading_date,
      act_science_score,
      act_science_date,
      act_writing_score,
      act_writing_date,
      sat_scores,
      sat_reading_score,
      sat_reading_date,
      sat_math_score,
      sat_math_date,
      sat_writing_score,
      sat_writing_date,
      ap_number,
      ap_date_taken,
      ap_subject,
      ap_score,
    } = this.state;
    if (
      test_international_applicants == "" ||
      test_is == "" ||
      test_which.length <= 0 ||
      act_scores.length <= 0 ||
      act_writing_test == "" ||
      act_settings == "" ||
      act_composite_score == "" ||
      act_international_applicants == "" ||
      act_composite_date == "" ||
      act_english_score == "" ||
      act_english_date == "" ||
      act_math_score == "" ||
      act_math_date == "" ||
      act_reading_score == "" ||
      act_reading_date == "" ||
      act_science_score == "" ||
      act_science_date == "" ||
      act_writing_score == "" ||
      act_writing_date == "" ||
      sat_scores.length <= 0 ||
      sat_reading_score == "" ||
      sat_reading_date == "" ||
      sat_math_score == "" ||
      sat_math_date == "" ||
      sat_writing_score == "" ||
      sat_writing_date == "" ||
      ap_number.length <= 0 ||
      ap_date_taken == "" ||
      ap_subject == "" ||
      ap_score == ""
    ) {
      // return;
    }
    let data = {
      test_taken: test_is,
      all_test: test_which,
      usa_study: test_international_applicants,
      act_past_score_report: act_scores,
      act_writing_test: act_writing_test,
      future_act_setting: act_settings,
      act_high_composite_score: act_composite_score,
      act_composite_date: act_composite_date,
      act_international_applicants: act_international_applicants,
      act_high_english_score: act_english_score,
      act_english_date: act_english_date,
      act_highest_math_score: act_math_score,
      act_math_date: act_math_date,
      act_highest_reading_score: act_reading_score,
      act_reading_date: act_reading_date,
      act_highest_science_score: act_science_score,
      act_science_date: act_science_date,
      act_highest_writing_score: act_writing_score,
      act_writing_date: act_writing_date,
      sat_past_score_report: sat_scores,
      sat_high_critical_reading_score: sat_reading_score,
      sat_critical_reading_date: sat_reading_date,
      sat_highest_math_score: sat_math_score,
      sat_math_date: sat_math_date,
      sat_highest_writing_score: sat_writing_score,
      sat_writing_date: sat_writing_date,
      ap_past_score_report: ap_number,
      ap_taken_planned_date: ap_date_taken,
      ap_subject: ap_subject,
      ap_score: ap_score,
    };
    UserService.addTestTaken(data)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({ success: true });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  onSelect(selectedList, selectedItem, key) {
    if (this.state[key].indexOf(selectedItem.name) == -1) {
      this.state[key].push(selectedItem.name);
    }
    this.setState({ [key]: this.state[key] });
  }

  onRemove = (selectedList, removedItem, key) => {
    let index = this.state[key].indexOf(removedItem.name);
    if (this.state[key].indexOf(removedItem.name) != -1) {
      this.state[key].splice(index, 1);
    }
    this.setState({ [key]: this.state[key] });
  };

  render() {
    const {
      show_test_taken,
      show_act_test,
      show_sat_test,
      show_ap_test,
      test_international_applicants,
      test_is,
      test_which,
      act_scores,
      act_writing_test,
      act_settings,
      act_composite_score,
      act_international_applicants,
      act_composite_date,
      act_english_score,
      act_english_date,
      act_math_score,
      act_math_date,
      act_reading_score,
      act_reading_date,
      act_science_score,
      act_science_date,
      act_writing_score,
      act_writing_date,
      sat_scores,
      sat_reading_score,
      sat_reading_date,
      sat_math_score,
      sat_math_date,
      sat_writing_score,
      sat_writing_date,
      ap_number,
      ap_date_taken,
      ap_subject,
      ap_score,
      submitted,
    } = this.state;
    return (
      <div className="tab-pane active" id="test-scores">
        <div className="card">
          <div className="page-title card-header d-flex align-items-center">
            <h5>Test Scores</h5>
          </div>
          <div className="card-body">
            <div id="accordion" className="myaccordion">
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="d-flex align-items-center justify-content-between btn btn-link"
                      onClick={() => this.test_taken_toggle()}
                    >
                      Tests Taken
                      <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseOne"
                  className=" show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  {show_test_taken ? (
                    <div className="card-body">
                      <div className="form-group">
                        <label>
                          In addition to sending official score reports as
                          required by colleges, do you with to self-reports
                          scores or future test dayes for any of the following
                          standardized tests: ACT,SAT/SAT Subject, AP, IB,
                          TOEFL, PTE Academic and IELTS?
                          {test_is == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="test_is"
                              value={true}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            Yes
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="test_is"
                              value={false}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            No
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Indicate all tests you wish to report. Be sure to
                          include tests you expect to take in addition to tests
                          in addition to tests you have already taken.
                          {test_which.length <= 0 && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <Multiselect
                          options={this.state.test_options}
                          selectedValues={this.state.test_selectedValue}
                          onSelect={(selectedList, selectedItem) =>
                            this.onSelect(
                              selectedList,
                              selectedItem,
                              "test_which"
                            )
                          }
                          onRemove={(selectedList, removedItem) =>
                            this.onRemove(
                              selectedList,
                              removedItem,
                              "test_which"
                            )
                          }
                          displayValue="name"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>International applicants:</strong>Is promotion
                          within your educational system based upon standard
                          leaving examinations given at the end of lower and/or
                          senior secondary school by state or national leaving
                          examinations board?{" "}
                          {test_international_applicants == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                          <br />
                          (Students studing in the US typically answer no to
                          this question.)
                        </label>
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="test_international_applicants"
                              value={true}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            // checked={
                            //   test_international_applicants == true
                            //     ? true
                            //     : ""
                            // }
                            />{" "}
                            Yes
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="test_international_applicants"
                              value={false}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            No
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {
                            this.act_open();
                            this.test_taken_close();
                          }}
                          className="default-btn"
                        >
                          Continue
                        </button>
                       
                      </div>
                    </div>
                  ) : (
                      ""
                    )}
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      onClick={() => this.act_toggle()}
                    >
                      ACT Tests
                      <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  className=""
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  {show_act_test ? (
                    <div className="card-body">
                      <div className="form-group">
                        <label>
                          Number of past ACT scores you wish to report
                          {act_scores.length <= 0 && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <Multiselect
                          options={this.state.act_options}
                          selectedValues={this.state.act_selectedValue}
                          onSelect={(selectedList, selectedItem) =>
                            this.onSelect(
                              selectedList,
                              selectedItem,
                              "act_scores"
                            )
                          }
                          onRemove={(selectedList, removedItem) =>
                            this.onRemove(
                              selectedList,
                              removedItem,
                              "act_scores"
                            )
                          }
                          displayValue="name"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Have you taken the ACT Plus Writing test?{" "}
                          {act_writing_test == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="act_writing_test"
                              value={true}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            Yes
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="act_writing_test"
                              value={false}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            No
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Number of future ACT settings you expect{" "}
                          {act_settings == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="act_settings"
                              value="0"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            0
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="act_settings"
                              value="1"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            1
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="act_settings"
                              value="2"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            2
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="act_settings"
                              value="3"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            3
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest composite score{" "}
                          {act_composite_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          name="act_composite_score"
                          value={act_composite_score}
                          className="js-select2-multi form-control"
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <strong>International applicants:</strong>Is promotion
                          within your educational system based upon standard
                          leaving examinations given at the end of lower and/or
                          senior secondary school by state or national leaving
                          examinations board?{" "}
                          {act_international_applicants == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                          <br />
                          (Students studing in the US typically answer no to
                          this question.)
                        </label>
                        <div>
                          <span>
                            <input
                              type="radio"
                              name="act_international_applicants"
                              value={true}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            Yes
                          </span>
                          &nbsp;&nbsp;
                          <span>
                            <input
                              type="radio"
                              name="act_international_applicants"
                              value={false}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            No
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          Composite date{" "}
                          {act_composite_date == "" && submitted ? (
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
                          type="date"
                          name="act_composite_date"
                          value={moment(act_composite_date).format(
                            "YYYY-MM-DD"
                          )}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest English score{" "}
                          {act_english_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="act_english_score"
                          value={act_english_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          English date{" "}
                          {act_english_date == "" && submitted ? (
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
                          type="date"
                          name="act_english_date"
                          value={moment(act_english_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest math score{" "}
                          {act_math_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="act_math_score"
                          value={act_math_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="800">800</option>
                          <option value="700">700</option>
                          <option value="600">600</option>
                          <option value="500">500</option>
                          <option value="400">400</option>
                          <option value="300">300</option>
                          <option value="200">200</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Math date{" "}
                          {act_math_date == "" && submitted ? (
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
                          type="date"
                          name="act_math_date"
                          value={moment(act_math_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest reading score{" "}
                          {act_reading_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="act_reading_score"
                          value={act_reading_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Reading date{" "}
                          {act_reading_date == "" && submitted ? (
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
                          type="date"
                          name="act_reading_date"
                          value={moment(act_reading_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest Science score{" "}
                          {act_science_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="act_science_score"
                          value={act_science_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Science date{" "}
                          {act_science_date == "" && submitted ? (
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
                          type="date"
                          name="act_science_date"
                          value={moment(act_science_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest Writing score{" "}
                          {act_writing_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="act_writing_score"
                          value={act_writing_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Writing date{" "}
                          {act_writing_date == "" && submitted ? (
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
                          type="date"
                          name="act_writing_date"
                          value={act_writing_date}
                          value={moment(act_writing_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {
                            this.sat_open();
                            this.act_close();
                          }}
                          className="default-btn"
                        >
                          Continue
                        </button>
                        {/* <button
                          type="button"
                          onClick={() => {
                            this.resetAct();
                          }}
                          className="default-btn btn-outlin"
                        >
                          Clear Answers
                        </button> */}
                      </div>
                    </div>
                  ) : (
                      ""
                    )}
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      onClick={() => this.sat_toggle()}
                    >
                      SAT Tests
                      <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  className=""
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  {show_sat_test ? (
                    <div className="card-body">
                      <div className="form-group">
                        <label>
                          Number of past SAT scores you wish to report{" "}
                          {sat_scores.length <= 0 && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <Multiselect
                          options={this.state.sat_options}
                          selectedValues={this.state.sat_selectedValue}
                          onSelect={(selectedList, selectedItem) =>
                            this.onSelect(
                              selectedList,
                              selectedItem,
                              "sat_scores"
                            )
                          }
                          onRemove={(selectedList, removedItem) =>
                            this.onRemove(
                              selectedList,
                              removedItem,
                              "sat_scores"
                            )
                          }
                          displayValue="name"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Highest Critical reading score{" "}
                          {sat_reading_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="sat_reading_score"
                          value={sat_reading_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Critical reading date{" "}
                          {sat_reading_date == "" && submitted ? (
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
                          type="date"
                          name="sat_reading_date"
                          value={moment(sat_reading_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest math score{" "}
                          {sat_math_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="sat_math_score"
                          value={sat_math_score}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Math date{" "}
                          {sat_math_date == "" && submitted ? (
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
                          type="date"
                          name="sat_math_date"
                          value={moment(sat_math_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Highest writing score{" "}
                          {sat_writing_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <select
                          className="js-select2-multi form-control"
                          name="sat_writing_score"
                          value={sat_writing_score}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Writing date{" "}
                          {sat_writing_date == "" && submitted ? (
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
                          type="date"
                          name="sat_writing_date"
                          value={moment(sat_writing_date).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Day, Year
                            format.
                          </small>
                        </p>
                      </div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {
                            this.ap_open();
                            this.sat_close();
                          }}
                          className="default-btn"
                        >
                          Continue
                        </button>
                       
                      </div>
                    </div>
                  ) : (
                      ""
                    )}
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button
                      className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                      onClick={() => this.ap_toggle()}
                    >
                      AP Subject Tests
                      <span className="fa-stack fa-2x">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                      </span>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFour"
                  className=""
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  {show_ap_test ? (
                    <div className="card-body">
                      <div className="form-group">
                        <label>
                          Number of AP tests you wish to report, including tests
                          you expect to take{" "}
                          {ap_number.length <= 0 && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <Multiselect
                          options={this.state.ap_options}
                          selectedValues={this.state.ap_selectedValue}
                          onSelect={(selectedList, selectedItem) =>
                            this.onSelect(
                              selectedList,
                              selectedItem,
                              "ap_number"
                            )
                          }
                          onRemove={(selectedList, removedItem) =>
                            this.onRemove(
                              selectedList,
                              removedItem,
                              "ap_number"
                            )
                          }
                          displayValue="name"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Date taken or planned{" "}
                          {ap_date_taken == "" && submitted ? (
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
                          type="date"
                          name="ap_date_taken"
                          value={moment(ap_date_taken).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        />
                        <p>
                          <small>
                            Date should be entered in the Month Year format.
                          </small>
                        </p>
                      </div>

                      <div className="form-group">
                        <label>
                          Subject{" "}
                          {ap_subject == "" && submitted ? (
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
                          name="ap_subject"
                          value={ap_subject}
                          onChange={(e) => {
                            this.formHandler(e);
                          }}
                        >
                          <option>Choose an option</option>
                          <option value="1">1</option>
                          <option value="1">1</option>
                          <option value="1">1</option>
                          <option value="1">1</option>
                          <option value="1">1</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Score{" "}
                          {ap_score == "" && submitted ? (
                            <span className="text-danger">
                              {" "}
                              <sup>*</sup>
                            </span>
                          ) : (
                              ""
                            )}
                        </label>
                        <div>
                          <div>
                            <input
                              type="radio"
                              name="ap_score"
                              value="5"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            5
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="ap_score"
                              value="4"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            4
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="ap_score"
                              value="3"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            3
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="ap_score"
                              value="2"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            2
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="ap_score"
                              value="1"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />{" "}
                            1
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            this.saveHandler(e);
                          }}
                          className="default-btn"
                        >
                          Save
                        </button>
                        
                      </div>
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
    );
  }
}
