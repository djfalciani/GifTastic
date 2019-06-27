// Global Variables
var queryLimit = 10;
var topics = ["baseball", "soccer", "football", "hockey", "basketball", "lacrosse", "field hockey", "volleyball"];

// displayGifResult - makes the API call and creates the bootstrap cards using response data...
function displayGIFResult() {
  var apiRetLimit = $("#query-limit-form").val().trim();
  var apiKey = "1SgTFjjC7T6J2YvQUa8ki0KERWwUtOpP";
  var xTopic = $(this).attr("data-name");
  var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + xTopic + "&api_key=" + apiKey + "&limit=" + apiRetLimit);
  
  //javascript, jQuery
  // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + xTopic + "&api_key=" + apiKey + "&limit=" + apiRetLimit);
  // var xhr = $.get(queryURL);
  // xhr.done(function(data) { console.log("success got data", data); });

  clearGiffDiv();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      var rating = results[i].rating;
      var title = results[i].title;
      var stillImg = results[i].images.fixed_height_still.url;
      var animatedImg = results[i].images.fixed_height.url;
      var gifDiv = $("<div>");
      var cardDiv = $("<div>");
      var giffImage = $("<img>");

      gifDiv.addClass("card");
      cardDiv.addClass("card-body");
      giffImage.addClass("giff-image card-img-top");
      
      giffImage.attr({
        src: stillImg,
        "data-state": "still",
        "data-still": stillImg,
        "data-animate": animatedImg
      });

      // Construct Card-Body...
      var p = $("<p class= 'card-text'>").text("Rating: " + rating);
      var h = $("<h5 class='card-title'>").text(title);

      // Appending the paragraph and giffImage we created to the "gifDiv" div we created
      cardDiv.append(h);
      cardDiv.append(p);
      gifDiv.append(giffImage);
      gifDiv.append(cardDiv);

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
      a.attr("id","gif-btn");
      a.addClass("btn btn-secondary");
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

  $(document).on("click", "#gif-btn", displayGIFResult);

  $(document).on("click", ".giff-image", updateGiffState);

  $("#add-giff-btn").on("click", function() {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newTopic = $("#gif-input").val().trim();

    topics.push(newTopic);
    renderButtons();
  });
  


  renderButtons();
  renderSelectOptions(queryLimit);
