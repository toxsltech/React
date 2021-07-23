/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import base from "../../../../globals/base";
import { Student_SIDEBAR } from "../../../../globals/constant";

export default class StudentCounselorLeftBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          token: null,
          role: null,
          loaded: false,
          view: "",    
        };
      }

      render() {
        const {loaded} = this.state;
        const {siteView,studentId} = this.props;
        return (
          <div>
            {siteView === "Student"
                ? loaded
                  ?
                  <div className="col-md-3 pl-0 pr-0 collapse width show" id="sidebar">
            <div
              className="list-group border-0 text-center text-md-left accordion"
              id="exampleAccordion"
            >
                 { Student_SIDEBAR.map((data, index) => (
                      <div key={index}>
                        <div id="exItem1Header">
                          <Link
                            to={data.route + studentId}
                            className="list-group-item d-inline-block collapsed"
                            data-toggle={data.subMenu ? "collapse" : ""}
                            data-target={"#exItem" + data.id}
                            aria-expanded="false"
                            aria-controls="exItem1"
                          >
                            <img src={base + data.img} />
                            <span className="d-none d-md-inline">{data.name}</span>
                          </Link>
                        </div>
                        {data.subMenu ? (
                          <div
                            id={"exItem" + data.id}
                            className="collapse"
                            aria-labelledby="exItem1Header"
                            data-parent="#exampleAccordion"
                            aria-expanded="false"
                          >
                            {data.subMenu.map((sub, index) =>
                               (
                                <Link
                                key={index}
                                  to={sub.route + studentId}
                                  className="list-group-item"
                                  role="tab"
                                >
                                  {sub.name}
                                </Link>
                              ) 
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                    </div>
                </div>
                :'':''}
            </div>
        );
    }
}