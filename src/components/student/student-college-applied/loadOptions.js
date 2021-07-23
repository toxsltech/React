/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import * as UserService from "../../../services/userServices";
import base from "../../../globals/base";
import React, { Component } from "react";

let options = [];
let search1 = "";
var i = 0;
const limit = 10;
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const getColleges = async (offset, filter, blank) => {
  return UserService.getColleges(limit, offset, filter)
    .then((resp) => {
      if (resp) {
        let response = resp.data;
        if (response.success == true) {
          options = blank ? [] : options;
          response.colleges.map((data, index) => {
            options.push({
              value: data.collegeUnitId,
              label: (
                <div className="d-flex">
                  {" "}
                  <img
                    src={
                      data && data.image
                        ? data.image
                        : base + "/assets/img/user.jpg"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = base + "/assets/img/user.jpg";
                    }}
                    className="avatarImg"
                    alt="Profile Photo"
                  />{" "}
                  {data.name}
                </div>
              ),
            });
          });
          return options;
        }
      }
    })
    .catch((err) => {});
};
const loadOptions = async (search, prevOptions) => {
  if (!search) {
    i++;
    var options = await getColleges(i);
  } else {
    if (search1 !== search) {
      search1 = search;
      i = 0;
      var options = await getColleges(i, search, true);
    } else {
      i++;
      var options = await getColleges(i, search);
    }
  }
  let hasMore = options.length >= limit;
  return {
    options,
    hasMore,
  };
};

export default loadOptions;
