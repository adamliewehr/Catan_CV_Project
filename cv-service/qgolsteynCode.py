import cv2
import numpy as np
from sklearn import cluster

# Initialize a video feed
cap = cv2.VideoCapture(0)

while(True):
    # Grab the latest image from the video feed
    ret, frame = cap.read()

    cv2.imshow("frame", frame)

    res = cv2.waitKey(1)

    # Stop if the user presses "q"
    if res & 0xFF == ord('q'):
        break

# When everything is done, release the capture
cap.release()
cv2.destroyAllWindows()