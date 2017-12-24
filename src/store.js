import { createStore, compose, applyMiddleware } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
//import {browserHistory} from 'react-router';

import createSagaMiddleware from "redux-saga";

//import the root reducer
import rootReducer from "./reducers/index";

import rootSaga from "./sagas/sagas";

import watch from "redux-watch";

import * as checkListActionCreators from "./actions/checkListActionCreators.js";

//import CheckListDataService from "./CheckListDataService.js";

const sagaMiddleware = createSagaMiddleware();

const defaultState = {
  checkLists: [[]],
  journals: [[]]
};

let syncTimeout = undefined;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

//redux watch
const watchCheckLists = watch(store.getState, "checkLists");
store.subscribe(
  watchCheckLists((newVal, oldVal, objectPath) => {
    if (syncTimeout !== undefined) {
      clearTimeout(syncTimeout);
    }
    if (oldVal.length > 0) {//avoid saving when the state is first initialized
      syncTimeout = setTimeout(() => {
        store.dispatch(checkListActionCreators.saveCheckLists());
      }, 5000);
    }
  })
);

sagaMiddleware.run(rootSaga);

//export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const nextRootReducer = require("./reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
