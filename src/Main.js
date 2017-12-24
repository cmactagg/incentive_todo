/* global gapi */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import "./App.css";
import CheckListsBoard from "./CheckListsBoard.js";
import JournalsBoard from "./JournalsBoard.js";
import AuthenticationComponent from "./AuthenticationComponent.js";
import AuthenticationService from "./AuthenticationService.js";

import { connect } from "react-redux";
//import * as actionCreators from "./actions/actionCreators.js";
import * as mainActionCreators from "./actions/mainActionCreators.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAuthenticatedStatusChange = this.handleAuthenticatedStatusChange.bind(
      this
    );

    this.state = { isSignedIn: false, checkListsValues: [] };
  }

  loadScripts() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      this.authenticationService
        .init(this.handleAuthenticatedStatusChange)
        .then(() => {
          console.log("auth inited");
        })
        .then(() => {
          this.props.mainActions.initDataService();
        });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadScripts();
  }

  handleAuthenticatedStatusChange(isSignedIn) {
    this.setState({ isSignedIn: isSignedIn });

    if (isSignedIn) {
      //this.checkListDataService.listFiles();
    }
  }

  handleSignIn() {
    this.authenticationService.signIn();
  }

  handleSignOut() {
    this.authenticationService.signOut();
  }

  render() {
    return (
      <div>
        <div>
          <AuthenticationComponent
            isSignedIn={this.state.isSignedIn}
            onSignIn={this.handleSignIn}
            onSignOut={this.handleSignOut}
          />
        </div>
        <div>
          <CheckListsBoard
            checkListActions={this.props.checkListActions}
            checkLists={this.props.checkLists}
            ref="checkListsBoard"
          />
        </div>
        <div>
          <JournalsBoard
            journalActions={this.props.journalActions}
            journals={this.props.journals}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators(mainActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Main);
