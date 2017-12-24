import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import journals from './journals';
import checkLists from './checkLists.js';
//import comments from './comments';

//const rootReducer = combineReducers({posts, comments, routing: routerReducer});
const rootReducer = combineReducers({journals, checkLists, routing: routerReducer});

export default rootReducer;