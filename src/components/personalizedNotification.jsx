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
import PaginatePost from "../paginate/paginationPost";
import InfiniteScroll from "react-infinite-scroll-component";
import base from "../globals/base";
import * as adminServices from "../services/adminService";
import * as Constant from "../globals/constant";
import showNotification from "../services/notificationService";
import Loading from "react-fullscreen-loading";
import moment from "moment";
import Datetime from 'react-datetime';
import apiBase from "../globals/config";
import 'react-datetime/css/react-datetime.css';
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

let serverurl = apiBase;

export default function Users() {
	const [file, setfile] = useState();
	const [photo, setPhoto] = useState();
	const [userListt, SetuserListt] = useState();
	const [selectedPage, setSelectedPage] = useState();
	const [selectedPost, setSelectedPost] = useState();
	const [comment, setComment] = useState()
	const [userDetail, setUserDetail] = useState();
	const [viewId, SetViewId] = useState();
	const [loading, setLoading] = useState();
	const [totalPage, setTotalPage] = useState();
	const [totalPost, setTotalPost] = useState();
	const [singlePostDetail, setSinglePostDetail] = useState();
	const [phone, setPhone] = useState();
	const [phonee, setPhonee] = useState();
	const [offset, setOffset] = useState(1);
	const [notifyEmail, setNotifyEmail] = useState();
	const [notifyId, setNotifyid] = useState();
	const [authorised, setAuthorised] = useState(true);
	const [arrayOfId, setArrayOfId] = useState([]);
	const [countryCode, setCountry] = useState();
	const [postList, setPostList] = useState([]);
	const [showingPageNo, setShowingPageNo] = useState(1);
	const [showingPostNo, setShowingPostNo] = useState(1);
	const [postData, setPostDetail] = useState();
	const [commentCount, setCommentCount] = useState();
	const [count, setCount] = useState(1);
	const [postCount, setPostCount] = useState(1);
	const [errors, setError] = useState({ title: "" });
	const [message, setMessage] = useState("");
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

		setMessage("")
	};
	const handlePageChange = (data) => {
		let selected = data.selected;
		selected = selected + 1;
		setShowingPageNo(selected);
		setSelectedPage(selected);
		userList(selected);
	};
	const handlePostChange = (data) => {
		setShowingPostNo(data.selected + 1);
		setSelectedPost(data.selected + 1);
		postListing(data.selected + 1, viewId);
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

		if (phonee) { formData.append("phoneNo", phonee) }
		if (countryCode) { formData.append("countryCode", countryCode) }
		if (file) {
			formData.append("profileImg", file);
		}

		adminServices.updateUser(formData).then((resp) => {
			try {
				if (resp.data.success) {
					userList();
					document.getElementById("close1").click();
					// showNotification("success", resp.data.message);
					Swal.fire("Data Updated Successfully");
				} else {
					showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};
	//user Listing
	const userList = (selectedPage) => {
		setLoading(true)
		adminServices.userList(selectedPage ? selectedPage : 1).then((resp) => {
			if (resp) {
				setLoading(false)
				setTotalPage(resp.data.data[0].count);
				SetuserListt(resp.data.data[0].data);
				setCount(resp.data.data[0].data.length);
			}
			else {
				setLoading(false)
			}
		});
	};

	const postListing = (selectedPage, id) => {
		adminServices
			.postListing(selectedPage ? selectedPage : 1, id)
			.then((resp) => {
				if (resp && resp.data && resp.data.success) {
					setPostList(resp.data.data);
					setTotalPost(resp.data.count);
					setPostCount(resp.data.data.length);
				}
			});
	};
	//Add User
	const formHandler = (e) => {
		e.preventDefault();
		adminServices
			.notify({ message: message, email: notifyEmail, sendTo: notifyId })
			.then((resp) => {
				if (resp.data.success) {
					document.getElementById("add1").click()
					Swal.fire("Notification Sucessfully Sended!")
				}
			});
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


	const postDetail = (id, data, page) => {
		let pageNumber = page ? page : 1;
		adminServices.postDetail(id, pageNumber).then((resp) => {
			setComment(resp.data.data)
			setCommentCount(resp.data.count)
			setSinglePostDetail(data)
		});
	};
	const deletePost = (id) => {
		adminServices.deletePost(id).then((resp) => {
			try {
				if (resp.data.success) {
					Swal.fire("Post Deleted Successfully");
					if (showingPostNo != 1) {
						if (postCount != 1) {
							postListing(showingPostNo, viewId);
						} else {
							let page = showingPostNo - 1;
							setShowingPostNo(page);
							postListing(page, viewId);
						}
					} else {
						postListing(1, viewId);
					}
				} else {
					showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};

	const style = {
		height: 30,
		border: "1px solid green",
		margin: 6,
		padding: 8,
	};

	const handler = (data) => {
		let arr = arrayOfId;
		if (arr.includes(data)) {
			let a = arrayOfId.filter((result) => result != data)
			setArrayOfId(a)
		}
		else {
			setArrayOfId(
				arrayOfId.concat(data)
			)
		}
	}

	const allSelect = () => {
		let arr = []
		if (authorised) {
			userListt.map((data) => {
				arr.push(data._id)

			})
			setArrayOfId(arr)
			setAuthorised(!authorised)
		}
		else {

			arr = []
			setArrayOfId(arr)
			setAuthorised(!authorised)
		}
	}

	const setEmail = (data) => {
		setNotifyEmail(data.email)
		setNotifyid(data._id)

	}
	return (
		<div className="content-page-admin">
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="page-title-box">
								<h4 className="page-title">Personalized Notification</h4>
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
											<Link to="/personalized-notification">Personalized Notification</Link>
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
											{userListt && userListt.length > 0 ? (
												<thead>
													<tr>
														<th>Image</th>
														<th>Username</th>
														<th>Email</th>
														<th>Phone No</th>
														<th>Status</th>
														<th>Send Notication</th>
													</tr>
												</thead>
											) : null}
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
															<td>{data.userName}</td>
															<td className="text-body font-weight-semibold">
																{data.email}
															</td>
															<td className="text-body font-weight-semibold">
																{data.phoneNo}
															</td>
															<td className="text-body font-weight-semibold">
																{data.active ? (
																	<span className="badge badge-success">
																		Active
																	</span>
																) : (
																	<span className="badge badge-danger">
																		Blocked
																	</span>
																)}
															</td>
															<td>
																<i className="fa fa-envelope" data-toggle="modal"
																	data-target="#add"
																	onClick={() => setEmail(data)}
																></i>
															</td>
														</tr>
													))
												) : (<tr>
													<td>
														<h1 className="noData ">No Personalized Notification Available!</h1>
													</td>
												</tr>
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
									<h4 className="modal-title text-white">Send Notification</h4>
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
													<label className="control-label">message</label>
													<textarea rows="10" cols="93" value={message} onChange={(e) => setMessage(e.target.value)}>  </textarea>

												</div>

												<div className="text-right">
													<button
														type="submit"
														className="btn btn-common mb-3"
														id="adds"
													>
														Send
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
			<Loading
				loading={loading}
				type="Grid"
				loaderColor="#3498db"
				height={80}
				width={80}
			/>
		</div>
	);
}
