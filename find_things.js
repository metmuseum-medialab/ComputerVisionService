/* example of calling python code form Node */



var cascade_dir = "/usr/local/share/OpenCV/";
var cascades = {
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
var img_file = "/home/metmuseum/projects/facerecog/vilniusSmiling.jpg";

var process = require('child_process');


for(var key in cascades ){
	//var cascade_file = "/usr/local/share/OpenCV/haarcascades/haarcascade_eye.xml";

	(function(_key){
		var cascade_file = cascade_dir + cascades[_key];

		var cmd = "python /home/metmuseum/projects/facerecog/FaceDetect/cascade_detect.py /usr/local/share/OpenCV/samples/c/lena.jpg " + cascade_file;

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
			 });
	}(key));

}