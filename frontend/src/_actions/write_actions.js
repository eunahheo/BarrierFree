import { createAction, handleActions } from 'redux-actions';
import { createRequestActionTypes } from '../lib/createRequestSaga';
import axios from 'axios';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FILED';
export const CLICK_FIELD = 'write/CLICK_FIELD';

export const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');
export const SET_POST_CONTENT = 'write/SET_POST_CONTENT';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const clickField = createAction(CLICK_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const writePostAPI = ({
  postTitle,
  postContent,
  postLocation,
  postPoint,
  userSeq,
  contentId,
  deaf,
  infant,
  physical,
  visibility,
  senior,
  postAddress,
  postLat,
  postLng,
  postPhoto,
  postAlt,
}) => {
  axios.post('/post/savePost', {
    contentId,
    deaf,
    infant,
    physical,
    postAddress,
    postLat,
    postLng,
    postLocation,
    userSeq: userSeq,
    visibility,
    postAlt,
    postPoint: postPoint,
    senior,
    postTitle: postTitle,
    postContent: postContent,
    postPhoto,
  });
};

export const writePost = ({
  postTitle,
  postContent,
  postLocation,
  userSeq,
  contentId,
  postPoint,
  deaf,
  infant,
  physical,
  visibility,
  senior,
  postAddress,
  postLat,
  postLng,
  postPhoto,
  postAlt,
}) => {
  writePostAPI({
    postTitle,
    postContent,
    postLocation,
    postPoint,
    userSeq,
    contentId,
    deaf,
    infant,
    physical,
    visibility,
    senior,
    postAddress,
    postLat,
    postLng,
    postPhoto,
    postAlt,
  });
  return {
    type: WRITE_POST,
    payload: {
      postTitle,
      postContent,
      postLocation,
      postPoint,
      userSeq,
      contentId,
      deaf,
      infant,
      physical,
      visibility,
      senior,
      postAddress,
      postLat,
      postLng,
      postPhoto,
      postAlt,
    },
  };
};

export const setPostContent = createAction(SET_POST_CONTENT, (post) => post);
