/* global gapi */

class CheckListDataService {
  constructor() {
    this.dataFileName = "incentive_todo";
    this.dataFileFolder = "Incentive Todo";

    this.dataFileId = undefined;
  }

  init(callback){
    //find data file
    this.findDataFile(function(fileId){
      if(fileId === undefined){
        //this.createFolder();
        this.createFile(function(fileId){
          this.dataFileId = fileId;
          callback();
        }.bind(this));
      }else{
        this.dataFileId = fileId;
        callback();
      }
    }.bind(this));
   
  }

  findDataFile(callback) {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, properties)",
        q: "name = 'incentive_todo' and trashed = false"
      })
      .then(function(response) {
        var fileId = undefined;
        console.log(response);
        for(var i = 0; i < response.result.files.length; i++){
          var file = response.result.files[i]          
          if(file.properties && file.properties.incentive_todo === "true"){
            fileId = file.id;
          }
        }
        callback(fileId);
      }.bind(this));
  }

  createFile(callback) {
    gapi.client.drive.files
      .create({
        name: "incentive_todo",
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: ["0B2uYm3uzW_F-QkdJZHcyNW95RWc"],
        properties: {"incentive_todo": "true"}
      })
      .then(function(response) {
        callback(response.result.id);
      });
  }

  writeToFile(callback) {
    var values = [
      ["something", "to", "save on row 1xxxx"],
      ["something", "to", "save on row 2"]
    ];
    var body = {
      values: values
    };
    gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: "1_4t2rC7o4U_t2n9zti0CiWAnLq5j_EYRbomNQOudF64",
        range: "A1",
        valueInputOption: "RAW",
        resource: body
      })
      .then(function(response) {
        console.log(response);
      });
  }

  readFromFile(callback) {
    gapi.client.sheets.spreadsheets.values
      .get({
        //spreadsheetId: "1cALfwE6VHfie7qU5xeMZaK9wN_s8qNHVlxKT8zffL-w",
        spreadsheetId: "1_4t2rC7o4U_t2n9zti0CiWAnLq5j_EYRbomNQOudF64",
        range: "A1:D6"
      })
      .then(function(response) {
        console.log(response);
      });
  }
}

export default CheckListDataService;
