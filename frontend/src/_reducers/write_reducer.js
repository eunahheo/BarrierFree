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
  userSeq: '',
  postPhoto: '',
  postAlt: '',
  postSeq: null,
  postLat: '',
  postLng: '',
  impairment: null,
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
      // console.log('payload', action.payload);
      return {
        ...state,
        postTitle: action.payload.post.postTitle,
        postContent: action.payload.post.postContent,
        postLocation: action.payload.post.postLocation,
        postAddress: action.payload.post.postAddress,
        impairment: action.payload.impairment,
        // deaf: action.payload.deaf,
        // infant: action.payload.infant,
        // physical: action.payload.physical,
        // senior: action.payload.senior,
        // visibility: action.payload.visibility,
        postPoint: action.payload.post.postPoint,
        postPhoto: action.payload.post.postPhoto,
        postAlt: action.payload.post.postAlt,
        postSeq: action.payload.post.postSeq,
        postLat: action.payload.post.postLat,
        postLng: action.payload.post.postLng,
      };
    default:
      return state;
  }
}

export default write;
