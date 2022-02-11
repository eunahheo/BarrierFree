import { CURRENT_PARAMS, RESET_PARAMS } from './types';

export const getCurrentParams = (nowparams) => ({
  type: CURRENT_PARAMS,
  payload: nowparams,
});

export const resetParams = () => ({
  type: RESET_PARAMS,
});
