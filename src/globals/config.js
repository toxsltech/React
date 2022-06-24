/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
const hostname = window.location.hostname;
const api = {
  localhost: "http://192.168.2.240:8080/",
  platform: "",
};

let apiBase = "";
if (hostname === "localhost" || hostname === "192.168.2.240") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
