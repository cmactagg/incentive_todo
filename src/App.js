/* global gapi */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CheckList from "./CheckList.js";
import CheckListsBoard from "./CheckListsBoard.js";
import AuthenticationComponent from "./AuthenticationComponent.js";
import AuthenticationService from "./AuthenticationService.js";
import CheckListDataService from "./CheckListDataService.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();
    this.checkListDataService = new CheckListDataService();
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAuthenticatedStatusChange = this.handleAuthenticatedStatusChange.bind(
      this
    );
    this.handleCreateFile = this.handleCreateFile.bind(this);
    this.handleReadFromFile = this.handleReadFromFile.bind(this);
    this.handleWriteToFile = this.handleWriteToFile.bind(this);

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

  handleCreateFile(){
    this.checkListDataService.createFile();
  }

  handleWriteToFile(){
    this.checkListDataService.writeToFile();
  }

  handleReadFromFile(){
    //this.checkListDataService.readFromFile();
    this.checkListDataService.init(()=>console.log("I GOT THE FILE!!"));
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
          <button onClick={this.handleCreateFile}>Create</button>
          <button onClick={this.handleWriteToFile}>Write</button>
          <button onClick={this.handleReadFromFile}>Read</button>
          <div id="content" />
        </div>
      </div>
    );
  }
}

export default App;
