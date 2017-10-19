import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
import App from './App';
import CheckListsBoard from "./CheckListsBoard.js";
import registerServiceWorker from './registerServiceWorker';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';

ReactDOM.render(<Provider store={store}><App store={store}/></Provider>, document.getElementById('root'));
registerServiceWorker();

// import Single from './components/Single.js';
// import PhotoGrid from './components/PhotoGrid.js';


// {/* <Route path="/" component={App}>
//       <IndexRoute component={PhotoGrid}></IndexRoute>
//       <Route path="/view/:postId" component={Single}></Route>
//     </Route> */}


// const router = (
//   <Provider store={store}>
//   <Router history={history}>
//     <Route path="/" component={App}>
//       <IndexRoute component={CheckListsBoard}></IndexRoute>
//     </Route>
//   </Router>
//   </Provider>
// )

// render(
//     //router,
//     <Provider store={store}><App/></Provider>,
//     document.getElementById('root')  
// );

//needed for hot reloading
if (module.hot) {
  module.hot.accept();
}
