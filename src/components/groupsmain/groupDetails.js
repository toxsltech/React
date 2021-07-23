/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import Header from "../header/header";
import RightSidebar from "../../components/right-sidebar/right-sidebar";
import apibase from "../../globals/config";
import Paginate from "../pagination/pagination";
let serveUrl = apibase;
export default class GroupsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      description: "",
      submitted: false,
      group:"",
      limit:10,
      limit1:2,
      page:1,
      questionLists:[],
      reply:"",
      groupMembers:[],
      totalCount:0,
      search:"",
      hasmore1: false,
      count:0,
      view:3,
      groupName:""
    };
    
  }
    
  componentDidMount = ()=>{
    let userRole = localStorage.getItem("user");
    userRole = JSON.parse(userRole);
    this.setState({view:userRole.role});
    if(this.props.match.params.id){
      let id = this.props.match.params.id;
      this.setState({group:id});
      this.getLists(id);
      this.getUserList(id); 
    }
  }

  getUserList = (id,search)=>{
    id = this.state.group?this.state.group:id;
    search = search || search==''?search:this.state.search;
    let limit = this.state.limit?this.state.limit:'9';
    let offset = this.state.offset?this.state.offset:'0';
    UserService.getGroupDetails(id,search,limit,offset).then((resp)=>{
      let response = resp?.data;
      if(response?.success){
        
        this.setState({groupMembers:response.data.data,totalCount:response.data.count})
      }
    })
  }

  getLists = async(id,page)=>{
    id = this.state.group?this.state.group:id;
    page = page?page:this.state.page;
    UserService.getQuestionlist(id,this.state.limit1,page).then(response=>{
      response = response?.data;
      if(response?.success){
        this.setState({getQuestionlist:response.data.data[0].data,count:response.data.data[0].count,groupName:response.data.getGroupDetails.name});
      }
    }).catch(err=>{
      showNotification("danger",err?err:constant.ERRORMSG);
    })
  }
  formHandler = (e) => {
    this.setState({ submitted: false });
    const {name,value} = e.target;
    this.setState({[name]:value});
  };

  handlePageChange = (data) => {
    let selected = data.selected;
    this.setState({ page: selected });
    this.getLists(this.state.group,selected+1);
  };

  submitHandler = (e) => {
    e.preventDefault();
    const {
        question,
        description,
        submitted,
        errorConfirmPassword,
        errorPassword,
        group,
        
        
    } = this.state;
    
    this.setState({ submitted: true });
    if(question==''){
        return;
    }
    UserService.addPost(this.state).then(resp=>{
      let response = resp?.data;
      if(response?.success){
        document.getElementById("closepost").click()
        let id = this.props.match.params.id;
        this.getLists(id);
        // showNotification("success", response.message);
      }
    }).catch(err=>{
      showNotification("danger", err?err:constant.ERRORMSG);
    })
  };

  sendReply = (e, id)=>{
    e.preventDefault();
    if(this.state.reply!=''){
      let body = {
        reply:this.state.reply,
        groupQuestion:this.state.group,
        groupQuestion:id
      }
      UserService.addReply(body).then(response=>{
        response = response?.data;
        if(response?.success){
          this.setState({reply:""});
          this.getLists(id);
          // showNotification("success",response.message);
          document.getElementsByClassName("text-value").value="";
        }
      }).catch(err=>{
        showNotification("danger",err?err:constant.ERRORMSG);
      })

    }
  }

  searchHandler = (e) => {
    const { name, value } = e.target;
    this.getUserList(this.state.group,value)
    this.setState({ [name]: value });
  };

  render() {
    const {
      question,
      description,
      submitted,
      getQuestionlist,
      search,
      groupMembers,
      totalCount,
      hasmore1,
      count,
      group,
      view,
      groupName
    } = this.state;
    
    return (
      <div>
        <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-12 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Groups Details</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><Link to={'/home'} className="text-muted">Home</Link></li>
                                    <li className="breadcrumb-item" aria-current="page"><Link to={view==1?'/home/groups':'/home/groups'} className="breadcrumb-item text-muted active">{view==1?"Groups":'My Groups'}</Link></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page"><Link to={'/home/group-details/'+group} className="breadcrumb-item text-muted active">{groupName}</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        
        <div
          className="modal"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="post-modalLabel"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Create Post</h4>
                <button type="button" className="close" data-dismiss="modal" id="closepost">
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Post Title   {question == "" && submitted ? (
                          <span className="text-danger">
                            {" "}
                            <sup>*</sup>
                          </span>
                        ) : (
                          ""
                        )}</label>
                      <input className="form-control" type="text" name="question" value={question}
                        onChange={(e) => this.formHandler(e)}/>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Description</label>
                      <textarea className="form-control" name="description" value={description}
                        onChange={(e) => this.formHandler(e)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                
                <button type="button" onClick={(e)=>{this.submitHandler(e)}} className="default-btn">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="conatiner-fluid">
            <div className="chat-window">
              <div className="chat-cont-left">
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
                        <div className="chat-users-list ">
                        <div
                          id="userScroll"
                          className="chat-scroll animated fadeInRight"
                        >
                        <InfiniteScroll
                                dataLength={this.state.groupMembers.length}
                                next={this.scrollChat}
                                hasMore={hasmore1}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="userScroll"
                              >
                                {groupMembers.map((data, index) => (
                                  <a key={index}
                                    className="media"
                                   
                                  >
                                    <div className="media-img-wrap">
                                      <div className="avatar avatar-away">
                                        <img
                                          src={
                                            
                                            data.profile_img
                                              ? serveUrl +
                                                "/" +
                                                data.profile_img
                                              : ''
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
                                          {data.first_name
                                            ? data.first_name +
                                              " " +
                                              data.last_name
                                            : data.first_name +
                                              " "}
                                        </div>
                                       
                                      </div>
                                      <div>
                                       
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </InfiniteScroll>
                              </div>
                              </div>
                              </div>
            <div className="col-md-8 p-0 chat-cont-right">
              <div className="profile-section pb-5">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-12 d-flex align-content-between justify-content-between">
                          <h4 className="mb-4  ">Posts</h4>
                          <span>
                            <a
                              href="#myModal"
                              data-toggle="modal"
                              data-target="#myModal"
                              className="default-btn"
                            >
                              <i className="fa fa-plus mr-2"></i>Create Post
                            </a>
                          </span>
                        </div>
                      </div>
                        {getQuestionlist && getQuestionlist.length?
                      <div className="row">
                        {getQuestionlist.map((data,index)=>(
                        <div key={index} className="col-sm-12">
                          <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                            <div className="iq-card-body">
                              <div className="user-post-data">
                                <div className="d-flex flex-wrap">
                                  <div className="media-support-user-img mr-3 w-60">
                                    <img
                                      className="rounded-circle img-fluid "
                                      src={data.created_by.profile_img?serveUrl+"/"+data.created_by.profile_img:"/assets/img/03.jpg"}
                                      alt=""
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          base + "/assets/img/03.jpg";
                                      }}
                                    />
                                  </div>
                                  <div className="media-support-info mt-2">
                                    <h5 className="mb-0 d-inline-block">
                                      <a className="">
                                        {data.created_by.first_name?data.created_by.first_name:"User"}&nbsp;
                                        {data.created_by.last_name?data.created_by.last_name:"Name"}
                                      </a>
                                    </h5>

                                    <p className="mb-0 text-primary">
                                      <Moment fromNow>
                                            {data.created_at?data.created_at:''}
                                          </Moment>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <h5>
                                {data.question?data.question:''}
                                </h5>
                              </div>
                              {data.groupreplies.map((datas,key)=>(
                              <div key={key}className="row row-word-break mb-1">
                                <div className="col-4"><p>
                                {datas.reply}
                                </p></div>
                                <div className="col-4"><p className="font-new" > <Moment fromNow>
                                            {datas.created_at?datas.created_at:''}
                                          </Moment></p></div>
                                <div className="col-4"><p className="font-new">{datas.created_by[0].first_name?datas.created_by[0].first_name:""} {datas.created_by[0].last_name?datas.created_by[0].last_name:""}</p></div>
                              </div>
                              ))}
                              <div className="comment-area mt-3">
                                <div
                                  className="comment-text d-flex align-items-center"
                                >
                                  <input
                                    type="text"
                                    name="reply"
                                    
                                    className="form-control rounded text-value"
                                    onChange={this.formHandler}
                                  />
                                  <div className="comment-attagement d-flex">
                                    <button
                                      type="submit"
                                      className="default-btn btn_reply"
                                      onClick={(e) => this.sendReply(e, data._id)}
                                    >
                                      Reply
                                    </button>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                      :<h5>No record found</h5>}
                    </div>
                  </div>
                  {count > 2 ? (
                    <Paginate
                      page={count ? (count < 2 ? 1 : count / 2) : ""}
                      handlePageClick={(data) => this.handlePageChange(data)}
                      forcepage={this.state.showingPageNo - 1}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    );
  }
}
