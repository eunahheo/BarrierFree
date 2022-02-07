import {
  COMMENT_DELETE,
  COMMENT_SAVE,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    
    case COMMENT_SAVE:
      return { ...state, commentSave: action.data } 

    case COMMENT_DELETE:
      return { ...state, commentDelete: action.data }

    default:
      return state;
  }
}