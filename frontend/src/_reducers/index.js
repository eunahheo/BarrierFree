import { combineReducers } from 'redux';
import user from './user_reducer';
import loading from '../modules/loading';
import write from './write_reducer';

const rootReducer = combineReducers({
  user,
  loading,
  write,
});

export default rootReducer;
