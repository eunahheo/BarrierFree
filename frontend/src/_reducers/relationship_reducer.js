import {
  CHECK_FW,
  FOLLOW,
  RESET_RELATIONSHIP,
  UNFOLLOW,
} from '../_actions/relationship_actions';

const initialState = {
  followsuccess: '',
  check_relationship: 'false',
};

const relationship = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return { ...state, followsuccess: action.payload };
    case UNFOLLOW:
      return { ...state, followsuccess: action.payload };
    case CHECK_FW:
      return { ...state, relationship: action.payload };
    case RESET_RELATIONSHIP:
      return initialState;
    default:
      return state;
  }
};

export default relationship;
