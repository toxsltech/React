/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  UNSAFE_componentWillMount = () => { };

  formHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { message } = this.state;
    return (
      <div className="chat-footer">
        <form
          onSubmit={(e) => {
            this.props.sendMsg(e, message);
            this.setState({ message: "" });
          }}
        >
          <div className="input-group">
            {/* <div className="input-group-prepend">
                            <div className="btn-file btn">
                              <i className="fa fa-paperclip"></i>{" "}
                              <input type="file" />
                            </div>
                          </div> */}
            <input
              type="text"
              className="input-msg-send form-control"
              placeholder="Type something"
              name="message"
              onChange={(e) => this.formHandler(e)}
              value={message}
            />

            <div className="input-group-append">
              <button
                type="submit"
                className="btn msg-send-btn"
              // onClick={(e) => this.props.sendMsg(e, message)}
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
