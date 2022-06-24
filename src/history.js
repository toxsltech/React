/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import { createBrowserHistory } from "history";

const hostname = window.location.hostname;

const base = {
    localhost: "/",
    platform: "/fambase/",
};
let basename = "";
if (hostname === "localhost" || hostname === "192.168.2.228") {
    basename = base.localhost;
} else {
    basename = base.platform;
}
export default createBrowserHistory({ basename: basename });
