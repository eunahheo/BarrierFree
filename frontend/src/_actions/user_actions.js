import axios from 'axios';
import {
  LOGIN_USER,
  USER_INFO
} from './types';

export function loginUser(dataTosubmit) {
  console.log(dataTosubmit)
  const request = axios(
      {
        method: "POST",
        url: 'user/login',
        data: dataTosubmit
      }).then(res => res.data)
  
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function userInfo() {
  const token = localStorage.getItem("accessToken")
  const request = axios(
    {
      method: "GET",
      url: "/user/info",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  ).then(res => res.data)
  return {
    type: USER_INFO,
    payload: request
  }
}

