import { CURRENT_PARAMS } from './types';

export const getCurrentParams = (params) => ({
  type: CURRENT_PARAMS,
  payload: params,
});
