// Global Variables
var queryLimit = 10;
var topics = ["baseball", "soccer", "football", "hockey", "basketball"];

// Movie & Activity 15 - Pausing GIFF

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGIFResult() {
  // var apiRetLimit = queryLimit;
  var apiRetLimit = $("#query-limit-form").val().trim();
  console.log(apiRetLimit);
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

  clearGiffDiv();

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // console.log(results);

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // var rating = results[i].rating;
      
      // Creating a div for the gif
      var gifDiv = $("<div>");
      
      // Storing the result item's rating
      var rating = results[i].rating;
      
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);
      
      // Store results Title and create header tag for it...
      var title = results[i].title;
      // var h = $("<h3>").text("Title: " + title);
      var h = $("<h3>").text(title);

      // Creating an image tag
      var giffImage = $("<img>");

      // Add Class
      giffImage.addClass("giff-image");

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      var stillImg = results[i].images.fixed_height_still.url;
      var animatedImg = results[i].images.fixed_height.url;

      giffImage.attr("src", stillImg);
      giffImage.attr("data-state","still");
      giffImage.attr("data-still", stillImg);
      giffImage.attr("data-animate", animatedImg);

      // Appending the paragraph and giffImage we created to the "gifDiv" div we created
      gifDiv.append(h);
      gifDiv.append(p);
      gifDiv.append(giffImage);

      // Prepending the gifDiv to the "#gif-result" div in the HTML
      $("#gif-result").append(gifDiv);
      // $("#gif-result").prepend(gifDiv);
    }
   
  });

}

function clearGiffDiv() {
  $("#gif-result").empty();
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

  // updateGiffState - will either animate or still a clicked image using jQuery attr...
  function updateGiffState() {
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  function renderSelectOptions(i) {
    for (n=1; n <= i; n++) {
      var selectOption = $("<option>");
      selectOption.text(n);
      $("#query-limit-form").append(selectOption);
      if (n == i) {
        selectOption.attr("selected", "selected");
      }
    }
  }

  $(document).on("click", ".gif-btn", displayGIFResult);

  $(document).on("click", ".giff-image", updateGiffState);

  $("#add-giff-btn").on("click", function() {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newTopic = $("#gif-input").val().trim();
    
    // console.log(newTopic);

    topics.push(newTopic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });
  


  renderButtons();
  renderSelectOptions(queryLimit);
