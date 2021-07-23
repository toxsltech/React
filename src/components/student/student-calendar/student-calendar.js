/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../../globals/base";
import { Link } from "react-router-dom";
import * as UserService from "../../../services/userServices";
import * as constant from "../../../globals/constant";
import showNotification from "../../../services/notificationService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
declare var $

const localizer = momentLocalizer(moment);

export default class StudentCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:{},
      collegeId:'',
      infoColleges:[],
      status:false,
      mileStone:'',
      type:'',
      endDate:'',
      events: [],
      start:'',
    };
  }
  componentDidMount(){
    
    this.getcalendarEvents()
  }
  getcalendarEvents() {
    
    UserService.getCalendarEventsAll()
      .then((resp) => {
        if (resp) {
          let response = resp.data;

          if (response.success == true) {
              
            var newarr = [];
            for(let item of response.data.data){
                var obj={
                    start: moment(item.StartTime).toDate(),
                    end: moment(item.EndTime).toDate(),
                    title: item.Subject,
                    collegeId:item.collegeId 
                }
                newarr.push(obj);
            } 
            this.setState({
                events: newarr,
            });
            
          }
        }
      })
      .catch((err) => {
      });
  };

  getMilestone(){
    let collegeId = this.state.collegeId
    
    UserService.calendarEventsForCollege(collegeId,{endDate:new Date(this.state.start)})
    
    .then((resp) => {
        if (resp) {
          let response = resp.data;
          
          this.setState({
            infoColleges: response
          });
          
        }
    })
    .catch((err) => {
    });
  }

  onSelectEvent=(e)=>{
    let collegeId = e.collegeId
    
      this.setState({
        collegeId: collegeId
      });
      this.setState({
        start: e.start
      });

      UserService.calendarEventsForCollege(collegeId,{endDate:new Date(e.start)})
      .then((resp) => {
        if (resp) {
          let response = resp.data;
          
          this.setState({
            infoColleges: response
          });
        }
      })
      .catch((err) => {
      });
    $('#infoMilestone').modal('show');
    
  }


  handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  removeFromCalendar=(data)=>
  {
 let collegeId =data.collegeId
   const id=data._id
    UserService.removeFromCalendar(collegeId,{id})
    .then((resp) => {
      this.getcalendarEvents();
      // this.getMilestone();
      UserService.calendarEventsForCollege(collegeId,{endDate:new Date(this.state.start)})
    
    .then((resp) => {
        if (resp) {
          let response = resp.data;
          
          this.setState({
            infoColleges: response
          });
          var len = response.length;
          if(len===0){
            document.getElementById("close2").click();
          }
          
        }
    })
    .catch((err) => {
    });

          // var len = this.state.infoColleges.length;
          // if(len===0){
          //   document.getElementById("close2").click();
          // }

      
    });

  }


  viewSingleEvents = (data,option) => {
    let id=data._id._id
    var option={
      option:option}
      // this.setState({option:option})
      UserService.updateEventStatus(id,option)
      .then((resp) => {
        
        if (resp.status==200) {
          // showNotification('success','Event marked as completed')
          this.getMilestone()
        }
      })
      .catch((err) => {
      });

  };
  render() {
    const {infoColleges , mileStone, endDate, type, status} = this.state;
    
    return (
      <>
      <div className="card">
        <div className="card-header">
          <h5>Calendar</h5>
        </div>
        <div className="card-body ">
          <div id="calendar">
            <Calendar
              localizer={localizer}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={this.onSelectEvent}
            />
          </div>
        </div>
      </div>
      <div className="modal" id="infoMilestone">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">College Events</h4>
                <button
                  type="button"
                  className="close"
                  id="close2"
                  data-dismiss="modal"
                >
                  &times;
                </button>{" "}
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Milestone</h5>
                  </div>
                  <div className="col-md-6">
                    <h5 className=" text-right pr-4">Action</h5>
                  </div>
                </div>
                <div className="scrolledarea">
                  <div className="row">
                    
                    {infoColleges.map((data,i) => (
                      <div key={i} className="col-md-12">
                        <div className="form-group">
                          <div class="card">
                            <div class="card-body">
                             <table class="table">
                                <tr>
                                  <td>
                                    <p>
                                    {moment(data?._id?.endDate).format("MM-DD-YYYY")}{" "}
                                    {data?._id?.mileStone}
                                    </p>
                                  </td>
                                  <td class="text-right">
                                  <select
                                    className="form-control w-150 smallform ml-auto"
                                  
                                    onChange={(e) => this.viewSingleEvents(data,e.target.value)}
                                    defaultValue={data._id.milestoneStatus}
                                    
                                    required

                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                  
                                </select>
                                  </td>
                                  <td>
                                  <a onClick={(e) =>
                                    this.removeFromCalendar(data._id)
                                  }
                                  className="default-btn btn-sm"
                                  title="Delete Milestone"
                                  
                                >
                                  <i
                                    className="la la-trash"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                  </td>
                                </tr>
                               {/* {data?._id?.milestoneStatus==true?'Completed':'In-progress'}{" "} */}
                            {/* {data?._id?.milestoneStatus === "Pending" && ( */}
                            {/* )}  */}
                          
                              {/* <span className="float-right">
                                <a
                                  onClick={(e) => this.viewSingleEvents(data._id)}
                                  className="default-btn btn-sm"
                                  title="Complete"
                                >
                                  Complete
                                  
                                </a>
                                &nbsp;
                                
                              </span> */}
                            {/* )}  */}
                         
                            {/* {data?._id?.milestoneStatus === true && (
                              <span className="float-right">
                                Completed
                              </span>

                            )} */}
                           </table>
                         
                            

                         </div>
                        </div>
                      </div>  
                    </div>
                       
                      
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
  


         <div className="modal" id="editMilestone1">
          <div className="modal-dialog modal-customsize">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Milestone</h4>
                
              
                <button
                  type="button"
                  className="close"
                  id="closemodel"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <form>

            
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                      <h3>Milestone</h3>
                        <input
                          className="form-control"
                          type="text"
                          name="mileStone"
                          value={mileStone}
                          placeholder="Edit Milestone"
                          onChange={this.handleChange}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <h3>Status</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="status"
                          onChange={this.handleChange}
                          defaultValue={status}
                          required
                        >
                      <option value="">Select</option>
                          <option value={false}>In progress</option>
                          <option value={true}>Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                <br></br><br></br>
                <div className="d-flex flex-wrap justify-content-end">
                  <button
                    type="button"
                    className="default-btn mr-2"
                    onClick={this.updateSingleEvent}
                    data-dismiss="modal"
                  >
                    Update
                  </button> 
                  </div>
                  &nbsp;
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
