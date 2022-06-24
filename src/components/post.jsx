/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Paginate from "../paginate/pagination";
import base from "../globals/base";
import * as adminServices from "../services/adminService";
import * as Constant from "../globals/constant";
import showNotification from "../services/notificationService";
import Loading from "react-fullscreen-loading";
import moment from "moment";
import apiBase from "../globals/config";
import Swal from "sweetalert2";

let serverurl = apiBase;

export default function posts() {
  const [file, setfile] = useState();
  const [photo, setPhoto] = useState();

  const [userListt, SetuserListt] = useState();
  const [selectedPage, setSelectedPage] = useState();
  const [userDetail, setUserDetail] = useState();
  const [id, setID] = useState();
  const [loading, setLoading] = useState();
  const [totalPage, setTotalPage] = useState();
  const [showingPageNo, setShowingPageNo] = useState(1);
  const [count, setCount] = useState(1);

  const [errors, setError] = useState({ title: "" });
  const [userData, setUserData] = useState({
    userName: "",
    phoneNo: "",
    email: "",
    profileImg: "",
    updatedAt: "",
    countryCode: "",
    countryCode: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    userList();
  }, []);

  //Reset the Modal
  const resetModal = () => {
    setUserData({});
    setPhoto();
    setfile();
  };
  const handlePageChange = (data) => {
    let selected = data.selected;
    selected = selected + 1;
    setShowingPageNo(selected);
    setSelectedPage(selected);
    userList(selected);
  };

  // Change the Value
  const onNameChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.title =
          value.length < 3
            ? "User Name must be at least 3 characters long!"
            : "";
      default:
        break;
    }
    setError(errors);
  };

  //Update User
  const onUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", userData.id);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);

    if (file) {
      formData.append("profileImg", file);
    }

    adminServices.updateUser(formData).then((resp) => {
      try {
        if (resp.data.success) {
          userList();
          document.getElementById("close1").click();
          Swal.fire("Data Updated Successfully");
        } else {
          showNotification("danger", resp.data.message);
        }
      } catch (err) { }
    });
  };
  //user Listing
  const userList = (selectedPage) => {
    adminServices.userList(selectedPage ? selectedPage : 1).then((resp) => {
      if (resp) {
        setTotalPage(resp.data.data[0].count);
        SetuserListt(resp.data.data[0].data);
        setCount(resp.data.data[0].data.length);
      }
    });
  };
  //Add User
  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      title: userDetail.title,
    };
  };
  //Delete User
  const deleteBooking = (id) => {
    confirmAlert({
      title: Constant.TITLE_DELETE,
      message: "Are you Sure To delete User (this Action Can't be Undo)",
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const confirmDelete = (id) => {
    adminServices.userDel(id).then((resp) => {
      if (resp) {
        if (showingPageNo != 1) {
          if (count != 1) {
            userList(showingPageNo);
          } else {
            let page = showingPageNo - 1;
            setShowingPageNo(page);
            userList(page);
          }
        } else {
          userList();
        }
        Swal.fire("Data Deleted Successfully");
      }
    });
  };

  //view Booking by Id
  const viewUser = (data) => {
    setUserData({
      userName: data.userName,
      phoneNo: data.phoneNo,
      email: data.email,
      updatedAt: data.updatedAt,
      countryCode: data.countryCode,
      profileImg: data.profileImg,
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  const onImageChange = (event) => {
    if (event.target.files) {
      setfile(event.target.files[0]);

      let reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setUserData({ ...userData, firstName: value });
        break;
      case "lastName":
        setUserData({ ...userData, lastName: value });
        break;
      default:
    }
  };
  const searchKeyword = (e) => {
    adminServices
      .userList(selectedPage ? selectedPage : 1, e.target.value)
      .then((resp) => {
        setTotalPage(
          resp && resp.data.data[0].count ? resp.data.data[0].count : null
        );
        SetuserListt(
          resp && resp.data.data[0].data ? resp.data.data[0].data : null
        );
      });
  };

  return (
    <div className="content-page-admin">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title">Users List</h4>
                <div className="page-title-right mt-3">
                  <input
                    onChange={searchKeyword}
                    className="form-control"
                    type="text"
                    placeholder="Search here..."
                  />
                  <ol className="breadcrumb m-0 ml-2">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/users/">Users List</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-centered table-striped"
                      id="products-datatable"
                    >
                      <thead>
                        <tr>
                          <th>Image</th>

                          <th>First Name</th>
                          <th>Last Name</th>
                          {/* <th>userName</th> */}

                          <th>Email</th>
                          <th>Phone No</th>
                          <th>Updated At</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userListt && userListt.length > 0 ? (
                          userListt.map((data, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  src={serverurl + data.profileImg}
                                  className="rounded-circle"
                                  alt="Cinque Terre"
                                  width="50"
                                  height="50"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      base + "assets/images/default.jpeg";
                                  }}
                                />
                              </td>
                              <a
                                style={{ cursor: "pointer" }}
                                data-toggle="modal"
                                data-target="#userview"
                                onClick={() => {
                                  viewUser(data);
                                }}
                              >
                                <td>{data.firstName}</td>
                              </a>
                              <td>{data.lastName}</td>
                              <td className="text-body font-weight-semibold">
                                {data.email}
                              </td>
                              <td className="text-body font-weight-semibold">
                                {data.phoneNo}
                              </td>
                              <td className="text-body font-weight-semibold">
                                {moment(data.updatedAt).format("lll")}
                              </td>
                              <td className="text-body font-weight-semibold">
                                {data.active ? (
                                  <span className="badge badge-success">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="badge badge-danger">
                                    Rejected
                                  </span>
                                )}
                              </td>
                              <td className="actions">
                                <a
                                  className="action-icon btn btn-primary btn-sm"
                                  data-toggle="modal"
                                  data-target="#edit"
                                  title="Edit"
                                  onClick={() => {
                                    viewUser(data);
                                  }}
                                >
                                  {" "}
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <a
                                  className="action-icon btn btn-success btn-sm"
                                  data-toggle="modal"
                                  data-target="#view"
                                  title="View"
                                  onClick={() => {
                                    viewUser(data);
                                  }}
                                >
                                  {" "}
                                  <i className="fa fa-eye"></i>
                                </a>{" "}
                                <a
                                  className="action-icon btn btn-trash btn-sm"
                                  data-toggle="modal"
                                  data-target="#delete"
                                  title="delete"
                                  onClick={() => {
                                    deleteBooking(data._id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <h1 className="noData ">No User Available!</h1>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Paginate
                    page={
                      totalPage
                        ? totalPage < Constant.ONPAGE
                          ? 1
                          : totalPage / Constant.ONPAGE
                        : ""
                    }
                    handlePageClick={handlePageChange}
                    forcepage={showingPageNo - 1}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="add" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-white">Add</h4>
                  <button
                    type="button"
                    id="add1"
                    onClick={resetModal}
                    className="close"
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                </div>
                <form onSubmit={formHandler}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="form-group mt-4">
                          <label className="control-label">User Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="title"
                            autoComplete="off"
                            placeholder="Enter User Name"
                            value={
                              userDetail && userDetail.title
                                ? userDetail.title
                                : ""
                            }
                            onChange={onNameChange}
                            required
                          ></input>

                          {errors && errors.title ? (
                            <span className="error">{errors.title}</span>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="text-right">
                          <button
                            type="submit"
                            className="btn btn-common mb-3"
                            id="adds"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
