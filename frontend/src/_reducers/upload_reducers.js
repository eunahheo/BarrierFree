import { UPLOAD_IMAGE } from '../_actions/types';

const initialState = {
  image: null,
};

const upload = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
};

export default upload;
