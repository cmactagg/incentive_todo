import React, { Component } from "react";
import Sortable from "sortablejs";
import './CheckList.css';


class CheckList extends Component {
  
  
  constructor(props) {
    super(props);

    console.log(props);

    this.newItemText = "";

    this.state = {

      list: props.checkList
    };

    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
    this.handleAddTextBoxChange = this.handleAddTextBoxChange.bind(this);
    this.handleAddTextBoxBlur = this.handleAddTextBoxBlur.bind(this);
  }

  componentDidMount() {
    var elements = document.getElementsByClassName('CheckList-items');
    for (var element of elements) {
      Sortable.create(element);
  }
    
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
      <div key={listItemObj.id}  className="CheckList-item">
          <div>
            <input type="checkbox" id={listItemObj.id} defaultChecked={listItemObj.isChecked} onChange={this.handleCheckboxOnChange}/>
            {listItemObj.text}
            </div>
        
      </div>
    );
  }

  render() {
    const listItemsRendered = this.state.list.map(listItemObj => {
      return this.renderListItem(listItemObj);
    });

    return (
      <div >
      <div className="CheckList-items">
        {listItemsRendered}
      </div>
      <div><input type="text" onChange={this.handleAddTextBoxChange} onBlur={this.handleAddTextBoxBlur}/></div>
      </div>
    );
  }
}

export default CheckList;
