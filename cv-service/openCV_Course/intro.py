import cv2
import numpy as np
import matplotlib.pyplot as plt 

# print(cv2.__version__)

# Read image as gray scale.
catImg = cv2.imread("./images/cat.jpg", 1)

# Print the image data (pixel values), element of a 2D numpy array.
# Each pixel value is 8-bits [0,255]

# catImg = cv2.add(catImg, 5)
# print(np.ndim(catImg))

# print(catImg)

# catImg = cv2.add(catImg, 200)

# plt.imshow(catImg)
# catImg = np.flip(catImg, 0)
# plt.imshow(catImg[:, :, ::-1]) # to get the real color

# drawing on images

catImgAnnotated = catImg.copy()

cv2.line(catImgAnnotated, (100, 100), (200, 200), (255, 0, 0), thickness=10, lineType=cv2.LINE_8)
cv2.circle(catImgAnnotated, (200, 400), 300, (0, 255, 0), thickness=-1)
cv2.rectangle(catImgAnnotated, (300, 100), (500, 300), (0, 255, 0), thickness=-2)

text = "This is some text!"
fontScale = -1
fontFace = cv2.FONT_HERSHEY_COMPLEX
fontColor = (0, 0, 255)
fontThickness = 5

cv2.putText(catImgAnnotated, text, (200, 300), fontFace, fontScale, fontColor, fontThickness)


plt.imshow(catImgAnnotated[:, :, ::-1])

plt.show()

# cv2.imwrite("flippedCat.jpg", catImg)