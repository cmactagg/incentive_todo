import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import Sortable from "sortablejs";
import "./CheckList.css";

class CheckList extends Component {
  constructor(props) {
    super(props);

    this.newItemText = "";

    this.handleAddTextBoxChange = this.handleAddTextBoxChange.bind(this);
    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
  }

  componentDidMount() {
    var elements = document.getElementsByClassName("CheckList-items");
    for (var element of elements) {
      Sortable.create(element);
    }
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
    var checklist = this.props.checkList.slice(1);

    const listItemsRendered = checklist.map(listItemObj => {

      return this.renderListItem(listItemObj);
    });

    return (
      <div>
        <div>{clHeaderObj.text}</div>
        <div className="CheckList-items">{listItemsRendered}</div>
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
