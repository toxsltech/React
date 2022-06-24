import {
    GET_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_USER:
            return {
                ...state,
                posts: [payload, ...state.posts],
            };
        case GET_USER:
            return {
                ...state,
                post: state.posts.find((postItem) => postItem.id == payload),
            };
        case UPDATE_USER:
            return {
                ...state,
                posts: state.posts.map((postItem) =>
                    postItem.id == payload.id ? payload : postItem
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                posts: state.posts.filter((postItem) => postItem.id != payload),
            };
        default:
            return state;
    }
};
