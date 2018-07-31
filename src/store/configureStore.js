import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, logger)
  );

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
