import React, {Component} from 'react';

var characterName = {
  display: "block",
  padding: "10px",
  width: "400px",
  marginTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
  border: "3px solid #73AD21",
  textAlign: "center",
// font-family: 'Roboto';
  fontFamily: "Arial",
  fontSize: "24px",
  fontWeight: "bold",
  backgroundColor: "white",
}

var imageSingle = {
  width: "425px",
  height: "425px",
  display: "block",
  margin: "0 auto",
}

var characterDescription = {
  display: "block",
  padding: "10px",
  width: "400px",
  margin: "0 auto",
  border: "3px solid #73AD21",
  textAlign: "justify",
  fontFamily: "Verdana",
  fontSize: "14px",
  backgroundColor: "yellow",
}

export default class CharItem extends Component {
  render (){
    var url = `${this.props.img}.jpg`;
    var description = this.props.desc;
    if (description.length === 0) {description = "On secret assignment: information limited"}
    return (
      <div>
        <span style={characterName}>  {this.props.name}   </span>
        <img style={imageSingle} src={url} />
        <span style={characterDescription}>{description} </span>
      </div>
    );
  }
}
