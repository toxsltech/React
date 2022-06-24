import { GET_USER, CREATE_USER, UPDATE_USER, DELETE_USER } from "./types";

// get a post
export const getPost = (id) => ({
    type: GET_USER,
    payload: id,
});

// create a post
export const createPost = (post) => ({
    type: CREATE_USER,
    payload: post,
});

// update a post
export const updatePost = (post) => ({
    type: UPDATE_USER,
    payload: post,
});

// delete a post
export const deletePost = (id) => ({
    type: DELETE_USER,
    payload: id,
});
