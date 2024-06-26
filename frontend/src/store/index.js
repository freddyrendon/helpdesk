import { combineReducers, applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';
import session from './session'
import tickets from './tickets'
import users from './users'

const rootReducer = combineReducers({
    session, tickets, users
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }
  
  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;