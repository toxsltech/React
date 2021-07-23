/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import base from "../../../globals/base";
import { SIDEBAR, Student_SIDEBAR } from "../../../globals/constant";
import jwt from "jwt-decode";
import * as Session from "../../../utils/session";
import history from "../../../history";
export default class StudentLeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      role: null,
      loaded: false,
      view: "",    
    };
  }
  UNSAFE_componentWillMount = () => {
  
    let token = Session.getToken();
    if (token) {
      this.setState({
        token,
        role: jwt(token).role,
        loaded: true,
      });
    } else {
      this.setState({ loaded: true });
    }
    this.resetProps()
  };

  resetProps = ()=>{
    history.listen( location =>  {
      if(location.pathname=='/home' || location.pathname=='/home/calender'){
        let data = {
          view: "",
          studentId: "",
        };

        this.props.callback(data);
      }
            
      });
  }

  render() {
    const { siteView, studentId } = this.props;
    
    const { token, role, loaded } = this.state;
    return (
      <div className="col-md-3 px-md-0 mb-3 mb-md-0 collapse width show col-23" id="sidebar">
        <div
          className="list-group border-0 text-center text-md-left accordion ttt"
          id="exampleAccordion"
        >
          
          { loaded
            ? SIDEBAR.map((data, index) =>
                data.role.includes(role) ? (
                  <div key={index}>
                    <div id="exItem1Header">
                    
                      <Link
                        to={data.route?data.route:'/'}
                        className="list-group-item d-inline-block collapsed text-left"
                        data-toggle={data.subMenu ? "collapse" : ""}
                        data-target={"#exItem" + data.id}
                        aria-expanded="false"
                        aria-controls="exItem1"
                      >
                        <img src={base + data.img} />
                        <span className="">{data.name}</span>
                      </Link>
                    </div>
                    {data.subMenu ? (
                      <div
                        id={"exItem" + data.id}
                        className="collapse sub-menu-sec"
                        aria-labelledby="exItem1Header"
                        data-parent="#exampleAccordion"
                        aria-expanded="false"
                      >
                        {data.subMenu.map((sub, index) =>
                          sub.role.includes(1) ||  sub.role.includes(3)? (
                            <Link
                            key={index}
                              to={sub.route}
                              className="list-group-item"
                              role="tab"
                            >
                              {sub.name}
                            </Link>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )
              )
            : ""}

          
        </div>
      </div>
    );
  }
}
