/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { useEffect, useState } from "react";

import * as AdminServices from "../services/adminService";
import Loading from "react-fullscreen-loading";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import * as adminServices from "../services/adminService";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Data } from "../globals/constant";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
const state1 = {
  labels: Data,
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [65, 59, 80, 81, 56, 20, 15, 88, 22, 10, 55, 120],
    },
  ],
};

export default function SellerDashboard(props) {
  const [year, setYear] = useState(new Date());
  const [count, setCount] = useState();
  const [value, onChange] = useState(new Date());
  const [selectedValue, setSeletedValue] = useState("Year");

  const [dashBoardData, setdashBoardData] = useState("");
  const [totalUser, setTotalUser] = useState("");

  const [loading, setloading] = useState(false);

  var startDate = moment(year).subtract(1, "days").format("YYYY-MM-DD");
  var endDate = moment(year).format("YYYY-MM-DD");
  useEffect(() => {
    dashBoardInfo();
  }, []);
  const dashBoardInfo = () => {
    adminServices.sellerDashBoardInfo().then((resp) => {
      if (resp) {
        setdashBoardData(resp.data);
      }
    });
  };
  const renderYear = (props, year, selectedDate) => {
    // Just display the last 2 digits of the year in the years view
    return <td {...props}>{year % 100}</td>;
  };

  const selection = (e) => {
    setSeletedValue(e.target.value);
  };

  var now = moment(year, "YYYY-MM-DD").daysInMonth();
  let date = [];
  for (let i = 1; i <= now; i++) {
    date.push(i);
  }

  const state = {
    labels:
      selectedValue === "Year"
        ? Data
        : selectedValue === "Day"
        ? [startDate, endDate]
        : date,
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#7F53A9",
        borderColor: "#7F53A9",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 12, 10, 66, 18, 88, 180],
      },
      {
        label: "Ongoing",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 18, 88, 120],
        borderColor: ["rgba(88, 188, 241, 1)"],
        backgroundColor: "rgba(88, 188, 241, 1)",
        radius: 4,
        borderWidth: 1.5,
        fill: false,
      },
    ],
  };

  const state3 = {
    labels:
      selectedValue === "Year"
        ? Data
        : selectedValue === "Day"
        ? [endDate]
        : date,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",

          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [65, 59, 80, 81, 56, 20, 15, 88, 22, 10, 55, 120],
      },
    ],
  };
  return (
    <div className="content-page-admin">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title">Seller Dashboard</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget2"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-users font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.data ? (
                            <CountUp
                              end={parseInt(dashBoardData.data)}
                              duration={10}
                            />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Sellers Registered
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget2"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-users font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.activeSeller ? (
                            <CountUp
                              end={
                                dashBoardData.activeSeller
                                  ? parseInt(dashBoardData.activeSeller)
                                  : 0
                              }
                              duration={10}
                            />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Active Seller
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget3"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-users font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.InactiveSeller ? (
                            <CountUp
                              end={
                                dashBoardData.InactiveSeller
                                  ? parseInt(dashBoardData.InactiveSeller)
                                  : 0
                              }
                              duration={10}
                            />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        blocked Seller
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget1"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-users font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Customers Registered
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget3"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-shopping-cart font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total New Orders
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget4"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-shopping-basket font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Active Orders
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget5"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-shopping-cart font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Pending Orders
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget6"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-shopping-cart font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Completed Orders
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget1"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-phone font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Contact Us Request
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget2"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-times font-22 avatar-title text-primary"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Cancellation Requests
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget3"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-usd font-22 avatar-title text-primary">
                        $
                      </i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Earnings
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div
                className="widget-rounded-circle card-box top-card border-left widget4"
                data-match-height="groupName"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="avatar-lg rounded-circle bg-soft-feed border">
                      <i className="fa fa-usd font-22 avatar-title text-primary">
                        $
                      </i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="text-right">
                      <h3 className="text-white mt-1">
                        <span data-plugin="counterup">
                          {dashBoardData.blockUser ? (
                            <CountUp end={""} duration={10} />
                          ) : (
                            "0"
                          )}
                        </span>
                      </h3>
                      <p className="text-white mb-1 text-truncate">
                        Total Revenue
                      </p>
                    </div>
                  </div>
                </div>
                <svg width="388" height="50">
                  <g>
                    <path
                      d="M0,25Q28.02222222222222,19.291666666666664,32.33333333333333,19.374999999999996C38.79999999999999,19.499999999999996,58.19999999999999,25.0625,64.66666666666666,26.25S90.53333333333333,30.875,97,31.25S122.86666666666665,30.625,129.33333333333331,30S155.2,24.25,161.66666666666666,25S187.53333333333333,35.625,194,37.5S219.86666666666665,43.75,226.33333333333331,43.75S252.19999999999996,38.4375,258.66666666666663,37.5S284.53333333333336,35.3125,291,34.375S316.8666666666667,27.8125,323.3333333333333,28.125S349.2,37.8125,355.66666666666663,37.5Q359.97777777777776,37.291666666666664,388,25L388,50Q359.97777777777776,50,355.66666666666663,50C349.2,50,329.79999999999995,50,323.3333333333333,50S297.46666666666664,50,291,50S265.13333333333327,50,258.66666666666663,50S232.79999999999998,50,226.33333333333331,50S200.46666666666667,50,194,50S168.13333333333333,50,161.66666666666666,50S135.79999999999998,50,129.33333333333331,50S103.46666666666667,50,97,50S71.13333333333333,50,64.66666666666666,50S38.79999999999999,50,32.33333333333333,50Q28.02222222222222,50,0,50Z"
                      className="area"
                      fill="rgba(255,255,255,0.5)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <span className="float-right">
                <div className="d-flex justify-align-center">
                  <h5 className="mb-0 mr-3 mt-2">Choose Date & Time</h5>
                  <Datetime
                    dateFormat="DD"
                    closeOnClickOutside={true}
                    closeOnSelect={true}
                    renderYear={renderYear}
                    timeFormat={false}
                    initialValue={new Date()}
                    className="mr-2 small-forminner"
                    onChange={(date) => setYear(date.format("YYYY-MM-DD"))}
                  />

                  <select
                    name="select"
                    onChange={selection}
                    value={selectedValue}
                    className="small-form"
                  >
                    <option value="Day">Day</option>
                    <option value="Month">Month</option>
                    <option value="Year">Year</option>
                  </select>
                </div>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Sales in Quantity</h4>
                </div>

                <div className="card-body">
                  {/* <img src="/assets/images/graph.png" className="img-fluid" /> */}
                  <div>
                    <Line
                      data={state}
                      options={{
                        title: {
                          display: false,
                          text: "Average Rainfall per month",
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: "right",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Sales Report</h4>
                </div>
                <div className="card-body">
                  <Line
                    data={state}
                    options={{
                      title: {
                        display: false,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: false,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Cancellation rates</h4>
                </div>
                <div className="card-body">
                  {/* <img src="/assets/images/graph1.png" className="img-fluid mx-auto" /> */}
                  <Doughnut
                    data={state1}
                    options={{
                      title: {
                        display: false,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                      responsive: false,
                      // maintainAspectRatio: true,
                      width: "500px",
                      height: "800",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Product ratings</h4>
                </div>
                <div className="card-body">
                  {/* <img src="/assets/images/graph1.png" className="img-fluid mx-auto" /> */}
                  <Doughnut
                    data={state1}
                    options={{
                      title: {
                        display: false,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "bottom",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Reviews</h4>
                </div>
                <div className="card-body">
                  {/* <img src="/assets/images/graph.png" className="img-fluid mx-auto" /> */}

                  <Bar
                    data={state3}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loading loading={loading} background="#999da3" loaderColor="#3498db" />
      </div>
    </div>
  );
}
