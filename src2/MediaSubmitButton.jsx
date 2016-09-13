import React, {Component} from 'react';
import ReactDOM from 'react-dom';

var inputBox = {
  // paddingTop: "50px",
  display: "inline-block",
  // margin: "0 auto",
}

export default class MediaSubmitButton extends Component {
  render() {
    return (
     <input style={inputBox} type="button" onClick={this.props.onSubmitButtonClick} value="Search" />
    );
  }
};
