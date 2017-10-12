import React, { Component } from "react";
import Sortable from "sortablejs";
import CheckList from './CheckList.js';
//import "./ChecksListBoard.css";

class CheckListsBoard extends Component {
  constructor(props) {
    super(props);

    this.handleAddNewList = this.handleAddNewList.bind(this);

    // var checkListArray = [[
    //   { id: 1, text: "get groceries", isChecked: true },
    //   { id: 2, text: "walk dog", isChecked: false }],
    //   [{ id: 1, text: "meditate", isChecked: true },
    //   { id: 2, text: "cook dinner", isChecked: false }],
    //   [{ id: 1, text: "wash dishes", isChecked: true },
    //   { id: 2, text: "clean house", isChecked: false }],
    // ];
    
    // this.state = {checkListArray: checkListArray
    // };

    //this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
  }

  handleAddNewList(event){
    var checkListArray = this.props.checkListsValues;
    checkListArray.push([{ id: 9, text: "new task", isChecked: false }]);
    this.setState({checkListArray: checkListArray});
  }

  render() {
    var clKey = 0;
    var checkLists = this.props.checkListsValues.map(checkList => {       
      
      return <div key={clKey++}><CheckList checkList={checkList} onChange={this.props.onChange}/></div>
    });
    
    return (
      <div>
        <div >{checkLists}</div>
        <div><button onClick={this.handleAddNewList}>Add</button></div>
      </div>
    );
  }
}

export default CheckListsBoard;
