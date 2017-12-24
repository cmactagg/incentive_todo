import React, { Component } from "react"; // eslint-disable-line no-unused-vars

class CheckListItemComponent extends Component {
  constructor(props) {
    super(props);

    this.handleOnTextBlur = this.handleOnTextBlur.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
    this.handleOnPointsBlur = this.handleOnPointsBlur.bind(this);
  }

  handleOnCheckboxChange(event) {
    const obj = Object.assign({}, this.props.valueObj);
    obj.isChecked = event.target.checked;
    this.props.checkListActions.checkListItemChanged(
      this.props.checkListId,
      obj
    );
  }

  handleOnTextBlur(event) {
    if (this.props.valueObj.text !== event.target.value) {
      const obj = Object.assign({}, this.props.valueObj);
      obj.text = event.target.value;
      this.props.checkListActions.checkListItemChanged(
        this.props.checkListId,
        obj
      );
    }
  }

  handleOnPointsBlur(event) {
    if (this.props.valueObj.points !== event.target.value) {
      const obj = Object.assign({}, this.props.valueObj);
      obj.points = event.target.value;
      this.props.checkListActions.checkListItemChanged(
        this.props.checkListId,
        obj
      );
    }
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.valueObj.isChecked === true}
          onChange={this.handleOnCheckboxChange}
        />
        <input
          onBlur={this.handleOnTextBlur}
          type="text"
          defaultValue={this.props.valueObj.text}
        />
        <input
          onBlur={this.handleOnPointsBlur}
          type="number"
          defaultValue={this.props.valueObj.points}
        />
      </div>
    );
  }
}

export default CheckListItemComponent;
