
console.log("starting");

// testing image : http://images.metmuseum.org/CRDImages/an/web-large/1999,325,018.jpg

var url = require('url');
var fs = require("fs");
var request = require("request");

var Percolator = require('percolator').Percolator;

var port = 3256;

var server = new Percolator({port: port});


var Indentifier = require("./classes/CascadeIdentifier.class.js").CascadeIdentifier();

var image = "/home/metmuseum/projects/facerecog/vilniusSmiling.jpg";


var download = function(uri, filename, callback){
	console.log("downloading " + uri)
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};



server.route('/', {  
	GET : function(req, res){

		console.log("getting identify");
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var imageUrl = query.imageurl;
		var results = {foo : imageUrl};
		var tempname = "tmp"+Date.now()+ Math.random();

		download(imageUrl, tempname, function(){
			Indentifier.match_all_cascades(image, function(results){
				fs.unlink(tempname);
    			res.object(results).send();
			});
		});

		console.log("imageurl " + imageUrl);

		// if it's a url for an image, dl it here, make a temp, then delete it later.

    }
});


server.listen(function(err){
  console.log('server is listening on port ', port);
});


console.log("done");