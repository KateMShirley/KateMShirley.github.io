
$(document).ready(function(event){
  console.log("all things are loaded...thanks, yayQuery!")
});

  $.ajax({
  	url: 'http://www.omdbapi.com/?t=Star+Wars&y=&plot=short&r=json',
  	type: "GET",
  	dataType: 'json',
  	success: function(data) {
  		$('body').append(data.Title + " was released in " + data.Year + "<hr><br>");
  	}
  });


$.ajax({
  url: 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   ',
  type: "GET",
  dataType: 'json',
  success: function(data) {
    $('body').append('<img src =' + data.data.embed_url + '></img>');
  }
});
