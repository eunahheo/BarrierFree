import axios from 'axios';
import { createAction } from 'redux-actions';
import { Navigate, useNavigate } from 'react-router-dom';
export const LOGIN_USER = 'user/LOGIN_USER';
export const USER_INFO = 'user/USER_INFO';
export const LOGOUT = 'user/LOGOUT';

export const loginUser = (dataTosubmit) => {
  const request = axios({
    method: 'POST',
    url: '/user/login',
    data: dataTosubmit,
  }).then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export function userInfo() {
  const token = localStorage.getItem('accessToken');
  const request = axios({
    method: 'GET',
    url: '/user/info',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
  return {
    type: USER_INFO,
    payload: request,
  };
}

export const logout = createAction(LOGOUT);
