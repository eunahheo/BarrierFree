import {
  INITIALIZE,
  CHANGE_FIELD,
  CLICK_FIELD,
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
} from '../_actions/write_actions';
import createRequestSaga from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { writePostAPI } from '../_actions/write_actions';
import axios from '../../node_modules/axios/index';

const writePostSaga = createRequestSaga(
  WRITE_POST,
  ({ title, content, place, deaf, infant, physical, senior, visibility }) => {
    axios.post('/post/savePost', {
      contentId: 12,
      deaf,
      infant,
      physical,
      postAddress: 'sdf12',
      postLat: '123',
      postLng: '13123',
      userSeq: 8,
      visibility,
      postAlt: '123',
      postPhoto: 'string',
      postPoint: 0,
      senior,
      postTitle: title,
      postContent: content,
      postLocation: place,
    });
  },
);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
  postTitle: '',
  postContent: '',
  postLocation: '',
  post: null,
  postError: null,
  deaf: 0,
  infant: 0,
  physical: 0,
  senior: 0,
  visibility: 0,
};

function write(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case INITIALIZE:
      return initialState;
    case CHANGE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value };
    case CLICK_FIELD:
      // if (state.wrtie.action.payload.key === 1 && action.payload.value === 1) {
      //   return { ...state, [action.payload.key]: 0 };
      // } else if (
      //   state.wrtie.action.payload.key === 0 &&
      //   action.payload.value === 1
      // ) {
      //   return { ...state, [action.payload.key]: 1 };
      // } else {
      //   return { ...state };
      // }
      return { ...state, [action.payload.key]: action.payload.value };
    case WRITE_POST:
      return { ...state, post: null, postError: null };
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
      };
    case WRITE_POST_FAILURE:
      return { ...state, postError: action.payload.postError };

    default:
      return state;
  }
}

export default write;
