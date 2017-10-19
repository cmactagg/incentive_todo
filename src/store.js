import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
//import {browserHistory} from 'react-router';

import createSagaMiddleware from 'redux-saga';

//import the root reducer
import rootReducer from './reducers/index';

//import comments from './data/comments';
//import posts from './data/posts';

import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducer, 
//   applyMiddleware(sagaMiddleware));



//create an object for the default data

const defaultState = {
  //posts,
  //comments,
  
}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

//const store = createStore(rootReducer, defaultState, enhancers);
const store = createStore(rootReducer, defaultState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

//export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot){
  module.hot.accept('./reducers/', ()=>{
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;