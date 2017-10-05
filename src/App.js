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

    if (isSignedIn) {
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
   * Print files.
   */
  listFiles() {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
      })
      .then(
        function(response) {
          console.log(response);
        }

      );
  }

  createFile() {
    
    gapi.client.drive.files.create({    
      "name":"new file2",
      "mimeType":"application/vnd.google-apps.spreadsheet",
      "parents":["0B2uYm3uzW_F-QkdJZHcyNW95RWc"]
    })
    
    .then(function(response) {
      console.log(response);
    });
  }

  writeToFile(){
    var values = [
      [
        "something", "to", "save on row 1xxxx"
      ],
      [
        "something", "to", "save on row 2"
      ]
    ];
    var body = {
      values: values
    };
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: "1WppNAUviyrzD2dMY71ikv1qb_WDpAgOdnrh-CE2t4Kg",
       range: "A1",
       valueInputOption: "RAW",
       resource: body
    })    
    .then(function(response) {
      console.log(response);
    });
  }

  readFromFile(){

    gapi.client.sheets.spreadsheets.values.get({
       //spreadsheetId: "1cALfwE6VHfie7qU5xeMZaK9wN_s8qNHVlxKT8zffL-w",
       spreadsheetId: "1WppNAUviyrzD2dMY71ikv1qb_WDpAgOdnrh-CE2t4Kg",
       range: "A1:D6"
    })    
    .then(function(response) {
      console.log(response);
      
    });
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
          <button onClick={this.createFile}>Create</button>
          <button onClick={this.writeToFile}>Write</button>
          <button onClick={this.readFromFile}>Read</button>
          <div id="content" />
        </div>
      </div>
    );
  }
}

export default App;
