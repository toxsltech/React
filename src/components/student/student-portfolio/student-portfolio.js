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
import apibase from "../../../globals/config";
import showNotification from "../../../services/notificationService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import Paginate from "../../pagination/pagination";
import { Student_SIDEBAR } from "../../../globals/constant";

let serveUrl = apibase;
export default class StudentPortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagearray: [],
      title: "",
      description: "",
      image: "",
      selectedImage: "",
      loading: false,
      loaded: false,
      Userid: "",
      whichModal: "",
      Imagename: "",
      submitted: false,
      totalCount: "",
      showingPageNo: "1",
      count: null,
      view: "",
      studentId: "",
      portfollioId: "",
      apiResponse: false,
      name: "",
    };
  }
  // componentDidMount = () => {
  //   this.getPortfolio();
  // };
  componentDidMount = () => {
    let id = null;
    if (this.props.match.params.id && this.props.siteView != "Student") {
      this.props.history.push("/home");
    }
    if (this.props.siteView == "Student" && this.props.studentId) {
      if (this.props.match.params.id) {
        id = this.props.match.params.id;
        this.setState({ view: "Student", studentId: id, loaded: true }, () => {
          this.getPortfolioById();
        });
      }
    } else {
      this.getPortfolio();
    }
  };
  getPortfolioById = (page) => {
    let pageNo = page ? page : "1";
    this.setState({ loading: true });
    let id = this.state.studentId;
    UserService.getPortfolioById(id, pageNo)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            this.setState({
              name:
                response.data.data[0].first_name +
                " " +
                response.data.data[0].last_name,
              imagearray: response.data.data,
              count: response.data.data.length,
              totalCount: response.data.count,
            });
            this.setState({ loading: false });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
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
        this.setState({ view: "Student" });
        // this.getSpecificUser(id);
      }
    }
  };
  getPortfolio = (page) => {
    let pageNo = page ? page : "1";
    this.setState({ loading: true });
    UserService.getPortfolio(pageNo)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            this.setState({
              imagearray: response.data.data,
              count: response.data.data.length,
              totalCount: response.data.count,
              apiResponse: true,
            });
            this.setState({ loading: false });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    // this.setState({ selectedPage: selected });
    this.setState({ showingPageNo: selected });
    if (this.state.view == "Student") {
      this.getPortfolioById(selected);
    } else {
      this.getPortfolio(selected);
    }
  };
  resetState = () => {
    this.setState({
      title: "",
      description: "",
      image: "",
      selectedImage: "",
      Userid: "",
      submitted: false,
    });
    this.fileInput.value = "";
  };
  saveHandler = (e, type, index) => {
    e.preventDefault();
    const { title, description, image, selectedImage, loading, Userid } =
      this.state;
    this.setState({ loading: true, submitted: true });
    if (title == "") {
      this.setState({ loading: false });
      return;
    }

    const formData = new FormData();
    formData.append("title", title ? title : "");
    formData.append("description", description ? description : "");
    formData.append("image", image ? image : "");
    if (type === "add") {
      UserService.addPortfolio(formData)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.setState({ loading: false });
              this.getPortfolio();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
      document.getElementById("close1").click();
    } else {
      e.preventDefault();
      let id = Userid;
      UserService.editPortfolio(formData, id)
        .then((resp) => {
          if (resp) {
            let response = resp.data;
            if (response.success == true) {
              this.setState({ loading: false });
              this.getPortfolio();
            }
          }
        })
        .catch((err) => {
          showNotification("danger", constant.ERRORMSG);
        });
    }

    document.getElementById("close1").click();
  };

  imageHandler = (event) => {
    this.setState({ submitted: false });

    if (event.target.files) {
      this.setState({ image: event.target.files[0] });

      let reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ selectedImage: event.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  formHandler = (e) => {
    this.setState({ submitted: false });
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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

  removeConfirm = (id) => {
    confirmAlert({
      message: "Do you want to remove image? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.removeImg(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  removeImg = (id) => {
    this.setState({ Imagename: "", image: "", selectedImage: "" });
    // UserService.deleteImage(id)
    // .then((resp) => {
    //   if (resp) {
    //     let response = resp.data;
    //     if (response.success) {
    //       this.getPortfolio();
    //     }
    //   }
    // })
    // .catch((err) => {
    //   showNotification("danger", constant.ERRORMSG);
    // });
  };

  confirmDelete = (id) => {
    UserService.deletePortfolio(id)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            if (this.state.showingPageNo != 1) {
              if (this.state.count != 1) {
                this.getPortfolio(this.state.showingPageNo);
              } else {
                let page = this.state.showingPageNo - 1;
                this.setState({ showingPageNo: page }, () => {
                  this.getPortfolio(page);
                });
              }
            } else {
              this.getPortfolio();
            }
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  editStateHandler = (i) => {
    const { imagearray } = this.state;
    const { apiResponse } = this.state;

    this.setState({
      portfollioId: imagearray[i]._id,
      title: imagearray[i].title,
      image: imagearray[i].image,
      profile_img: imagearray[i].image,
      description: imagearray[i].description,
      Userid: imagearray[i]._id,
      Imagename: imagearray[i].image.substring(
        imagearray[i].image.lastIndexOf("/") + 1
      ),
    });
  };

  render() {
    const {
      title,
      description,
      profile_img,
      image,
      file,
      loading,
      imagearray,
      whichModal,
      Imagename,
      submitted,
      totalCount,
      view,
      count,
      dr,
      portfollioId,
      loaded,
      apiResponse,
    } = this.state;
    const { siteView, studentId } = this.props;
    return (
      <div>
        <div
          className="modal"
          id="form"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  {whichModal == "add" ? "Add Portfolio" : "Edit Portfolio"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="close1"
                  onClick={() => this.resetState()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Title {/* {title == "" && submitted ? ( */}
                      <span className="text-danger">
                        {" "}
                        <sup>*</sup>
                      </span>
                      {/* ) : (
                        ""
                      )} */}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      name="title"
                      value={title}
                      onChange={(e) => this.formHandler(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => this.formHandler(e)}
                    ></textarea>
                  </div>
                  <div className="form-group position-relative">
                    <label>
                      Upload Image
                      {/* {image == "" && submitted ? ( */}
                      <span className="text-danger">
                        {" "}
                        <sup>*</sup>
                      </span>
                      {/*  ) : (
                        ""
                      )} */}
                    </label>
                    <input
                      type="file"
                      id="image11"
                      className="form-control"
                      accept="image/*"
                      ref={(ref) => (this.fileInput = ref)}
                      onChange={(e) => this.imageHandler(e)}
                    />
                    {Imagename ? (
                      <button
                        type="button"
                        className="default-btn remove_btn"
                        onClick={(e) => this.removeImg(portfollioId)}
                        title="Remove"
                      >
                        <i className="fa fa-close"></i>
                      </button>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                  {whichModal == "edit" ? <span> {Imagename}</span> : ""}
                </div>

                <div className="modal-footer border-top-0 d-flex justify-content-end">
                  {whichModal == "add" ? (
                    <button
                      type="button"
                      className="default-btn"
                      onClick={(e) => this.saveHandler(e, "add")}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="default-btn"
                      onClick={(e) => this.saveHandler(e, "edit")}
                    >
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="modal "
          id="viewform"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title" id="exampleModalLabel">
                  View
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="close1"
                  onClick={() => this.resetState()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Title <span className="text-danger"> </span>
                    </label>
                    <p
                      className="title-heading"
                      placeholder="Title"
                      name="title"
                    >
                      {title}
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      readOnly
                    ></textarea>
                  </div>
                  <img
                    src={apibase + "/" + profile_img}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = base + "/assets/img/no-image.png";
                    }}
                  />
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-end"></div>
              </form>
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
                              to={"/home/portfolio/" + studentId}
                              className="breadcrumb-item text-muted active"
                            >
                              Portfolio
                            </Link>
                          </li>
                          <li
                            className="breadcrumb-item text-muted active"
                            aria-current="page"
                          >
                            {this.state.name}
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body custom-pagi">
                  <div className="text-right">
                    {view == "Student" ? (
                      ""
                    ) : (
                      <a
                        data-toggle="modal"
                        data-target="#form"
                        className="default-btn"
                        onClick={() => {
                          this.resetState();
                          this.setState({ whichModal: "add" });
                        }}
                      >
                        Add Portfolio
                      </a>
                    )}
                  </div>
                  {apiResponse == true ? (
                    imagearray.length > 0 ? (
                      <ul id="portfolio" className="row">
                        {imagearray.map((data, index) => (
                          <li key={index} className="col-md-6 col-xl-4">
                            <div className="relative">
                              <a title={data.title}>
                                <div className="indexingdiv">
                                  {data.image.substring(
                                    data.image.lastIndexOf(".") + 1
                                  ) == "pdf" ? (
                                    <iframe
                                      src={serveUrl + "/" + data.image}
                                      width="100%"
                                      height="100%"
                                    ></iframe>
                                  ) : (
                                    <img
                                      src={serveUrl + "/" + data.image}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          base + "/assets/img/no-image.png";
                                      }}
                                    />
                                  )}
                                </div>
                              </a>
                              <div className="listOverlay"></div>
                              <div className="absoluteicons">
                                {view == "Student" ? (
                                  ""
                                ) : (
                                  <a
                                    data-toggle="modal"
                                    data-target="#form"
                                    className="btn btn-sm btn-primary default-btn "
                                    onClick={() => {
                                      this.editStateHandler(index);
                                      this.setState({ whichModal: "edit" });
                                    }}
                                    title="Edit"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </a>
                                )}

                                <a
                                  data-toggle="modal"
                                  data-target="#viewform"
                                  className="btn btn-sm btn-primary default-btn "
                                  onClick={() => {
                                    this.editStateHandler(index);
                                    this.setState({ whichModal: "View" });
                                  }}
                                  title="view"
                                >
                                  <i className="fa fa-eye"></i>
                                </a>

                                {view == "Student" ? (
                                  ""
                                ) : (
                                  <a
                                    className="btn btn-sm btn-primary default-btn"
                                    onClick={(e) =>
                                      this.deleteHandler(e, data._id)
                                    }
                                    title="Delete"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </a>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="nodata text-center">
                        <img
                          src={base + "/assets/img/nodata.png"}
                          className="img-fluid"
                        />
                        <h4 className="font300">No Portfolio Added</h4>
                        <br />
                      </div>
                    )
                  ) : (
                    ""
                  )}

                  {totalCount > 9 ? (
                    <Paginate
                      page={
                        totalCount ? (totalCount < 9 ? 1 : totalCount / 9) : ""
                      }
                      handlePageClick={(data) => this.handlePageChange(data)}
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

        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="viewLable"
          aria-hidden="true"
          id="myModal"
          data-backdrop="static"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewLable">
                  Portfolio View
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.resetState()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="image">
                  {image.length ? (
                    image.substring(image.lastIndexOf(".") + 1) == "pdf" ? (
                      image ? (
                        <iframe
                          src={serveUrl + "/" + image}
                          width="100%"
                          height="100%"
                        ></iframe>
                      ) : (
                        ""
                      )
                    ) : (
                      <img
                        src={serveUrl + "/" + image}
                        className="img-fluid"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = base + "/assets/img/no-image.png";
                        }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
                <h3 className="mt-2">{title}</h3>
                <p className="pShow">{description ? description : "..."}</p>
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
