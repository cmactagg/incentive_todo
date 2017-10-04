import React, { Component } from "react";

class AuthenticationComponent extends Component {
  constructor(props) {
    super(props);

    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    this.props.onSignIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignOutClick(event) {
    this.props.onSignOut();
  }

  render() {
    return (
      <div>
        <button
          id="authorize-button"
          onClick={this.handleAuthClick}
          style={{ display: this.props.isSignedIn ? "none" : "block" }}
        >
          Authorize
        </button>
        <button
          id="signout-button"
          onClick={this.handleSignOutClick}
          style={{ display: this.props.isSignedIn ? "block" : "none" }}
        >
          Sign Out
        </button>
      </div>
    );
  }
}

export default AuthenticationComponent;
