/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import * as UserService from "../../../services/userServices";
import React, { Component } from "react";
import base from "../../../globals/base";
import apibase from "../../../globals/config";
let serveUrl = apibase;

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

const getStudents = async (offset, filter, blank) => {
  return UserService.getStudents(limit, offset, filter)
    .then((resp) => {
      if (resp) {
        let response = resp.data;
        if (response.success == true) {
          options = blank ? [] : options;
          
          response.data.students.map((data, index) => {
            options.push({
              value: data._id,
              label: (
                <div className="d-flex">
                  {" "}
                  <img
                    src={
                      data && data.profile_img
                        ? serveUrl + "/" + data.profile_img
                        : base + "/assets/img/user.jpg"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = base + "/assets/img/user.jpg";
                    }}
                    className="avatarImg"
                    alt="Profile Photo"
                  />{" "}
                  {highlight(data, filter)}
                </div>
              ),
            });
          });

          let val = response.data.students.length? options:"";
          return val;
        }
      }
    })
    .catch((err) => {});
};

function highlight(data, filter) {
  var querystr = filter;
  var result =
    data.first_name.charAt().toUpperCase() +
    data.first_name.slice(1) +
    " " +
    data.last_name.charAt().toUpperCase() +
    data.last_name.slice(1);
  var reg = new RegExp(querystr, "gi");
  var final_str = result.replace(reg, function (str) {
    return '<span class="highlight">' + str + "</span>";
  });
  return <div dangerouslySetInnerHTML={{ __html: final_str }} />;
}

const loadOptions = async (search, prevOptions) => {
  if (!search) {
    var options = await getStudents(i);
    i++;
  } else {
    if (search1 !== search) {
      search1 = search;
      i = 0;
      var options = await getStudents(i, search, true);
    } else {
      i++;
      var options = await getStudents(i, search);
    }
  }
  let hasMore = options.length >= limit;
  return {
    options,
    hasMore,
  };
};

export default loadOptions;
