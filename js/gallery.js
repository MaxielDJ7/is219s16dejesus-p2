// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {

  /**********  Part 2 . 4 **********/

	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string

  //Create a slide show to iterate over all the GalleryImage Objects in your mImages[] array.
  if(mCurrentIndex >= mImages.length){

    mCurrentIndex= 0;

  }

  else{

    while( mCurrentIndex <= mImages.length){

      var imageFile= mImages[mCurrentIndex];

      var currentSrc= $('#slideShow').find('img').attr('src');

      var newSrc= imageFile.path;

      currentSrc= newSrc;

      $('.location')= imageFile.location;
      $('.decription')= imageFile.description;
      $('.date')= imageFile.date;

      mCurrentIndex ++;

    }

  }
    	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

/**********  Part 1 **********/

function GalleryImage(where, what, when, path) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject

  this.where= where;
  this.what= what;
  this.when= when;
  this.path= path;

}
/**********  END Part 1 **********/

/**********  Part 2 **********/

mRequest.onreadystatechange= function(){

  if (mRequest.readyState == 4 && mRequest.status == 200) {
    try{
      mJson= JSON.parse(mRequest.responseText);

        var rJson= {
            //Create a JSON object that contains the retrieved JSON3 string (in this case, a list of photo URLs and related metadata).
            "path" : mJson.imgPath,
            "what": mJson.description,
            "when": mJson.date,
            "where": mJson.imgLocation
          }

    } catch(err) {
      console.log(err.message)
    }
  }

};

mRequest.open("GET", mURL, true);
mRequest.send();

/* Iterate through the JSON object and create GalleryImage objects using javascript for each image in the JSON object. Put each of these new GalleryImage objects into an array called mImages[]. */

for( var element in rJson){

  if(!rJson.hasOwnProperty(element)){

    continue;
  }

 //create a new image with the json elements retrieved

  var newImg= GalleryImage(rJson.path, rJson.what, rJson.when, rJson.where );

  mImages.push(newImg);

}



/**********  END Part 2 **********/

/**********  Part 3 **********/

$('.moreIndicator').click(function()){

  if(this.attr('class') === "rot90"){

    //down

    this.addClass('rot270');
    $('.details').slideDown();

  }

  else{

    //up

    this.removeClass('rot270').addClass('rot90');
    $('.details').slideUp();

  }


}

//get left coordinates of #gallery
//set offset left of #nextphoto double the gallery's left coordinates

var gCoord= $('#gallery').position().left;
$('#nextPhoto').offset({left: gCoord});

//hover opacity

$('#nextPhoto', '#prevPhoto').hover(function(){
  $this.css("opacity", .8);
});



/**********  END Part 3 **********/

/**********  Part 5 **********/

function getQueryParams(qs) {
     qs = qs.split("+").join(" ");
     var params = {},
         tokens,
         re = /[?&]?([^=]+)=([^&]*)/g;
     while (tokens = re.exec(qs)) {
         params[decodeURIComponent(tokens[1])]
             = decodeURIComponent(tokens[2]);
}
     return params;
 }

 var $_GET = getQueryParams(document.location.search);

//if file inputted into get and valid set as gallery input

//else use default


/**********  END Part 5 **********/

$(document).ready( function() {

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);
