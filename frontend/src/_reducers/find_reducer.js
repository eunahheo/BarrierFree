import {
  FIND_LOCATION,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    
    case FIND_LOCATION:
      return { ...state, findLocation: action.data } 

    default:
      return state;
  }
}