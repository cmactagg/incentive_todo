import React, { Component } from "react"; // eslint-disable-line no-unused-vars

class TextInputComponent extends Component {
  constructor(props) {
    super(props);

    this.handleToggleEditModeOnClick = this.handleToggleEditModeOnClick.bind(
      this
    );

    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = { text: this.props.text, editMode: false, firstEditMode:false  };
  }

  handleToggleEditModeOnClick() {
    const mode = !this.state.editMode;
    this.setState({ editMode: mode });
    if(mode){
      this.state.firstEditMode = true;
    }
  }

  handleOnChange(event){
    this.setState({text: event.target.value});
  }

  componentDidUpdate(){
    if(this.state.firstEditMode){
      this.textInput.focus();
      this.textInput.selectionStart = this.textInput.value.length;
      this.textInput.selectionEnd = this.textInput.value.length;
      this.state.firstEditMode = false;
    }
  }

  render() {
    return (
      <span>
        <span
          onClick={this.handleToggleEditModeOnClick}
          style={{ display: this.state.editMode ? "none" : "block" }}
        >
          {this.state.text}
        </span>
        <input
          ref={(input) => { this.textInput = input } }
          onBlur={this.handleToggleEditModeOnClick}
          style={{ display: this.state.editMode ? "block" : "none" }}
          type="text"
          value={this.state.text} onChange={this.handleOnChange}
        />
      </span>
    );
  }

}

export default TextInputComponent;
