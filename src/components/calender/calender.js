/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import React, { useEffect } from "react";
import base from "../../globals/base";
import { Link } from "react-router-dom";
import * as UserService from "../../services/userServices";
import * as constant from "../../globals/constant";
import showNotification from "../../services/notificationService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ScheduleComponent,
  ViewsDirective,
  Inject,
  Day,
  WorkWeek,
  Month,
  Week,
  Agenda,
  ViewDirective,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
// import {  PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const localizer = momentLocalizer(moment);

export default class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().add(1, "days").toDate(),
          title: "Some title",
        },
      ],
    };
    this.calendarId = "5105trob9dasha31vuqek6qgp0@group.calendar.google.com";
    this.publicKey = "AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg";
    this.dataManger = new DataManager({
      url:
        "https://www.googleapis.com/calendar/v3/calendars/" +
        this.calendarId +
        "/events?key=" +
        this.publicKey,
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
      group: { resources: ["Rooms"] },
      resources: [
        {
          field: "RoomId",
          title: "Room",
          name: "Rooms",
          allowMultiple: false,
          dataSource: [{ RoomText: "ROOM 1", Id: 1, RoomColor: "#cb6bb2" }],
        },
      ],
    });
  }

  async onDataBinding(e) {
    e.result = this.state.eventList;
  }

  componentDidMount = () => {
    this.getCollegeLastDates();
  };

  getCollegeLastDates = async () => {
    try {
      let newArr = [
        // {
        //   Subject:"Harvard University",
        //   StartTime:new Date(),
        //   EndTime:new Date(),
        // },
        //
        // {
        //   Subject:"Yale University",
        //   StartTime:new Date(),
        //   EndTime:new Date(),
        // },
      ];
      this.setState({ eventList: newArr });
      UserService.getCalendarEvents().then(async (resp) => {
        if (resp) {
          if (resp.data.success) {
            let items = resp.data.data.data;

            this.setState({ eventList: items });
          }
        }
      });
    } catch (err) {
      // showNotification("danger", constant.ERRORMSG);
    }
  };

  onPopupOpen(args) {
    if (args.type === "Editor") {
      let dialogObj = args.element.ej2_instances[0];
      let buttons;
      if (args.target.classList.contains("e-appointment")) {
        this.currentEvent = this.scheduleObj.getEventDetails(args.target);
        buttons = [
          {
            buttonModel: { content: "SAVE", isPrimary: true },
            click: this.editEvent.bind(this),
          },
          {
            buttonModel: { content: "DELETE", cssClass: "e-event-delete" },
            click: this.eventDelete.bind(this),
          },
          {
            buttonModel: { content: "CANCEL", cssClass: "e-event-cancel" },
            click: this.dialogClose.bind(this),
          },
        ];
      } else {
        buttons = [
          {
            buttonModel: { content: "SAVE", isPrimary: true },
            click: this.eventAdd.bind(this),
          },
          {
            buttonModel: { content: "CANCEL", cssClass: "e-event-cancel" },
            click: this.dialogClose.bind(this),
          },
        ];
      }
      dialogObj.buttons = buttons;
      dialogObj.dataBind();
    }
  }

  eventAdd(e) {
    const data = this.scheduleObj.getCellDetails(
      this.scheduleObj.getSelectedElements()
    );
    const eventData =
      this.scheduleObj.eventWindow.getObjectFromFormData("e-schedule-dialog");

    return false;
    UserService.updateCalendar(eventData).then((resp) => {
      if (resp?.data?.data?.success) {
        showNotification("success", resp.data.data.message);
      }
    });
    // eventData.Id = this.scheduleObj.eventBase.getEventMaxID() + 1;
    // this.scheduleObj.addEvent(eventData);
    // this.dialogClose();
  }
  eventDelete(e) {
    // return;
    const eventData = this.scheduleObj.activeEventData.event;
    this.scheduleObj.deleteEvent(eventData);
    this.dialogClose();
  }
  editEvent(e) {
    // return
    const eventData =
      this.scheduleObj.eventWindow.getObjectFromFormData("e-schedule-dialog");
    UserService.updateCalendar(eventData).then((resp) => {
      if (resp?.data?.success) {
        // showNotification("success", resp.data.message);
      }
    });
    eventData.Id = this.currentEvent.Id;
    this.scheduleObj.saveEvent(eventData);
    this.dialogClose();
  }
  dialogClose() {}

  editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td style={{ colspan: "4" }}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%" }}
                readOnly={true}
              />
              <input
                type="hidden"
                name="Subject"
                style={{ width: "100%" }}
                readOnly={true}
                value={props.Id || props.Id}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Status</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="EventType"
                placeholder="Choose status"
                data-name="EventType"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={[
                  "College",
                  "Essay",
                  "Terms of recommendation",
                  "other",
                ]}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Milestone Status</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="EventType"
                placeholder="Update Milestone"
                data-name="Milestone"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["Completed", "Pending"]}
              ></DropDownListComponent>
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">End Time</td>
            <td style={{ colspan: "4" }}>
              <DateTimePickerComponent
                id="EndTime"
                format="dd/MM/yy hh:mm a"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  }

  render() {
    const { eventList } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h5>Calendar</h5>
        </div>
        <div className="card-body ">
          <div id="calendar">
            <ScheduleComponent
              ref={(schedule) => (this.scheduleObj = schedule)}
              width="100%"
              height="650px"
              id="Schedule"
              editorTemplate={this.editorTemplate.bind(this)}
              selectedDate={new Date()}
              eventSettings={{ dataSource: this.dataManger }}
              dataBinding={this.onDataBinding.bind(this)}
              popupOpen={this.onPopupOpen.bind(this)}
            >
              <ViewsDirective>
                <ViewDirective option="Month" />
                <ViewDirective option="Week" />
              </ViewsDirective>

              <Inject services={[Month, Week, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}
