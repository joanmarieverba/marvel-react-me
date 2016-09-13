import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NameImgDesc from './NameImgDesc.jsx';
import md5 from "md5";

var loadingMsg = {
   color: "white",
   fontFamily: "Verdana",
   fontWeight: "bold",
   textAlign: "center",
}

function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

//calculates hash, calculates url, and then gets the json from the url
function marvelFactory(config) {
  return function(path, charName) {
    var timestamp = new Date().getTime();
    var hash = md5(timestamp + config.privateKey + config.publicKey);
    var url = config.hostname + '/v' + config.version + '/public/characters?name=' + charName + '&apikey=' + config.publicKey;
    console.log("url: ", url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '11baddac3441be34e5ab00c3395622ae',
  privateKey: 'c0409eaf5b34286b2722603cd90db4cb71cf200c',
  version: '1'
});



export default class RetrieveMedia extends Component {
  //constructor only gets executed once
    constructor(props) {  //allows you to set the initial state of the component
      super(props);
      this.state={
        media: null ,   //this is the initial state, needs to be empty at first
        emptyBox : false,
      }
    }

    getOneMedia(charName){  //put it in a function so that it only gets called once
      if (charName.length > 0) {
        this.setState({loading: true});
        marvel('/characters', charName).then((response) => {
          if (response && response.status === "Ok") {
            this.setState({loading:false});
            this.setState({media: response.data.results});
          } else if (response && response.Response === "False") {
            this.setState({media: null});
          } else {
            console.error('Unknown error.');
          }
        });
      } else {
        this.setState({emptyBox : true});
      }
    }
    //if the query changed, call getOneMedia
    componentWillReceiveProps (nextProps){
    if (this.props.charName !== nextProps.charName){
      this.getOneMedia(nextProps.charName);
    }
    }


 //react calls render over and over again by the brower when it refreshes
    render() {
      var showNameImgDesc = false;
      if (this.state.media == null) {
        console.log ("media is null");
        showNameImgDesc = false;
      } else {
        if (this.state.media.length > 0) {
          console.log ("not null and greater than 0");
          showNameImgDesc = true;
        } else {
          console.log ("not null and not greater than zero");
          showNameImgDesc = true;
        }
      }
      return (
        // <div>
        // <NameImgDesc media={this.state.media} charName={this.props.charName}/>
        // </div>
        <div>
          { this.state.emptyBox ? <div style={loadingMsg}>No superhero entered...</div> : null }}
          { showNameImgDesc ? <NameImgDesc media={this.state.media} charName={this.props.charName} loading={this.state.loading}/>  : null  }
          { this.state.loading ? <div style={loadingMsg}>Loading information...</div> : null }
        </div>
      )}
    };
