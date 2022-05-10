import axios from 'axios';
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
} from '../constants/postConstants';

export const listPosts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_LIST_REQUEST });

      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      const posts = data.filter(
        (x) =>
          x.title.toLowerCase().includes(keyword?.toLowerCase()) ||
          x.body.toLowerCase().includes(keyword?.toLowerCase())
      );

      dispatch({ type: POST_LIST_SUCCESS, payload: posts });
    } catch (error) {
      dispatch({
        type: POST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const { data: post } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    const { data: comments } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    const { data: image } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: { post, comments, image },
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      post,
      config
    );

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post,
      config
    );

    dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
