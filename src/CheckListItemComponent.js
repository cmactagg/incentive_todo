import React, { Component } from "react"; // eslint-disable-line no-unused-vars

class CheckListItemComponent extends Component {
  constructor(props) {
    super(props);

    this.handleOnTextChange = this.handleOnTextChange.bind(this);
    this.handleOnTextBlur = this.handleOnTextBlur.bind(this);
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);

    this.state = { obj: JSON.parse(JSON.stringify(this.props.valueObj)) };
  }

  handleOnTextChange(event) {
    let obj = this.state.obj;
    obj.text = event.target.value;
    this.setState({ obj: obj });
  }

  handleOnCheckboxChange(event) {
    let obj = this.state.obj;
    obj.isChecked = event.target.checked;
    this.setState({ obj: obj });
    this.props.onChange(this.state.obj);
  }

  handleOnTextBlur(event) {
    if (this.props.valueObj.text !== this.state.obj.text) {
      this.props.onChange(this.state.obj);
    }
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.obj.isChecked === true}
          onChange={this.handleOnCheckboxChange}
        />
        <input
          onBlur={this.handleOnTextBlur}
          type="text"
          value={this.state.obj.text}
          onChange={this.handleOnTextChange}
        />
      </div>
    );
  }
}

export default CheckListItemComponent;
