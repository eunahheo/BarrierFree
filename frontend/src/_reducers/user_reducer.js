import { handleActions } from 'redux-actions';
// import { LOGIN_USER, USER_INFO, LOGOUT } from '../_actions/types';
import {
  LOGIN_USER,
  USER_INFO,
  LOGOUT,
  CHANGE_FIELD,
  ALARM,
} from '../_actions/user_actions';

const initialState = {
  loginSuccess: null,
  userData: null,
  alarm: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: payload };

    case USER_INFO:
      return { ...state, userData: payload };
    case CHANGE_FIELD:
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.payload.key]: action.payload.value,
        },
      };
    case LOGOUT:
      localStorage.removeItem('persist:root');
      localStorage.removeItem('accessToken');
      // 로그아웃하면 화면 자동 새로고침
      window.location.replace('/');
      return { ...state, userData: null, loginSuccess: null };

    case ALARM:
      return {
        ...state,
        alarm: payload,
      };
    default:
      return state;
  }
}
