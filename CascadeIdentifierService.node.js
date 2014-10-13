
console.log("starting");


var Indentifier = require("./classes/CascadeIdentifier.class.js").CascadeIdentifier();

var image = "/home/metmuseum/projects/facerecog/vilniusSmiling.jpg";

function got_result(results){
	console.log("got results");
	console.log(results);

}


Indentifier.match_all_cascades(image, got_result);


console.log("done");