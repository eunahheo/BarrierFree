import {
  INITIALIZE,
  CHANGE_FIELD,
  CLICK_FIELD,
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
} from '../_actions/write_actions';

const initialState = {
  postTitle: '',
  postContent: '',
  postLat: '',
  postLng: '',
  postLocation: '',
  postAddress: '',
  post: null,
  postError: null,
  deaf: 0,
  infant: 0,
  physical: 0,
  senior: 0,
  visibility: 0,
  postPoint: 0,
  writeUserSeq: '',
};

function write(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case INITIALIZE:
      return initialState;
    case CHANGE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value };
    case CLICK_FIELD:
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
