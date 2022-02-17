import {
  CURRENT_PARAMS,
  RESET_PARAMS,
  CURRENT_USER_INFO,
  INITIALIZE,
} from './types';
import { createAction } from 'redux-actions';

export const getCurrentParams = (nowparams) => ({
  type: CURRENT_PARAMS,
  payload: nowparams,
});

export const resetParams = () => ({
  type: RESET_PARAMS,
});

export const getCurrentUserInfo = createAction(
  CURRENT_USER_INFO,
  ({ key, value }) => ({
    key,
    value,
  }),
);

export const currentinitialize = createAction(INITIALIZE);
