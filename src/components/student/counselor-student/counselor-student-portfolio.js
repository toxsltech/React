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

let serveUrl = apibase;
export default class StudentPortfolios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagearray: [],
      title: "",
      description: "",
      image: "",
      selectedImage: "",
      loading: false,
      Userid: "",
      whichModal: "",
      Imagename: "",
      submitted: false,
      totalCount: "",
      showingPageNo: "1",
      count: null,
      view: "",
      studentId: "",
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
        this.setState({ view: "Student", studentId: id }, () => {
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
    const {
      title,
      description,
      image,
      selectedImage,
      loading,
      Userid,
    } = this.state;
    this.setState({ loading: true, submitted: true });
    if (title == "" || image == "") {
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
    } else {
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

  removeConfirm = (id)=>{
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
  }

  removeImg = (id)=>{
    UserService.deleteImage(id)
    .then((resp) => {
      if (resp) {
        let response = resp.data;
        if (response.success) {
          this.getPortfolio();
        }
      }
    })
    .catch((err) => {
      showNotification("danger", constant.ERRORMSG);
    });
  }

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
    
    this.setState({
      title: imagearray[i].title,
      image: imagearray[i].image,
      profile_img:imagearray[i].image,
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
    } = this.state;
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
                      Title{" "}
                      {/* {title == "" && submitted ? ( */}
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
                      className="form-control"
                      name="description"
                      value={description}
                      onChange={(e) => this.formHandler(e)}
                    ></textarea>
                  </div>
                  <div className="form-group">
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
                      accept="application/pdf, image/*"
                      ref={(ref) => (this.fileInput = ref)}
                      onChange={(e) => this.imageHandler(e)}
                    />
                  </div>
                  {whichModal == "edit" ? <span> {Imagename}</span> : ""}
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-end">
                  {whichModal == "add" ? (
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={(e) => this.saveHandler(e, "add")}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
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
          className="modal"
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
               
              </div>
              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label>
                      Title{" "}
                        <span className="text-danger">
                          {" "}
                          <sup>*</sup>
                        </span>
                     
                    </label>
                    <label
                      
                      className="form-control"
                      placeholder="Title"
                      name="title"
                     
                    >{title}</label>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <label
                      className="form-control"
                      name="description"
                    >{description}</label>
                  </div>
                    <img src={apibase+"/"+profile_img} onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  base + "/assets/img/no-image.png";
                              }}/>
                  
                </div>
                <div className="modal-footer border-top-0 d-flex justify-content-end">
                    <button
                      type="button"
                      className="default-btn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="tab-pane active" id="get">
        <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-12 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Portfolio</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/portfolio'} className="breadcrumb-item text-muted active">Portfolio</Link></li>
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
              {imagearray.length > 0 ? (
                <ul id="portfolio" className="row">
                  {imagearray.map((data, index) => (
                    <li key={index} className="col-xl-4 col-md-6">
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
                              <img src={serveUrl + "/" + data.image}   onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  base + "/assets/img/no-image.png";
                              }} />
                            )}
                          </div>
                        </a>
                        <div
                          className="listOverlay"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => this.editStateHandler(index)}
                        ></div>
                          <div className="absoluteicons">
                        {view == "Student" ? (
                          ""
                        ) : (
                            
                            <a
                              className="btn btn-sm btn-primary default-btn"
                              onClick={(e) => this.removeConfirm(data._id)}
                              title="remove image"
                            >
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                             )}
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
                              title="view student"
                            >
                              <i className="fa fa-eye"></i>
                            </a>
                             
                             {view == "Student" ? (
                          ""
                        ) : (
                            <a
                              className="btn btn-sm btn-primary default-btn"
                              onClick={(e) => this.deleteHandler(e, data._id)}
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
              )}
              {totalCount > 9 ? (
                <Paginate
                  page={totalCount ? (totalCount < 9 ? 1 : totalCount / 9) : ""}
                  handlePageClick={(data) => this.handlePageChange(data)}
                  forcepage={this.state.showingPageNo - 1}
                />
              ) : (
                ""
              )}
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
                      <img src={serveUrl + "/" + image} className="img-fluid"  onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          base + "/assets/img/no-image.png";
                      }}  />
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
