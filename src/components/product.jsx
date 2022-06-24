/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiBase from "../globals/config";
import base from "../globals/base";
import Swal from "sweetalert2";
import Paginate from "../paginate/pagination";
import * as Constant from "../globals/constant";
import { confirmAlert } from "react-confirm-alert";


import * as adminServices from "../services/adminService";


export default function Products() {
	let serverurl = apiBase;
	const [searchWord, setSearchWord] = useState();
	const [categoryList, setcategoryList] = useState([])
	const [getCategoryList, setGetCategoryList] = useState([])
	const [getSubCategoryList, setGetSubCategoryList] = useState([])
	const [categoryName, setcategoryName] = useState("")
	const [categoryyName, setcategoryyName] = useState("")
	const [subCategoryName, setSubCategoryName] = useState("")
	const [categoryDetail, setcategoryDetail] = useState("")
	const [count, setCount] = useState("")
	const [logo, setLogo] = useState("")
	const [file, setFile] = useState("")
	const [showingPageNo, setShowingPageNo] = useState("")
	const [totalPage, setTotalPage] = useState("")
	useEffect(() => {
		categoryListing()
		getCategory()

	}, [])
	const getCategory = (page) => {
		let pageNo = page ? page : 1
		adminServices.allCategoryListing(pageNo).then((resp) => {
			try {
				if (resp.data.success == true) {
					setGetCategoryList(resp.data.data)
					document.getElementById("add1").click();
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});
	}
	const resetMoadal = () => {
		// setLogo("")
		// setFile("")
		// setcategoryName("")
	}

	const handlePageChange = (data) => {
		let selected = data.selected;
		selected = selected + 1;
		setShowingPageNo(selected);
		categoryListing(selected);
	};

	const viewCategory = (data) => {
		setcategoryDetail(data)
		setSubCategoryName(data.subcategory._id)
		setcategoryyName(data.category._id)

		adminServices.allSubCategoryListing(data.category._id).then((resp) => {
			try {
				if (resp.data.success == true) {
					setGetSubCategoryList(resp.data.data)
					// resetModal()
					document.getElementById("add1").click();
				} else {
					setGetSubCategoryList([])
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});

	}

	const changeStatus = (id, status) => {
		let actualStatus =
			status === "block" ? true : status === "unBlock" ? false : null;
		adminServices.updateProduct(id, { status: actualStatus }).then((resp) => {
			try {
				if (resp.data.success) {
					categoryListing();
					// Swal.fire("status Updated SucessFully");
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};


	const categoryListing = (page) => {
		let pageNo = page ? page : 1
		adminServices.productListing(pageNo, searchWord).then((resp) => {
			try {
				if (resp.data.success == true) {
					setcategoryList(resp.data.data)
					setTotalPage(resp.data.count)
					setCount(resp.data.data.length)
					// resetModal()
					document.getElementById("add1").click();

					// userList();
					// showNotification("success", resp.data.message);
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});


	}

	const formHandler = (e) => {
		e.preventDefault();
		let formData = new FormData();

		formData.append("title", categoryName);

		formData.append("catImg", file);

		adminServices.addCategory(formData).then((resp) => {
			try {
				if (resp.data.success == true) {
					// resetModal()
					document.getElementById("add1").click();
					categoryListing()
					setShowingPageNo(1)
					Swal.fire("Data Created Successfully");
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});
	};

	const onImageChange = (event) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
			let reader = new FileReader();
			reader.onload = (e) => {
				setLogo(e.target.result);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const deleteCategory = (id) => {
		confirmAlert({
			title: Constant.TITLE_DELETE,
			message: Constant.DELETE,
			buttons: [
				{
					label: "Yes",
					onClick: () => deletedCat(id),
				},
				{
					label: "No",
				},
			],
		});
	};
	const deletedCat = (id) => {
		adminServices.deleteProduct(id).then((resp) => {
			try {
				if (resp.data.success == true) {
					if (showingPageNo != 1) {
						if (count != 1) {
							categoryListing(showingPageNo);
						} else {
							let page = showingPageNo - 1;
							setShowingPageNo(page);
							categoryListing(page);
						}
					} else {
						categoryListing()
					}
					Swal.fire("Deleted Successfully")
					//resetModal()

				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});
	}

	const onUpdate = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("title", categoryDetail.title);
		formData.append("category", categoryyName);
		formData.append("subcategory", subCategoryName);
		if (file) {
			formData.append("productImg", file);
		}

		adminServices.updateProduct(categoryDetail._id, formData).then((resp) => {
			try {
				if (resp.data.success) {
					categoryListing(1);
					document.getElementById("close1").click();
					// showNotification("success", resp.data.message);
					Swal.fire("Data Updated Successfully");
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};

	const islandingPageProduct = (id, status) => {
		let formData = new FormData();
		let actualStatus = status === true ? false : status === false ? true : ""
		formData.append("landingPageProduct", actualStatus);
		adminServices.updateProduct(id, formData).then((resp) => {
			try {
				if (resp.data.success) {
					categoryListing(1);
					document.getElementById("close1").click();
					// showNotification("success", resp.data.message);
					Swal.fire("Data Updated Successfully");
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};

	const isFeatured = (id, status) => {
		let formData = new FormData();
		let actualStatus = status === "block" ? false : status === "unBlock" ? true : "kkkk"
		formData.append("isFeatured", actualStatus);
		adminServices.updateProduct(id, formData).then((resp) => {
			try {
				if (resp.data.success) {
					categoryListing(1);
					document.getElementById("close1").click();
					// showNotification("success", resp.data.message);
					Swal.fire("Data Updated Successfully");
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) { }
		});
	};


	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "ProductName":
				setcategoryDetail({ ...categoryDetail, title: value });
				break;
			default:
		}

	};
	const setSubcategoryAndSTate = (e) => {
		setcategoryyName(e.target.value)
		setSubCategoryName("")

		adminServices.allSubCategoryListing(e.target.value).then((resp) => {
			try {
				if (resp.data.success == true) {
					setGetSubCategoryList(resp.data.data)
					// resetModal()
					// document.getElementById("add1").click();
				} else {
					setGetSubCategoryList([])
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});

	}

	const searchKeyword = (e) => {

		setSearchWord(e.target.value)
		adminServices
			.productListing(showingPageNo ? showingPageNo : 1, e.target.value ? e.target.value : "")
			.then((resp) => {
				setTotalPage(
					resp && resp.data.count ? resp.data.count : null
				);
				setcategoryList(
					resp && resp.data.data ? resp.data.data : null
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
								<h4 className="page-title">Products</h4>
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
											<Link to="/products/">Products</Link>
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
									<div className="col-sm-12 text-right mb-2">
										<div className="ui search d-flex justify-content-end align-items-center">

											<div className="ui icon input">
												<i className="search icon" />
											</div>
											<div className="results" />
										</div>
									</div>

									<div className="table-responsive">
										{categoryList && categoryList.length > 0 ? (
											<table
												className="table table-centered table-striped"
												id="products-datatable"
											>
												<thead>
													<tr>
														<th>Image</th>
														<th>Id</th>
														<th>Product Name</th>
														<th>Category</th>
														<th>Sub-Category</th>
														<th>Status</th>
														<th>IsFeatured</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{
														categoryList.map((data, index) => (
															<tr key={index}>
																<td className="table-user img-set">
																	<img
																		src={
																			data.images
																				? serverurl + data.images
																				: base + "assets/images/category.jpeg"
																		}

																		alt="table-user"
																		className="mr-2 rounded-circle"
																	/>{" "}
																	<a></a>
																</td>
																<td className="text-body font-weight-semibold">
																	{data._id ? data._id : ""}
																</td>
																<td className="text-body font-weight-semibold">
																	{data.title ? data.title : ""}
																</td>

																<td className="text-body font-weight-semibold">
																	{data.category && data.category.title ? data.category.title : ""}
																</td>
																<td className="text-body font-weight-semibold">
																	{data.subcategory && data.subcategory.title ? data.subcategory.title : ""}
																</td>
																<td>
																	{data && data.status ? (
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
																	{
																		data && data.isFeatured ?
																			<a onClick={() => {
																				isFeatured(data._id, "block");
																			}}>
																				<i className="fa fa-star"> </i>
																			</a>
																			:
																			<a onClick={() => {
																				isFeatured(data._id, "unBlock");
																			}}>

																				<i className="far fa-star"></i>
																			</a>

																	}
																</td>
																<td className="actions">
																	<a
																		className="action-icon btn btn-primary btn-sm"
																		data-toggle="modal"
																		data-target="#edit"
																		title="Edit"
																		onClick={() => {
																			viewCategory(data);
																		}}
																	>
																		{" "}
																		<i className="fa fa-pencil"></i>
																	</a>

																	<Link to={"/productdetail/" + data._id} className="action-icon btn btn-success btn-sm">
																		<i className="fa fa-eye"></i>
																	</Link>{" "}

																	{data.status === false ? (
																		<a
																			className="action-icon btn btn-default btn-sm"
																			data-toggle="modal"
																			data-target="#delete"
																			title="delete"
																			onClick={() => {
																				changeStatus(data._id, "block");
																			}}
																		>
																			<i className="fa fa-lock"></i>
																		</a>
																	) : (
																		<a
																			className="action-icon btn btn-secondary btn-sm"
																			data-toggle="modal"
																			data-target="#delete"
																			title="delete"
																			onClick={() => {
																				changeStatus(data._id, "unBlock");
																			}}
																		>
																			<i className="fa fa-unlock"></i>
																		</a>


																	)}
																	{data.landingPageProduct ?
																		<a
																			className="action-icon btn btn-danger btn-sm"
																			title="Featured on Landing Page"
																			onClick={() => {
																				islandingPageProduct(data._id, data.landingPageProduct);
																			}}
																		>
																			<i
																				className="fa fa-check "
																				aria-hidden="true"
																			></i>
																		</a>
																		:
																		<a
																			className="action-icon btn btn-danger btn-sm"
																			title="Not Featured on Landing Page"
																			onClick={() => {
																				islandingPageProduct(data._id, data.landingPageProduct);
																			}}
																		>
																			<i
																				className="fa fa-times "
																				aria-hidden="true"
																			></i>
																		</a>

																	}

																	<a
																		className="action-icon btn btn-danger btn-sm"
																		title="Delete"
																		onClick={() => {
																			deleteCategory(data._id);
																		}}
																	>
																		<i
																			className="fa fa-trash "
																			aria-hidden="true"
																		></i>
																	</a>
																</td>
															</tr>
														))
													}
												</tbody>
											</table>

										) : (

											<h1 className="noData ">No Product  Available!</h1>
										)}
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

					<div className="modal fade" id="edit" data-backdrop="static">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title text-white">update Product</h4>
									<button
										type="button"
										id="close1"
										className="close"
										data-dismiss="modal"
									>
										&times;
									</button>
								</div>
								<form onSubmit={onUpdate}>
									<div className="modal-body">
										<div className="row">
											<div className="col-md-5">
												<div className="avatar-wrapper">
													<div className="innerdiv">
														<img
															className="profile-pic"
															src={
																categoryDetail.productImg && !file
																	? serverurl + categoryDetail.productImg
																	: logo
																		? logo
																		: base + "assets/images/default.jpeg"
															}
														/>
													</div>
													<label
														className="upload-button"
														htmlFor="uploadUserImg"
													>
														<i
															className="fa fa-arrow-circle-up"
															aria-hidden="true"
														></i>
													</label>
													<input
														className="file-upload"
														type="file"
														accept="image/*"
														id="uploadUserImg"
														onChange={onImageChange}
													/>
												</div>
											</div>
											<div className="col-md-7 ">
												<div className="form-group">
													<label className="control-label">Product Name</label>
													<input
														className="form-control"
														type="text"
														name="ProductName"
														autoComplete="off"
														placeholder="Enter the Product Name"
														value={categoryDetail.title ? categoryDetail.title : ""}
														onChange={handleChange}
														required
													></input>
												</div>

												<div className="form-group">
													<label className="control-label"> Category Name </label>
													<select id="cars" name="categoryName" onChange={(e) => setSubcategoryAndSTate(e)} value={categoryyName} required>
														<option value="">Select</option>
														{getCategoryList.length > 0 ? getCategoryList.map((data, index) => (

															<option value={data._id} key={index}>{data.title}</option>
														))
															: ""
														}
													</select>

												</div>


												<div className="form-group">
													<label className="control-label"> Sub Category</label>
													<select id="cars" name="categoryName" onChange={(e) => setSubCategoryName(e.target.value)} value={subCategoryName} required>
														<option value="">Select</option>
														{getSubCategoryList.length > 0 ? getSubCategoryList.map((data) => (
															<option value={data._id}>{data.title}</option>
														))
															: ""
														}
													</select>

												</div>
												<div className="mb-3">
													<button type="submit" className="btn btn-common">
														Update
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="modal fade" id="view" data-backdrop="static">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title text-white">User Detail</h4>

									<button
										type="button"
										id="view"
										className="close"
										data-dismiss="modal"
									>
										&times;
									</button>
								</div>
								<div className="modal-body">
									<div className="row">
										<div className="col-md-3">
											<div className="fixed-image-admin">
												<div className="form-group">
													<div className="avatar-wrapper">
														<div className="innerdiv">
															<img
																className="profile-pic"
																src={
																	categoryDetail && categoryDetail.catImg && !file
																		? serverurl + categoryDetail.catImg
																		: logo ? logo : ""
																}
																onError={(e) => {
																	e.target.onerror = null;
																	e.target.src = base + "assets/images/category.jpeg";
																}}
															/>
														</div>
														<label
															className="upload-button"
															htmlFor="uploadUserImg1"
														>
															<i
																className="fa fa-arrow-circle-up"
																aria-hidden="true"
															></i>
														</label>
														<input
															className="file-upload"
															type='file'
															accept="image/*"
															id="uploadUserImg1"
															onChange={onImageChange}

														/>
													</div>

												</div>
											</div>
										</div>
										<div className="col-md-9">
											<div className="form-group">
												<label className="control-label"> Category Name </label>
												<input
													className="form-control"
													type="text"
													name="categoryName"
													autoComplete="off"
													placeholder="Enter Category Name"
													value={categoryDetail && categoryDetail.title ? categoryDetail.title : ""}
													onChange={(e) => {
														setcategoryDetail({ ...categoryDetail, title: e.target.value })
													}}
													required
												></input>
											</div>
											<div className="text-right">
												<button type="submit" className="btn btn-common">
													Add
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}