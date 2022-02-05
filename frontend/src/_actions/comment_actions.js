import axios from 'axios';
import {
  COMMENT_SAVE,
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


