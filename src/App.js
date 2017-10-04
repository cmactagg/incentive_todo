/* global gapi */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CheckList from "./CheckList.js";
import CheckListsBoard from "./CheckListsBoard.js";
import AuthenticationComponent from "./AuthenticationComponent.js";
import AuthenticationService from "./AuthenticationService";

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAuthenticatedStatusChange = this.handleAuthenticatedStatusChange.bind(
      this
    );

    this.state = { isSignedIn: false };
  }

  loadScripts() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      console.log("script loaded!!!!!");
      this.authenticationService.init(this.handleAuthenticatedStatusChange);
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadScripts();
  }

  handleAuthenticatedStatusChange(isSignedIn) {
    this.setState({ isSignedIn: isSignedIn });

    if(isSignedIn){
      this.listFiles();
    }
  }

  handleSignIn() {
    this.authenticationService.signIn();
  }

  handleSignOut() {
    this.authenticationService.signOut();
  }

    /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message) {
    var pre = document.getElementById("content");
    var textContent = document.createTextNode(message + "\n");
    pre.appendChild(textContent);
  }

  /**
   * Print files.
   */
  listFiles() {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
      })
      .then(function(response) {
        this.appendPre("Files:");
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            this.appendPre(file.name + " (" + file.id + ")");
          }
        } else {
          this.appendPre("No files found.");
        }
      }.bind(this));
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
          <CheckListsBoard />
          <div id="content"></div>
        </div>
      </div>
    );
  }
}

export default App;
