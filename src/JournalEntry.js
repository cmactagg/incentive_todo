import React, { Component } from "react"; // eslint-disable-line no-unused-vars

class JournalEntry extends Component {
  constructor(props) {
    super(props);
  }

  // handleOnCheckboxChange(event) {
  //   const obj = Object.assign({}, this.props.valueObj);
  //   obj.isChecked = event.target.checked;
  //   this.props.checkListActions.checkListItemChanged(
  //     this.props.checkListId,
  //     obj
  //   );
  // }

  
  render() {
    return (
      <div>
        {/* <input
          type="checkbox"
          checked={this.props.valueObj.isChecked === true}
          onChange={this.handleOnCheckboxChange}
        /> */}
        {this.props.valueObj.text}
        {this.props.valueObj.points}
       
      </div>
    );
  }
}

export default JournalEntry;
