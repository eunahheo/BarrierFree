import { combineReducers } from 'redux';
import user from './user_reducer';
import loading from './loading';
import write from './write_reducer';
import upload from './upload_reducers';
import current from './current_reducer';
import relationship from './relationship_reducer';

const rootReducer = combineReducers({
  user,
  loading,
  write,
  upload,
  current,
  relationship,
});

export default rootReducer;
