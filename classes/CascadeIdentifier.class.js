/* example of calling python code form Node */

function CascadeIdentifier(){
	var process = require('child_process');


	var Indentifier = {
		cascade_dir : "/usr/local/share/OpenCV/",
		cascades : {
			eyeglasses : "haarcascades/haarcascade_eye_tree_eyeglasses.xml",
			eye : "haarcascades/haarcascade_eye.xml",
			frontalface_alt2 : "haarcascades/haarcascade_frontalface_alt2.xml",
			frontalface_alt_tree : "haarcascades/haarcascade_frontalface_alt_tree.xml",
			frontalface_alt : "haarcascades/haarcascade_frontalface_alt.xml",
			frontalface : "haarcascades/haarcascade_frontalface_default.xml",
			fullbody : "haarcascades/haarcascade_fullbody.xml",
			lefteye2splits : "haarcascades/haarcascade_lefteye_2splits.xml",
			lowerbody : "haarcascades/haarcascade_lowerbody.xml",
			mcs_eyepair : "haarcascades/haarcascade_mcs_eyepair_big.xml",
			mcs_eyepair_small : "haarcascades/haarcascade_mcs_eyepair_small.xml",
			mcs_leftear : "haarcascades/haarcascade_mcs_leftear.xml",
			mcs_lefteye : "haarcascades/haarcascade_mcs_lefteye.xml",
			mcs_mouth : "haarcascades/haarcascade_mcs_mouth.xml",
			mcs_nose : "haarcascades/haarcascade_mcs_nose.xml",
			mcs_rightear : "haarcascades/haarcascade_mcs_rightear.xml",
			mcs_righteye : "haarcascades/haarcascade_mcs_righteye.xml",
			mcs_upperbody : "haarcascades/haarcascade_mcs_upperbody.xml",
			mcs_profileface : "haarcascades/haarcascade_profileface.xml",
			mcs_righteye_2splits : "haarcascades/haarcascade_righteye_2splits.xml",
			smile : "haarcascades/haarcascade_smile.xml",
			upperbody : "haarcascades/haarcascade_upperbody.xml"
		},


		//var img_file = "/usr/local/share/OpenCV/samples/c/lena.jpg";
		test_img_file : "/home/metmuseum/projects/facerecog/vilniusSmiling.jpg",

		python_cmd  : "/usr/bin/python /home/metmuseum/projects/ComputerVisionService/cascade_detect.py ",



		parse_stdout : function(stdout){	
			var results = [];
			stdout = stdout.trim();
			if(stdout == "false"){
				return results;
			}
			var lines = stdout.split("\n");
			while(lines.length > 0){
				var line = lines.shift();
				var s = line.split(":");
				var result = {x: s[0], y : s[1] , w : s[2], h : s[3]};
				results.push(result);
			}
			return results;


		},

		match_all_cascades : function (image_file, callback){
			// first make sure this is a legit image, not a comman  (hack!)
			var num_cascades = Object.keys(this.cascades).length;
			var complete_cascades = 0;
			var results = {};
			var realthis = this;
			for(var key in this.cascades ){
				//var cascade_file = "/usr/local/share/OpenCV/haarcascades/haarcascade_eye.xml";

				(function(_key){
					var cascade_file = realthis.cascade_dir + realthis.cascades[_key];

					var cmd = realthis.python_cmd + " " + image_file + "  " + cascade_file;

					var ls = process.exec(cmd, function (error, stdout, stderr) {
						   if (error) {
						   	/*
						     console.log(error.stack);
						     console.log('Error code: '+error.code);
						     console.log('Signal received: '+error.signal);
						     */
						   }
						   results[_key] = realthis.parse_stdout(stdout);
						 });
						 ls.on('exit', function (code) {
						   complete_cascades++;
						   if(complete_cascades == num_cascades){
						   		callback(results);
						   }else{
						   }
						 });
				}(key));

			}
		}
	}
	return Indentifier;
}

module.exports.CascadeIdentifier = CascadeIdentifier;