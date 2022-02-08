import { combineReducers } from 'redux';
import user from './user_reducer';
import loading from './loading';
import write, { writeSaga } from './write_reducer';
import { all } from 'redux-saga/effects';
const rootReducer = combineReducers({
  user,
  loading,
  write,
});

export function* rootSaga() {
  yield all[writeSaga()];
}

export default rootReducer;
