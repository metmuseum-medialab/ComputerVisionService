import cv2
import sys

# Get user supplied values
imagePath = sys.argv[1]
# prolly at /usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_alt.xml
cascPath = sys.argv[2]

# Create the haar cascade
theCascade = cv2.CascadeClassifier(cascPath)

# Read the image
image = cv2.imread(imagePath)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Detect faces in the image
faces = theCascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30),
    flags = cv2.cv.CV_HAAR_SCALE_IMAGE
)

#print "Found {0} Matches!".format(len(faces))

if len(faces) == 0:
	print "false"

# Draw a rectangle around the faces
for (x, y, w, h) in faces:
	print "{0}:{1}:{2}:{3}".format(x,y,w,h)
#    cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

#cv2.imshow("Faces found", image)
#cv2.waitKey(0)
