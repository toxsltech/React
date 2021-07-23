/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
const hostname = window.location.hostname;

const api = {
  localhost: "http://192.168.15.169:3020",
  platform: "http://unekey-backend.toxsl.in",
};
let apiBase = "";
if (hostname === "localhost" || hostname === "192.168.2.161") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
