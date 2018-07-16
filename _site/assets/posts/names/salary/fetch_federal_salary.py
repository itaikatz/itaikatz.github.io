import time
import urllib2
import cPickle as pickle

if __name__ == "__main__":
	# for i in range(0,110):
	id = 1495559880848
	for key in 'ijklmnopqrstuvwxyz':
	# key = 'g'
		for i in range(0,10):
			start = 20000 * i
			print start
			url = "https://www.fedsdatacenter.com/federal-pay-rates/output.php?n=" + key + "&a=&l=&o=&y=2016&sEcho=4&iColumns=9&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=" + str(start) + "&iDisplayLength=20000&mDataProp_0=0&bSortable_0=true&mDataProp_1=1&bSortable_1=true&mDataProp_2=2&bSortable_2=true&mDataProp_3=3&bSortable_3=true&mDataProp_4=4&bSortable_4=true&mDataProp_5=5&bSortable_5=true&mDataProp_6=6&bSortable_6=true&mDataProp_7=7&bSortable_7=true&mDataProp_8=8&bSortable_8=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&_="+str(id)
			id+=1
			# filename = "salary_" + str(i) + ".p"
			filename = "salary_" + key + str(i) + ".p"
			print "fetching " + filename
			data = urllib2.urlopen(url).read()
			if len(data) < 1000:
				break;
			pickle.dump( data, open( filename, "wb" ), pickle.HIGHEST_PROTOCOL )
			print "..done"
			time.sleep(10)
