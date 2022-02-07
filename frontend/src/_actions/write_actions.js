import { createAction } from 'redux-actions';
import { createRequestActionTypes } from '../lib/createRequestSaga';
import * as api from '../lib/api/api';

export const INITIALIZE = 'write/INITIALIZE';
export const CHANGE_FIELD = 'write/CHANGE_FILED';
export const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = (title, body, place) => async (dispatch) => {
  const data = {
    postTitle: title,
    postContent: body,
    postLocation: place,
  };
  dispatch({ type: WRITE_POST });
  try {
    const response = await api.savePost(data);
    dispatch({
      type: WRITE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: WRITE_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
// export const writePost = createAction(WRITE_POST, ({ title, body, place }) => {
//   return {
//     title,
//     body,
//     place,
//   };
// });
