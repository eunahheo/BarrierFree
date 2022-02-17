import axios from 'axios';
import { FIND_LOCATION } from './types';

export function findLocation(dataTosubmit) {
  // console.log(dataTosubmit)
  const request = axios({
    method: 'GET',
    url: '/recommend/search',
    params: dataTosubmit,
  }).then((res) => res.data);

  return {
    type: FIND_LOCATION,
    data: request,
  };
}
