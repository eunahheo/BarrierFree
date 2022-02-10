import { CURRENT_PARAMS, RESET_PARAMS } from '../_actions/types';

const initialState = {
  nowparams: '',
};

const current = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PARAMS:
      return { ...state, nowparams: action.payload };
    case RESET_PARAMS:
      return initialState;
    default:
      return state;
  }
};

export default current;
