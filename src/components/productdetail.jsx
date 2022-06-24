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
import * as Constant from "../globals/constant";
import { confirmAlert } from "react-confirm-alert";


import * as adminServices from "../services/adminService";
export default function Productdetail(props) {

	let serverurl = apiBase;


	const [productData, setProductData] = useState("")


	useEffect(() => {
		productDetail()
	}, [])

	const productDetail = () => {
		adminServices.productDetail(props.match.params.id).then((resp) => {
			try {
				if (resp.data.success == true) {
					setProductData(resp.data.data)
				} else {
					// showNotification("danger", resp.data.message);
				}
			} catch (err) {
				// showNotification("danger", constant.ERRORMESSAGE);
			}
		});

	}
	return (
		<div className="content-page-admin">
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="page-title-box">
								<h4 className="page-title">Product Detail</h4>
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/">Home</Link>
										</li>
										<li className="breadcrumb-item">
											<Link to="/products/">Products</Link>
										</li>
										<li className="breadcrumb-item">
											<a >Product Detail</a>
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
									<div className="tm-section single-product-details-area ptb-80 bg-white">
										<div className="single-pro-details-inner">
											<div className="row">
												<div className="col-md-5 col-lg-5">
													<div className="single-pro-best-view">
														<img src={serverurl + productData.productImg} className="img-fluid" />
													</div>
												</div>
												<div className="col-md-7 col-lg-7">
													<div className="single-product-description">
														<h3 className="tm-single-product-title">{productData.title ? productData.title : null}</h3>
														<div className="ratting-box">
															<ul>
																<li><span className="yes"><i className="fa fa-star"></i></span></li>
																<li><span className="yes"><i className="fa fa-star"></i></span></li>
																<li><span className="yes"><i className="fa fa-star"></i></span></li>
																<li><span className="yes"><i className="fa fa-star"></i></span></li>
																<li><span className="yes"><i className="fa fa-star"></i></span></li>
															</ul>
														</div>

														<div className="tm-size-color-single">
															<div className="tm-single-product-categories">
																<h4>Categories</h4>
																<div className="categories-tags">
																	<a href="#">{productData.category && productData.category.title ? productData.category.title : null}</a>

																</div>
															</div>
														</div>
														<div className="tm-size-color-single">
															<div className="tm-single-product-categories">
																<h4>Sub-Categories</h4>
																<div className="categories-tags">
																	<a href="#">{productData.subcategory && productData.subcategory.title ? productData.subcategory.title : null}</a>
																</div>
															</div>
														</div>
														<p className="product-details-paragraph">{productData.description}</p>
														<div className="price-box">
															<span className="price">Current Price:${productData.price}</span>
															{/* <span className="old-price">$745.00</span> */}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}