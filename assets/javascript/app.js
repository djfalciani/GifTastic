// Global Variables
var queryLimit = 5;
var topics = ["baseball", "soccer", "football", "hockey", "basketball"];

// Movie & Activity 15 - Pausing GIFF

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGIFResult() {
  var apiRetLimit = queryLimit;
  var apiKey = "1SgTFjjC7T6J2YvQUa8ki0KERWwUtOpP";
  var xTopic = $(this).attr("data-name");
  // console.log(xTopic);
  
  //var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + xTopic + "&api_key=" + apiKey + "&limit=" + apiRetLimit);
  
  // console.log(queryURL);
  
  //javascript, jQuery
  // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + xTopic + "&api_key=" + apiKey + "&limit=" + apiRetLimit);
  // var xhr = $.get(queryURL);
  // xhr.done(function(data) { console.log("success got data", data); });

  // Creating an AJAX call for the specific movie button being clicked
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      var rating = results[i].rating;
      console.log(rating);


      // Creating a div for the gif
      var gifDiv = $("<div>");

      // Storing the result item's rating
      var rating = results[i].rating;

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);

      // Creating an image tag
      var giffImage = $("<img>");

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      giffImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and giffImage we created to the "gifDiv" div we created
      gifDiv.append(p);
      gifDiv.append(giffImage);

      // Prepending the gifDiv to the "#gif-result" div in the HTML
      $("#gif-result").prepend(gifDiv);
    }
   
   
  });

}


function renderButtons() {
    $("#gif-button").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      // a.addClass("gif-btn btn btn-secondary btn-lg");
      a.addClass("gif-btn btn btn-secondary");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#gif-button").append(a);
    }
  }

  $(document).on("click", ".gif-btn", displayGIFResult);

  renderButtons();
