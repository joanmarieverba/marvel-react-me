import React, {Component} from 'react';

var inputBox = {
  // paddingTop: "30px",
  textAlign: "center",
  display: "inline-block",
  fontFamily: "Arial",
  fontSize: "12px",
  fontWeight: "bold",
  backgroundColor: "white",
  border: "2px solid lightblue",
}

export default class MediaSearchInput extends Component {
  render() {
    return (
      <label  style={inputBox}> Superhero Search:
      <input  type="text" placeholder="Enter search term" onChange={this.props.onSearchInputChange}/>
      </label>
    );
  }
};
