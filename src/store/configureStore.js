import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      ui: uiReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
};
