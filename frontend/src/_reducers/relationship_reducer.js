import {
  CHECK_FW,
  FOLLOW,
  RESET_RELATIONSHIP,
  UNFOLLOW,
  // USER_FOLLOWERS_COUNT,
  // USER_FOLLOWINGS_COUNT,
} from '../_actions/relationship_actions';

const initialState = {
  followsuccess: '',
  check_relationship: '',
  total_followings: '',
  total_followers: '',
};

const relationship = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return { ...state, followsuccess: action.payload };
    case UNFOLLOW:
      return { ...state, followsuccess: action.payload };
    case CHECK_FW:
      return { ...state, relationship: action.payload };
    // case USER_FOLLOWINGS_COUNT:
    //   return { ...state, total_followings: action.payload };
    // case USER_FOLLOWERS_COUNT:
    //   return { ...state, total_followers: action.payload };
    case RESET_RELATIONSHIP:
      return initialState;
    default:
      return state;
  }
};

export default relationship;
