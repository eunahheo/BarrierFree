import axios from 'axios';
import { LOGIN_USER } from './types';

export function loginUser(dataTosubmit) {
  console.log(dataTosubmit)
  const request = axios(
      {
        method: "POST",
        url: 'user/login',
        data: dataTosubmit
      }).then(res =>  res.data )
  
  return {
    type: 'LOGIN_USER',
    payload: request
  }
}