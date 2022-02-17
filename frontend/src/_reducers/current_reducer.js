import {
  CURRENT_PARAMS,
  CURRENT_USER_INFO,
  RESET_PARAMS,
} from '../_actions/types';

const initialState = {
  nowparams: '',
  currentUserData: {
    userPhoto: '',
    follower: 0,
    writePost: 0,
    following: 0,
    totalScarp: 0,
    userNickname: '',
  },
};

const current = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PARAMS:
      return { ...state, nowparams: action.payload };
    case RESET_PARAMS:
      return initialState;
    case CURRENT_USER_INFO:
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,

          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default current;
