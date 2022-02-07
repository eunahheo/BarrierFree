import axios from 'axios';
import {
  COMMENT_SAVE,
  COMMENT_DELETE,
} from './types';

export function commentSave(dataTosubmit) {
  console.log(dataTosubmit)
  const request = axios(
      {
        method: "POST",
        url: 'http://localhost:3000/post/comment/saveComment',
        data: dataTosubmit
      }).then(res => res.data)
  
  return {
    type: COMMENT_SAVE,
    data: request
  }
}

export function commentDelete(dataTosubmit) {
  console.log(dataTosubmit)
  const request = axios(
      {
        method: "PUT",
        url: 'http://localhost:3000/post/comment/delete',
        params: dataTosubmit
      }).then(res => res.data)
  
  return {
    type: COMMENT_DELETE,
    data: request
  }
}
