import axios from 'axios';

export const savePost = (data) => {
  axios({
    method: 'post',
    url: '/post/savePost',
    data: data,
  });
};
