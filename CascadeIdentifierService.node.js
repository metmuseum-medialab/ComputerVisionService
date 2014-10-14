
console.log("starting");

// testing image : http://images.metmuseum.org/CRDImages/an/web-large/1999,325,018.jpg

var fs = require("fs");
var request = require("request");
var urlparser = require("url");
var pathparser = require("path");


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



server.route('*', {
	GET : function(req, res){
    var parsed = urlparser.parse(req.url, true)

    var query = parsed.query;
    var imageUrl = query.imageurl;
    var results = {foo : imageUrl};
    var tempname = "tmp"+Date.now()+ Math.random();

		if(req.url.match(/index\.html/i) || req.url.match(/raphael-min\.js/)){
			if(!query.action){
			  // this is doing it client-side
			  sendFile(parsed.pathname, query, res);
			  return;
			}
		}

    if(req.url.match(/^\/proxy\//)){
			console.log("calling proxy");
      var split = req.url.split("/");
      split.shift(); split.shift();
      var theurl = split.join("/");
			console.log("url is " + theurl);
      var proxy = require("./classes/proxy/proxy.js").ProxyManager();
      var result = proxy.callUrlNoCallback(theurl, req, res);

      return;
    }


		console.log("getting identify");

		download(imageUrl, tempname, function(){
			Indentifier.match_all_cascades(tempname, function(results){
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



var dataCache = {};
function sendFile(path, query, res){

  if(path == "/"){
    path = "/index.html";
  }

  var extname = pathparser.extname(path);
  var contentType = 'text/html';
  if(path.match(/secrets\.js/)){
        res.writeHead(404, {'Content-Type': contentType});
        //indexhtml = data;
        res.end("I'm afraid I can't do that.");
        return;
  }

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.ico':
      contentType = 'image/vnd.microsoft.icon';
      break;
  }

  if(!dataCache[path]){
    fs.readFile("."+path, function(err, data){
      if(err){
        console.log("file read error");
        console.log(err);
        res.writeHead(404, {'Content-Type': contentType});
        //indexhtml = data;
        res.end(data);
      }else{
        res.writeHead(200, {'Content-Type': contentType});
        //dataCache[path] = data;
        res.end(data);
      }
    });
  }else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(dataCache[path]);
  }
}




console.log("done");
