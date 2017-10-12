/* global gapi */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CheckList from "./CheckList.js";
import CheckListsBoard from "./CheckListsBoard.js";
import AuthenticationComponent from "./AuthenticationComponent.js";
import AuthenticationService from "./AuthenticationService.js";
import CheckListDataService from "./CheckListDataService.js";

//import AutoSyncService from "./AutoSyncService.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService();
    this.checkListDataService = new CheckListDataService();
    // this.autoSyncService = new AutoSyncService(10000, 
    //   this.checkListDataService.readFromFile, 
    //   this.checkListDataService.writeToFile, 
    //   function(oldData, newData){return newData;},
    //   function(data){
    //     console.log("done data merge");
    //     this.setState({checkListsValues: data});
    //   }.bind(this)
    // );


    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAuthenticatedStatusChange = this.handleAuthenticatedStatusChange.bind(
      this
    );
    this.handleCreateFile = this.handleCreateFile.bind(this);
    this.handleReadFromFile = this.handleReadFromFile.bind(this);
    this.handleWriteToFile = this.handleWriteToFile.bind(this);
    this.syncToCloud = this.syncToCloud.bind(this);

    this.syncTimeout = undefined;
    this.state = { isSignedIn: false, checkListsValues:[] };
  }

  loadScripts() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      this.authenticationService.init(this.handleAuthenticatedStatusChange)
      .then(()=>{
        return this.checkListDataService.init().then((fileId)=>{console.log("got the data file" + fileId)}, undefined);
      }, null)
      .then(
        ()=>{
          this.checkListDataService.readFromFile().then((checkListsValues)=>{
            this.setState({checkListsValues: checkListsValues});
          }, undefined);
        }, 
      
      null
    );
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
    //this.checkListDataService.writeToFile(this.state.checkListsValues);
    //this.autoSyncService.onLocalDataChanged();
    this.syncToCloud();
  }

  handleReadFromFile(){
    //this.checkListDataService.readFromFile();
    this.checkListDataService.init(()=>console.log("I GOT THE FILE!!"));
  }

  syncToCloud(){
    if(this.syncTimeout !== undefined){
      clearTimeout(this.syncTimeout);
    }    
    this.syncTimeout = setTimeout(()=>{
      this.checkListDataService.writeToFile(this.state.checkListsValues);
    }, 5000);
    
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
          <CheckListsBoard checkListsValues={this.state.checkListsValues} onChange={this.syncToCloud}/>
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
