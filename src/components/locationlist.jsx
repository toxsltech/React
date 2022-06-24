import React, { useState, useEffect } from "react";
import Loading from "react-fullscreen-loading";
import * as adminServices from "../services/adminService";
import apiBase from "../globals/config";
import base from "../globals/base";
import Swal from "sweetalert2";
import showNotification from "../services/notificationService";

import * as Constant from "../globals/constant";

import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Orders(props) {
  let history = useHistory();
  let serverurl = apiBase;
  const [showingPageNo, setShowingPageNo] = useState("");
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [data, setData] = useState({
    location: "",
    status: Constant.CANCELSTATUS,
  });

  useEffect(() => {
    if (!props.location.data) {
      history.goBack();
    }
    if (props.location.data) {
      orderListing();
    }
  }, []);

  const orderListing = () => {
    adminServices
      .getTrackingDetail(
        props?.location?.data?.orderId,
        props?.location?.data?.product?._id
      )
      .then((resp) => {
        setOrderStatusList(resp?.data?.data);
        try {
          if (resp?.data?.success == true) {
          } else {
            showNotification("danger", Constant.ERRORMSG);
          }
        } catch (err) {
          showNotification("danger", Constant.ERRORMSG);
        }
      });
  };

  const updateStatus = () => {
    if (data.location === "") {
      showNotification("danger", "Location is Required");
      return;
    }
    adminServices
      .trackOrderDetails({
        orderId: parseInt(props?.location?.data.orderId),
        order_id: props?.location?.data?.order_id,
        status: parseInt(data.status),
        location: data.location,
        booked_by: props?.location?.data?.booked_by,
        product: props?.location?.data?.product?._id,
      })
      .then((resp) => {
        try {
          if (resp) {
            document.getElementById("myModalclose").click();
            showNotification("success", resp.data.message);
            orderListing();
            setData({
              location: "",
              status: Constant.CANCELSTATUS,
            });
          }
        } catch (err) {
          showNotification("danger", Constant.ERRORMSG);
        }
      });
  };
  const checkStatus = (id) => {
    let status;
    switch (id) {
      case 1:
        return (status = Constant.PENDING);
        break;
      case 2:
        return (status = Constant.CONFIRMED);
        break;
      case 3:
        return (status = Constant.DELIVERED);
        break;
      case 4:
        return (status = Constant.RETURNED);
        break;
      case 5:
        return (status = Constant.PENDING);
        break;
      case 6:
        return (status = Constant.REFUNDREQUEST);
        break;
      case 7:
        return (status = Constant.CANCELLED);
        break;
      case 8:
        return (status = Constant.ORDERPACKED);
        break;

      default:
        break;
    }
  };
  return (
    <div className="content-page-admin">
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles align-items-center">
            <div className="col-md-12 align-self-center">
              <h3 className="text-themecolor mb-0 mt-0">Trips List</h3>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/seller/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/seller/trackOrder">Track Order</Link>
                </li>
                <li className="breadcrumb-item active">Trips List</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body tr-single-body">
                  <div class="Productshead mb-5">
                    <h3>
                      Product detail
                      <span class="float-right">
                        <a
                          href="#"
                          class="btn btn-primary"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Update Track
                        </a>
                      </span>
                    </h3>
                  </div>

                  {orderStatusList.map((data) => (
                    <div class="products notifications">
                      <div class="product product-sm p-4">
                        <a href="#" class="w-100">
                          <div class="product-body pl-0">
                            <div class="d-flex justify-content-between align-content-start">
                              <div>
                                <h4>{data.product.title}</h4>
                                <p>
                                  <b>Location:</b> {data.location}
                                </p>
                                <p>
                                  <b>Time:</b>{" "}
                                  {moment(data.updatedAt).format("llll")}
                                </p>
                              </div>
                              <div>
                                <label class="badge badge-success">
                                  {checkStatus(data.status)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Track Order Status</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                id="myModalclose"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label>Location</label>
                <input
                  class="form-control"
                  placeholder="Add location"
                  value={data.location}
                  onChange={(e) => {
                    setData({ ...data, location: e.target.value });
                  }}
                  required
                />
              </div>
              {/* <div class="form-group">
                <label>Time</label>
                <input class="form-control" placeholder="Add time" />
              </div> */}
              <div class="form-group">
                <label>Remarks</label>
                <select
                  class="form-control"
                  value={data.status}
                  onChange={(e) => {
                    setData({ ...data, status: e.target.value });
                  }}
                >
                  <option value={Constant.CANCELSTATUS}>Order Packed</option>
                  <option value={3}>Delivered</option>
                </select>
              </div>
            </div>

            <div
              class="modal-footer"
              onClick={() => {
                updateStatus();
              }}
            >
              <button type="button" class="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
