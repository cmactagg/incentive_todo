import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import CheckListItemComponent from "./CheckListItemComponent.js";
import Sortable from "sortablejs";
import "./CheckList.css";

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.newItemText = "";

    this.handleCheckListItemChange = this.handleCheckListItemChange.bind(this);
    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
    this.handleAddTextBoxChange = this.handleAddTextBoxChange.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.handleOnHeaderTextChange = this.handleOnHeaderTextChange.bind(this);
    this.handleOnHeaderTextBlur = this.handleOnHeaderTextBlur.bind(this);

    this.state = {
      clHeaderObj: JSON.parse(JSON.stringify(this.props.checkList[0]))
    };
  }

  componentDidMount() {
    var element = document.getElementById(
      "CheckList-items-" + this.state.clHeaderObj.id
    );
    //for (var element of elements) {
    Sortable.create(element, { onSort: this.handleOnSort });
    //}
  }

  handleOnSort(event) {
    var list = this.props.checkList;
    var newIndex = event.newIndex + 1;
    var oldIndex = event.oldIndex + 1;
    var objectToMove = list.splice(oldIndex, 1)[0];

    if (newIndex > oldIndex) {
      oldIndex--;
    }

    list.splice(newIndex, 0, objectToMove);
    this.props.onChange(list);
  }

  handleAddTextBoxBlur(event) {
    if (event.target.value.length > 0) {
      var list = this.props.checkList;
      list.push({
        id: Date.now(),
        text: event.target.value,
        points: 0,
        isChecked: false
      });
      event.target.value = "";
      this.props.onChange(list);
    }
  }

  handleAddTextBoxChange(event) {
    this.newItemText = event.target.value;
  }

  handleCheckListItemChange(listItemObj) {
    var list = this.props.checkList;
    for (let i = 0; i < list.length; i++) {
      if (listItemObj.id === list[i].id) {
        list[i] = listItemObj;
      }
    }
    this.props.onChange(list);
  }

  handleOnHeaderTextChange(event) {
    let clHeaderObj = this.state.clHeaderObj;
    clHeaderObj.text = event.target.value;
    this.setState({ clHeaderObj: clHeaderObj });
  }

  handleOnHeaderTextBlur(event) {
    if (this.state.clHeaderObj === this.props.checkList[0]) {
      console.log("same");
    }

    if (this.props.checkList[0].text !== this.state.clHeaderObj.text) {
      var list = this.props.checkList;
      list[0] = this.state.clHeaderObj;
      list[0] = JSON.parse(JSON.stringify(this.state.clHeaderObj));
      this.props.onChange(list);
    }
  }

  renderListItem(listItemObj) {
    return (
      <div key={listItemObj.id} className="CheckList-item">
        <div>
          <CheckListItemComponent
            valueObj={listItemObj}
            onChange={this.handleCheckListItemChange}
          />
        </div>
      </div>
    );
  }

  render() {
    let clHeaderObj = this.props.checkList[0];
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
            value={this.state.clHeaderObj.text}
            onBlur={this.handleOnHeaderTextBlur}
            onChange={this.handleOnHeaderTextChange}
          />
        </div>
        <div id={clHeaderObjElementId} className="CheckList-items">
          {listItemsRendered}
        </div>
        <div>
          <input
            type="text"
            onChange={this.handleAddTextBoxChange}
            onBlur={this.handleAddTextBoxBlur}
          />
        </div>
      </div>
    );
  }
}

export default CheckList;
