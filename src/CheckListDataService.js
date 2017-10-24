/* global gapi */

class CheckListDataService {
  constructor() {
    this.dataFileName = "incentive_todo";
    this.dataFileFolder = "Incentive Todo";
    this.readFromFile = this.readFromFile.bind(this);

    this.dataFileId = undefined;
  }

  init() {
    //find data file
    return this.findDataFile()
      .then(
        function(fileId) {
          //let ret = undefined;
          if (fileId !== undefined) {
            return Promise.resolve(fileId);
          } else {
            return this.findFolder().then(folderId => {
              //var returnResult = undefined;
              if (folderId !== undefined) {
                return this.createFile(folderId).then(fileId => {
                  this.dataFileId = fileId;

                  return Promise.resolve(fileId);
                });
              } else {
                return this.createFolder()
                  .then(this.createFile)
                  .then(fileId => {
                    this.dataFileId = fileId;

                    return Promise.resolve(fileId);
                  });
              }
              //ret = returnResult;
            });
          }
        }.bind(this),
        undefined
      )
      .then(fileId => {
        this.dataFileId = fileId;

        return Promise.resolve(fileId);
      });
  }

  findDataFile() {
    return gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, properties)",
        q:
          "name = '" +
          this.dataFileName +
          "' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
      })
      .then(
        function(response) {
          var fileId = undefined;
          for (var i = 0; i < response.result.files.length; i++) {
            var file = response.result.files[i];
            if (file.properties && file.properties.incentive_todo === "true") {
              fileId = file.id;
            }
          }

          return Promise.resolve(fileId);
          // if(fileId === undefined){
          //   this.findFolder(callback);
          // } else{
          //   callback(fileId);
          // }
        }.bind(this)
      );
  }

  findFolder() {
    return gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, properties)",
        q:
          "name = '" +
          this.dataFileFolder +
          "' and mimeType = 'application/vnd.google-apps.folder' and trashed = false"
      })
      .then(
        function(response) {
          var folderId = undefined;
          for (var i = 0; i < response.result.files.length; i++) {
            var file = response.result.files[i];
            if (file.properties && file.properties.incentive_todo === "true") {
              folderId = file.id;
            }
          }

          return Promise.resolve(folderId);
          // if(folderId === undefined){
          //   this.createFolder(callback);
          // } else{
          //   this.createFile(folderId, callback);
          // }
        }.bind(this)
      );
  }

  createFolder() {
    return gapi.client.drive.files
      .create({
        name: this.dataFileFolder,
        mimeType: "application/vnd.google-apps.folder",
        parents: ["root"],
        properties: { incentive_todo: "true" }
      })
      .then(
        function(response) {
          return Promise.resolve(response.result.id);
        }.bind(this)
      );
  }

  createFile(folderId) {
    return gapi.client.drive.files
      .create({
        name: this.dataFileName,
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: [folderId],
        properties: { incentive_todo: "true" }
      })
      .then(
        function(response) {
          return Promise.resolve(response.result.id);
        }.bind(this)
      )
      .then(this.renameTodoSheet.bind(this))
      .then(this.addJournalSheet.bind(this));
  }

  writeToFile(checkListsValues) {
    // var values = [
    //   ["something", "to", "save on row 1xxxx"],
    //   ["something", "to", "save on row 2"]
    // ];
    var checkListsValuesJson = checkListsValues.map(list => {
      var x = list.map(obj => {
        var y = JSON.stringify(obj);

        return y;
      });

      return x;
    });

    var body = {
      values: checkListsValuesJson
    };

    return gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: this.dataFileId,
        //spreadsheetId: "1n_RG-SFziPQ6Tn6QhniC9DrDE02Sq0eZVRRmVgRHnt4",
        range: "A1",
        valueInputOption: "RAW",
        resource: body
      })
      .then(response => {
        console.log(response);
      });
  }

  readFromFile() {
    return gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: this.dataFileId,
        range: "Todos"
      })
      .then(response => {
        let objArray = [[]];
        var listJsonArray = response.result.values;
        if (listJsonArray !== undefined) {
          objArray = listJsonArray.map(list => {
            var listObj = list.map(val => {
              var x = JSON.parse(val);

              return x;
            });

            return listObj;
          });
        }

        return Promise.resolve(objArray);
      });
  }

  addJournalSheet(fileId) {
    return gapi.client.sheets.spreadsheets
      .batchUpdate({
        spreadsheetId: fileId,//this.dataFileId,
        resource: {
          requests: {
            addSheet: {
              
              properties: {
                title: "Journal"
              }
            }
          }
        }
      })
      .then(response => {
        console.log(response);
        return Promise.resolve(fileId);
      });
  }

  renameTodoSheet(fileId) {    
    return gapi.client.sheets.spreadsheets
      .batchUpdate({
        spreadsheetId: fileId,//this.dataFileId,
        
        resource: {
          requests: {            
            updateSheetProperties: {
              "fields": "title",
              properties: {    
                sheetId: "0",            
                "title": "Todos",
              }
            }
          }
        }
      })
      .then(response => {
        console.log(response);
        return Promise.resolve(fileId);
      });
  }
}

export default CheckListDataService;
