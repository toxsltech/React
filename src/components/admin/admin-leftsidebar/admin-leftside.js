/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default class AdminLeftSide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
  
    //   const { messaageCount } = this.state;
      return (


        <div className="deznav">
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <li className="nav-label first">Main Menu</li>
                     <li><Link to="/admin/dashboard" aria-expanded="false">
                            <i className="la la-home"></i>
                            <span className="nav-text">Dashboard</span>
                            
                        </Link>
                    </li>
					    <li><Link to="/admin/user-list">
                            <i className="la la-users"></i>
                            <span className="nav-text">    Student List </span></Link></li>
                        
                    <li><Link to="/admin/college-list">
                            <i className="la la-graduation-cap"></i>
                            <span className="nav-text">Manage Colleges</span>
                            </Link>
                    </li>
                    <li><Link to="/admin/counsellor-list">
                            <i className="la la-graduation-cap"></i>
                            <span className="nav-text">Counselor List</span>
                            </Link>
                    </li>
                    <li><Link to="/admin/teacher-list">
                            <i className="la la-graduation-cap"></i>
                            <span className="nav-text">Teacher List</span>
                            </Link>
                    </li>

				</ul>
            </div>
        </div>
      )
    }
}