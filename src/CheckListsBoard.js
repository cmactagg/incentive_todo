/* global gapi */
import React, { Component } from "react";
import Sortable from "sortablejs";
import CheckList from "./CheckList.js";
import CheckListDataService from "./CheckListDataService.js";
//import "./ChecksListBoard.css";

class CheckListsBoard extends Component {
  constructor(props) {
    super(props);

    this.checkListDataService = new CheckListDataService();

    this.handleAddNewList = this.handleAddNewList.bind(this);
    this.syncToCloud = this.syncToCloud.bind(this);

    this.syncTimeout = undefined;
  }

  init() {
    return this.checkListDataService
      .init()
      .then(fileId => {
        console.log("got the data file" + fileId);
      }, undefined)
      .then(
        () => {
          this.checkListDataService.readFromFile().then(checkListsValues => {
            //this.setState({ checkListsValues: checkListsValues });
            this.props.checkListActions.checkListsInitAll(checkListsValues);
          }, undefined);
        },

        null
      );
  }

  handleAddNewList(event) {
    this.props.checkListActions.checkListsAddCheckList("new list");
  }

  syncToCloud() {
    if (this.syncTimeout !== undefined) {
      clearTimeout(this.syncTimeout);
    }
    this.syncTimeout = setTimeout(() => {
      //this.checkListDataService.writeToFile(this.state.checkListsValues);
      this.checkListDataService.writeToFile(this.props.checkLists);
    }, 5000);
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

export default CheckListsBoard;
