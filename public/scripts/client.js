/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  

  // loops through the passed tweet object and posts the formatted tweets to the tweet container in reverse chronological order.
  const renderTweets = (tweets) => {
    tweets.reverse();
    $.each(tweets, function(index, tweet) {
      $('.tweet-container').append(createTweetElement(tweet));
    });
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // creates the tweet html for passed tweet information
  const createTweetElement = (tweet) => {
    const $tweet = $(`
    <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}">
      <span>${tweet.user.name}</span>
      <div class="hidden">
        <p>${tweet.user.handle}</p>
      </div>
    </header>
    <div class="tweet-content">
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
      <p>${moment(tweet.created_at).fromNow()}</p>
      <div class="hidden icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      <div>
    </footer>
  </article>
  `);

    return $tweet;
  };

  // New tweet post functionality that clears and refetches tweets to display
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    const $charCount = $(this).children($('textarea'))[1].value.length;
    if ($charCount === 0) {
      $('.error-empty').slideDown();
    } else if ($charCount > 140) {
      $('.error-overLimit').slideDown();
    } else {
      $('.error-empty').slideUp();
      $('.error-overLimit').slideUp();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      })
        .done(function() {
          $('.tweet-container').empty();
          loadTweets();
        });
    }
  });

  // Handles new tweet field toggle
  $("#tweet-form-toggle").click(function(){
    $("#submit-tweet").slideToggle();
    $("#tweet-text").focus();
  });

// cause back to top button to appear
  $(window).scroll(function(){
    if (window.scrollY) {
      $("#back-TT").fadeIn();
      $("#tweet-form-toggle").fadeOut();
    } else {
      $("#back-TT").fadeOut();
      $("#tweet-form-toggle").fadeIn();
    }
  });

  $("#back-TT").click(function(){
    window.scrollTo(0,0);
    $("#submit-tweet").slideDown();
    $("#tweet-text").focus();

  });

  // Fetches tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .done(function(tweets) {
        console.log('get finished!');
        renderTweets(tweets);
      });
  };

  // Calling to load tweets on page ready
  loadTweets();
 
});