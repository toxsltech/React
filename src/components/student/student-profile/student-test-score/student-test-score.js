/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";
import * as UserService from "../../../../services/userServices";
import * as constant from "../../../../globals/constant";
import showNotification from "../../../../services/notificationService";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import apibase from "../../globals/config";
import base from "../../../../globals/base";
import DatePicker from "react-datepicker";
import { OPTIONS } from "../../../../globals/constant";
import "react-datepicker/dist/react-datepicker.css";
import { Student_SIDEBAR } from "../../../../globals/constant";
let date = new Date();
const onlyNumber = (val) => /^[0-9]\d*$/i.test(val);
export default class StudentTestScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      which: true,
      whichGrade: "",
      GradeModal: "",
      selected_Grade: "",
      errorGrade: "",
      act_test_id: "",
      sat_test_id: "",
      ap_test_id: "",
      Grades: [
        {
          name: "Please Choose",
          value: "",
        },
        {
          name: "9th",
          value: "9",
        },
        {
          name: "10th",
          value: "10",
        },
        {
          name: "11th",
          value: "11",
        },
        {
          name: "12th",
          value: "12",
        },
      ],
      gradeArray: [],
      grade: "",
      // grade_year: "",
      grade_gpa: "",
      show_test_taken: false,
      show_act_test: false,
      show_sat_test: false,
      show_ap_test: false,
      testArray: [],
      test_international_applicants: "",
      test_is: "",
      test_which: [],
      act_scores: "",
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
      sat_scores: "",
      sat_reading_score: "",
      sat_reading_date: "",
      sat_math_score: "",
      sat_math_date: "",
      sat_writing_score: "",
      sat_writing_date: "",
      ap_number: "",
      ap_date_taken: "",
      ap_subject: "",
      ap_score: "1",
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
      submittedGrade: false,
      loading: false,
      validOptions: [],
      view: "",
      sat_math_score_error: false,
      act_gpa_error: false,
      sat_reading_score_error: false,
      sat_writing_score_error: false,
      sat_scores_error: false,
      act_writing_score_error: false,
      act_scores_error: false,
      act_composite_score_error: false,
      act_english_score_error: false,
      act_math_score_error: false,
      act_reading_score_error: false,
      loaded: false,
      act_science_score_error: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    let id = null;

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
        this.getStudentGrades(id);
        this.getStudentTestScore(id);
        this.setState({
          view: "Student",
          studentId: this.props.studentId,
          loaded: true,
        });

        // this.getSpecificUser(id);
      }
    } else {
      this.getUserData();
      this.getGradeArray();
    }
  };

  getStudentGrades = (id) => {
    UserService.getStudentGrades(id).then((resp) => {
      let response = resp.data;
      if (response.success) {
        this.setState({ gradeArray: response.data });
      }
    });
  };
  getStudentTestScore = (id) => {
    UserService.getStudentTestScore(id).then((resp) => {
      let response = resp.data;
      if (response.success) {
        this.setState({ testArray: response.data });
      }
    });
  };

  getUserData = () => {
    this.setState({ loading: true });
    this.setState({
      test_options: [
        { name: "ACT Tests" },
        { name: "SAT Tests" },
        { name: "AP Subject Tests" },
      ],
    });
    UserService.getTestTaken()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            let test = response.data;
            let indexArray = [];
            this.setState({ testArray: test }, () => {
              this.state.testArray.map((data, index) => {
                this.state.test_options.map((data1, x) => {
                  let i = data1.name.toLowerCase().indexOf(data.test_type);
                  if (i !== -1) {
                    this.state.test_options.splice(x, 1);
                    this.setState({
                      test_options: this.state.test_options,
                    });
                  }
                });
              });
            });

            this.setState({ loading: false });
            this.state.test_options.map((data, i) => {
              this.state.validOptions.push(data.name);
            });
            this.setState({
              validOptions: this.state.validOptions,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  formHandler = (e) => {
    const { name, value } = e.target;
    if (name == "sat_math_score") {
      if (!onlyNumber(value) || value < 1 || value > 1600) {
        this.setState({ sat_math_score_error: true });
      } else {
        this.setState({ sat_math_score_error: false });
      }
    }
    if (name == "grade_gpa") {
      if (!onlyNumber(value) || value < 1 || value > 5) {
        this.setState({ act_gpa_error: true });
      } else {
        this.setState({ act_gpa_error: false });
      }
    }
    if (name == "sat_reading_score") {
      if (!onlyNumber(value) || value < 1 || value > 1600) {
        this.setState({ sat_reading_score_error: true });
      } else {
        this.setState({ sat_reading_score_error: false });
      }
    }
    if (name == "sat_writing_score") {
      if (!onlyNumber(value) || value < 1 || value > 1600) {
        this.setState({ sat_writing_score_error: true });
      } else {
        this.setState({ sat_writing_score_error: false });
      }
    }
    if (name == "sat_scores") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ sat_scores_error: true });
      } else {
        this.setState({ sat_scores_error: false });
      }
    }
    if (name == "act_scores") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_scores_error: true });
      } else {
        this.setState({ act_scores_error: false });
      }
    }
    if (name == "act_composite_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_composite_score_error: true });
      } else {
        this.setState({ act_composite_score_error: false });
      }
    }
    if (name == "act_english_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_english_score_error: true });
      } else {
        this.setState({ act_english_score_error: false });
      }
    }
    if (name == "act_math_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_math_score_error: true });
      } else {
        this.setState({ act_math_score_error: false });
      }
    }
    if (name == "act_reading_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_reading_score_error: true });
      } else {
        this.setState({ act_reading_score_error: false });
      }
    }
    if (name == "act_science_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_science_score_error: true });
      } else {
        this.setState({ act_science_score_error: false });
      }
    }
    if (name == "act_writing_score") {
      if (!onlyNumber(value) || value < 1 || value > 36) {
        this.setState({ act_writing_score_error: true });
      } else {
        this.setState({ act_writing_score_error: false });
      }
    }
    this.setState({ errogpa: false, errorGrade: "", refreshing: true }, () => {
      this.setState({ [name]: value, refreshing: true }, (data) => {});
    });
  };
  resetTestTaken = () => {
    this.setState({
      submitted: false,
      test_is: "",
      test_which: [],
      test_international_applicants: "",
      test_selectedValue: [],
    });
    this.setState({ test_options: this.state.test_options });
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

  onSelect(selectedList, selectedItem, key) {
    if (this.state[key].indexOf(selectedItem.name) == -1) {
      this.state[key].push(selectedItem.name);
    }
    this.setState({ [key]: this.state[key] });
    let selectedValue = {
      name: selectedItem.name,
    };
    this.setState((prevState) => ({
      test_selectedValue: [...prevState.test_selectedValue, selectedValue],
    }));
  }

  onRemove = (selectedList, removedItem, key) => {
    let index = this.state[key].indexOf(removedItem.name);
    if (this.state[key].indexOf(removedItem.name) != -1) {
      this.state[key].splice(index, 1);
    }
    this.setState({ [key]: this.state[key] });

    this.state.test_selectedValue.map((data, index) => {
      let i = data.name.indexOf(removedItem.name);
      if (i !== -1) {
        this.state.test_selectedValue.splice(index, 1);
        this.setState({ test_selectedValue: this.state.test_selectedValue });
      }
    });
  };
  saveTest = (e, type, action) => {
    if (
      this.state.sat_reading_score == true ||
      this.state.sat_reading_score_error == true ||
      this.state.sat_reading_date == true ||
      this.state.sat_math_score_error == true ||
      this.state.sat_math_date == true ||
      this.state.sat_scores_error == true ||
      this.state.sat_writing_date == true ||
      this.state.sat_writing_score == true
    ) {
      showNotification(
        "danger",
        "Please check  and update correct field value !"
      );
    } else {
      this.setState({ loading: true });
      e.preventDefault();
      this.setState({ submitted: true });
      let data = {};
      let id = "";

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
        act_test_id,
        sat_test_id,
        ap_test_id,
        selected_Grade,
      } = this.state;
      if (type == "act") {
        if (
          act_scores == "" ||
          act_writing_test == "" ||
          act_settings.length <= 0 ||
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
          act_writing_date == ""
        ) {
          this.setState({ loading: false });
          return;
        }
        data = {
          test_taken: test_is,
          all_test: test_which,
          usa_study: test_international_applicants,
          test_type: type,
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
        };
        id = act_test_id;
      } else if (type == "sat") {
        if (
          sat_scores == "" ||
          sat_reading_score == "" ||
          sat_reading_date == "" ||
          sat_math_score == "" ||
          sat_math_date == "" ||
          sat_writing_score == "" ||
          sat_writing_date == ""
        ) {
          this.setState({ loading: false });
          return;
        }
        data = {
          test_taken: test_is,
          all_test: test_which,
          usa_study: test_international_applicants,
          test_type: type,
          sat_past_score_report: sat_scores,
          sat_high_critical_reading_score: sat_reading_score,
          sat_critical_reading_date: sat_reading_date,
          sat_highest_math_score: sat_math_score,
          sat_math_date: sat_math_date,
          sat_highest_writing_score: sat_writing_score,
          sat_writing_date: sat_writing_date,
        };
        id = sat_test_id;
      } else {
        if (
          ap_number == "" ||
          ap_date_taken == "" ||
          ap_subject == "" ||
          ap_score == ""
        ) {
          this.setState({ loading: false });
          return;
        }
        data = {
          test_taken: test_is,
          all_test: test_which,
          usa_study: test_international_applicants,
          test_type: type,
          ap_past_score_report: ap_number,
          ap_taken_planned_date: ap_date_taken,
          ap_subject: ap_subject,
          ap_score: ap_score,
        };
        id = ap_test_id;
      }
      if (action == "add") {
        UserService.addTestTaken(data)
          .then((resp) => {
            let message = "";
            if (resp) {
              let response = resp.data;
              if (response.success == true) {
                this.setState({
                  success: true,
                  submitted: false,
                  loading: false,
                });
                if (type == "act") {
                  let i = test_which.indexOf("ACT Tests");
                  test_which.splice(i, 1);
                  this.setState({ test_which: test_which });
                  message = "Act";
                  this.resetAct();
                } else if (type == "sat") {
                  let i = test_which.indexOf("SAT Tests");
                  test_which.splice(i, 1);
                  this.setState({ test_which: test_which });
                  message = "Sat";
                  this.resetSat();
                } else {
                  let i = test_which.indexOf("AP Subject Tests");
                  test_which.splice(i, 1);
                  this.setState({ test_which: test_which });
                  message = "Ap";
                  this.resetAp();
                }
                this.setState({ test_selectedValue: [], validOptions: [] });
                showNotification(
                  "success",
                  message + " Test Added Succesfully"
                );
                this.getUserData();

                if (test_which.length <= 0) {
                  document.getElementById("closeTest").click();
                }
              }
            }
          })
          .catch((err) => {
            showNotification("danger", constant.ERRORMSG);
          });
      } else {
        UserService.editTestTaken(data, id)
          .then((resp) => {
            if (resp) {
              let response = resp.data;
              if (response.success == true) {
                this.setState({
                  success: true,
                  submitted: false,
                  loading: false,
                });
                this.getUserData();
                if (type == "ap") document.getElementById("closeAp").click();
                else if (type == "sat")
                  document.getElementById("closeSat").click();
                else document.getElementById("closeAct").click();
              }
            }
          })
          .catch((err) => {
            showNotification("danger", constant.ERRORMSG);
          });
      }
    }
  };

  deleteHandler = (e, id, type) => {
    confirmAlert({
      message: "Do you want to delete? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmDelete(id, type),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmDelete = (id, type) => {
    if (type == "test") {
      UserService.deleteTest(id)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.getUserData();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    } else if ((type = "grade")) {
      UserService.deleteGrade(id)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.getGradeArray();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    } else {
    }
  };
  getGradeArray = () => {
    var { gradeArray } = this.state;
    this.setState({ loading: true });
    UserService.getGrades()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState(
              { gradeArray: response.data, loading: false },
              () => {}
            );
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  saveGrade = async (e) => {
    if (this.state.act_gpa_error == true) {
      showNotification(
        "danger",
        "Only Number allowed between 0 to 5 allowed. Please check and update !"
      );
    } else {
      e.preventDefault();
      let legalValue = new RegExp("/^[0-4].dd$/");
      this.setState({ submittedGrade: true, loading: true });
      const {
        grade,
        grade_gpa,
        // grade_year,
        gradeId,
        GradeModal,
        selected_Grade,
      } = this.state;

      if (grade == "" || grade_gpa == "") {
        this.setState({ loading: false });
        return;
      }
      if (GradeModal == "add") {
        await this.state.gradeArray.map((data, index) => {
          if (data.grade == grade) {
            this.setState({ errorGrade: "This grade already filled" });
            return false;
          }
        });
        if (this.state.errorGrade) {
          this.setState({ loading: false });
          return;
        }
      } else {
        if (selected_Grade == grade) {
        } else {
          await this.state.gradeArray.map((data, index) => {
            if (data.grade == grade) {
              this.setState({ errorGrade: "This grade already filled" });
              return false;
            }
          });
          if (this.state.errorGrade) {
            this.setState({ loading: false });
            return;
          }
        }
      }
      // if (this.state.errorGrade.length > 0) {
      //   return;
      // }
      // (legalValue.test(grade_gpa));
      // if (!legalValue.test(grade_gpa)) {
      //   this.setState({ loading: false });
      //   this.setState({ errogpa: true });
      //   return;
      // }
      // if (grade_gpa) {
      //   var ver = parseFloat(grade_gpa);
      //   if (!(ver >= 0 && ver <= 3)) {
      //     this.setState({ errogpa: true, loading: false });
      //     return;
      //   }
      // }

      let data = {
        grade: grade,
        // year: grade_year,
        gpa: grade_gpa,
      };
      if (GradeModal == "add") {
        UserService.addGrade(data)
          .then((resp) => {
            if (resp) {
              let response = resp.data;
              if (response.success == true) {
                this.setState({ loading: false });
                this.getGradeArray();
                document.getElementById("close1").click();
              }
            }
          })
          .catch((err) => {
            showNotification("danger", constant.ERRORMSG);
          });
      } else {
        let id = gradeId;
        UserService.editGrade(data, id)
          .then((resp) => {
            if (resp) {
              let response = resp.data;
              if (response.success == true) {
                this.setState({ loading: false });
                this.getGradeArray();
                document.getElementById("close1").click();
              }
            }
          })
          .catch((err) => {
            showNotification("danger", constant.ERRORMSG);
          });
      }
    }
  };

  gradeEditHandler = (data) => {
    this.setState({
      gradeId: data._id,
      grade: data.grade,
      grade_gpa: data.gpa,
      // grade_year: data.year,
      selected_Grade: data.grade,
    });
  };
  resetGrade = () => {
    this.setState({
      // grade_year: "",
      grade_gpa: "",
      gradeId: "",
      grade: "",
      errorGrade: "",
    });
  };
  editTestTaken = (e, type) => {};
  editStateHandler = (i, type) => {
    this.setState({ which: false });
    const { testArray } = this.state;
    if (type == "act") {
      this.setState({
        act_scores: testArray[i].act_past_score_report,
        act_writing_test: testArray[i].act_writing_test,
        act_settings: testArray[i].future_act_setting,
        act_composite_score: testArray[i].act_high_composite_score,
        act_composite_date: testArray[i].act_composite_date,
        act_international_applicants: testArray[i].act_international_applicants,
        act_english_score: testArray[i].act_high_english_score,
        act_english_date: testArray[i].act_english_date,
        act_math_score: testArray[i].act_highest_math_score,
        act_math_date: testArray[i].act_math_date,
        act_reading_score: testArray[i].act_highest_reading_score,
        act_reading_date: testArray[i].act_reading_date,
        act_science_score: testArray[i].act_highest_science_score,
        act_science_date: testArray[i].act_science_date,
        act_writing_score: testArray[i].act_highest_writing_score,
        act_writing_date: testArray[i].act_writing_date,
      });
    } else if (type == "sat") {
      this.setState({
        sat_scores: testArray[i].sat_past_score_report,
        sat_reading_score: testArray[i].sat_high_critical_reading_score,
        sat_reading_date: testArray[i].sat_critical_reading_date,
        sat_math_score: testArray[i].sat_highest_math_score,
        sat_math_date: testArray[i].sat_math_date,
        sat_writing_score: testArray[i].sat_highest_writing_score,
        sat_writing_date: testArray[i].sat_writing_date,
      });
    } else if ((type = "ap")) {
      this.setState({
        ap_number: testArray[i].ap_past_score_report,
        ap_date_taken: testArray[i].ap_taken_planned_date,
        ap_subject: testArray[i].ap_subject,
        ap_score: testArray[i].ap_score,
      });
    } else {
    }
  };
  dateHandler = (name, value) => {
    this.setState({ [name]: value });
  };
  loadOptions = () => {
    const optionsData = OPTIONS.map((data, key) => {
      return (
        <option key={key} value={data.value} key={key}>
          {data.name}
        </option>
      );
    });
    return optionsData;
  };
  loadGrades = () => {
    const optionsData = this.state.Grades.map((data, key) => {
      return (
        <option value={data.value} key={key}>
          {data.name}
        </option>
      );
    });
    return optionsData;
  };
  render() {
    const {
      GradeModal,
      errorGrade,
      date,
      which,
      submittedGrade,
      validOptions,
      loading,
      editGradeModal,
      show_test_taken,
      show_act_test,
      show_sat_test,
      show_ap_test,
      testArray,
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
      grade,
      gradeArray,
      grade_gpa,
      // grade_year,
      errogpa,
      refreshing,
      view,
      sat_math_score_error,
      act_gpa_error,
      sat_reading_score_error,
      sat_writing_score_error,
      sat_scores_error,
      act_writing_score_error,
      act_scores_error,
      act_composite_score_error,
      act_english_score_error,
      act_math_score_error,
      act_reading_score_error,
      act_science_score_error,
      studentId,
      loaded,
    } = this.state;
    return (
      <div>
        {/* modelgrade */}
        <div className="modal" id="grades" data-backdrop="static">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="mb-0">
                  {GradeModal == "add" ? "Add Grades" : "Edit Grades"}

                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="close1"
                    onClick={() => this.resetGrade()}
                  >
                    &times;
                  </button>
                </h4>
                <br />
                <div className="form-group">
                  <label>
                    Grade
                    {grade == "" && submittedGrade ? (
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
                    name="grade"
                    value={grade}
                    onChange={(e) => {
                      this.formHandler(e);
                    }}
                  >
                    {/* {this.loadGrades()} */}
                    <option value="">Please Select</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                  </select>
                  {errorGrade ? (
                    <span className="text-danger">{errorGrade}</span>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="form-group">
                  <label>
                    Year
                    {grade_year == "" && submittedGrade ? (
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
                    name="grade_year"
                    value={grade_year}
                    onChange={(e) => {
                      this.formHandler(e);
                    }}
                  >
                    <option value="">Please Select</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                  </select>
                </div> */}

                <div className="form-group">
                  <label>
                    Cumulative GPA
                    {(grade_gpa == "" && submittedGrade) || errogpa ? (
                      <span className="text-danger">
                        {" "}
                        <sup>*</sup>
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                  <input
                    className="form-control noscroll"
                    type="text"
                    pattern="[1-9]"
                    name="grade_gpa"
                    value={grade_gpa}
                    required
                    onKeyDown={(e) => {
                      return (e.keyCode >= 48 && e.keyCode <= 57) ||
                        (e.keyCode >= 96 && e.keyCode <= 105) ||
                        e.keyCode == 8 ||
                        e.keyCode == 46 ||
                        e.keyCode == 190 ||
                        (e.keyCode >= 37 && e.keyCode <= 40)
                        ? ""
                        : e.preventDefault();
                    }}
                    onChange={(e) => {
                      this.formHandler(e);
                    }}
                  />
                  {act_gpa_error ? (
                    <div className="help-block with-errors">
                      Only Number allowed between 0 to 5 allowed
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={(e) => this.saveGrade(e)}
                    className="default-btn"
                  >
                    {GradeModal == "add" ? "Save" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* emac */}
        <div className="modal" id="editAct" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="mb-0">
                  Edit ACT Test
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="closeAct"
                    onClick={() => this.resetAct()}
                  >
                    &times;
                  </button>
                </h4>
                <br />
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

                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_scores"
                      value={act_scores}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_scores_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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
                    {!which ? (
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="act_writing_test"
                            value={true}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                            checked={act_writing_test == "true" ? true : false}
                          />{" "}
                          Yes
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <input
                            type="radio"
                            name="act_writing_test"
                            value={false}
                            checked={act_writing_test == "false" ? true : false}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          No
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Number of future ACT settings you expect{" "}
                      {act_settings.length <= 0 && submitted ? (
                        <span className="text-danger">
                          {" "}
                          <sup>*</sup>
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    {!which ? (
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="act_settings"
                            value="0"
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                            checked={act_settings == "0" ? true : false}
                          />{" "}
                          0
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <input
                            type="radio"
                            name="act_settings"
                            value="1"
                            checked={act_settings == "1" ? true : false}
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
                            checked={act_settings == "2" ? true : false}
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
                            checked={act_settings == "3" ? true : false}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          3
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_composite_score"
                      value={act_composite_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_composite_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>International applicants:</strong>Is promotion
                      within your educational system based upon standard leaving
                      examinations given at the end of lower and/or senior
                      secondary school by state or national leaving examinations
                      board?{" "}
                      {act_international_applicants == "" && submitted ? (
                        <span className="text-danger">
                          {" "}
                          <sup>*</sup>
                        </span>
                      ) : (
                        ""
                      )}
                      <br />
                      (Students studing in the US typically answer no to this
                      question.)
                    </label>
                    {!which ? (
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="act_international_applicants"
                            value={true}
                            checked={
                              act_international_applicants == "true"
                                ? true
                                : false
                            }
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
                            checked={
                              act_international_applicants == "false"
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          No
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
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
                    {/* <input
                      className="form-control"
                      type="date"
                      name="act_composite_date"
                      value={moment(act_composite_date).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    /> */}
                    {act_composite_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(act_composite_date)}
                        name="act_composite_date"
                        onChange={(date) =>
                          this.dateHandler("act_composite_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}

                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_english_score"
                      value={act_english_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_english_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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

                    {this.state.act_english_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(this.state.act_english_date)}
                        name="act_english_date"
                        onChange={(date) =>
                          this.dateHandler("act_english_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_math_score"
                      value={act_math_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_math_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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
                    {/* <input
                      className="form-control"
                      type="date"
                      name="act_math_date"
                      value={moment(act_math_date).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    /> */}
                    {act_math_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(act_math_date)}
                        name="act_math_date"
                        onChange={(date) =>
                          this.dateHandler("act_math_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_reading_score"
                      value={act_reading_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_reading_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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
                    {/* <input
                      className="form-control"
                      type="date"
                      name="act_reading_date"
                      value={moment(act_reading_date).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    /> */}
                    {act_reading_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(act_reading_date)}
                        name="act_reading_date"
                        onChange={(date) =>
                          this.dateHandler("act_reading_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_science_score"
                      value={act_science_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_science_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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
                    {/* <input
                      className="form-control"
                      type="date"
                      name="act_science_date"
                      value={moment(act_science_date).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    /> */}
                    {act_science_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(act_science_date)}
                        name="act_science_date"
                        onChange={(date) =>
                          this.dateHandler("act_science_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="act_writing_score"
                      value={act_writing_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {act_writing_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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

                    {act_writing_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(act_writing_date)}
                        name="act_writing_date"
                        onChange={(date) =>
                          this.dateHandler("act_writing_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
                      </small>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={(e) => this.saveTest(e, "act", "edit")}
                    className="default-btn"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="editSat" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="mb-0">
                  Edit SAT Test
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="closeSat"
                    onClick={() => this.resetSat()}
                  >
                    &times;
                  </button>
                </h4>
                <br />
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
                    <input
                      type="text"
                      min="1"
                      max="36"
                      className="js-select2-multi form-control"
                      name="sat_scores"
                      value={sat_scores}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {sat_scores_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 36 allowed
                      </div>
                    ) : (
                      ""
                    )}
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
                    <input
                      type="text"
                      min="1"
                      max="1600"
                      className="js-select2-multi form-control"
                      name="sat_reading_score"
                      value={sat_reading_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {sat_reading_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 1600 allowed
                      </div>
                    ) : (
                      ""
                    )}
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

                    {sat_reading_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(sat_reading_date)}
                        name="sat_reading_date"
                        onChange={(date) =>
                          this.dateHandler("sat_reading_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="1600"
                      className="js-select2-multi form-control"
                      name="sat_math_score"
                      value={sat_math_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {sat_math_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 1600 allowed
                      </div>
                    ) : (
                      ""
                    )}
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

                    {sat_math_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(sat_math_date)}
                        name="sat_math_date"
                        onChange={(date) =>
                          this.dateHandler("sat_math_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
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
                    <input
                      type="text"
                      min="1"
                      max="1600"
                      className="js-select2-multi form-control"
                      name="sat_writing_score"
                      value={sat_writing_score}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
                    {sat_writing_score_error ? (
                      <div className="help-block with-errors">
                        Only Number allowed between 1 to 1600 allowed
                      </div>
                    ) : (
                      ""
                    )}
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

                    {sat_writing_date ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(sat_writing_date)}
                        name="sat_writing_date"
                        onChange={(date) =>
                          this.dateHandler("sat_writing_date", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
                    <p>
                      <small>
                        Date should be entered in the Month Day, Year format.
                      </small>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={(e) => this.saveTest(e, "sat", "edit")}
                    className="default-btn"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="editAp" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <h4 className="mb-0">
                  Edit AP Test
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    id="closeAp"
                    onClick={() => this.resetAp()}
                  >
                    &times;
                  </button>
                </h4>
                <br />
                <div className="card-body">
                  <div className="form-group">
                    <label>
                      Number of AP tests you wish to report, including tests you
                      expect to take{" "}
                      {ap_number.length <= 0 && submitted ? (
                        <span className="text-danger">
                          {" "}
                          <sup>*</sup>
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <select
                      name="ap_number"
                      value={ap_number}
                      className="js-select2-multi form-control"
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    >
                      {this.loadOptions()}
                    </select>
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

                    {ap_date_taken ? (
                      <DatePicker
                        dateFormat="MM-dd-yyyy"
                        className="form-control"
                        selected={new Date(ap_date_taken)}
                        name="ap_date_taken"
                        onChange={(date) =>
                          this.dateHandler("ap_date_taken", date)
                        }
                        placeholderText="MM/DD/YYY"
                      />
                    ) : (
                      ""
                    )}
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
                    <input
                      type="text"
                      className="form-control"
                      name="ap_subject"
                      value={ap_subject}
                      onChange={(e) => {
                        this.formHandler(e);
                      }}
                    />
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
                    {!which ? (
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="ap_score"
                            value="5"
                            checked={ap_score == "5" ? true : false}
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
                            checked={ap_score == "4" ? true : false}
                          />{" "}
                          4
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="ap_score"
                            value="3"
                            checked={ap_score == "3" ? true : false}
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
                            checked={ap_score == "2" ? true : false}
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
                            checked={ap_score == "1" ? true : false}
                            onChange={(e) => {
                              this.formHandler(e);
                            }}
                          />{" "}
                          1
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={(e) => this.saveTest(e, "ap", "edit")}
                    className="default-btn"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="testscore" data-backdrop="static">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div id="accordion" className="myaccordion">
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn btn-link">
                          Tests Taken
                          <span className="fa-stack">
                            <i
                              id="closeTest"
                              data-dismiss="modal"
                              className="fa fa-close"
                              onClick={() => {
                                this.resetTestTaken();
                                this.getUserData();
                              }}
                            ></i>
                          </span>
                        </button>
                      </h2>
                    </div>
                    <div className="collapsed card-body">
                      <div className="form-group">
                        <label>
                          In addition to sending official score reports as
                          required by colleges, do you with to self-reports
                          scores or future test days for any of the following
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
                          you have already taken.
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

                      <div className="text-right"></div>
                    </div>
                  </div>
                </div>

                <hr />
                <div id="accordion1" className="myaccordion">
                  {test_which.indexOf("ACT Tests") != -1 &&
                  validOptions.indexOf("ACT Tests") != -1 ? (
                    <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <button
                            className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            ACT Tests
                            <span className="fa-stack fa-2x">
                              <i className="fa fa-circle fa-stack-2x"></i>
                              <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                              <i className="fa fa-minus fa-stack-1x fa-inverse"></i>
                            </span>
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion1"
                      >
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_scores"
                              value={act_scores}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_scores_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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
                            {which ? (
                              <div>
                                <span>
                                  <input
                                    type="radio"
                                    name="act_writing_test"
                                    value={true}
                                    checked={
                                      act_writing_test == "true" ? true : false
                                    }
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
                                    checked={
                                      act_writing_test == "false" ? true : false
                                    }
                                    onChange={(e) => {
                                      this.formHandler(e);
                                    }}
                                  />{" "}
                                  No
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <label>
                              Number of future ACT settings you expect{" "}
                              {act_settings.length <= 0 && submitted ? (
                                <span className="text-danger">
                                  {" "}
                                  <sup>*</sup>
                                </span>
                              ) : (
                                ""
                              )}
                            </label>
                            {which ? (
                              <div>
                                <span>
                                  <input
                                    type="radio"
                                    name="act_settings"
                                    value="0"
                                    checked={act_settings == "0" ? true : false}
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
                                    checked={act_settings == "1" ? true : false}
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
                                    checked={act_settings == "2" ? true : false}
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
                                    checked={act_settings == "3" ? true : false}
                                    onChange={(e) => {
                                      this.formHandler(e);
                                    }}
                                  />{" "}
                                  3
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_composite_score"
                              value={act_composite_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_composite_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <label>
                              <strong>International applicants:</strong>Is
                              promotion within your educational system based
                              upon standard leaving examinations given at the
                              end of lower and/or senior secondary school by
                              state or national leaving examinations board?{" "}
                              {act_international_applicants == "" &&
                              submitted ? (
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
                            {which ? (
                              <div>
                                <span>
                                  <input
                                    type="radio"
                                    name="act_international_applicants"
                                    value={true}
                                    checked={
                                      act_international_applicants == "true"
                                        ? true
                                        : false
                                    }
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
                                    checked={
                                      act_international_applicants == "false"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      this.formHandler(e);
                                    }}
                                  />{" "}
                                  No
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
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
                            <DatePicker
                              className="form-control"
                              selected={act_composite_date}
                              name="act_composite_date"
                              onChange={(date) =>
                                this.dateHandler("act_composite_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_english_score"
                              value={act_english_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_english_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={act_english_date}
                              name="act_english_date"
                              onChange={(date) =>
                                this.dateHandler("act_english_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_math_score"
                              value={act_math_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_math_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={act_math_date}
                              name="act_math_date"
                              onChange={(date) =>
                                this.dateHandler("act_math_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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
                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_reading_score"
                              value={act_reading_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_reading_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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

                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={act_reading_date}
                              name="act_reading_date"
                              onChange={(date) =>
                                this.dateHandler("act_reading_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_science_score"
                              value={act_science_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_science_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={act_science_date}
                              name="act_science_date"
                              onChange={(date) =>
                                this.dateHandler("act_science_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="act_writing_score"
                              value={act_writing_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {act_writing_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={act_writing_date}
                              name="act_writing_date"
                              onChange={(date) =>
                                this.dateHandler("act_writing_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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
                              onClick={(e) => {
                                this.saveTest(e, "act", "add");
                              }}
                              className="default-btn"
                            >
                              Save
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
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {test_which.indexOf("SAT Tests") != -1 &&
                  validOptions.indexOf("SAT Tests") != -1 ? (
                    <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <button
                            className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
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
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion1"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label>
                              Number of past SAT scores you wish to report
                              {sat_scores.length <= 0 && submitted ? (
                                <span className="text-danger">
                                  {" "}
                                  <sup>*</sup>
                                </span>
                              ) : (
                                ""
                              )}
                            </label>

                            <input
                              type="text"
                              min="1"
                              max="36"
                              className="js-select2-multi form-control"
                              name="sat_scores"
                              value={sat_scores}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {sat_scores_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 36 allowed
                              </div>
                            ) : (
                              ""
                            )}
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

                            <input
                              type="text"
                              min="1"
                              max="1600"
                              className="js-select2-multi form-control"
                              name="sat_reading_score"
                              value={sat_reading_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                            {sat_reading_score_error ? (
                              <div className="help-block with-errors">
                                Only Number allowed between 1 to 1600 allowed
                              </div>
                            ) : (
                              ""
                            )}
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

                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={sat_reading_date}
                              name="sat_reading_date"
                              onChange={(date) =>
                                this.dateHandler("sat_reading_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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

                            <input
                              type="text"
                              min="1"
                              max="1600"
                              className="js-select2-multi form-control"
                              name="sat_math_score"
                              value={sat_math_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                          </div>
                          {sat_math_score_error ? (
                            <div className="help-block with-errors">
                              Only Number allowed between 1 to 1600 allowed
                            </div>
                          ) : (
                            ""
                          )}

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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={sat_math_date}
                              name="sat_math_date"
                              onChange={(date) =>
                                this.dateHandler("sat_math_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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
                            <input
                              type="text"
                              min="1"
                              max="1600"
                              className="js-select2-multi form-control"
                              name="sat_writing_score"
                              value={sat_writing_score}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
                          </div>
                          {sat_writing_score_error ? (
                            <div className="help-block with-errors">
                              Only Number allowed between 1 to 1600 allowed
                            </div>
                          ) : (
                            ""
                          )}

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

                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={sat_writing_date}
                              name="sat_writing_date"
                              onChange={(date) =>
                                this.dateHandler("sat_writing_date", date)
                              }
                              placeholderText="MM/DD/YYY"
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
                              onClick={(e) => {
                                this.saveTest(e, "sat", "add");
                              }}
                              className="default-btn"
                            >
                              Save
                            </button>
                            {/* <button
                              type="button"
                              onClick={() => {
                                this.resetSat();
                              }}
                              className="default-btn btn-outlin"
                            >
                              Clear Answers
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {test_which.indexOf("AP Subject Tests") != -1 &&
                  validOptions.indexOf("AP Subject Tests") != -1 ? (
                    <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <button
                            className="d-flex align-items-center justify-content-between btn btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
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
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion1"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label>
                              Number of AP tests you wish to report, including
                              tests you expect to take{" "}
                              {ap_number.length <= 0 && submitted ? (
                                <span className="text-danger">
                                  {" "}
                                  <sup>*</sup>
                                </span>
                              ) : (
                                ""
                              )}
                            </label>
                            <select
                              name="ap_number"
                              value={ap_number}
                              className="js-select2-multi form-control"
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            >
                              {this.loadOptions()}
                            </select>
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
                            <DatePicker
                              dateFormat="MM-dd-yyyy"
                              className="form-control"
                              selected={ap_date_taken}
                              name="ap_date_taken"
                              onChange={(date) =>
                                this.dateHandler("ap_date_taken", date)
                              }
                              placeholderText="MM/DD/YYY"
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
                            <input
                              type="text"
                              className="form-control"
                              name="ap_subject"
                              value={ap_subject}
                              onChange={(e) => {
                                this.formHandler(e);
                              }}
                            />
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
                            {which ? (
                              <div>
                                <div>
                                  <input
                                    type="radio"
                                    name="ap_score"
                                    value="5"
                                    checked={ap_score == "5" ? true : false}
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
                                    checked={ap_score == "4" ? true : false}
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
                                    checked={ap_score == "3" ? true : false}
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
                                    checked={
                                      this.state.ap_score == "2" ? true : false
                                    }
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
                                    checked={ap_score == "1" ? true : false}
                                    onChange={(e) => {
                                      this.formHandler(e);
                                    }}
                                  />{" "}
                                  1
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                this.saveTest(e, "ap", "add");
                              }}
                              className="default-btn"
                            >
                              Save
                            </button>
                            {/* <button
                              type="button"
                              onClick={() => {
                                this.resetAp();
                              }}
                              className="default-btn btn-outlin"
                            >
                              Clear Answers
                            </button> */}
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
        </div>
        <div className="tab-pane active" id="test-scores">
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
                              className="collapse show sub-menu-sec"
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
                      Portfolio
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
                              to={"/home/test-score/" + studentId}
                              className="breadcrumb-item text-muted active"
                            >
                              Test Score
                            </Link>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="page-title card-header d-flex align-items-center">
                  <h5>
                    Grades{" "}
                    {view == "Student" ? (
                      ""
                    ) : (
                      <span className="float-right">
                        <button
                          type="button"
                          className="default-btn"
                          data-toggle="modal"
                          data-target="#grades"
                          onClick={() => {
                            this.setState({ GradeModal: "add" });
                            this.resetGrade();
                          }}
                        >
                          + Add Grades
                        </button>
                      </span>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  {gradeArray.length <= 0 ? (
                    <div className="nodata text-center">
                      <img
                        src={base + "/assets/img/nodata.png"}
                        className="img-fluid"
                      />
                      <h4 className="font300">No Grades Added</h4>
                      <br />
                    </div>
                  ) : (
                    <div className="datashown text-center">
                      <div className="card">
                        <div className="card-header">
                          <h4>Grades</h4>
                        </div>
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table table-striped text-left">
                              <thead>
                                <tr>
                                  <th>Grades</th>

                                  <th className="text-centre">
                                    Cumulative GPA
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {gradeArray.map((data, index) => (
                                  <tr key={index}>
                                    <td>{data.grade}</td>

                                    <td className="text-centre">{data.gpa}</td>
                                    {view !== "Student" ? (
                                      <td className="text-right">
                                        <button
                                          type="button"
                                          className="default-btn"
                                          onClick={(e) =>
                                            this.deleteHandler(
                                              e,
                                              data._id,
                                              "grade"
                                            )
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                        &nbsp;&nbsp;
                                        <button
                                          type="button"
                                          className="default-btn"
                                          data-target="#grades"
                                          data-toggle="modal"
                                          onClick={() => {
                                            this.gradeEditHandler(data);
                                            this.setState({
                                              GradeModal: "edit",
                                            });
                                          }}
                                        >
                                          <i className="fa fa-pencil"></i>
                                        </button>
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="page-title card-header d-flex align-items-center">
                  <h5>
                    Test Scores{" "}
                    {view == "Student" ? (
                      ""
                    ) : (
                      <span className="float-right">
                        <button
                          type="button"
                          className="default-btn"
                          data-toggle="modal"
                          data-target="#testscore"
                          onClick={() => {
                            this.resetAct();
                            this.resetAp();
                            this.resetGrade();
                            this.resetTestTaken();
                            this.setState({ which: true });
                            this.getUserData();
                          }}
                        >
                          + Add Test Scores
                        </button>
                      </span>
                    )}
                  </h5>
                </div>
                {/* tableact */}
                <div className="card-body">
                  {testArray.length <= 0 ? (
                    <div className="nodata text-center">
                      <img
                        src={base + "/assets/img/nodata.png"}
                        className="img-fluid"
                      />
                      <h4 className="font300">No Test Scores Added</h4>
                      <br />
                    </div>
                  ) : (
                    testArray.map((data, index) =>
                      data.test_type == "act" ? (
                        <div key={index} className="datashown text-center">
                          <div className="card">
                            <div className="card-header">
                              <h4>
                                Act Test{" "}
                                {this.state.view !== "Student" ? (
                                  <span className="float-right">
                                    <button
                                      type="button"
                                      className="default-btn"
                                      onClick={(e) => {
                                        this.deleteHandler(e, data._id, "test");
                                      }}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#editAct"
                                      className="default-btn"
                                      onClick={() => {
                                        this.setState({
                                          act_test_id: data._id,
                                        });
                                        this.editStateHandler(index, "act");
                                      }}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </h4>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-striped text-left">
                                  <tbody>
                                    <tr>
                                      <th>
                                        {" "}
                                        Number of past ACT scores you wish to
                                        report
                                      </th>
                                      <td className="text-right">
                                        {data.act_past_score_report
                                          ? data.act_past_score_report
                                          : "N/A"}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>
                                        Have you taken the ACT Plus Writing
                                        test?
                                      </th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_writing_test
                                          ? data.act_writing_test == "true"
                                            ? "Yes"
                                            : "No"
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        Number of future ACT settings you expect
                                      </th>
                                      <td className="text-right">
                                        {" "}
                                        {data.future_act_setting}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest composite score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_high_composite_score
                                          ? data.act_high_composite_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        <b>International applicants:</b>
                                        <br />
                                        Is promotion within your educational
                                        system based upon standard leaving
                                        examinations given at the end of lower
                                        and/or senior secondary school by state
                                        or national leaving examinations board?
                                      </th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_international_applicants
                                          ? data.act_international_applicants ==
                                            "true"
                                            ? "Yes"
                                            : "No"
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Composite date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_composite_date
                                          ? moment(
                                              data.act_composite_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest English score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_high_english_score
                                          ? data.act_high_english_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>English date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_english_date
                                          ? moment(
                                              data.act_english_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest math score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_highest_math_score
                                          ? data.act_highest_math_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Math date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_math_date
                                          ? moment(data.act_math_date).format(
                                              "MM-DD-YYYY"
                                            )
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest reading score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_highest_reading_score
                                          ? data.act_highest_reading_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Reading date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_reading_date
                                          ? moment(
                                              data.act_reading_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest Science score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_highest_science_score
                                          ? data.act_highest_science_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Science date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_science_date
                                          ? moment(
                                              data.act_science_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest Writing score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_highest_writing_score
                                          ? data.act_highest_writing_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Writing date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.act_writing_date
                                          ? moment(
                                              data.act_writing_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : // tablesat
                      data.test_type == "sat" ? (
                        <div key={index} className="datashown text-center">
                          <div className="card">
                            <div className="card-header">
                              <h4>
                                SAT Test{" "}
                                {this.state.view !== "Student" ? (
                                  <span className="float-right">
                                    <button
                                      type="button"
                                      className="default-btn"
                                      onClick={(e) => {
                                        this.deleteHandler(e, data._id, "test");
                                      }}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#editSat"
                                      className="default-btn"
                                      onClick={() => {
                                        this.setState({
                                          sat_test_id: data._id,
                                        });
                                        this.editStateHandler(index, "sat");
                                      }}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </h4>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-striped text-left">
                                  <tbody>
                                    <tr>
                                      <th>
                                        {" "}
                                        Number of past SAT scores you wish to
                                        report
                                      </th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_past_score_report
                                          ? data.sat_past_score_report
                                          : "N/A"}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>Highest Critical reading score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_high_critical_reading_score
                                          ? data.sat_high_critical_reading_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Critical reading date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_critical_reading_date
                                          ? moment(
                                              data.sat_critical_reading_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest math score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_highest_math_score
                                          ? data.sat_highest_math_score
                                          : "N/A"}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>Math date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_math_date
                                          ? moment(data.sat_math_date).format(
                                              "MM-DD-YYYY"
                                            )
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Highest writing score</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_highest_writing_score
                                          ? data.sat_highest_writing_score
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Writing date</th>
                                      <td className="text-right">
                                        {" "}
                                        {data.sat_writing_date
                                          ? moment(
                                              data.sat_writing_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : // tableap
                      data.test_type == "ap" ? (
                        <div key={index} className="datashown text-center">
                          <div className="card">
                            <div className="card-header">
                              <h4>
                                AP Test{" "}
                                {this.state.view !== "Student" ? (
                                  <span className="float-right">
                                    <button
                                      type="button"
                                      className="default-btn"
                                      onClick={(e) => {
                                        this.deleteHandler(e, data._id, "test");
                                      }}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#editAp"
                                      className="default-btn"
                                      onClick={() => {
                                        this.setState({ ap_test_id: data._id });
                                        this.editStateHandler(index, "ap");
                                      }}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </h4>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-striped text-left">
                                  <tbody>
                                    <tr>
                                      <th>
                                        {" "}
                                        Number of past AP scores you wish to
                                        report
                                      </th>
                                      <td className="text-right">
                                        {data.ap_past_score_report
                                          ? data.ap_past_score_report
                                          : "N/A"}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>Date taken or planned</th>
                                      <td className="text-right">
                                        {data.ap_taken_planned_date
                                          ? moment(
                                              data.ap_taken_planned_date
                                            ).format("MM-DD-YYYY")
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Subject</th>
                                      <td className="text-right">
                                        {data.ap_subject
                                          ? data.ap_subject
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Score</th>
                                      <td className="text-right">
                                        {data.ap_score ? data.ap_score : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
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
