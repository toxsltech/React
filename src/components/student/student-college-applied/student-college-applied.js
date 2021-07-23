/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import base from "../../../globals/base";
import config from "../../../globals/config";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
import ReactPaginate from "react-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import Paginate from "../../pagination/pagination";
import { Student_SIDEBAR } from "../../../globals/constant";
import loadOptions from "./loadOptions";
import moment from "moment";

declare var $;

export default class StudentCollegeApplied extends React.Component {
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
      mileId: [],
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
      siteView: "",
      collegeId: "",
      mileStone: "",
      type: "",
      mileStoneArr: [],
      endDate: "",
      MileStoneDescription: "",
      infoColleges: [],
      recommendation: [],
      str: "Application Deadline",
      graphData: [],
      deadline_message: "",
      outerareacolor: ["", "pinkbox", "bluebox", "greenbox"],
      progressareacolor: ["", "pinkbar", "bluebar", "greenbar"],
      isAddedByAdmin: "",
      isEditable: "",
      isAdmintoStudent: "",
      search: "",
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
      this.getGraphDataSelected();
    }
  };

  componentDidMount() {}

  handleAddMilestone() {
    this.setState({
      mileStone: "",
      endDate: "",
      type: "",
    });
    if (this.state.deadline_message) {
      showNotification("danger", this.state.deadline_message);
      return;
    }
    $("#editMilestone").modal("show");
  }

  viewSingleEvents = (data) => {
    this.setState({
      milestoneId: data._id,
      mileStone: data.mileStone,
      type: data.type,
      endDate: data.endDate,
      MileStoneDescription: data.MileStoneDescription,
      isAddedByAdmin: data?.isAddedByAdmin ?? "",
      isEditable: data?.isEditable ?? "",
      isAdmintoStudent: data?.isAdmintoStudent ?? "",
    });
  };

  deleteSingleEvents = (data) => {
    let id = data._id;
    const mileStone = data.mileStone;
    UserService.deleteMileStone(id, { mileStone }).then((resp) => {
      if (resp?.data?.success) {
        // showNotification("success", resp.data.message);
        this.getMilestoneDeadlineforStudent(this.state.collegeId);
      }
    });
  };

  updateSingleEvent = (e) => {
    e.preventDefault();
    const { milestoneId, endDate, type, mileStone, MileStoneDescription } =
      this.state;

    if (this.state.mileStone == "") {
      showNotification("danger", "Please enter milestone");
      return false;
    }
    if (this.state.type == "") {
      showNotification("danger", "Please select type");
      return false;
    }
    if (this.state.endDate == "") {
      showNotification("danger", "Please enter endDate");
      return false;
    }
    UserService.updateMilestone({
      milestoneId,
      endDate,
      type,
      mileStone,
      MileStoneDescription,
    }).then((resp) => {
      if (resp?.data?.success) {
        this.getMilestoneDeadlineforStudent(this.state.collegeId);
        // showNotification("success", resp.data.message);
        // document.getElementById("closemodel").click();
        $("#editMilestone1").modal("hide");

        document.getElementById("closeviewMilestone").click();
      }
    });
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
          let response = resp?.data;
          if (response?.success) {
            let arr = response.colleges;
            this.setState({
              dreamCollegeArray: response.colleges,
              dreamCount: response.collegeCount,
            });
            this.setState({ dream_collegeSelect: [] });
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId ? data.collegeUnitId : data.id,
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
          let response = resp?.data;
          if (response?.success == true) {
            let arr = response.colleges;
            this.setState({
              safetyCollegeArray: response.colleges,
              safetyCount: response.collegeCount,
            });

            this.setState({ dream_collegeSelect: [] });
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId ? data.collegeUnitId : data.id,
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
          let response = resp?.data;
          if (response?.success == true) {
            let arr = response.colleges;
            this.setState({
              targetCollegeArray: response.colleges,
              targetCount: response.collegeCount,
            });
            this.setState({ dream_collegeSelect: [] });
            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId ? data.collegeUnitId : data.id,
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
    offset = offset ? offset : 0;
    UserService.getSelectedColleges(myCollegeLimit, offset, filter, "dream")
      .then((resp) => {
        if (resp) {
          let response = resp?.data;
          if (response?.success) {
            console.log(response, "resp");
            let arr = response.colleges
              ? response.colleges
              : response.data.data;
            this.setState(
              {
                dreamCollegeArray: response.colleges
                  ? response.colleges
                  : response.data.data,
                dreamCount: response.collegeCount
                  ? response.collegeCount
                  : response.data.collegeCount,
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
        console.log(err, "err");
        showNotification("danger", constant.ERRORMSG);
      });
  };
  getSafetyCollegeSelected = (offset, filter) => {
    const { myCollegeLimit } = this.state;
    UserService.getSelectedColleges(myCollegeLimit, offset, filter, "safety")
      .then((resp) => {
        if (resp) {
          let response = resp?.data;
          if (response?.success == true) {
            let arr = response.colleges
              ? response.colleges
              : response.data.data;
            this.setState(
              {
                safetyCollegeArray: response.colleges
                  ? response.colleges
                  : response.data.data,
                safetyCount: response.collegeCount
                  ? response.collegeCount
                  : response.data.collegeCount,
              },
              () => {
                this.setState({ safety_collegeSelect: [] });
              }
            );

            arr.map((data, index) => {
              let data1 = {
                label: data.name,
                value: data.collegeUnitId ? data.collegeUnitId : data.id,
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
          let response = resp?.data;
          if (response?.success) {
            let arr = response.colleges
              ? response.colleges
              : response.data.data;
            this.setState(
              {
                targetCollegeArray: response.colleges
                  ? response.colleges
                  : response.data.data,
                targetCount: response.collegeCount
                  ? response.collegeCount
                  : response.data.collegeCount,
              },
              () => {
                this.setState({ target_collegeSelect: [] });
              }
            );

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
    // UserService.getColleges(limit, offset, filter)
    UserService.getColleges()
      .then((resp) => {
        if (resp) {
          let response = resp?.data;
          console.log("@@22ascsacascsadasdd", response);
          if (Array.isArray(response.message)) {
            this.setState({ college_list_array: response.message });
          }
          if (response?.success) {
            this.setState({ college_list_array: response.colleges });
          }
          if (Array.isArray(response)) {
            this.setState({ college_list_array: response });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.getUserList(value, 10, 0);
  };

  getUserList = (search, limit, offset) => {
    UserService.getColleges(limit, offset, search).then((resp) => {
      if (resp) {
        if (resp?.data?.success) {
          this.setState({ college_list_array: resp?.data?.colleges });
        }
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

  onChange = (datas, types) => {
    this.setState({ [types]: datas });
    let obj = {};
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
          let response = resp?.data;
          if (response?.success) {
            this.setState({
              success: true,
              loading: false,
            });
            this.getDreamCollegeSelected();
            this.getSafetyCollegeSelected();
            this.getTargetCollegeSelected();
            // showNotification("success", resp.data.message);
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  resetModal = () => {
    this.setState({
      type: "",
      milestone: "",
      endDate: "",
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
            let response = resp?.data;
            if (response?.success == true) {
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
          let response = resp?.data;
          if (response?.success) {
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

  addRecomendations = (data) => {
    UserService.addStudentMilestone(this.state.collegeId, {
      collegeId: this.state.collegeId,
      mileStone: data.mileStone,
      endDate: data.endDate,
      type: data.type,
    })
      .then((resp) => {
        if (resp) {
          this.getMilestoneDeadlineforStudent(this.state.collegeId);
          // document.getElementById("closeadd").click();

          // editMilestone
          $("#editMilestone").modal("hide");
          // showNotification("success", resp.data.message);
          this.setState({
            mileStone: "",
            type: "",
            endDate: "",
          });
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  resetCollegeSelect = () => {};
  handlePageChange = (data, type) => {
    let selected = data.selected;
    selected = selected;
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
        if (response?.data?.success) {
          // showNotification("success", response?.data?.message);
          this.getDreamCollegeSelected();
          this.getSafetyCollegeSelected();
          this.getTargetCollegeSelected();
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  //   isEditShow=()=>
  //   {
  // if(isAddedByAdmin && isEditable)
  // {

  // }
  //   }

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

  updateCalendar = () => {
    UserService.updateMiles({
      collegeId: this.state.collegeId,
      mileStone: this.state.mileStone,
      endDate: this.state.endDate,
      type: this.state.type,
    })
      .then((resp) => {
        if (resp) {
          showNotification("success", resp.data.message);
          document.getElementById("close8").click();
          this.infoCollegeMilestone(this.state.collegeId);
          this.setState({
            mileStone: "",
            type: "",
            endDate: new Date(),
          });
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  pageChange = (id) => {
    this.props.history.push("/home/college-details/" + id);
  };

  showAddMileStone = (id) => {
    this.setState({ collegeId: id });
  };

  infoCollegeMilestone = (id) => {
    this.setState({
      collegeId: id,
    });
    this.setState({ infoColleges: [] });

    UserService.infoCollegeMilestone(id)
      .then((resp) => {
        if (resp) {
          resp = resp.data;

          this.setState({ infoColleges: resp.data[0] });
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  milestoneId = (id) => {
    let arr = [];
    let endArray = [];
    id.map((data) => {
      arr.push(data._id);
      endArray.push(data.endDate);
    });
    let body = { _id: arr, endDate: endArray };

    if (arr.length == 0) {
      showNotification("danger", "Please add milestone first");
      return;
    }

    UserService.milestoneId(this.state.collegeId, body)
      .then((resp) => {
        resp = resp.data;
        if (resp) {
          // showNotification("success", 'Added to calendar');
          $("#infoMilestone").modal("hide");
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveMilestone = (data) => {
    if (this.state.mileStone == "") {
      showNotification("danger", "Please enter milestone");
      return false;
    }
    if (this.state.type == "") {
      showNotification("danger", "Please select type");
      return false;
    }
    if (this.state.endDate == "") {
      showNotification("danger", "Please enter endDate");
      return false;
    }
    let body = {
      collegeId: this.state.collegeId,
      mileStone: this.state.mileStone,
      endDate: this.state.endDate,
      type: this.state.type,
    };
    let id = this.state.collegeId;
    // showNotification("danger", 'outtttttttt');
    UserService.addStudentMilestone(id, body)
      .then((resp) => {
        if (resp) {
          this.getMilestoneDeadlineforStudent(this.state.collegeId);
          // document.getElementById("closeadd").click();

          // editMilestone
          $("#editMilestone").modal("hide");
          // showNotification("success", resp.data.message);
          this.setState({
            mileStone: "",
            type: "",
            endDate: "",
          });
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  showAddMileStone = (id) => {
    this.setState({ collegeId: id });
  };

  addToCalendar = () => {
    UserService.updateForCalender()
      .then((resp) => {
        if (resp) {
          let response = resp?.data;
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  loadMilestoneOnIClick = (id) => {
    this.setState({
      infoColleges: [],
    });
    this.setState({
      recommendation: [],
    });
    this.setState({
      deadline_message: "",
    });
    this.setState({
      collegeId: id,
    });

    UserService.getMilestoneDeadlineforStudent(id)
      .then((resp) => {
        if (resp) {
          resp = resp?.data;

          if (resp && resp?.data) {
            this.setState({ infoColleges: resp.data[0] });

            this.setState({ recommendation: resp.data[1] });
            // showNotification("success", resp.message);
          } else {
            if (resp?.message) {
              this.setState({
                deadline_message: resp.message,
              });
            }
          }
        }
      })
      .catch((err) => {});
  };

  getMilestoneDeadlineforStudent = (id) => {
    this.setState({
      collegeId: id,
    });
    UserService.getMilestoneDeadlineforStudent(id)
      .then((resp) => {
        if (resp) {
          resp = resp.data;
          //       if(resp.message=== "You have missed the deadline")
          //     showNotification("danger", resp.message);

          if (resp && resp?.data) {
            this.setState({ infoColleges: resp.data[0] });

            this.setState({ recommendation: resp.data[1] });
            // showNotification("success", resp.data[0].message);
          } else {
            if (resp?.message) {
              this.setState({
                deadline_message: resp.message,
              });
            }
          }
        }
      })
      .catch((err) => {});
  };

  // calendarSingleEvents = (id) => {
  //   console.log("=============",id)
  //   this.setState({
  //     collegeId: id});
  //     UserService.calEvents(id)
  //     .then((resp) => {
  //       resp = resp.data;
  //       if (resp.data) {
  //        console.log("asvasvdswq@@@@@@@@@@@@@@@@@@@",resp)

  //         this.setState({ infoColleges: resp.data });
  //       }
  //     })
  //     .catch((err) => {
  //       showNotification("danger", constant.ERRORMSG);
  //     });
  // };
  getGraphDataSelected() {
    UserService.getcollegeTracker()
      .then((resp) => {
        if (resp) {
          resp = resp?.data;

          var newarr = [];
          for (let item of resp) {
            var totalMilestoneCount = item.totalMilestoneCount
              ? item.totalMilestoneCount
              : 0;
            var completedtotalMilestoneCount = item.completedMilestoness
              ? item.completedMilestoness
              : 0;
            var percent =
              (completedtotalMilestoneCount / totalMilestoneCount) * 100;

            var obj = {
              id: item._id,
              name:
                item.collegeDetails.name.length > 21
                  ? item.collegeDetails.name.substr(0, 21) + "..."
                  : item.collegeDetails.name,
              percentage: Math.round(percent),
            };
            newarr.push(obj);
          }
          this.setState({ graphData: newarr });
        }
      })
      .catch((err) => {});
  }

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
      MileStoneDescription,
      safetyCount,
      targetCount,
      dreamIcon,
      safetyIcon,
      loaded,
      targetIcon,
      studentId,
      endDate,
      mileStone,
      type,
      mileStoneArr,
      infoColleges,
      recommendation,
      isEditable,
    } = this.state;
    const { siteView } = this.props;
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
                    College Applied
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
                            to={"/home/college-applied/" + studentId}
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

            <div
              className={
                view == "Student"
                  ? "tab-pane counselor-panel in active"
                  : "tab-pane in active"
              }
              id="ucla"
            >
              {this.state.graphData.length > 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row mb-3">
                      {this.state.graphData.map((g, i) => (
                        <div
                          key={g.id}
                          className="col-xl-4 col-md-4 mb-3 text-center col-50 custom-col-width"
                        >
                          <div
                            className={
                              "outerarea " + this.state.outerareacolor[i % 4]
                            }
                          >
                            <h5>{g.name}</h5>
                            <div
                              className="progress"
                              data-percentage={g.percentage}
                            >
                              <span className="progress-left">
                                <span
                                  className={
                                    "progress-bar " +
                                    this.state.progressareacolor[i % 4]
                                  }
                                ></span>
                              </span>
                              <span className="progress-right">
                                <span
                                  className={
                                    "progress-bar " +
                                    this.state.progressareacolor[i % 4]
                                  }
                                ></span>
                              </span>
                              <div className="progress-value">
                                <div>
                                  {g.percentage}%
                                  <br />
                                  <span>completed</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
                                  <div
                                    key={index}
                                    className="col-xl-4 col-md-6"
                                  >
                                    <div className="single-services">
                                      <img
                                        src={
                                          data.campusImage
                                            ? data.campusImage
                                            : config + "/" + data.img
                                        }
                                        alt=""
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                          this.pageChange(
                                            data.collegeUnitId
                                              ? data.collegeUnitId
                                              : data._id
                                          )
                                        }
                                      />
                                      <div className="service-text">
                                        <h3
                                          style={{ cursor: "pointer" }}
                                          className="text-white"
                                          onClick={(e) =>
                                            this.pageChange(
                                              data.collegeUnitId
                                                ? data.collegeUnitId
                                                : data._id
                                            )
                                          }
                                        >
                                          {data.name
                                            ? data.name
                                            : "College Name"}
                                        </h3>
                                      </div>

                                      {view != "Student" ? (
                                        <>
                                          <a
                                            href="#infoMilestone"
                                            data-toggle="modal"
                                            data-target="#infoMilestone"
                                            className="plus-icon"
                                            onClick={(e) =>
                                              this.loadMilestoneOnIClick(
                                                data.collegeUnitId
                                                  ? data.collegeUnitId
                                                  : data._id
                                              )
                                            }
                                          >
                                            <i className="fa fa-info-circle"></i>
                                          </a>
                                          <div className="hover-icon hover-icon-new">
                                            <a
                                              onClick={() =>
                                                this.deleteHandler(
                                                  data.collegeUnitId
                                                    ? data.collegeUnitId
                                                    : data._id,
                                                  "dream"
                                                )
                                              }
                                            >
                                              <i className="fa fa-close"></i>
                                            </a>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ))
                              : " "}
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
                                  <div
                                    key={index}
                                    className="col-xl-4 col-md-6"
                                  >
                                    <div className="single-services">
                                      <img
                                        style={{ cursor: "pointer" }}
                                        src={
                                          data.campusImage
                                            ? data.campusImage
                                            : config + "/" + data.img
                                        }
                                        alt=""
                                        onClick={(e) =>
                                          this.pageChange(
                                            data.collegeUnitId
                                              ? data.collegeUnitId
                                              : data._id
                                          )
                                        }
                                        onmouseout={"please"}
                                      />

                                      <div className="service-text">
                                        <h3
                                          style={{ cursor: "pointer" }}
                                          className="text-white"
                                          onClick={(e) =>
                                            this.pageChange(
                                              data.collegeUnitId
                                                ? data.collegeUnitId
                                                : data._id
                                            )
                                          }
                                        >
                                          {data.name
                                            ? data.name
                                            : "College Name"}
                                        </h3>
                                      </div>
                                      {view != "Student" ? (
                                        <>
                                          <a
                                            href="#infoMilestone"
                                            data-toggle="modal"
                                            data-target="#infoMilestone"
                                            className="plus-icon"
                                            onClick={(e) =>
                                              this.getMilestoneDeadlineforStudent(
                                                data.collegeUnitId
                                                  ? data.collegeUnitId
                                                  : data._id
                                              )
                                            }
                                          >
                                            <i className="fa fa-info-circle"></i>
                                          </a>
                                          <div className="hover-icon hover-icon-new">
                                            <a
                                              onClick={() =>
                                                this.deleteHandler(
                                                  data.collegeUnitId
                                                    ? data.collegeUnitId
                                                    : data._id,
                                                  "safety"
                                                )
                                              }
                                            >
                                              <i className="fa fa-close"></i>
                                            </a>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ))
                              : " "}
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
                                  <div
                                    key={index}
                                    className="col-xl-4 col-md-6"
                                  >
                                    <div className="single-services">
                                      <img
                                        style={{ cursor: "pointer" }}
                                        src={
                                          data.campusImage
                                            ? data.campusImage
                                            : config + "/" + data.img
                                        }
                                        alt=""
                                        onClick={(e) =>
                                          this.pageChange(
                                            data.collegeUnitId
                                              ? data.collegeUnitId
                                              : data._id
                                          )
                                        }
                                      />

                                      <div className="service-text">
                                        <h3
                                          style={{ cursor: "pointer" }}
                                          className="text-white"
                                          onClick={(e) =>
                                            this.pageChange(
                                              data.collegeUnitId
                                                ? data.collegeUnitId
                                                : data._id
                                            )
                                          }
                                        >
                                          {data.name
                                            ? data.name
                                            : "College Name"}
                                        </h3>
                                      </div>
                                      {view != "Student" ? (
                                        <>
                                          <a
                                            href="#infoMilestone"
                                            data-toggle="modal"
                                            data-target="#infoMilestone"
                                            className="plus-icon"
                                            onClick={(e) =>
                                              this.getMilestoneDeadlineforStudent(
                                                data.collegeUnitId
                                                  ? data.collegeUnitId
                                                  : data._id
                                              )
                                            }
                                          >
                                            <i className="fa fa-info-circle"></i>
                                          </a>
                                          <div className="hover-icon hover-icon-new">
                                            <a
                                              onClick={() =>
                                                this.deleteHandler(
                                                  data.collegeUnitId
                                                    ? data.collegeUnitId
                                                    : data._id,
                                                  "target"
                                                )
                                              }
                                            >
                                              <i className="fa fa-close"></i>
                                            </a>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ))
                              : ""}
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
                            {/* <input
                              className="prompt srch10 mt-0"
                              type="text"
                              placeholder="Search..."
                              name="searchCollege"
                              value={searchCollege}
                              onChange={(e) => {
                                this.handleSearch(e);
                              }}
                            /> */}
                            <input
                              placeholder="Search"
                              type="text"
                              name="search"
                              className="form-control"
                              value={this.state.search}
                              onChange={this.handleSearch}
                              style={{ height: "38px" }}
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
                            <div
                              key={index}
                              className="col-xl-4 col-md-6"
                              title="Click info icon to check deadline"
                            >
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
                                          data.collegeUnitId
                                            ? data.collegeUnitId
                                            : data._id,
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
                                          data.collegeUnitId
                                            ? data.collegeUnitId
                                            : data._id,
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
                                          data.collegeUnitId
                                            ? data.collegeUnitId
                                            : data._id,
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
                                  src={
                                    data.campusImage
                                      ? data.campusImage
                                      : config + "/" + data.img
                                  }
                                  alt=""
                                  onClick={(e) =>
                                    this.pageChange(
                                      data.collegeUnitId
                                        ? data.collegeUnitId
                                        : data._id
                                    )
                                  }
                                />

                                <div className="service-text">
                                  <h3
                                    className="text-white"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) =>
                                      this.pageChange(
                                        data.collegeUnitId
                                          ? data.collegeUnitId
                                          : data._id
                                      )
                                    }
                                  >
                                    {data.name}, {data.city}
                                  </h3>
                                </div>

                                {view != "Student" ? (
                                  <>
                                    <a
                                      href="#infoMilestone1"
                                      data-toggle="modal"
                                      data-target="#infoMilestone1"
                                      className="plus-icon"
                                      onClick={(e) =>
                                        this.infoCollegeMilestone(
                                          data.collegeUnitId
                                            ? data.collegeUnitId
                                            : data._id
                                        )
                                      }
                                    >
                                      <i className="fa fa-info-circle"></i>
                                    </a>
                                  </>
                                ) : (
                                  ""
                                )}
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

        <div className="modal" id="openMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Update Milestone</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <button
                        type="button"
                        className="close"
                        id="close1"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <label>Add Milestone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mileStone"
                        value={mileStone}
                        type="text"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone </label>
                      <select
                        className="form-control"
                        name="type"
                        onChange={this.handleChange}
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone End Date </label>
                      <input
                        className="form-control"
                        value={endDate}
                        required
                        name="endDate"
                        type="date"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex flex-wrap justify-content-end">
                <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  onClick={this.saveMilestone}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="editMilestone">
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
              <div className="modal-body pb-4">
                <div className="row ">
                  <div className="col-md-12 mb-3 mt-3">
                    <div className="form-group">
                      <label>Milestone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mileStone"
                        value={mileStone}
                        type="text"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone Type </label>
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
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone End Date </label>
                      <input
                        className="form-control"
                        value={endDate}
                        min={moment(new Date()).format("YYYY-MM-DD")}
                        name="endDate"
                        type="date"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex flex-wrap justify-content-end">
                {/* <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button> */}
                {/* &nbsp; */}
                <button
                  id="closeadd"
                  type="button"
                  className="default-btn"
                  onClick={this.saveMilestone}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="modal" id="openMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Update Milestone</h4>
                <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                    <button
                  type="button"
                  className="close"
                  id="close1"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                      <label>Add Milestone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mileStone"
                        value={mileStone}
                        type="text"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone </label>
                      <select
                        className="form-control"
                        name="type"
                        onChange={this.handleChange}
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Milestone End Date </label>
                      <input
                        className="form-control"
                        value={endDate}
                      
                        required
                        name="endDate"
                        type="date"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>  
              <div className="modal-footer d-flex flex-wrap justify-content-end">
                <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="default-btn"
                  onClick={this.saveMilestone}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="modal" id="infoMilestone">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Milestone Deadlines </h4>
                <button
                  type="button"
                  className="close"
                  id="close2"
                  data-dismiss="modal"
                >
                  &times;
                </button>{" "}
              </div>
              <div className="modal-body">
                <p>
                  Application has recommended the following set of tasks and
                  milestones based on the application deadline. you may choose
                  to add these to your calendar and add/update as deem fit
                </p>

                <div class="scrolledarea height100">
                  <div className="row">
                    {recommendation.map((data) => (
                      <div key={data._id} className="col-md-12">
                        <p class="mb-3">
                          {data.mileStone}
                          <button
                            // id="close1"
                            type="button"
                            className="default-btn btn-sm float-right"
                            // data-dismiss="modal"
                            onClick={this.addRecomendations.bind(this, data)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>{" "}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Milestone</h5>
                  </div>
                  <div className="col-md-6">
                    <h5 className=" text-right pr-4">Action</h5>
                  </div>
                </div>
                <div className="scrolledarea height100">
                  <div className="row">
                    {infoColleges.map((data) => (
                      <div key={data._id} className="col-md-12">
                        <div className="form-group">
                          <p className="form-control">
                            {moment(data?.endDate).format("MM-DD-YYYY")}{" "}
                            {data?.mileStone}
                            {/* { (data.isEditable != true && data.isAddedByAdmin === true ) ||  data.mileStone !== "Application Deadline" && (
                              
                              <span className="float-right">
                               
                                <a
                                  onClick={(e) => this.viewSingleEvents(data)}
                                  className="default-btn btn-sm"
                                  data-toggle="modal"
                                  title="Edit Milestone1"
                                  data-target="#editMilestone1"
                                >
                                  <i
                                    className="la la-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                &nbsp;
                                {data.isAddedByAdmin===true &&  data.isEditable===true  ?"":(
                                <a
                                  onClick={(e) =>
                                    this.deleteSingleEvents(data._id)
                                  }
                                  className="default-btn btn-sm"
                                  title="Delete Milestone" 
                                  
                                >
                                  <i
                                    className="la la-trash"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                               )} 


                              </span>
                            )} */}
                            {data.mileStone !== "Application Deadline" && (
                              <span className="float-right text-right">
                                {data.isAddedByStudent &&
                                  !data.isAddedByAdmin &&
                                  !data.isAdmintoStudent && (
                                    <>
                                      <a
                                        onClick={(e) =>
                                          this.viewSingleEvents(data)
                                        }
                                        className="default-btn btn-sm mr-2"
                                        data-toggle="modal"
                                        title="Edit Milestone1"
                                        data-target="#editMilestone1"
                                      >
                                        <i
                                          className="la la-pencil"
                                          aria-hidden="true"
                                        ></i>
                                      </a>

                                      <a
                                        onClick={(e) =>
                                          this.deleteSingleEvents(data)
                                        }
                                        className="default-btn btn-sm"
                                        title="Delete Milestone"
                                      >
                                        <i
                                          className="la la-trash"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </>
                                  )}

                                {data.isAdmintoStudent && (
                                  <>
                                    <a
                                      onClick={(e) =>
                                        this.viewSingleEvents(data)
                                      }
                                      className="default-btn btn-sm mr-2"
                                      data-toggle="modal"
                                      title="Edit Milestone1"
                                      data-target="#editMilestone1"
                                    >
                                      <i
                                        className="la la-pencil"
                                        aria-hidden="true"
                                      ></i>
                                    </a>

                                    <a
                                      onClick={(e) =>
                                        this.deleteSingleEvents(data)
                                      }
                                      className="default-btn btn-sm"
                                      title="Delete Milestone"
                                    >
                                      <i
                                        className="la la-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </>
                                )}
                                {data.isAddedByAdmin && data.isEditable && (
                                  <a
                                    onClick={(e) => this.viewSingleEvents(data)}
                                    className="default-btn btn-sm"
                                    data-toggle="modal"
                                    title="Edit Milestone1"
                                    data-target="#editMilestone1"
                                  >
                                    <i
                                      className="la la-pencil"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  id="add_milestone_btn_fix"
                  type="button"
                  className="default-btn"
                  onClick={this.handleAddMilestone.bind(this)}
                >
                  Add New Milestone
                </button>

                <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  // data-dismiss="modal"

                  onClick={(e) => this.milestoneId(infoColleges)}
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="editMilestone1">
          <div className="modal-dialog modal-customsize">
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
                <div className="modal-body pb-5 pt-3">
                  <div className="row mb-3 mt-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <h3>Milestone</h3>

                        {(this.state.isEditable === true &&
                          this.state.isAddedByAdmin === true) ||
                        this.state.isAdmintoStudent === true ||
                        mileStone === "Start working on Essay Prompts" ||
                        mileStone === "Create a draft application" ||
                        mileStone === "Submit Application" ||
                        mileStone === "Review and Refine essays" ||
                        mileStone === "Inform teachers and counselors" ? (
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
                  {this.state.isAddedByAdmin || this.state.isAdmintoStudent ? (
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
                  ) : (
                    ""
                  )}

                  <h3>Milestone Type</h3>

                  <div className="row mb-3">
                    {(this.state.isEditable === true &&
                      this.state.isAddedByAdmin === true) ||
                    this.state.isAdmintoStudent === true ||
                    mileStone === "Start working on Essay Prompts" ||
                    mileStone === "Create a draft application" ||
                    mileStone === "Inform teachers and counselors" ||
                    mileStone === "Review and Refine essays" ||
                    mileStone === "Submit Application" ? (
                      <div className="col-md-12">
                        <div className="form-group">
                          {/* type--{type} */}
                          <select
                            className="form-control"
                            name="type"
                            onChange={this.handleChange}
                            disabled
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
                    ) : (
                      <div className="col-md-12">
                        <div className="form-group">
                          {/* type--{type} */}
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
                    )}
                  </div>

                  <h3>End Date</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="default-btn mr-2"
                    onClick={this.updateSingleEvent}
                    // data-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="modal" id="infoMilestone1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">College Information</h4>
                <button
                  type="button"
                  className="close"
                  id="closemodel"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Notifications </h5>
                  </div>
                </div>
                <div className="scrolledarea">
                  <div className="row"></div>
                  {infoColleges.length ? (
                    <div className="row">
                      {infoColleges.map((data) => (
                        <div key={data._id} className="col-md-12">
                          <div className="form-group">
                            <p className="form-control">
                              {moment(data?.endDate).format("MM-DD-YYYY")}{" "}
                              {data?.mileStone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    `No Milestone Found`
                  )}
                </div>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  className="default-btn"
                  type="button"
                  href="#editMilestone"
                  data-toggle="modal"
                  data-target="#editMilestone"
                >
                  Add Milestone
                </button> */}

                {/* <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  OK
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/*         
        <div className="modal" id="infoMilestone1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Milestone Deadlines</h4>
                <button
                  type="button"
                  className="close"
                  id="closemodel"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              
               <div className="modal-body">
              

                <div className="row">
                  <div className="col-md-6">
                    <h5>Milestone </h5>
                  </div>
                </div>
                <div className="scrolledarea">
                  <div className="row"></div>
                  {infoColleges.length ? (
                    <div className="row">
                      {infoColleges.map((data) => (
                        <div className="col-md-12">
                          <div className="form-group">
                            <p className="form-control">
                              {moment(data?.endDate).format("YYYY-MM-DD")}{" "}
                              {data?.mileStone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    `No Milestone Found`
                  )}
                </div>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  className="default-btn"
                  type="button"
                  href="#editMilestone"
                  data-toggle="modal"
                  data-target="#editMilestone"
                >
                  Add Milestone
                </button> */}

        {/* <button
                  id="close1"
                  type="button"
                  className="default-btn bg-danger"
                  data-dismiss="modal"
                >
                  OK
                </button> */}
        {/* </div>
            </div>
          </div>
        </div> */}

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
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Milestone</th>
                            <th>End Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mileStoneArr.map((data, key) => (
                            <tr key={key}>
                              <td>{data.type}</td>
                              <td>{data.mileStone}</td>
                              <td>
                                {moment(data.endDate).format("YYYY-MM-DD")}
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
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
