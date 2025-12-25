import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread("./images/cat.jpg", 1)
img = img[:, :, ::-1]

matrix = np.ones(img.shape, dtype = "uint8") * 50
# .shape is the shape of the matrix that the method is attached to
# dtype is data type
# uint8 is unsigned 8bit int
# we are multiplying by 50 to make the pixel intensity more (by 50 times)

imgBrighter = cv2.add(img, matrix) # lighter than the original
imgDarker = cv2.subtract(img, matrix) # darker than the original 


# changing contrast
# contrast is defined as the difference in intensity values of the pixels within an image
# requires a multiplication operations

matrix1 = np.ones(img.shape) * .8
matrix2 = np.ones(img.shape) * 1.2

imgLowContrast = np.uint8(cv2.multiply(np.float64(img), matrix1))
# need to convert to float then do the multiplication using cv.multiply then convert back to uint8
imgHighContrast = np.uint8(cv2.multiply(np.float64(img), matrix2))

# plt.imshow(imgHighContrast)
# in the high contrast image you will see the weird color coating
# this is because if we multiply by 1.2, we can potentially get values greater than 255
# so when we attempt to convert to an uint8, it gets rolled over to a small number
# how can we fix this?

imgHighContrast = np.uint8(np.clip(cv2.multiply(np.float64(img), matrix2), 0, 255))
# plt.imshow(imgHighContrast)
# that's better!

# image thresholding
# image thresholding is commonly used for image masking
# this is when we change specific parts of an image while keeping others intact
# thresholing is when we take an iamge and set all values to 0 if they are below a certian threshold, and all values above the threshold are set to 255


dice = cv2.imread("./images/dice.jpg", 1)
dice = dice[:, :, ::-1]


retval, img_thresh = cv2.threshold(dice, 100, 255, cv2.THRESH_BINARY)

# plt.imshow(img_thresh)

# this could be used to read dice rolls, which the example shows

# what's better is an adaptive threshold:
# an adaptive threshold converts an image to black and white by calculating a different threshold value fo smaller regions of an image, rather than using a single global one
# images must be in grayscale alread to do adaptive thresholding
dice = cv2.cvtColor(dice, cv2.COLOR_BGR2GRAY)
# dice = dice[:, :, ::-1]
diceAdpThresh = cv2.adaptiveThreshold(dice, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 7)

plt.imshow(diceAdpThresh)

# dst = cv.adaptiveThreshold( src, maxValue, adaptiveMethod, thresholdType, blockSize, C[, dst] )
# dst Destination image of the same size and the same type as src.

# The function has 6 required arguments:

# src: Source 8-bit single-channel image.
# maxValue: Non-zero value assigned to the pixels for which the condition is satisfied
# adaptiveMethod: Adaptive thresholding algorithm to use, see AdaptiveThresholdTypes. The BORDER_REPLICATE | BORDER_ISOLATED is used to process boundaries.
# thresholdType: Thresholding type that must be either THRESH_BINARY or THRESH_BINARY_INV, see ThresholdTypes.
# blockSize: Size of a pixel neighborhood that is used to calculate a threshold value for the pixel: 3, 5, 7, and so on.
# C: Constant subtracted from the mean or weighted mean (see the details below). Normally, it is positive but may be zero or negative as well.


plt.show()