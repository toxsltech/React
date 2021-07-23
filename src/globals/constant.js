/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import StudentCollegeApplied from "../components/student/student-college-applied/student-college-applied";
import StudentExtraCurricular from "../components/student/student-Extracurricular/student-Extracurricular";
import StudentKnowMe from "../components/student/student-profile/student-know-me/student-know-me";
import StudentGrades from "../components/student/student-profile/student-grades/student-grades";
import StudentPortfolio from "../components/student/student-portfolio/student-portfolio";
import StudentTestScore from "../components/student/student-profile/student-test-score/student-test-score";
import StudentCalendar from "../components/student/student-calendar/student-calendar";
import Groups from "../components/counsellor/groups/groups";
import Students from "../components/counsellor/students/students";
import AllStudents from "../components/counsellor/students/all-student";
import Chat from "../components/chat/chat";
import Notification from "../components/notification/notification";
import GroupDetails from "../components/groupsmain/groupDetails";
import Profileview from "../components/profileview/profileview";
import StudentCollegeDetails from "../components/student/student-college-applied/student-college-details";
import GroupMembers from "../components/counsellor/groups/groupMembers";
import AllGroups from "../components/counsellor/groups/allGroups";
import StudentCounselor from "../components/student/student-counselor/student-counselor";
import StudentCounselorDetails from "../components/student/student-counselor/student-counsellor-details";
import StudentCounselorLeftBar from "../components/student/student-profile/student-counselor-leftbar.js/student-counselor-leftbar.js";
import StudentPortfolios from "../components/student/counselor-student/counselor-student-portfolio";
import StudentKnow from "../components/student/counselor-student/counselor-student-profile";
import Calender from "../components/calender/calender";
import Teacher from "../components/student/teacher/teacher";
import TeacherDetails from "../components/student/teacher/teacher-details";
export const ERRORMSG = "Something went wrong.";
export const LOGOUT = "Are you sure you want to log out?";
export const DELETE = "Are you sure you want to delete record?";
export const DATANOTFOUND = "No record found.";
export const CANNOTDELETE = "Cannot do this action.";
export const MARKFAV = "Favorite Marked.";
export const REMOVEFAV = "Favorite Removed.";
export const DELMARKED = "Delete Marked.";
export const DELTEMOVED = "Delete Removed.";
export const DELETECONFERMATION = "Confirm for delete.";
export const UPDATED = "Updated Successfully";
export const DELETEMESSAGE = "Are you sure want to Delete this ?";
export const APIBLOCK =
  "SUBSCRIPTION END PLEASE CONTACT WITH Ozvid Technologies Pvt. Ltd.";
export const OPTIONS = [
  {
    name: "Please select one",
    value: "",
  },
  {
    name: "1",
    value: "1",
  },
  {
    name: "2",
    value: "2",
  },
  {
    name: "3",
    value: "3",
  },
  {
    name: "4",
    value: "4",
  },
  {
    name: "5",
    value: "5",
  },
  {
    name: "6",
    value: "6",
  },
  {
    name: "7",
    value: "7",
  },
  {
    name: "8",
    value: "8",
  },
  {
    name: "9",
    value: "9",
  },
  {
    name: "10",
    value: "10",
  },
  {
    name: "11",
    value: "11",
  },
  {
    name: "12",
    value: "12",
  },
  {
    name: "13",
    value: "13",
  },
  {
    name: "14",
    value: "14",
  },
  {
    name: "15",
    value: "15",
  },
  {
    name: "16",
    value: "16",
  },
  {
    name: "17",
    value: "17",
  },
  {
    name: "18",
    value: "18",
  },
  {
    name: "19",
    value: "19",
  },
  {
    name: "20",
    value: "20",
  },
  {
    name: "21",
    value: "21",
  },
  {
    name: "22",
    value: "22",
  },
  {
    name: "23",
    value: "23",
  },
  {
    name: "24",
    value: "24",
  },
  {
    name: "25",
    value: "25",
  },
  {
    name: "26",
    value: "26",
  },
  {
    name: "27",
    value: "27",
  },
  {
    name: "28",
    value: "28",
  },
  {
    name: "29",
    value: "29",
  },
  {
    name: "30",
    value: "30",
  },
  {
    name: "31",
    value: "31",
  },
  {
    name: "32",
    value: "32",
  },
  {
    name: "33",
    value: "33",
  },
  {
    name: "34",
    value: "34",
  },
  {
    name: "35",
    value: "35",
  },
  {
    name: "36",
    value: "36",
  },
];

