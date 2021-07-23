/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import base from "../../../../globals/base";
import * as UserService from "../../../../services/userServices";
import * as constant from "../../../../globals/constant";
import { Student_SIDEBAR } from "../../../../globals/constant";
import showNotification from "../../../../services/notificationService";
// import apibase from "../../globals/config";

// let serveUrl = apibase;

export default class StudentKnowMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: "",
      bio: "",
      show: false,
      loading: false,
      edit: true,
      view: "",
      userName: "",
      loaded: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    this.getUserDetails();
    let id = null;
    if (this.props.studentId) {
      this.setState({ studentId: this.props.studentId });
    }
    if (this.props.siteView == "Student") {
      if (this.props.match.params.id) {
        id = this.props.match.params.id;
        this.setState({ view: "Student" });
        this.getSpecificUser(id);
      }
    }
  };
  getSpecificUser = (id) => {
    this.setState({ loading: true });
    UserService.getSpecificUser(id)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              userName:
                response.data.data.first_name +
                " " +
                response.data.data.last_name,
              userDetail: response.data.data,
              loading: false,
              bio: response.data.data.bio_description,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  /*  componentWillUnmount=()=>{
      let data = {
        view: "",
        studentId: "",
      };
      this.props.callback(data);
      
    } */
  getUserDetails = () => {
    this.setState({ loading: true, loaded: true });
    UserService.getUserDetail()
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              userDetail: response.data,
              loading: false,
              bio: response.data.bio_description,
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  resetActivity = () => {};

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append("bio_description", this.state.bio ? this.state.bio : "");

    UserService.updateProfile(formData)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.getUserDetails();
            this.setState({ edit: false, show: false, loading: false });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  stateHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { bio, show, loading, edit, view, userName, loaded, studentId } =
      this.state;
    const { siteView } = this.props;
    return (
      <div>
        <div className="tab-pane active" id="get">
          <div className="row">
            {siteView === "Student" ? (
              <div
                className="col-md-12 pl-3 pr-0 collapse width show profile-sidebar"
                id="sidebar"
              >
                <div
                  className="new list-group border-0 text-center text-md-left accordion d-flex flex-row border-top-0 aaa"
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
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aboutme-profile mt-4">
                <div className="card">
                  <div className="page-title card-header d-flex align-items-center">
                    <h5>{userName ? "About " + userName : "About Me"}</h5>
                    {view == "Student" ? (
                      ""
                    ) : (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title="update"
                        className="default-btn ml-auto editinfo"
                        onClick={() =>
                          this.setState({ show: true, edit: false })
                        }
                      >
                        <a className="fa fa-pencil"></a>
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="editdescription">
                      <div className="form-group">
                        <label>Bio</label>
                        {view == "Student" ? (
                          <p className="pShow">
                            {bio ? bio : "Does not have any bio..."}
                          </p>
                        ) : show && !edit ? (
                          <textarea
                            rows="5"
                            name="bio"
                            value={bio}
                            onChange={(e) => this.stateHandler(e)}
                            placeholder="Add your bio here..."
                          ></textarea>
                        ) : (
                          <p className="pShow">
                            {bio ? bio : "Please add your bio..."}
                          </p>
                        )}
                      </div>

                      {show ? (
                        <a
                          onClick={(e) => this.submitHandler(e)}
                          className="default-btn savebtn"
                        >
                          Save
                        </a>
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
