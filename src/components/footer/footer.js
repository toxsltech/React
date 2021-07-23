/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <section className="footer-top-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="single-widget">
                  <a href="index.html">
                    <img
                      src="/assets/img/logo-white.png"
                      alt="White-Logo"
                      className="logo_footer"
                    />
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt aliqua. Quis ipsum suspendisse
                    ultrices gravida.
                  </p>
                  <ul className="address">
                    <li>
                      <i className="fa fa-map-marker"></i>
                      32 st Link Road, Dummy VIC, 3004 Australia
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <a href="#">hello@dummy.com</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="single-widget">
                  <ul className="links inlinestyle">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <hr />
              </div>
            </div>

            <footer className="footer-bottom-area">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                   
                      <p className="m-0">Copyright © {new Date().getFullYear()} Unekey | <a href="#">Terms of Conditions</a> | <a href="#">Privacy Policy</a></p>
                    
                  </div>
                  <div className="col-lg-4">
                    <ul className="social-icon">
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>

            <div
              className="modal"
              id="edit-about-me"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body p-0">
                    <div className="background-purple">
                      <h5 className="mb-4">About Me</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <form>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            rows="6"
                            placeholder="Hello I am Michael V. Buttars .Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"
                          ></textarea>
                        </div>
                        <button
                          className="default-btn btn-lg btn-block"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal"
              id="edit-test-scores"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body p-0">
                    <div className="background-purple">
                      <h5 className="mb-4">Test Scores</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <form method="post">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="SAT Scores"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="ACT Scores"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="AP Exams"
                          />
                        </div>
                        <button
                          className="default-btn btn-lg btn-block"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="go-top">
          <i className="fa fa-angle-double-up"></i>
          <i className="fa fa-angle-double-up"></i>
        </div>
      </div>
    );
  }
}
