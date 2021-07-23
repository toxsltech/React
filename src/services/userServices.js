/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import * as api from "../utils/requests";
import { Link } from "react-router-dom";

export const signUp = async (body) => {
  return await api
    .PostReq("/auth/register", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const signStudent = async (body) => {
  return await api
    .PostReq("/auth/registerStudent", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const signTeacher = async (body) => {
  return await api
    .PostReq("/auth/registerTeacher", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const signCounsellor = async (body) => {
  return await api
    .PostReq("/auth/registerCounselor", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const login = async (body) => {
  return await api
    .PostReq("/auth/login", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addSurvay = async (body) => {
  return await api
    .PostReq("/survay/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateProfile = async (body) => {
  return await api
    .putReq("/auth/updateProfile", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const updateusersProfile = async (body) => {
  return await api
    .putReq("/auth/updateusersProfile", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addTestTaken = async (body) => {
  return await api
    .PostReq("/auth/addTestScore", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getTestTaken = async () => {
  return await api
    .getReq("/auth/getTestData")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addActivity = async (body) => {
  return await api
    .PostReq("/activity/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getColleges = async (limit, offset, filter) => {
  return await api
    .getReq(
      "/college/getAll?" +
        "limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
// export const getAll = async (limit, offset, filter) => {
//   return await api
//     .getReq(
//       "/college/getAllCollegeAdmin?" +
//         "limit=" +
//         limit +
//         "&offset=" +
//         offset +
//         "&filter=" +
//         filter
//     )
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {});
export const getAll = async (limit, offset, filter) => {
  return await api
    .getReq("/college/getAllCollegeAdmin")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addGrade = async (body) => {
  return await api
    .PostReq("/grade/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getGrades = async () => {
  return await api
    .getReq("/grade/getAll")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const editGrade = async (body, id) => {
  return await api
    .putReq("/grade/update/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const editTestTaken = async (body, id) => {
  return await api
    .putReq("/auth/updateTest/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteTest = async (id) => {
  return await api
    .delReq("/auth/deleteTest/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteGrade = async (id) => {
  return await api
    .delReq("/grade/delete/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getPortfolio = async (page) => {
  return await api
    .getReq("/portfolio/list?page=" + page + "&limit=9")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getActivities = async () => {
  return await api
    .getReq("/activity/list")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getActivitiesById = async (id) => {
  return await api
    .getReq("/activity/getById/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteActivity = async (id) => {
  return await api
    .delReq("/activity/delete/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const editActivity = async (body, id) => {
  return await api
    .putReq("/activity/edit/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addPortfolio = async (body) => {
  return await api
    .PostReq("/portfolio/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const editPortfolio = async (body, id) => {
  return await api
    .putReq("/portfolio/edit/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deletePortfolio = async (id) => {
  return await api
    .delReq("/portfolio/delete/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getUserDetail = async () => {
  return await api
    .getReq("/auth/getUserDetails")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getUserDetails = async (id) => {
  return await api
    .getReq("/auth/getUserDetails?id=" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addCollegeSelect = async (body) => {
  return await api
    .PostReq("college/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const infoCollegeMilestone = async (id) => {
  return await api
    .getReq("/college/getMilestoneDeadline/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getSelectedColleges = async (limit, offset, filter, type) => {
  return await api
    .getReq(
      "/college/getMyColleges/" +
        type +
        "?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getSelectedCollegesById = async (
  limit,
  offset,
  filter,
  type,
  id
) => {
  return await api
    .getReq(
      "/college/getMyCollegesById/" +
        type +
        "/" +
        id +
        "?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addGroup = async (body) => {
  return await api
    .PostReq("group/add", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const editGroup = async (body, id) => {
  return await api
    .putReq("group/edit/" + id, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getStudents = async (limit, offset, filter) => {
  return await api
    .getReq(
      "/auth/getAllStudents" +
        "?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getNewStudentLeft = async (limit, offset, filter) => {
  return await api
    .getReq(
      "/auth/getNewStudentLeft" +
        "?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const myStudentLists = async (limit, offset, filter) => {
  return await api
    .getReq(
      "/auth/myStudentLists" +
        "?limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getAllUsers = async (limit, offset, filter) => {
  return await api
    .getReq(
      "/auth/getAllUser?" +
        "limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getGroups = async (limit, offset, filter) => {
  offset = offset ? offset : "";
  filter = filter ? filter : "";
  return await api
    .getReq(
      "/group/list?" +
        "limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getAllGroups = async (limit, offset, filter) => {
  offset = offset ? offset : "";
  filter = filter ? filter : "";
  return await api
    .getReq(
      "/group/getAllGroup?" +
        "limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getChatMessages = async (id, limit, offset) => {
  return await api
    .getReq(
      "/chat/getChatMessages/" + id + "?limit=" + limit + "&offset=" + offset
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getMessageCount = async () => {
  return await api
    .getReq("/chat/getNewMessagesCount")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getMyChatWith = async (limit, offset, filter) => {
  offset = offset ? offset : "";
  filter = filter ? filter : "";
  return await api
    .getReq(
      "/chat/getMyChatList?" +
        "limit=" +
        limit +
        "&offset=" +
        offset +
        "&filter=" +
        filter
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const readMessage = async (id) => {
  return await api
    .getReq("/chat/readMsg/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getSpecificUser = async (id) => {
  return await api
    .getReq("/auth/getById/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getSpecificTeacher = async (id) => {
  return await api
    .getReq("/teacher/getDetails/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getTeacherById = async () => {
  return await api
    .getReq("/teacher/getTeacherByIDetails")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getPortfolioById = async (id, page) => {
  return await api
    .getReq("/portfolio/getById/" + id + "/?page=" + page + "&limit=9")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeCollgeCat = async (id, type) => {
  return await api
    .delReq("/college/delete/" + type + "/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const removeImage = async (type) => {
  return await api
    .delReq("/auth/removeImage/" + type)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const addPost = async (body) => {
  return await api
    .PostReq("/group/addQuestion", body)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getProfile = async () => {
  return await api
    .getReq("/auth/getProfile")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getCollegeDetails = async (id) => {
  return await api
    .getReq("/college/getCollegeDetails/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getQuestionlist = async (id, limit, page) => {
  return await api
    .getReq(
      "/group/getQuestionlist/" + id + "?limit=" + limit + "&page=" + page
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const addReply = async (data) => {
  return await api
    .PostReq("/group/addReply", data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteImage = async (id) => {
  return await api
    .delReq("/portfolio/deleteImage/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getStudentGrades = async (id) => {
  return await api
    .getReq("/grade/getStudentGrades/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getStudentTestScore = async (id) => {
  return await api
    .getReq("/auth/getUserTestData/" + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const listActivities = async () => {
  return await api
    .getReq("/activity/activityList")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const deleteActivities = async (id) => {
  return await api
    .delReq("/activity/deleteList")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const viewActivities = async (id) => {
  return await api
    .getReq("/activity/viewActivity")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getGroupDetails = async (id, search, limit, offset) => {
  return await api
    .getReq(
      `/group/getGroupDetails/${id}?search=${search}&&limit=${limit}&&pageNo=${offset}`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getNotification = async () => {
  return await api
    .getReq(`/notification/getNotifications`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getNotificationsCount = async () => {
  return await api
    .getReq(`/notification/getNotificationsCount`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getUsetConselor = async () => {
  return await api
    .getReq("/group/getCounselor")
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const getTeacher = async () => {
  return await api
    .getReq(`/teacher/getTeacherForStudent`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const userList = async (search, limit, offset) => {
  return await api
    .getReq(`/auth/userList?filter=${search}&limit=${limit}&pageNo=${offset}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const counsellorList = async (search, limit, offset) => {
  return await api
    .getReq(
      `/auth/counsellorList?filter=${search}&limit=${limit}&pageNo=${offset}`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
export const teacherList = async (search, limit, offset) => {
  return await api
    .getReq(
      `/teacher/getTeacherUser?filter=${search}&limit=${limit}&pageNo=${offset}`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateStudentList = async (data) => {
  return await api
    .putReq(`/auth/updateStudentList`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const calendarEvents = async (data) => {
  return await api
    .putReq(`/calendar/CalendarEvents`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const removeStudent = async (data) => {
  return await api
    .putReq(`/auth/removeStudent`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const milestoneId = async (id, data) => {
  return await api
    .putReq(`calendar/AddToCalendar/${id}`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const setIsEditableForStudent = async (id, data) => {
  return await api
    .putReq(`calendar/setIsEditableForStudent/${id}`, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getCalendarEventsAll = async (data) => {
  return await api
    .getReq(`/calendar/CalendarEvents`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getCalendarEvents = async (id) => {
  return await api
    .getReq(`/CalendarEvents/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getAllSubjects = async () => {
  return await api.getReq(`/subject/getAll`).then((response) => {
    return response;
  });
};

export const addMilestone = async (data) => {
  return await api.PostReq(`/calendar/addMilestone`, data).then((response) => {
    return response;
  });
};

export const assignTeacher = async (data) => {
  return await api.PostReq(`/teacher/assignTeacher`, data).then((response) => {
    return response;
  });
};

export const assignCounsellor = async (data) => {
  return await api
    .PostReq(`/auth/assignByAdminCounselor`, data)
    .then((response) => {
      return response;
    });
};

export const calendarSingleEvents = async (id) => {
  return await api
    .getReq(`/calendar/calendarSingleEvents/${id}`)
    .then((response) => {
      return response;
    });
};

export const calendarSingleEventsAdmin = async (id) => {
  return await api
    .getReq(`/calendar/calendarSingleEventsForAdmin/${id}`)
    .then((response) => {
      return response;
    });
};

export const updateMilestone = async (body) => {
  return await api.putReq(`/college/updateMilestone`, body).then((response) => {
    return response;
  });
};

export const updateMilestoneAdmin = async (id, body) => {
  return await api
    .putReq(`/college/updateMilestoneForAdmin/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const getDashboardData = async () => {
  return await api.getReq(`/auth/getDashBoardRecord`).then((response) => {
    return response;
  });
};

export const deleteMileStone = async (id, body) => {
  return await api
    .putReq(`/college/deleteMilestone/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const deleteMileStoneAdmin = async (id, body) => {
  return await api
    .putReq(`/college/deleteMilstoneForAdmin/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const removeFromCalendar = async (id, body) => {
  return await api
    .putReq(`/calendar/removeFromCalendar/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const updateCalendar = async (body) => {
  return await api.putReq(`/calendar/updateCalendar`, body).then((response) => {
    return response;
  });
};

export const updateStatus = async (body, id) => {
  return await api.putReq(`/auth/updateStatus/${id}`, body).then((response) => {
    return response;
  });
};

export const calEvents = async (id) => {
  return await api.getReq(`/CalendarEvents/${id}`).then((response) => {
    return response;
  });
};

export const addStudentMilestone = async (id, body) => {
  return await api
    .PostReq(`/calendar/addMilestoneStudent/${id}`, body)
    .then((response) => {
      return response;
    });
};

// export const addAdminMilestone =async(body)=>{
//   return await api.PostReq(`/calendar/addMilestoneAdmin`, body).then(response=>{
//     return response;
//   })
// }

export const addAdminMilestone = async (id, data) => {
  return await api
    .PostReq(`/calendar/addMilestoneAdmin/${id}`, data)
    .then((response) => {
      return response;
    });
};
export const getNewUserList = async () => {
  return await api.getReq(`/auth/getNewUsers`).then((response) => {
    return response;
  });
};
// export const getauthColleges =async()=>{
//   return await api.getReq(`/auth/getAllColleges`).then(response=>{
//     return response;
//   })
// }

// export const getauthColleges =async()=>{
//     return await api.getReq(`/college/getAll`).then(response=>{
//       return response;
//     })
//   }

export const getAllColleges = async () => {
  return await api.getReq(`/auth/getAllColleges`).then((response) => {
    return response;
  });
};

export const getMyColleges = async () => {
  return await api.getReq(`/college/getMyColleges/:type`).then((response) => {
    return response;
  });
};

export const getdeleteCollege = async () => {
  return await api.getReq(`/college/delete/:type/:id`).then((response) => {
    return response;
  });
};

/* export const getauthColleges =async()=>{
  return await api.getReq(`/auth/getAllColleges`).then(response=>{
    return response;
  })
} */

export const updateForCalender = async (id) => {
  return await api.putReq(`/calendar/updateMilestone${id}`).then((response) => {
    return response;
  });
};

export const updateMiles = async (body) => {
  return await api
    .putReq(`/calendar/updateMilestoneStatus`, body)
    .then((response) => {
      return response;
    });
};

export const getcalendarEvents = async (body) => {
  return await api
    .getReq(`/calendar/calendarSingleEvents/`, body)
    .then((response) => {
      return response;
    });
};

export const getMilestoneDeadline = async (body) => {
  return await api
    .getReq(`/college/getMilestoneDeadline/` + body)
    .then((response) => {
      return response;
    });
};

export const getMilestoneDeadlineforStudent = async (body) => {
  return await api
    .getReq(`/college/getMilestoneDeadlineForStudent/` + body)
    .then((response) => {
      return response;
    });
};

export const sendInvite = async (body) => {
  return await api.PostReq(`/auth/sendInvite/`, body).then((response) => {
    return response;
  });
};

export const getUserEmail = async (body) => {
  return await api.getReq(`auth/getUserEmail/`, body).then((response) => {
    return response;
  });
};

export const getcollegeTracker = async () => {
  return await api.getReq(`calendar/collegeTracker`).then((response) => {
    return response;
  });
};

export const calendarEventsForCollege = async (id, body) => {
  return await api
    .putReq(`/calendar/CalendarEventsForCollege/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const updateEventStatus = async (id, body) => {
  return await api
    .putReq(`/calendar/updateMilestoneStatus/${id}`, body)
    .then((response) => {
      return response;
    });
};

export const getTeacherList = async () => {
  return await api.getReq(`/teacher/getTeacherList`).then((response) => {
    return response;
  });
};

export const getcounsellor = async () => {
  return await api.getReq(`/auth/getcounsellor`).then((response) => {
    return response;
  });
};

export const getCounselorListAssignToStudent = async () => {
  return await api
    .getReq(`/auth/getCounselorListAssignToStudent`)
    .then((response) => {
      return response;
    });
};
