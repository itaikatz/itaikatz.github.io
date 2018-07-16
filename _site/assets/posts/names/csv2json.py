import csv

# a = {0:.1, 1:.2}

f = open('female_actuarial.dat', 'w')
f.write('a = {')

with open('female_actuarial.csv', 'rb') as csvfile:
	reader = csv.reader(csvfile, delimiter=',', quotechar='|')
	for row in reader:
		f.write(row[0] + ':' + row[1] + ',')
		# print row[0]
		# print ', '.join(row)
f.write('}')
f.close()
# >>> import csv
# >>> with open('eggs.csv', 'rb') as csvfile:
# ...     spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
# ...     for row in spamreader:
# ...         print ', '.join(row)
# Spam, Spam, Spam, Spam, Spam, Baked Beans
# Spam, Lovely Spam, Wonderful Spam