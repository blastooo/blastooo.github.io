/*
 * FAKE TWEET GENERATOR
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.blastooo = [];
streams.users.googlegorilla = [];
streams.users.leo_tsang = [];
streams.users.annabanana = [];
streams.users.liniumz = [];
streams.users.boluchan = [];
streams.users.tallchinese = [];
streams.users.kellybelly = [];
streams.users.stiemrolla = [];
streams.users.jguamie = [];
window.users = Object.keys(streams.users);
users.shift(); // remove blastooo from random tweets

// library of real names
var fullNames = {
  blastooo: 'James Lee',
  leo_tsang: 'Leo Tsang',
  googlegorilla: 'David Shen',
  annabanana: 'Anna Kim',
  liniumz: 'Jay Lin',
  boluchan: 'Tina Yeh',
  tallchinese: 'Mike Chan',
  kellybelly: 'Kelli Hsu',
  stiemrolla: 'Ben Stiemsma',
  jguamie: 'John Lee'
};

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length - 1) + 1;
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.fullName = fullNames[tweet.user];
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 3000);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

// utility function to post new tweet
var postTweet = function(message){
  var tweet = {};
  tweet.user = 'blastooo';
  tweet.fullName = fullNames[tweet.user];
  tweet.message = message;
  tweet.created_at = new Date();
  addTweet(tweet);
}
