/* global gapi */

class CheckListDataService {
  constructor() {
    this.dataFileName = "incentive_todo";
    this.dataFileFolder = "Incentive Todo";

    this.dataFileId = undefined;
  }

  init(callback){
    return new Promise((resolve, reject)=>{
    //find data file
    this.findDataFile(function(fileId){
      if(fileId === undefined){
        //this.createFolder();
        this.createFile(function(fileId){
          this.dataFileId = fileId;
          console.log("file id" + this.dataFileId);
          callback();
        }.bind(this));
      }else{
        this.dataFileId = fileId;
        console.log("file id" + this.dataFileId);
        callback();
      }
      resolve();
    }.bind(this));
  });
  }

  findDataFile(callback) {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, properties)",
        q: "name = '" + this.dataFileName + "' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
      })
      .then(function(response) {
        var fileId = undefined;
        for(var i = 0; i < response.result.files.length; i++){
          var file = response.result.files[i]          
          if(file.properties && file.properties.incentive_todo === "true"){
            fileId = file.id;
          }
        }
        if(fileId === undefined){
          this.findFolder(callback);
        } else{
          callback(fileId);
        }
      }.bind(this));
  }

  findFolder(callback) {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, properties)",
        q: "name = '" + this.dataFileFolder + "' and mimeType = 'application/vnd.google-apps.folder' and trashed = false"
      })
      .then(function(response) {
        var folderId = undefined;
        for(var i = 0; i < response.result.files.length; i++){
          var file = response.result.files[i]          
          if(file.properties && file.properties.incentive_todo === "true"){
            folderId = file.id;
          }
        }
        if(folderId === undefined){
          this.createFolder(callback);
        } else{
          this.createFile(folderId, callback);
        }
      }.bind(this));
  }

  createFolder(callback) {
    gapi.client.drive.files
      .create({
        name: this.dataFileFolder,
        mimeType: "application/vnd.google-apps.folder",
        parents: ["root"],
        properties: {"incentive_todo": "true"}
      })
      .then(function(response) {
        this.createFile(response.result.id, callback);
      }.bind(this));
  }

  createFile(folderId, callback) {
    gapi.client.drive.files
      .create({
        name: this.dataFileName,
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: [folderId],
        properties: {"incentive_todo": "true"}
      })
      .then(function(response) {
        callback(response.result.id);
      });
  }

  writeToFile(checkListsValues, callback) {
    // var values = [
    //   ["something", "to", "save on row 1xxxx"],
    //   ["something", "to", "save on row 2"]
    // ];
    var checkListsValuesJson = checkListsValues.map(
      list=>{
        var x = list.map(
          obj=>{
            var y = JSON.stringify(obj);

            return y;
          }
        );

        return x
      }
    );

    var body = {
      values: checkListsValuesJson
    };
    gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: this.dataFileId,
        range: "A1",
        valueInputOption: "RAW",
        resource: body
      })
      .then(function(response) {
        console.log(response);
        callback();
      });
  }

  readFromFile(callback) {
    gapi.client.sheets.spreadsheets.values
      .get({
        //spreadsheetId: "1cALfwE6VHfie7qU5xeMZaK9wN_s8qNHVlxKT8zffL-w",
        spreadsheetId: this.dataFileId,
        range: "Sheet1"
      })
      .then(function(response) {
        var listJsonArray = response.result.values;
        var objArray = listJsonArray.map(
          list=> {
          var listObj = list.map(
            val => {
              var x = JSON.parse(val)

              return x;
            }
        )

        return listObj;
      }
      );

        callback(objArray);
      });
  }
}

export default CheckListDataService;
