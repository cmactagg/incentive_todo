/* global gapi */
import React, { Component } from "react";
import Sortable from "sortablejs";
import Journal from "./Journal.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as journalActionCreators from "./actions/journalActionCreators.js";

class JournalsBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jKey = 0;
    var journalsRender = this.props.journals.map(journal => {
      let returnVal = "";
      if (journal.length > 0) {
        returnVal = (
          <div key={jKey++}>
            <Journal
              journalActions={this.props.journalActions}
              journal={journal}
            />
          </div>
        );
      }

      return returnVal;
    });

    return (
      <div>
        <div>{journalsRender}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    journals: state.journals
  };
}

function mapDispatchToProps(dispatch) {
  return {
    journalActions: bindActionCreators(journalActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalsBoard);
