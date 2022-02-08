import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer, { rootSaga } from './_reducers';
import { BrowserRouter } from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://i6a504.p.ssafy.io:3030';
const persistConfig = {
  key: 'root',
  storage,
};
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware,
  promiseMiddleware,
  ReduxThunk,
  logger,
)(createStore);

const store = createStoreWithMiddleware(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
