/* global gapi */

import React, { Component } from "react";
import "./App.css";
import CheckListsBoard from "./CheckListsBoard.js";
import AuthenticationComponent from "./AuthenticationComponent.js";
import AuthenticationService from "./AuthenticationService.js";

class App extends Component {
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
          this.refs.checkListsBoard.init();
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
            ref="checkListsBoard"
            checkListsValues={this.state.checkListsValues}
          />
          <div id="content" />
        </div>
      </div>
    );
  }
}

export default App;
