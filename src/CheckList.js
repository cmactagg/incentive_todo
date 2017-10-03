import React, { Component } from "react";
import Sortable from "sortablejs";


class CheckList extends Component {
  
  
  constructor() {
    super();

    this.newItemText = "";

    this.state = {

      list: [
        { id: 1, text: "get groceries", isChecked: true },
        { id: 2, text: "walk dog", isChecked: false }
      ]
    };

    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
    this.handleAddTextBoxChange = this.handleAddTextBoxChange.bind(this);
    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
  }

  componentDidMount() {
    var el = document.getElementById('items');
    var sortable = Sortable.create(el);
  }



  

  handleAddTextBoxBlur(event){
    var list = this.state.list;
    list.push({id:  Date.now(), text: event.target.value, isChecked: false});
    console.log(list);
    this.setState({list: list});
    event.target.value = "";
  }

  handleCheckboxOnChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(target.id + " " + target.checked);
    this.list
    // this.setState({
    //   [name]: value
    // });
  }

  handleAddTextBoxChange(event){
    this.newItemText = event.target.value;
    console.log(this.newItemText);
  }

  renderListItem(listItemObj) {
    return (
      <div key={listItemObj.id}>
          <div>
            <input type="checkbox" id={listItemObj.id} defaultChecked={listItemObj.isChecked} onChange={this.handleCheckboxOnChange}/>
            </div>
        <div>{listItemObj.text}</div>
        <div>{listItemObj.isChecked}</div>
      </div>
    );
  }

  render() {
    const listItemsRendered = this.state.list.map(listItemObj => {
      return this.renderListItem(listItemObj);
    });

    return (
      <div>
      <div id="items">
        {listItemsRendered}
      </div>
      <div><input type="text" onChange={this.handleAddTextBoxChange} onBlur={this.handleAddTextBoxBlur}/></div>
      </div>
    );
  }
}

export default CheckList;
