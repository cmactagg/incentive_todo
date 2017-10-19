import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from "./actions/actionCreators.js";
import * as checkListActionCreators from "./actions/checkListActionCreators.js";
import Main from "./Main";

function mapStateToProps(state) {
  return {
    posts: state.posts,
    checkLists: state.checkLists,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkListActions: bindActionCreators(checkListActionCreators, dispatch)
    //todoActions: bindActionCreators(todoActions, dispatch)
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