export const SIDEBAR = [
  {
    id: 1,
    name: "Profile",
    route: "/home",
    role: [1],
    img: "/assets/img/profile.png",
    subMenu: [
      {
        name: "Get to know me",
        route: "/home",
        role: [1],
      },
      {
        name: "Test Scores",
        route: "/home/test-score",
        role: [1],
      },
    ],
  },
  {
    id: 2,
    name: "Colleges Applied",
    route: "/home/college-applied",
    role: [1],
    img: "/assets/img/collage.png",
  },
  {
    id: 3,
    name: "Portfolio",
    route: "/home/portfolio",
    role: [1],
    img: "/assets/img/portfolio.png",
  },
  {
    id: 4,
    name: "Extracurricular",
    route: "/home/extra-curricular",
    role: [1],
    img: "/assets/img/extra.png",
  },
  {
    id: 5,
    name: "Counselor",
    route: "/home/StudentCounselor",
    role: [1],
    img: "/assets/img/consurn.png",
  },
  {
    id: 6,
    name: "Teacher",
    route: "/home/teacher",
    role: [1],
    img: "/assets/img/teacher.png",
  },
  {
    id: 7,
    name: " Profile ",
    route: "/home",
    role: [3,5],
    img: "/assets/img/profile.png",
  },
  /* {
    id: 8,
    name: "Students",
    route: "/home/students",
    img: "/assets/img/teacher.png",

    role: [3],
  }, */
  {
    id: 8,
    name: "Students",
    role: [3,5],
    img: "/assets/img/teacher.png",
    subMenu: [
      {
        name: "My Students",
        route: "/home/all-students",
        role: [1,5],
      },
      {
        name: "All Students",
        route: "/home/students",
        role: [1,5],
      },
    ],
  },
  {
    id: 9,
    name: "Groups",
    route: "/home/groups",
    img: "/assets/img/groups.png",

    role: [1],
  },
  {
    id: 11,
    name: "Groups",
    route: "/home/group",
    role: [3,5],
    img: "/assets/img/groups.png",
    subMenu: [
      {
        name: "My Groups",
        route: "/home/groups",
        role: [1,5],
      },
      {
        name: "All Groups",
        route: "/home/all-groups",
        role: [1,5],
      },
    ],
  },
  {
    id: 10,
    name: "Calendar",
    route: "/home/calender",
    img: "/assets/img/portfolio.png",

    role: [1],
  },
  // {
  //   id: 11,
  //   name: "Groups",
  //   route: "/home/calender",
  //   img: "/assets/img/portfolio.png",

  //   role: [1],
  // },
];

export const Student_SIDEBAR = [
  {
    id: 1,
    name: "Profile",
    route: "/home/",
    img: "/assets/img/profile.png",
    subMenu: [
      {
        name: "Get to know me",
        route: "/home/",
      },
      {
        name: "Test Scores",
        route: "/home/test-score/",
      },
    ],
  },
  {
    id: 2,
    name: "Colleges Applied",
    route: "/home/college-applied/",
    img: "/assets/img/collage.png",
  },
  {
    id: 3,
    name: "Portfolio",
    route: "/home/portfolio/",
    img: "/assets/img/portfolio.png",
  },
  {
    id: 4,
    name: "Extracurricular",
    route: "/home/extra-curricular/",
    img: "/assets/img/extra.png",
  },
];

export const ROUTES = [
 
  // {
  //   component: Calender,
  //   path: "/home/calender",
  //   role: [1],
  // },
  {
    component: TeacherDetails,
    path: "/home/teacher-details/:id",
    role: [1],
  },
  {
    component: Teacher,
    path: "/home/teacher",
    role: [1],
  },
  {
    component: StudentCounselorDetails,
    path: "/home/StudentCounselor/StudentCounselorDetails/:id",
    role: [1, 3],
  },
  {
    component: Teacher,
    path: "/home/teacher",
    role: [3],
  },
  {
    component: StudentCounselor,
    path: "/home/StudentCounselor",
    role: [1, 3],
  },
  {
    component: AllGroups,
    path: "/home/all-groups",
    role: [1, 3,5],
  },
  {
    component: GroupMembers,
    path: "/home/groups/members/:id",
    role: [1, 3,5],
  },
  {
    component: StudentCollegeDetails,
    path: "/home/college-details/:id",
    role: [1,3,5],
  },
  {
    component: Profileview,
    path: "/home/profileview",
    role: [1,3,5],
  },
  {
    component: GroupDetails,
    path: "/home/group-details/:id",
    role: [1,3,5],
  },
  {
    component: Chat,
    path: "/home/chat",
    role: [1, 3,5],
  },
  {
    component: Notification,
    path: "/home/notification",
    role: [1, 3,5],
  },
  {
    component: StudentCalendar,
    path: "/home/calender",
    role: [1],
  },
  {
    component: StudentCollegeApplied,
    path: "/home/college-applied",
    role: [1],
  },
  {
    component: StudentPortfolio,
    path: "/home/portfolio",
    role: [1],
  },
  {
    component: StudentGrades,
    path: "/home/grades",
    role: [1],
  },
  {
    component: StudentTestScore,
    path: "/home/test-score",
    role: [1],
  },
  {
    component: StudentExtraCurricular,
    path: "/home/extra-curricular",
    role: [1],
  },
  {
    component: StudentCollegeApplied,
    path: "/home/college-applied/:id",
    role: [3,5],
  },
  {
    component: StudentTestScore,
    path: "/home/test-score/:id",
    role: [3,5],
  },
  {
    component: StudentPortfolio,
    path: "/home/portfolio/:id",
    role: [3,5],
  },
  {
    component: StudentGrades,
    path: "/home/grades/:id",
    role: [3,5],
  },
  {
    component: StudentExtraCurricular,
    path: "/home/extra-curricular/:id",
    role: [3,5],
  },
  {
    component: Students,
    path: "/home/students",
    role: [3,5],
  },
  {
    component: AllStudents,
    path: "/home/all-students",
    role: [3,5],
  },
  {
    component: Groups,
    path: "/home/groups",
    role: [3, 1,5],
  },
  {
    component: StudentKnowMe,
    path: "/home/:id",
    role: [1, 3,5],
  },
  {
    component: StudentKnowMe,
    path: "/home",
    role: [1, 3,5],
  },
];
