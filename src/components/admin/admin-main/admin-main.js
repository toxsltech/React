/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  Router,
} from "react-router-dom";
import history from "../../../history";
import * as loadjs from "loadjs";
import AdminHeader from "../admin-header/admin-header";
import AdminFooter from "../admin-footer/admin-footer";
import AdminDashboard from "../admin-dashboard/admin-dashboard";
import AdminLeftSide from "../admin-leftsidebar/admin-leftside";
import UserList from "../admin-userList/adminUserList";
import CounsellorList from "../admin-counsellorList/adminCounsellorList";
import TeacherList from "../admin-teacherList/adminTeacherList";
import EditTeacher from "../admin-teacherList/adminEditTeacher"
import EditUser from "../admin-userList/adminEditUser";
import EditCounsellor from "../admin-counsellorList/adminEditCounsellor";
import CollegeList from "../admin-college/admin-college";
import AdminProfile from "../admin-profile/admin-profile";
import AdminSetting from "../admin-settting/admin-setting";
import AdminNotification from "../admin-notification/admin-notification";
import "../../../assets/css/styles.css";
import base from "../../../globals/base";
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.dashboardRef = React.createRef();
    this.state = {
      refreshHeader: false,
    };
  }
  componentDidMount = () => {
    loadjs([
      base + "/assets/js/global.js",
      base + "/assets/js/deznav-init.js",
      base + "/assets/js/custom.min.js",
    ]);
  };

  render() {
    const { refreshHeader, siteView, studentId } = this.state;
    return (
      <Route>
        <div id="main-wrapper">
          <AdminHeader />
          <AdminLeftSide />
          <Switch>
            <Route path="/admin/notification" component={AdminNotification} />
            {/* <Route  path="/admin/setting" component={AdminSetting} /> */}
            <Route path="/admin/profile" component={AdminProfile} />
            <Route path="/admin/college-list" component={CollegeList} />
            <Route
              path="/admin/edit-counsellor/:id"
              component={EditCounsellor}
            />
            <Route
              path="/admin/edit-teacher/:id"
              component={EditTeacher}
            />
            <Route path="/admin/edit-user/:id" component={EditUser} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin/user-list" component={UserList} />
            <Route path="/admin/counsellor-list" component={CounsellorList} />
            <Route path="/admin/teacher-list" component={TeacherList} />
            {/* <Route path="*" component={AdminDashboard} /> */}

            <Route exact path="*">
              <Redirect to="/admin/dashboard" />
            </Route>
          </Switch>
          <AdminFooter />
        </div>
      </Route>
    );
  }
}
