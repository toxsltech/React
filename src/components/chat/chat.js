/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import base from "../../globals/base";
import InfiniteScroll from "react-infinite-scroll-component";
import apibase from "../../globals/config";
import * as Session from "../../utils/session";
import Moment from "react-moment";
import Search from "./search";
import Messages from "./messages";
let serveUrl = apibase;
const io = require("socket.io-client");
const socket = io.connect(apibase);

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      limit: "10",
      allUserArray: [],
      myChatWithArray: [],
      user: {},
      offset: 0,
      hasmore: false,
      hasmore1: false,
      hasmore2: false,
      search: "",
      chatWith: {},
      message: "",
      chatHistory: [],
      chatHistory_count: "",
      chatHistory_totalCount: "",
      chatWithId: "",
      offset1: 0,
      showSlide:false
    };
  }
  UNSAFE_componentWillMount = () => {
    const { limit } = this.state;
    this.getAllUsers();
    this.getMyChatWith(limit);
  };
  
  getChatMessages = async () => {
    var {
      chatWithId,
      limit,
      offset1,
      chatHistory,
      chatHistory_count,
    } = this.state;

    await UserService.getChatMessages(chatWithId, limit, offset1)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            const array1 = chatHistory;
            const array2 = response.data.data.reverse();
            const array3 = [...array2, ...array1];
            let arr = array3;
            this.setState(
              {
                chatHistory: arr,
                chatHistory_count: response.data.data.length,
                chatHistory_totalCount: response.data.count,
              },
              () => {
                if (offset1 == 0) {
                  var element = document.getElementById("messageScroll");
                  element.scrollTop =
                    element.scrollHeight - element.clientHeight;
                }
                if (response.data.data.length < limit)
                  this.setState({ hasmore2: false });
                else this.setState({ hasmore2: true });
              }
            );
            this.getMyChatWith();
            this.props.callback();
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  getMyChatWith = async (limit, offset1, filter) => {
    const { offset, allUserArray } = this.state;
    let limit1 = limit ? limit : "10";
    await UserService.getMyChatWith(limit1, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            
            var filtered_chat = response.data.data[0].chatList.filter(q=>
                q.senderData.length>0
              )
             
            
            this.setState({
              myChatWithArray: filtered_chat,
              myChatWithArray_count: filtered_chat.length,
              myChatWithArray_totalCount: response.data.data[0].totalCount
                .length
                ? response.data.data[0].totalCount[0].count
                : "",
            });
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };

  scrollUser = (filter) => {
    let search1;
    const { offset } = this.state;
    if (!filter) {
      this.setState({ offset: offset + 1 });
      this.getAllUsers();
    } else {
      if (search1 !== filter) {
        this.setState({ offset: 0 });
        this.getAllUsers(filter, true);
      } else {
        this.setState({ offset: offset + 1 }, () => {
          this.getAllUsers(filter);
        });
      }
    }
  };
  scrollChat = (filter) => {
    let search1;
    const { offset } = this.state;
    if (!filter) {
      this.setState({ offset: offset + 1 });
      this.scrollChats();
    } else {
      if (search1 !== filter) {
        this.setState({ offset: 0 });
        this.scrollChats(filter, true);
      } else {
        this.setState({ offset: offset + 1 }, () => {
          this.scrollChats(filter);
        });
      }
    }
  };
  scrollChats = async (filter, blank) => {
    var { offset, limit, myChatWithArray } = this.state;
    let limit1 = limit ? limit : "10";
    await UserService.getMyChatWith(limit1, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success == true) {
            myChatWithArray = blank ? [] : myChatWithArray;
            var filtered_chat = response.data.data[0].chatList.filter(q=>
              q.senderData.length>0
            )
            let arr = myChatWithArray.concat(filtered_chat);
            this.setState(
              {
                myChatWithArray: arr,
                myChatWithArray_count: filtered_chat.length,
                myChatWithArray_totalCount:
                  response.data.data[0].totalCount[0].count,
              },
              () => {
                // if (allUserArray.length >= response.data.count) {
                if (filtered_chat.length >= limit) {
                  this.setState({ hasmore1: true });
                } else {
                  this.setState({ hasmore1: false });
                }
              }
            );
          }
        }
      })
      .catch((err) => {
        showNotification("danger", constant.ERRORMSG);
      });
  };
  searchHandler = (e) => {
    const { offset, limit } = this.state;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.scrollUser(value);
  };

  getAllUsers = async (filter, blank) => {
    
    var { offset, allUserArray, limit } = this.state;

    let limit1 = limit ? limit : "10";
    await UserService.getAllUsers(limit, offset, filter)
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          if (response.success) {
            allUserArray = blank ? [] : allUserArray;
            let arr = allUserArray.concat(response.data.students);
            this.setState(
              {
                allUserArray: arr,
                allUserArray_count: response.data.students.length,
                allUserArray_totalCount: response.data.count,
              },
              () => {
                if (response.data.students.length >= limit) {
                  this.setState({ hasmore: true });
                } else {
                  this.setState({ hasmore: false });
                }
              }
            );
          }
        }
      })
      .catch((err) => {
        //192.168.10.33/attendance/record/view/65804/anmol-sethi-web-node-2020-10-30-fridayhttp://192.168.10.33/attendance/record/view/65804/anmol-sethi-web-node-2020-10-30-friday(err);
        showNotification("danger", constant.ERRORMSG);
      });
  };

  componentDidMount = () => {
    let user = Session.getUser();
    if (user) {
      this.setState({ user });
      socket.emit("connectUser", user);
      socket.on("msgReceived", (resp) => {
        this.onMessageReceived(resp.data);
      });
    }
  };
  componentWillUnmount = () => {
    const { user } = this.state;
    socket.disconnect();
    socket.emit("disconnect", user);
  };

  onMessageReceived = (entry) => {
    const { user, chatWith, chatHistory } = this.state;
    if (
      chatWith._id ===
      (user._id === entry.reciver._id ? entry.sender._id : entry.reciver._id)
    ) {
      this.setState(
        {
          chatHistory: chatHistory.concat(entry),
        },
        () => {
          var element = document.getElementById("messageScroll");
          element.scrollTop = element.scrollHeight - element.clientHeight;
        }
      );
    }
    this.getMyChatWith();
    // this.props.callback();
  };

  formHandler = (e) => {
    // this.setState({ submitted: false });
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendMsg = (e, message) => {
    e.preventDefault();
    const { chatWith, user } = this.state;
    let data = {
      sender: user,
      reciver: chatWith,
      message: message,
    };

    socket.emit("sendMsg", { data: data });
    this.setState({
      message: "",
    });
  };

  selectUserForChat = (data) => {
    this.setState(
      {
        chatWith: data,
        chatHistory: [],
        chatWithId: this.generateToken(data),
        offset1: 0,
        message: "",
        showSlide:true
      },
      () => {
        this.getChatMessages();
      }
    );
  };

  generateToken(data) {
    const { user } = this.state;
    let token = "";
    let curruntUser = user._id;
    let chatWith = data._id;
    token =
      curruntUser > chatWith
        ? curruntUser + "_" + chatWith
        : chatWith + "_" + curruntUser;
    return token;
  }
  scrollMessage = () => {
    const { offset1 } = this.state;
    this.setState({ offset1: offset1 + 1 });
    this.getChatMessages();
  };

  render() {
    const {
      show,
      allUserArray,
      allUserArray_count,
      allUserArray_totalCount,
      user,
      limit,
      offset,
      hasmore,
      search,
      chatWith,
      message,
      chatHistory,
      myChatWithArray,
      hasmore1,
      hasmore2,
      chatHistory_count,
      loading,
      offset1,
      showSlide
    } = this.state;

    return (
      <div>
        <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-md-12 align-self-center">
                            <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Messaging</h3>
                            <div className="d-flex align-items-center">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb m-0 p-0">
                                        <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                        <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/chat'} className="breadcrumb-item text-muted active">Chat</Link></li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-3">
            <div className="card-body p-0">
              <div className={showSlide?"chat-window chat-slide":"chat-window"}>
                <div className="chat-cont-left">
                  <div className="chat-header">
                    <span>{!show ? "Messages" : "Users"}</span>{" "}
                    <a
                      onClick={() =>
                        this.setState({ loading: true }, () => {
                          this.setState({
                            loading: false,
                            show: !show,
                          });
                        })
                      }
                      className="chat-compose"
                    >
                      {show ? (
                        <i
                          className="fa fa-arrow-circle-o-left"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i className="fa fa-plus-circle"></i>
                      )}
                    </a>
                  </div>
                  {!loading ? (
                    <>
                      {show ? (
                        <form
                          className="chat-search animated fadeInRight"
                          autoComplete="off"
                        >
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <i className="fa fa-search"></i>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="search"
                              autoComplete="off"
                              value={search}
                              onChange={(e) => this.searchHandler(e)}
                            />
                          </div>
                        </form>
                      ) : (
                        ""
                      )}
                      <div className="chat-users-list ">
                        <div
                          id="userScroll"
                          className="chat-scroll animated fadeInRight"
                        >
                          {!show ? (
                            myChatWithArray.length ? (
                              <InfiniteScroll
                                dataLength={this.state.myChatWithArray.length}
                                next={this.scrollChat}
                                hasMore={hasmore1}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="userScroll"
                              >
                                {myChatWithArray.map((data, index) => (
                                  <a key={index}
                                    className={`media ${
                                      chatWith._id ===
                                      (user._id === data.receiverData[0]._id
                                        ? data.senderData[0]?._id
                                        : data.receiverData[0]._id)
                                        ? "activeSide"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      this.selectUserForChat(
                                        user._id === data.receiverData[0]._id
                                          ? data.senderData[0]
                                          : data.receiverData[0]
                                      );
                                      // this.setState({ offset1: 0 }, () => {
                                      //   this.getChatMessages(data._id);
                                      // });
                                    }}
                                  >
                                    <div className="media-img-wrap">
                                      <div className="avatar avatar-away">
                                        <img
                                          src={
                                            user._id ===
                                            data.receiverData[0]._id
                                              ? serveUrl +
                                                "/" +
                                                data.senderData[0]?.profile_img
                                              : serveUrl +
                                                "/" +
                                                data.receiverData[0].profile_img
                                          }
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              base + "/assets/img/user.jpg";
                                          }}
                                          alt="User Image"
                                          className="avatar-img rounded-circle"
                                        />
                                      </div>
                                    </div>
                                    <div className="media-body">
                                      <div>
                                        <div className="user-name">
                                          {user._id === data.receiverData[0]._id
                                            ? data.senderData[0]?.first_name +
                                              " " +
                                              data.senderData[0]?.last_name
                                            : data.receiverData[0].first_name +
                                              " " +
                                              data.receiverData[0].last_name}
                                        </div>
                                        <div className="user-last-chat">
                                          {data.message}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="last-chat-time block">
                                          <Moment fromNow>
                                            {data.created_at}
                                          </Moment>
                                        </div>
                                        {data.unreadMessages > 0 ? (
                                          <div className="badge badge-success badge-pill">
                                            {data.unreadMessages}
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </InfiniteScroll>
                            ) : (
                              <h6 className="selectUser">No messages yet!</h6>
                            )
                          ) : allUserArray.length ? (
                            <InfiniteScroll
                              dataLength={this.state.allUserArray.length}
                              next={this.scrollUser}
                              hasMore={hasmore}
                              loader={<h4>Loading...</h4>}
                              // endMessage={
                              //   <p style={{ textAlign: "center" }}>
                              //     <b>Yay! You have seen it all</b>
                              //   </p>
                              // }
                              scrollableTarget="userScroll"
                            >
                              {allUserArray.map((data, index) => (
                                <a key={index}
                                  className={`media ${
                                    chatWith._id === data._id
                                      ? "activeSide"
                                      : ""
                                  }`}
                                  onClick={() => this.selectUserForChat(data)}
                                >
                                  <div className="media-img-wrap">
                                    <div className="avatar avatar-away">
                                      <img
                                        src={
                                          data && data.profile_img
                                            ? serveUrl + "/" + data.profile_img
                                            : base + "/assets/img/user.jpg"
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            base + "/assets/img/user.jpg";
                                        }}
                                        alt="User Image"
                                        className="avatar-img rounded-circle"
                                      />
                                    </div>
                                  </div>
                                  <div className="media-body">
                                    <div>
                                      <div className="user-name">
                                        {" "}
                                        {data.first_name
                                          .charAt()
                                          .toUpperCase() +
                                          data.first_name.slice(1) +
                                          " " +
                                          data.last_name
                                            .charAt()
                                            .toUpperCase() +
                                          data.last_name.slice(1)}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </InfiniteScroll>
                          ) : (
                            <h6 className="selectUser">No user found!</h6>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="chat-cont-right">
                  {Object.keys(chatWith).length > 0 ? (
                    <div>
                      <div className="chat-header">
                        <a id="back_user_list" className="back-user-list">
                          <i className="fa fa-chevron-left" onClick={()=>this.setState({showSlide:false})}></i>
                        </a>
                        <div className="media">
                          <div className="media-img-wrap">
                            <div className="avatar avatar-online">
                              <img
                                src={
                                  chatWith && chatWith.profile_img
                                    ? serveUrl + "/" + chatWith.profile_img
                                    : base + "/assets/img/user.jpg"
                                }
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = base + "/assets/img/user.jpg";
                                }}
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="user-name">
                              {chatWith.first_name ? chatWith.first_name : ""}
                              {chatWith.last_name
                                ? " " + chatWith.last_name
                                : ""}
                              {/* {user.first_name
                            ? user.first_name.charAt().toUpperCase() +
                              user.first_name.slice(1)
                            : "" + " " + user.last_name
                            ? user.last_name.charAt().toUpperCase() +
                              user.last_name.slice(1)
                            : ""} */}
                            </div>
                            {/* <div className="user-status">online</div> */}
                          </div>
                        </div>
                        {/* <div className="chat-options">
                          {" "}
                          <a>
                            {" "}
                            <i className="fa fa-ellipsis-v"></i>
                          </a>
                        </div> */}
                      </div>

                      <div className="chat-body">
                        <div id="messageScroll" className="chat-scroll">
                          <ul className="list-unstyled">
                            <InfiniteScroll
                              dataLength={this.state.chatHistory.length}
                              next={this.scrollMessage}
                              scrollThreshold="500px"
                              hasMore={hasmore2}
                              inverse={true}
                             
                              scrollableTarget="messageScroll"
                            >
                              {chatHistory.map((data, index) => (
                                <li
                                  key={index}
                                  className={`media animated ${
                                    data.sender._id === user._id
                                      ? "sent fadeInRight"
                                      : "received fadeInLeft"
                                  }`}
                                >
                                  {data.sender._id !== user._id ? (
                                    <div className="avatar">
                                      <img
                                        src={
                                          data.sender.profile_img
                                            ? serveUrl +
                                              "/" +
                                              data.sender.profile_img
                                            : base + "/assets/img/user.jpg"
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            base + "/assets/img/user.jpg";
                                        }}
                                        alt="User Image"
                                        className="avatar-img rounded-circle"
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div className="media-body">
                                    <div className="msg-box">
                                      <div>
                                        <p>{data.message}</p>
                                        <ul className="chat-msg-info">
                                          <li>
                                            <div className="chat-time">
                                              <span>
                                                <Moment
                                                  date={data.created_at}
                                                  format="hh:mm"
                                                />
                                              </span>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </InfiniteScroll>
                          </ul>
                        </div>
                      </div>
                      <Search
                        sendMsg={(e, message) => this.sendMsg(e, message)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={base + "/assets/img/msg.png"}
                        alt="nomessage"
                        className="nomessage"
                      />
                      <h5 className="selectUser">
                        Please select person to chat with{" "}
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
