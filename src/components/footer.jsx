/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";

export default class FooterAdmin extends React.Component {
  render() {
    return (
      <footer className="footer-admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <a className="footer-tag" target="_blank">
                Copyright © {new Date().getFullYear()} FamBase. All Rights
                Reserved.
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
