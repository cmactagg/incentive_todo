import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import JournalEntry from "./JournalEntry.js";
import Sortable from "sortablejs";

class Journal extends Component {
  constructor(props) {
    super(props);

  }

  renderListItem(entryObj) {
    return (
      <div key={"journalentry-" + entryObj.id}>
        <div>
          <JournalEntry
            journalActions={this.props.journalActions}
            valueObj={entryObj}
          />
        </div>
      </div>
    );
  }

  render() {
    // const clHeaderObj = this.props.checkList[0];
    // const clHeaderObjElementId = "CheckList-items-" + clHeaderObj.id;
    // var checklist = this.props.checkList.slice(1);

    const journalEntrysRendered = this.props.journal.map(entryObj => {
      return this.renderListItem(entryObj);
    });

    return (
      <div>
        {/* <div>
          <input
            type="text"
            defaultValue={this.props.checkList[0].text}
            onBlur={this.handleOnHeaderTextBlur}
          />
        </div>
        <div id={clHeaderObjElementId} className="CheckList-items"> */}
          {journalEntrysRendered}
        {/* </div>
        <div>
          <input type="text" onBlur={this.handleAddTextBoxBlur} />
        </div> */}
      </div>
    );
  }
}

export default Journal;
