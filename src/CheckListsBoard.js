/* global gapi */
import React, { Component } from "react";
import Sortable from "sortablejs";
import CheckList from "./CheckList.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as checkListActionCreators from "./actions/checkListActionCreators.js";
import * as journalActionCreators from "./actions/journalActionCreators.js";

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
      let returnVal = "";
      if(checkList.length > 0){
        returnVal =        
          <div key={clKey++}>
            <CheckList
              checkListActions={this.props.checkListActions}
              checkList={checkList}
            />
          </div>
       
       return returnVal;
      }
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
    checkLists: state.checkLists,
    journals: state.journals
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkListActions: bindActionCreators(checkListActionCreators, dispatch),
    journalActions: bindActionCreators(journalActionCreators, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CheckListsBoard);
