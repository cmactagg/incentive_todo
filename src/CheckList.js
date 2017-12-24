import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import CheckListItemComponent from "./CheckListItemComponent.js";
import Sortable from "sortablejs";
import "./CheckList.css";

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.handleOnHeaderTextBlur = this.handleOnHeaderTextBlur.bind(this);
  }

  componentDidMount() {
    var element = document.getElementById(
      "CheckList-items-" + this.props.checkList[0].id
    );
    Sortable.create(element, { onSort: this.handleOnSort });
  }

  handleOnSort(event) {
    this.props.checkListActions.checkListReorder(
      this.props.checkList[0].id,
      event.oldIndex,
      event.newIndex
    );
  }

  handleAddTextBoxBlur(event) {
    if (event.target.value.length > 0) {
      const objHeader = Object.assign({}, this.props.checkList[0]);
      this.props.checkListActions.checkListAddItem(
        objHeader.id,
        event.target.value
      );
      event.target.value = "";
    }
  }

  handleOnHeaderTextBlur(event) {
    if (this.props.checkList[0].text !== event.target.value) {
      const objHeader = Object.assign(this.props.checkList[0]);
      objHeader.text = event.target.value;
      this.props.checkListActions.checkListHeaderChanged(
        this.props.checkList[0].id,
        objHeader
      );
    }
  }

  renderListItem(listItemObj) {
    return (
      <div key={listItemObj.id} className="CheckList-item">
        <div>
          <CheckListItemComponent
            checkListActions={this.props.checkListActions}
            checkListId={this.props.checkList[0].id}
            valueObj={listItemObj}
          />
        </div>
      </div>
    );
  }

  render() {
    const clHeaderObj = this.props.checkList[0];
    const clHeaderObjElementId = "CheckList-items-" + clHeaderObj.id;
    var checklist = this.props.checkList.slice(1);

    const listItemsRendered = checklist.map(listItemObj => {
      return this.renderListItem(listItemObj);
    });

    return (
      <div>
        <div>
          <input
            type="text"
            defaultValue={this.props.checkList[0].text}
            onBlur={this.handleOnHeaderTextBlur}
          />
        </div>
        <div id={clHeaderObjElementId} className="CheckList-items">
          {listItemsRendered}
        </div>
        <div>
          <input type="text" onBlur={this.handleAddTextBoxBlur} />
        </div>
      </div>
    );
  }
}

export default CheckList;
