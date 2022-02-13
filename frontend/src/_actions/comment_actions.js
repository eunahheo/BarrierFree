import axios from 'axios';
import { COMMENT_SAVE, COMMENT_DELETE, COMMENT_UPDATE } from './types';

export function commentSave(dataTosubmit) {
  console.log(dataTosubmit);
  const request = axios({
    method: 'POST',
    url: '/post/comment/saveComment',
    data: dataTosubmit,
  }).then((res) => res.data);

  return {
    type: COMMENT_SAVE,
    data: request,
  };
}

export function commentDelete(dataTosubmit) {
  console.log(dataTosubmit);
  const request = axios({
    method: 'PUT',
    url: '/post/comment/delete',
    params: dataTosubmit,
  }).then((res) => res.data);

  return {
    type: COMMENT_DELETE,
    data: request,
  };
}

export function commentUpdate(dataTosubmit) {
  const request = axios({
    method: 'PUT',
    url: '/post/comment/update',
    params: dataTosubmit,
  }).then((res) => res.data);

  return {
    type: COMMENT_UPDATE,
    data: request,
  };
}
