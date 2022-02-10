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
  writeUserSeq,
}) => {
  axios.post('/post/savePost', {
    contentId: 12,
    deaf: 0,
    infant: 0,
    physical: 0,
    postAddress: 'sdf12',
    postLat: '123',
    postLng: '13123',
    postLocation: postLocation,
    userSeq: writeUserSeq,
    visibility: 0,
    postAlt: '123',
    postPhoto: 'string',
    postPoint: 0,
    senior: 0,
    postTitle: postTitle,
    postContent: postContent,
  });
};

export const writePost = ({
  postTitle,
  postContent,
  postLocation,
  writeUserSeq,
}) => {
  writePostAPI({ postTitle, postContent, postLocation, writeUserSeq });
  return {
    type: WRITE_POST,
    payload: { postTitle, postContent, postLocation, writeUserSeq },
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
