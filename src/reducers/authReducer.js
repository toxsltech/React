import {
    Login
} from "../actions/types";

const initialState = {
    CurrentUser: [],
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case Login:
            return {
                ...state,
                CurrentUser: payload,
            };
        default:
            return state;
    }
};
