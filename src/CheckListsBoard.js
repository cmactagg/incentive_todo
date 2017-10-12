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
    this.handleOnCheckListChange = this.handleOnCheckListChange.bind(this);
    this.syncToCloud = this.syncToCloud.bind(this);

    this.syncTimeout = undefined;

    this.state = { checkListsValues: [] };
  }

  init() {
    console.log("started board init");
    return this.checkListDataService
      .init()
      .then(fileId => {
        console.log("got the data file" + fileId);
      }, undefined)
      .then(
        () => {
          this.checkListDataService.readFromFile().then(checkListsValues => {
            this.setState({ checkListsValues: checkListsValues });
          }, undefined);
        },

        null
      );
  }

  handleAddNewList(event) {
    let checkListArray = this.state.checkListsValues;
    checkListArray.push([
      { id: Date.now(), text: "new task", isChecked: false }
    ]);
    this.setState({ checkListArray: checkListArray });
    this.syncToCloud();
  }

  handleOnCheckListChange(checkList) {
    let checkListArray = this.state.checkListsValues;
    for (var i = 0; i < checkListArray.length; i++) {
      if (checkListArray[i][0].id === checkList[0].id) {
        checkListArray[i] = checkList;
        break;
      }
    }
    this.setState({ checkListArray: checkListArray });
    this.syncToCloud();
  }

  syncToCloud() {
    if (this.syncTimeout !== undefined) {
      clearTimeout(this.syncTimeout);
    }
    this.syncTimeout = setTimeout(() => {
      this.checkListDataService.writeToFile(this.state.checkListsValues);
    }, 5000);
  }

  render() {
    var clKey = 0;
    var checkLists = this.state.checkListsValues.map(checkList => {
      return (
        <div key={clKey++}>
          <CheckList
            checkList={checkList}
            onChange={this.handleOnCheckListChange}
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
