import { handleActions } from 'redux-actions';
import {
  INITIALIZE,
  CHANGE_FIELD,
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
} from '../_actions/write_actions';

const initialState = {
  title: '',
  body: '',
  place: '',
  loading: {
    WRITE_POST: false,
  },
};

function write(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case INITIALIZE:
      return initialState;
    case CHANGE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value };
    case WRITE_POST:
      return { ...state, loading: { ...state.loading, WRITE_POST: true } };
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, WRITE_POST: false },
        post: action.payload,
      };
    case WRITE_POST_FAILURE:
      return { ...state, loading: { ...state.loading, WRITE_POST: false } };
    default:
      return state;
  }
}

export default write;
