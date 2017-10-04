/* global gapi */

class AuthenticationService {
  constructor() {
    // Client ID and API key from the Developer Console
    this.CLIENT_ID =
      "1028405578219-6pjuv6gth509df1s5eoigc8v1hk75afu.apps.googleusercontent.com";
    this.API_KEY = "AIzaSyDoiMkgdr_ENlWi3XdXkK9AY4CCuMD8R_U";

    // Array of API discovery doc URLs for APIs used by the quickstart
    this.DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
    ];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    this.SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
  }

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  init(callback) {
    gapi.load(
      "client:auth2",
      function() {
        gapi.client
          .init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES
          })
          .then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(callback);

            // Handle the initial sign-in state.
            callback(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
      }.bind(this)
    );
  }

  /**
   *  Sign in the user upon button click.
   */
  signIn(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  signOut(event) {
    gapi.auth2.getAuthInstance().signOut();
  }


}

export default AuthenticationService;