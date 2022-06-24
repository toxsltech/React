import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Paginate from "../paginate/pagination";
import PaginatePost from "../paginate/paginationPost";
import InfiniteScroll from "react-infinite-scroll-component";
import base from "../globals/base";
import * as adminServices from "../services/adminService";
import * as Constant from "../globals/constant";
import showNotification from "../services/notificationService";
import Loading from "react-fullscreen-loading";
import moment from "moment";
import apiBase from "../globals/config";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { DELETE_POST } from "../actions/types";
let serverurl = apiBase;

export default function PostDetail(props) {
    const [items, setItems] = useState(Array.from({ length: 3 }));


    const [file, setfile] = useState();
    const [photo, setPhoto] = useState();

    const [userListt, SetuserListt] = useState();
    const [selectedPage, setSelectedPage] = useState();
    const [selectedPost, setSelectedPost] = useState();
    const [comment, setComment] = useState([])
    const [userDetail, setUserDetail] = useState();
    const [viewId, SetViewId] = useState();
    const [loading, setLoading] = useState();
    const [totalPage, setTotalPage] = useState();
    const [totalPost, setTotalPost] = useState();
    const [counter, setCounter] = useState(1)

    const [postList, setPostList] = useState([]);
    const [showingPageNo, setShowingPageNo] = useState(1);
    const [showingPostNo, setShowingPostNo] = useState(1);
    const [postData, setPostDetail] = useState();
    const [postId, setPostId] = useState()
    const [count, setCount] = useState(0);
    const [postCount, setPostCount] = useState(1);
    const [userData, setUserData] = useState({
        userName: "",
        phoneNo: "",
        email: "",
        profileImg: "",
        updatedAt: "",
        countryCode: "",
        countryCode: "",
        firstName: "",
        lastName: "",
    });
    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
    };
    const fetchMoreData = () => {
        postDetail(counter + 1);
    };
    useEffect(() => {
        postDetail()

    }, [])

    const singleDetail = (id, page) => {
        // setCount(1)
        adminServices.singleDetail(props.match.params.id).then((resp) => {
            if (resp) {



                setComment(comment.concat(resp.data.data))
                // concat
            }


        });
    };

    const postDetail = (page) => {
        setCount(count + 1)
        let currentPage = page ? page : 1
        adminServices.postDetail(props.match.params.id, currentPage).then((resp) => {
            if (resp) {


                setComment(comment.concat(resp.data.data))
            }


        });
    };
    return (
        <div className="content-page-admin"><div className="content"><div className="container-fluid">
            <div className="row">
                <div className="col-md-10 mx-auto ">
                    <div className="row">
                        <div className="col-md-12 modal-image">
                            <img
                                className="img-responsive"
                                src={
                                    postData && postData.postImg
                                        ? serverurl + postData.postImg
                                        : base + "assets/images/default.jpeg"
                                }
                                alt="Image"
                            />
                            <h4 className="mt-2">
                                <b>
                                    hdjh fjdfh jd fhdj hfjd fjhdjfhjdhfjh jhfdjhfjdfh
                                    fjhdjfhdj jfhdj fdjfhj dfdjfh
                        </b>
                            </h4>
                        </div>
                        <div className="col-md-12 modal-meta">
                            <div className="modal-meta-top">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                >
                                    <span aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <div className="img-poster clearfix">
                                    <a href="">
                                        <img
                                            className="img-responsive img-circle"
                                            src={
                                                userData.profileImg
                                                    ? serverurl + userData.profileImg
                                                    : base + "assets/images/default.jpeg"
                                            }
                                            alt="Image"
                                        />
                                    </a>
                                    <strong>
                                        <a href="">Benjamin</a>
                                    </strong>
                                    <p>
                                        <span>12 minutes ago</span>
                                    </p>
                                </div>
                                {/* <div> */}
                                <InfiniteScroll
                                    dataLength={comment.length}
                                    next={fetchMoreData}
                                    hasMore={true}
                                    loader={<h4>Loading...</h4>}
                                >
                                    <ul className="img-comment-list">
                                        {comment.map((data, index) => (
                                            // <div style={style} key={index}>
                                            //   div - #{index}
                                            // </div>

                                            <li>
                                                <div className="comment-img">
                                                    <img
                                                        src={
                                                            userData.profileImg
                                                                ? serverurl + userData.profileImg
                                                                : base + "assets/images/default.jpeg"
                                                        }
                                                        className="img-responsive img-circle"
                                                        alt="Image"
                                                    />
                                                </div>
                                                <div className="comment-text">
                                                    <strong>
                                                        <a href="">{data && data.commentBy.userName ? data.commentBy.userName : ''}</a>
                                                    </strong>
                                                    <p>{data.title}</p>{" "}
                                                    <span className="date sub-text">
                                                        on {moment(data.updatedAt).format('MMMM Do YYYY')}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </InfiniteScroll>

                                {/* </div> */}


                                <div className="modal-meta-bottom">
                                    <ul>
                                        <li>
                                            <a className="modal-like" href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                            <span className="modal-one"> 786,286</span> |
                              <a className="modal-comment" href="#">
                                                <i className="fa fa-comments"></i>
                                            </a>
                                            <span> 786,286</span>{" "}
                                        </li>
                                        <li>
                                            <span className="thumb-xs">
                                                <img
                                                    className="img-responsive img-circle"
                                                    src={
                                                        userData.profileImg
                                                            ? serverurl + userData.profileImg
                                                            : base + "assets/images/default.jpeg"
                                                    }
                                                    alt="Image"
                                                />
                                            </span>
                                            <div className="comment-body">
                                                <input
                                                    className="form-control input-sm"
                                                    type="text"
                                                    placeholder="Write your comment..."
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}