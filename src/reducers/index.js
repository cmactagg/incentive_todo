import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import posts from './posts';
import checkLists from './checkLists.js';
//import comments from './comments';

//const rootReducer = combineReducers({posts, comments, routing: routerReducer});
const rootReducer = combineReducers({posts, checkLists, routing: routerReducer});

export default rootReducer;