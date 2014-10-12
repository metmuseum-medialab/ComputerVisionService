/* example of calling python code form Node */

function CascadeIdentifier(){
	var process = require('child_process');


	var Indentifier = {
		var cascade_dir : "/usr/local/share/OpenCV/";
		var cascades : {
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
		}


		//var img_file = "/usr/local/share/OpenCV/samples/c/lena.jpg";
		var test_img_file : "/home/metmuseum/projects/facerecog/vilniusSmiling.jpg";

		var process : require('child_process');

		var python_cmd  : "/usr/bin/python /home/metmuseum/projects/ComputerVisionService/cascade_detect.py "


		match_all_cascades : function (image_file, callback){
			// first make sure this is a legit image, not a comman  (hack!)
			var num_cascades = Object.keys(this.cascades).length;
			var complete_cascades = 0;
			var results = {};
			for(var key in this.cascades ){
				//var cascade_file = "/usr/local/share/OpenCV/haarcascades/haarcascade_eye.xml";

				(function(_key){
					var cascade_file = this.cascade_dir + this.cascades[_key];

					var cmd = this.python_cmd + " " + image_file + "  " + cascade_file;

					var ls = process.exec(cmd, function (error, stdout, stderr) {
						   if (error) {
						     console.log(error.stack);
						     console.log('Error code: '+error.code);
						     console.log('Signal received: '+error.signal);
						   }
						   console.log('stdout: '  + _key +' : '+ stdout);
						   console.log('stderr: ' + stderr);
						 });
						 ls.on('exit', function (code) {
						   console.log('Child process exited with exit code '+code);
						   complete_cascades++;
						   if(complete_cascades == num_cascades){
						   		console.log("done with all cascades, returning");
						   		callback(results);
						   }
						 });
				}(key));

			}
		}
	}
	return Indentifier;
}

module.exports.CascadeIdentifier = CascadeIdentifier;