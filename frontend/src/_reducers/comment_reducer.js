import {
  COMMENT_SAVE,
  COMMENT_DELETE
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    
    case COMMENT_SAVE:
      return { ...state, commentSave: action.data } 
    
    case COMMENT_DELETE:
      return { ...state, commnetDelete: action.data } 

    default:
      return state;
  }
}