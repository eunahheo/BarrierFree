import {
  COMMENT_SAVE,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    
    case COMMENT_SAVE:
      return { ...state, commentSave: action.data } 

    default:
      return state;
  }
}