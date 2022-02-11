import { createAction, handleActions } from 'redux-actions';
import { createRequestActionTypes } from '../lib/createRequestSaga';
import axios from 'axios';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FILED';
export const CLICK_FIELD = 'write/CLICK_FIELD';

export const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');

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
  writeUserSeq,
  deaf,
  infant,
  physical,
  visibility,
  senior,
}) => {
  axios.post('/post/savePost', {
    contentId: 12,
    deaf,
    infant,
    physical,
    postAddress: 'sdf12',
    postLat: '123',
    postLng: '13123',
    postLocation,
    userSeq: writeUserSeq,
    visibility,
    postAlt: '123',
    postPhoto: 'string',
    postPoint: postPoint,
    senior,
    postTitle: postTitle,
    postContent: postContent,
  });
};

export const writePost = ({
  postTitle,
  postContent,
  postLocation,
  writeUserSeq,
  postPoint,
  deaf,
  infant,
  physical,
  visibility,
  senior,
}) => {
  writePostAPI({
    postTitle,
    postContent,
    postLocation,
    postPoint,
    writeUserSeq,
    deaf,
    infant,
    physical,
    visibility,
    senior,
  });
  return {
    type: WRITE_POST,
    payload: {
      postTitle,
      postContent,
      postLocation,
      postPoint,
      writeUserSeq,
      deaf,
      infant,
      physical,
      visibility,
      senior,
    },
  };
};

// createAction(
//   WRITE_POST,
//   ({ postTitle, postContent, postLocation, writeuserSeq }) =>
//     writePostAPI({ postTitle, postContent, postLocation, writeuserSeq }),
//   {
//     postTitle,
//     postContent,
//     postLocation,
//     writeuserSeq,
//   },
// );
