// JAVASCRIPT SCRIPTS

$(document).ready(function(){

  var visibleTweets = $('.visible');
  var hiddenTweets = $('.hidden');
  var filteredName;
  var visibleTweetTreshold = 10;
  var index = 1;
  
  // function to add tweets
  var addNextTweet = function() {
    var tweetCount = streams.home.length

    if (index !== tweetCount - 1) {
      index = tweetCount - 1;
      var newTweet = setupTweet(index)

      // add tweet based on current filter
      if (!filteredName) {
        newTweet.prependTo(visibleTweets);
      } else if ('@' + streams.home[index].user === filteredName) {
        newTweet.prependTo(visibleTweets);
      } 

      // hides tweets after tweetCount threshold is reached
      if ($('.visible div').length > visibleTweetTreshold) {
        $('.toggler').show();
        $('.visible div:last-child').detach().prependTo(hiddenTweets);
      };

    };
    setTimeout(addNextTweet, 1);
  };

  // begin adding tweets
  addNextTweet();
  
  // create html coded tweet
  function setupTweet(index) {
    var tweet = streams.home[index];
    var timeStamp = formatDate(tweet.created_at);
    var $tweet = $('<div class="filter"></div>');
    $tweet = $tweet.text(tweet.fullName + ' @' + tweet.user + ' | ' + timeStamp + '\n' + tweet.message);
    $tweet.prepend('<img src="assets/images/' + tweet.user + '.jpg">');
    $tweet.html($tweet.html().replace(/\n/g,'<br/>'));
    return $tweet;
  }

  // date formatter for timeStamp
  function formatDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  // unhide tweets when 'see more' is clicked
  $('.toggler').on('click', function() {
    var hiddenCount = $('.hidden div').length;
    for (var i = 0; i < 20; i++) {
      $('.hidden div:first-child').detach().appendTo(visibleTweets);
    }
    // increase window height to accomodate new unhidden tweets
    hiddenCount -= $('.hidden div').length;
    visibleTweetTreshold += hiddenCount;
    $('section').height(function(index, height) {
      return height + hiddenCount*65;
    });
  });
  
  // post new tweet upon user input
  $('#new-tweet').submit(function(event) {
    event.preventDefault();
    postTweet($('#tweet').val());
    $('#new-tweet')[0].reset();
    var tweetsStat = $('#tweetsStat').text();
    // update total number of tweets posted stat
    tweetsStat++
    $('#tweetsStat').text(tweetsStat);
  });
  
  // filter tweets by name clicked
  $('.visible').on('click', '.filter', function() {
    filteredName = $(this).text().split(' ')[2];
    $('.visible div').not(':contains(' + filteredName + ')').remove();
    $('.hidden div').not(':contains(' + filteredName + ')').remove();
  });

});