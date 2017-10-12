import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import Sortable from "sortablejs";
import "./CheckList.css";

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.newItemText = "";

    this.handleAddTextBoxChange = this.handleAddTextBoxChange.bind(this);
    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
  }

  componentDidMount() {
    var clHeaderObj = this.props.checkList[0];

    var element = document.getElementById("CheckList-items-" + clHeaderObj.id);
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
    console.log(newIndex + "  " + oldIndex);
    this.props.onChange(list);
  }

  handleAddTextBoxBlur(event) {
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

  handleAddTextBoxChange(event) {
    this.newItemText = event.target.value;
  }

  renderListItem(listItemObj) {
    return (
      <div key={listItemObj.id} className="CheckList-item">
        <div>
          <input
            type="checkbox"
            id={listItemObj.id}
            defaultChecked={listItemObj.isChecked === "true"}
          />
          {listItemObj.text}
        </div>
      </div>
    );
  }

  render() {
    var clHeaderObj = this.props.checkList[0];
    const clHeaderObjElementId = "CheckList-items-" + clHeaderObj.id;
    var checklist = this.props.checkList.slice(1);

    const listItemsRendered = checklist.map(listItemObj => {
      return this.renderListItem(listItemObj);
    });

    return (
      <div>
        <div>{clHeaderObj.text}</div>
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
