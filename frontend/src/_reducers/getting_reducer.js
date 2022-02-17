import { GETTING_ITEMS } from '../_actions/types';

const initialize = {
  items: [],
};

const getting = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_ITEMS:
      return { ...state, items: [items].concat(action.payload.items) };
  }
};

export default getting;
