/* global gapi */
import React, { Component } from "react";
import Sortable from "sortablejs";
import CheckList from "./CheckList.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as checkListActionCreators from "./actions/checkListActionCreators.js";

class CheckListsBoard extends Component {
  constructor(props) {
    super(props);

    this.handleAddNewList = this.handleAddNewList.bind(this);
  }

  handleAddNewList(event) {
    this.props.checkListActions.checkListsAddCheckList("new list");
  }

  render() {
    var clKey = 0;
    var checkLists = this.props.checkLists.map(checkList => {
      return (
        <div key={clKey++}>
          <CheckList
            checkListActions={this.props.checkListActions}
            checkList={checkList}
          />
        </div>
      );
    });

    return (
      <div>
        <div>{checkLists}</div>
        <div>
          <button onClick={this.handleAddNewList}>Add</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkLists: state.checkLists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkListActions: bindActionCreators(checkListActionCreators, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CheckListsBoard);
