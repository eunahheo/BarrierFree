import { combineReducers } from 'redux';
import user from './user_reducer';
import loading from './loading';
import write, { writeSaga } from './write_reducer';
import upload from './upload_reducers';
import { all } from 'redux-saga/effects';
import current from './current_reducer';

const rootReducer = combineReducers({
  user,
  loading,
  write,
  upload,
  current,
});

export function* rootSaga() {
  yield all[writeSaga()];
}

export default rootReducer;
