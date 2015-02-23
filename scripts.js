
var app = {};

app.init = function(){

// upon clicking search bottom do....
		$(".search").on('submit',function(e){
			e.preventDefault();

//neutralize users search

			app.userInputWorst = $(".userInput").val();

			function capitalizeEachWord(str) {
			    return str.replace(/\w\S*/g, function(txt) {
			        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			    });	
			}

		app.userInput = capitalizeEachWord(app.userInputWorst);

// fade in overlay top, bottom, and tasting notes

		$('.overlay').fadeIn();


		$('.container').fadeIn();

		$('.overlayBottom').fadeIn();

		app.getInfo(app.userInput);

// close overlay, clear input box and remove previous response.
		$('a.closeOverlay').on('click', function(e){
			e.preventDefault(e);

			$('.overlay').fadeOut();

			$('.userInput').val('');

			$('.answer').css('display', 'none');
		}); // end close overlay

	}); // end submit search function

	$('.drink').on('mouseover', function(){
		console.log("moused over!");
		$('.drink').addClass('animated swing').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
			$(this).removeClass('animated swing');
		});
	}); 
};

 //end app.init

	 $('.userInput').on('keyup',function(){
			var input = $('.userInput').val();

		   $.ajax({
		        url: 'http://lcboapi.com/products/',
		        type: 'GET',
		        dataType: 'jsonp',
		        headers: {
		        Authorization: "token MDo5NDA3N2NjYy1iN2I5LTExZTQtOGUxMi1iYjJhZTU2NmJiYjg6MmEzZlZtelR5THB4VUlHWGljTGdBcWZUemZweWVxTTNrZDNl",
		        },
		        data: {
		        per_page:5,
		          q: input
		        },
		     success: function(result) {
		     	var list = $('datalist#autocomplete')

		     	for(var i=0; i<result.result.length; i++){
		     		list.append('<option value="' + result.result[i].name + '">')
		     	}
		     }
		   });
	});

	
app.getInfo = function(boozeChoice){
	$.ajax({
		url: "http://lcboapi.com/products?access_key=ACCESS_KEY",
		type: 'GET',
		dataType: 'jsonp',
		headers: {
	    Authorization: "token MDo5NDA3N2NjYy1iN2I5LTExZTQtOGUxMi1iYjJhZTU2NmJiYjg6MmEzZlZtelR5THB4VUlHWGljTGdBcWZUemZweWVxTTNrZDNl" 
	  },
	  data: {
	  	per_page:5,
	  	q: boozeChoice
	  },
	  success: function(data) {
	  	app.displayInfo(data); 

	 }//end success

	});// end ajax

}; // end getInfo

app.displayInfo = function(result){

	var array = result.result;	

  	var notes = array[0].tasting_note.split(';');

	if (array.length === 1) {

		if (array[0].tasting_note === null){

			var div = $('<div>').addClass('answer');

			var p = $('<p>').text("Oh, that's that what you're drinking? That's not quite classy enough for a description. Why don't you try something nicer?");

			div.append(p);

			$('.container').append(div);

		} else {

			var div = $('<div>').addClass('answer');

			var p = $('<p>').text(notes);

			div.append(p);

			$('.container').append(div);
		}


	} else if(array[0].name == app.userInput) {

		if (array[0].tasting_note === null){

	  		var div = $('<div>').addClass('answer');

	  		var p = $('<p>').text("Oh, that's that you're drinking? That's not even classy enough for a description. Try again some other time!");

	  		div.append(p);

	  		$('.container').append(div);

  		} else {
	  		var div = $('<div>').addClass('answer');

	  		var p = $('<p>').text(notes);

	  		div.append(p);

	  		$('.container').append(div);
		};

	  	};//end else if
	 };
	  // }//end app.display

	
$(function() {
	app.init();
	
});//end doc ready





