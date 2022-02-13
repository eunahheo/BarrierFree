import {
  INITIALIZE,
  CHANGE_FIELD,
  CLICK_FIELD,
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
  SET_POST_CONTENT,
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
  postPhoto: '',
  postAlt: '',
  contentId: 0,
  originalPostId: null,
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
    case SET_POST_CONTENT:
      // console.log('payload', action.payload.postAddress);
      return {
        ...state,
        postTitle: action.payload.postTitle,
        postContent: action.payload.postContent,
        postLocation: action.payload.postLocation,
        postAddress: action.payload.postAddress,
        deaf: action.payload.deaf,
        infant: action.payload.infant,
        physical: action.payload.physical,
        senior: action.payload.senior,
        visibility: action.payload.visibility,
        postPoint: action.payload.postPoint,
        postPhoto: action.payload.postPhoto,
        postAlt: action.payload.postAlt,
      };
    default:
      return state;
  }
}

export default write;
