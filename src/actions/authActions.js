import { Redirect } from "react-router-dom";
import { Login } from "./types";
import * as adminServices from "../services/adminService";
// Save Login Data
export const LoginData = (data) => async (dispatch) => {
    // adminServices.adminLogin(state).then((resp) => {
    //     if (resp) {
    //         dispatch({
    //             type: Login,
    //             payload: resp.data.data
    //         })
    //         if (resp.data.success) {
    //             props.history.push("/dashboard")
    //         }

    //     }

    // });
    dispatch({
        type: Login,
        payload: data
    })
}
