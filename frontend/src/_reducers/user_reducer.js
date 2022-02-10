import { handleActions } from 'redux-actions';
// import { LOGIN_USER, USER_INFO, LOGOUT } from '../_actions/types';
import { LOGIN_USER, USER_INFO, LOGOUT } from '../_actions/user_actions';

const initialState = {
  loginSuccess: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: payload };

    case USER_INFO:
      return { ...state, userData: payload };

    case LOGOUT:
      localStorage.removeItem('persist:root');
      localStorage.removeItem('accessToken');
      return { ...state, userData: null, loginSuccess: null };
    default:
      return state;
  }
}
