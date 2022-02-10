import { CURRENT_PARAMS } from '../_actions/types';

const initialState = {
  params: '',
};

const current = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PARAMS:
      return { ...state, params: action.payload };
    default:
      return state;
  }
};

export default current;
