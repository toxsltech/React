/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { useEffect, Fragment } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import history from "../../../history";
import { PrivateRoute } from "../../../privateRoute";
import StudentDashboard from "../student-dashboard/student-dashboard";
import StudentHeader from "../student-header/student-header";
import Footer from "../../footer/footer";
import StudentTestScore from "../student-profile/student-test-score/student-test-score";
import StudentRightSide from "../student-rightSidebar/student-rightSidebar";

import * as Session from "../../../utils/session";
import apibase from "../../../globals/config";
const io = require("socket.io-client");

export default class Home extends React.Component {
  constructor(props) {

    super(props);
    this.child = React.createRef();
    this.dashboardRef = React.createRef();
    this.state = {
      refreshHeader: false,
      siteView: "",
      studentId: "",
      user_view1:false
      
    };
  }
  componentDidMount = () => {
    let user = Session.getUser();
    if (user) {
      const socket = io.connect(apibase);
      socket.emit("connectUser", user);
    }
   
  };

  callback = (data) => {
    if (data) this.setState({ siteView: data.view, studentId: data.studentId });
    // this.child.current.getMessageCount();
    // this.dashboardRef.current.parentCall();
  };

  recallNotify = (data)=>{

    if(data != this.state.user_view1)
    {this.setState({user_view1:data})}

    this.props.recallNotifyy(true)
    
  }

  render() {



    const { refreshHeader, siteView, studentId } = this.state;
    return (
      <Route history={history}>
        <Route
          path="/"
          render={(props) => <StudentHeader ref={this.child}   data={this.state.user_view1} {...props} />}
        />
        
        {/* <Switch> */}
        <div className="conatiner-fluid">
          <div className="row m-0">
            {/* {siteView == "Student" ? (
              <Route
                path="/home/:id"
                render={(props) => (
                  <StudentDashboard
                    ref={this.dashboardRef}
                    callback={(data) => this.callback(data)}
                    siteView={siteView}
                    studentId={studentId}
                    {...props}
                  />
                )}
              />
            ) : ( */}
            <Route
              path="/home"
              render={(props) => (
                <StudentDashboard
                  ref={this.dashboardRef}
                  callback={(data) => this.callback(data)}
                  siteView={siteView}
                  studentId={studentId}
                  recallNotify={this.recallNotify}
                  {...props}
                />
              )}
            />
            {/* )} */}
            <StudentRightSide></StudentRightSide>
          </div>
        </div>
        {/* </Switch> */}
        <Footer />
      </Route>
    );
  }
}
