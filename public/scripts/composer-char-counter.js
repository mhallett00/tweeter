$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("keyup", function(event) {
    const counter = $(this).siblings().find(".counter")[0];
    const currentCharCount = $(this).val().length;

    counter.innerText =  140 - currentCharCount;
    
    if (counter.innerText < 0) {
      $(counter).addClass("charOverLimit");
    } else {
      $(counter).removeClass("charOverLimit");

    }
  });
});