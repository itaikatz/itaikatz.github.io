import sys
import cv2
import numpy as np

img1 = cv2.imread(sys.argv[1])       # payload image
img2 = cv2.imread(sys.argv[2])       # cover image
num_bits = np.uint8(sys.argv[3])   # number of payload bits
outfile = sys.argv[4]     # output filename

imout = np.zeros(img1.shape)

for x in range(0, img1.shape[0]):
	for y in range(0, img1.shape[1]):
		for c in range(0, img1.shape[2]):
			imout[x,y,c] = (img1[x,y,c] >> num_bits << num_bits) | (img2[x,y,c] >> (8-num_bits))

cv2.imwrite(outfile, imout)			