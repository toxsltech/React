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
import { Student_SIDEBAR } from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
// import apibase from "../../globals/config";

// let serveUrl = apibase;

export default class StudentKnow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: "",
      bio: "",
      show: false,
      loading: false,
      edit: true,
      view: "",
      userName:"",
      loaded: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    this.getUserDetails();
    let id = null;
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
              userName:response.data.first_name+" "+response.data.last_name,
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
    
    componentWillUnmount=()=>{
      let data = {
        view: "",
        studentId: "",
      };
      this.props.callback(data);
      
    }
    getUserDetails = () => {
      this.setState({ loading: true,loaded: true });
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
    const { bio, show, loading, edit, view,userName,loaded } = this.state;
    const {siteView,studentId} = this.props;
    return (
      <div>
        {siteView === "Student"
            ? loaded
              ?
              <div className="col-md-3 pl-0 pr-0 collapse width show" id="sidebar">
        <div
          className="list-group border-0 text-center text-md-left accordion"
          id="exampleAccordion"
        >
             { Student_SIDEBAR.map((data, index) => (
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
                        {data.subMenu.map((sub, index) =>
                           (
                            <Link
                            key={index}
                              to={sub.route + studentId}
                              className="list-group-item"
                              role="tab"
                            >
                              {sub.name}
                            </Link>
                          ) 
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                </div>
                </div>
                :'':''}
        <div className="tab-pane active" id="get">
          <div className="aboutme-profile mt-4">
            <div className="card">
            <div className="page-title card-header d-flex align-items-center">
                <h5>About </h5>
                {view == "Student" ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="default-btn ml-auto editinfo"
                    onClick={() => this.setState({ show: true, edit: false })}
                  >
                    <a  className="fa fa-pencil ">visul</a>
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
                      <textarea rows="5"
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
