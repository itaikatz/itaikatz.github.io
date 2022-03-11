import numpy as np
import scipy.optimize as opt
import matplotlib.pyplot as plt

x = [1900,
1920,
1930,
1935,
1940,
1945,
1950,
1955,
1960,
1970,
1980,
1990,
2000,
2010,
2020
]

male_y = [0,
0.002344,
0.099,
0.2451,
0.409,
.5600,
0.6694,
0.7457,
0.8051,
0.8978,
0.9434,
0.96598,
0.9847,
0.9915,
0.993
]

female_y = [0,
0.001,
0.1912,
0.3697,
0.5446,
0.6843,
0.7848,
0.8442,
0.8828,
0.9355,
0.9673,
0.9807,
0.9896,
0.9929,
1
]

x = (np.array(x)-1900)/10
y = np.array(female_y)

# x = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0]
# y = [0.073, 2.521, 15.879, 48.365, 72.68, 90.298, 92.111, 93.44, 93.439, 93.389, 93.381, 93.367, 93.94, 93.269, 96.376]
# x = np.array(x)
# y = np.array(y)



def f(x, a, b, c, d):
    return a / (1. + np.exp(-c * (x - d))) + b

popt, pcov = opt.curve_fit(f, x, y, method="trf")
print(popt)

# param for men: 
# [ 1.00498715 -0.04151579  1.18681008  4.26232654]

y_fit = f(x, *popt)
fig, ax = plt.subplots(1, 1, figsize=(6, 4))
ax.plot(x, y, 'o')
ax.plot(x, y_fit, '-')
plt.show()