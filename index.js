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
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?limit=100&apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

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



var characterName = prompt("Input character name");

marvel('/characters').then(function(json) {
//  this gets us the character(s) corresponding to the input name
  var singleCharacterArray = json.data.results.filter(function(character){
    var name = character.name;
      if (name.toLowerCase().indexOf(characterName.toLowerCase()) > -1) {
        return character;  //return the character object
      }
  });
// pick up the first character (object) in the array
  var firstCharacter = singleCharacterArray[0];

// put character-frame tag in the html, this is where eveything will go
  var outputFrame =  document.querySelector('character-frame');

//declare the inner frame
  var characterContainer = document.createElement('character');

//pick up the first character's name
  var charName = "Superhero not found";
  if (firstCharacter !== undefined) {charName = firstCharacter.name;}
//declare the node with the character name
  var nameTag = document.createElement('character-name');
//create a string with the text version of the name
  var nameTextNode = document.createTextNode(charName);
//take name and place it into the node
  nameTag.appendChild(nameTextNode);

//get the image path (address of image)
  var imgPath = "http://jmvtestsite.com/wp-content/uploads/2016/07/starry-sky-389083_1280.jpg"
  if (firstCharacter !== undefined) {imgPath = firstCharacter.thumbnail.path + '.' + firstCharacter.thumbnail.extension;}
// declare img node
  var img = document.createElement('img');
//adds img to src and gives it the imgPath value
  img.setAttribute('src', imgPath);

//pick up the first character's description
  var description = "";
  if (firstCharacter !== undefined) {description = firstCharacter.description;}
  if (description.length === 0 && firstCharacter !== undefined){description = "On secret assignment: information limited";}
