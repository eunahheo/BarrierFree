import {
  LOGIN_USER,
  USER_INFO
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload } 
    
    case USER_INFO:
      return { ...state, userData: action.payload }
      
    default:
      return state;
  }
}