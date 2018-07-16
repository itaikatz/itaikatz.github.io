from __future__ import division
import matplotlib.pyplot as plt
import numpy as np
import collections
import functools
import operator
import cPickle as pickle
import json
import Queue as Q
import pprint

male_count = {
  "1880": 118400,
  "1881": 108282,
  "1882": 122031,
  "1883": 112477,
  "1884": 122739,
  "1885": 115945,
  "1886": 119041,
  "1887": 109315,
  "1888": 129906,
  "1889": 119033,
  "1890": 119701,
  "1891": 109265,
  "1892": 131453,
  "1893": 121040,
  "1894": 124893,
  "1895": 126644,
  "1896": 129071,
  "1897": 121942,
  "1898": 132104,
  "1899": 115194,
  "1900": 162136,
  "1901": 115596,
  "1902": 132749,
  "1903": 129327,
  "1904": 138508,
  "1905": 143241,
  "1906": 144072,
  "1907": 158588,
  "1908": 166368,
  "1909": 176868,
  "1910": 208523,
  "1911": 241395,
  "1912": 451458,
  "1913": 536246,
  "1914": 683321,
  "1915": 880944,
  "1916": 923263,
  "1917": 959321,
  "1918": 1048686,
  "1919": 1015333,
  "1920": 1100845,
  "1921": 1137928,
  "1922": 1125289,
  "1923": 1132343,
  "1924": 1169053,
  "1925": 1151452,
  "1926": 1145493,
  "1927": 1161823,
  "1928": 1141139,
  "1929": 1107467,
  "1930": 1129409,
  "1931": 1069483,
  "1932": 1074244,
  "1933": 1019944,
  "1934": 1061700,
  "1935": 1069364,
  "1936": 1064145,
  "1937": 1093453,
  "1938": 1136275,
  "1939": 1133132,
  "1940": 1186018,
  "1941": 1254633,
  "1942": 1408054,
  "1943": 1454300,
  "1944": 1388952,
  "1945": 1371304,
  "1946": 1650221,
  "1947": 1857369,
  "1948": 1782584,
  "1949": 1801862,
  "1950": 1819391,
  "1951": 1912132,
  "1952": 1973312,
  "1953": 2000962,
  "1954": 2068771,
  "1955": 2088801,
  "1956": 2144578,
  "1957": 2187578,
  "1958": 2153163,
  "1959": 2166365,
  "1960": 2166043,
  "1961": 2155959,
  "1962": 2102270,
  "1963": 2065345,
  "1964": 2027518,
  "1965": 1895471,
  "1966": 1818082,
  "1967": 1779945,
  "1968": 1776337,
  "1969": 1830273,
  "1970": 1905890,
  "1971": 1818559,
  "1972": 1674843,
  "1973": 1614331,
  "1974": 1630859,
  "1975": 1623146,
  "1976": 1633323,
  "1977": 1709926,
  "1978": 1709108,
  "1979": 1791797,
  "1980": 1854890,
  "1981": 1862278,
  "1982": 1886935,
  "1983": 1863052,
  "1984": 1876017,
  "1985": 1923588,
  "1986": 1920717,
  "1987": 1949260,
  "1988": 2001087,
  "1989": 2095312,
  "1990": 2150985,
  "1991": 2119088,
  "1992": 2098502,
  "1993": 2064883,
  "1994": 2037863,
  "1995": 2010917,
  "1996": 2003219,
  "1997": 1997199,
  "1998": 2026988,
  "1999": 2038121,
  "2000": 2087172,
  "2001": 2067193,
  "2002": 2065323,
  "2003": 2099842,
  "2004": 2111945,
  "2005": 2125748,
  "2006": 2190481,
  "2007": 2213001,
  "2008": 2177987,
  "2009": 2118374,
  "2010": 2051486,
  "2011": 2027805,
  "2012": 2024813,
  "2013": 2015372,
  "2014": 2042503,
  "2015": 2035632,
  "2016": 2008947
}

female_count = {
  "1880": 97604,
  "1881": 98855,
  "1882": 115695,
  "1883": 120059,
  "1884": 137586,
  "1885": 141949,
  "1886": 153735,
  "1887": 155422,
  "1888": 189447,
  "1889": 189219,
  "1890": 201661,
  "1891": 196567,
  "1892": 224913,
  "1893": 225232,
  "1894": 235972,
  "1895": 247106,
  "1896": 251993,
  "1897": 248276,
  "1898": 274145,
  "1899": 247490,
  "1900": 317765,
  "1901": 254231,
  "1902": 280334,
  "1903": 278197,
  "1904": 292435,
  "1905": 309868,
  "1906": 313440,
  "1907": 337433,
  "1908": 354531,
  "1909": 368097,
  "1910": 419526,
  "1911": 441817,
  "1912": 586711,
  "1913": 654911,
  "1914": 796615,
  "1915": 1023881,
  "1916": 1085715,
  "1917": 1123701,
  "1918": 1202367,
  "1919": 1174653,
  "1920": 1244039,
  "1921": 1279700,
  "1922": 1247535,
  "1923": 1252429,
  "1924": 1295720,
  "1925": 1263067,
  "1926": 1230154,
  "1927": 1236370,
  "1928": 1195430,
  "1929": 1157504,
  "1930": 1166388,
  "1931": 1103602,
  "1932": 1106182,
  "1933": 1045898,
  "1934": 1082199,
  "1935": 1086702,
  "1936": 1077450,
  "1937": 1101746,
  "1938": 1141349,
  "1939": 1134028,
  "1940": 1181237,
  "1941": 1245838,
  "1942": 1390382,
  "1943": 1435263,
  "1944": 1366456,
  "1945": 1346064,
  "1946": 1612845,
  "1947": 1817815,
  "1948": 1742599,
  "1949": 1755492,
  "1950": 1758732,
  "1951": 1847295,
  "1952": 1902035,
  "1953": 1929043,
  "1954": 1990998,
  "1955": 2004393,
  "1956": 2059324,
  "1957": 2097512,
  "1958": 2065055,
  "1959": 2078518,
  "1960": 2079922,
  "1961": 2076304,
  "1962": 2027035,
  "1963": 1987948,
  "1964": 1957243,
  "1965": 1827404,
  "1966": 1755605,
  "1967": 1716705,
  "1968": 1709555,
  "1969": 1762753,
  "1970": 1831973,
  "1971": 1752416,
  "1972": 1612525,
  "1973": 1554077,
  "1974": 1566162,
  "1975": 1560766,
  "1976": 1571928,
  "1977": 1644958,
  "1978": 1643811,
  "1979": 1723123,
  "1980": 1780360,
  "1981": 1788139,
  "1982": 1813865,
  "1983": 1789223,
  "1984": 1802722,
  "1985": 1845753,
  "1986": 1844872,
  "1987": 1873696,
  "1988": 1922429,
  "1989": 1991833,
  "1990": 2053848,
  "1991": 2033020,
  "1992": 2004237,
  "1993": 1971108,
  "1994": 1948955,
  "1995": 1921147,
  "1996": 1916774,
  "1997": 1908700,
  "1998": 1937876,
  "1999": 1946028,
  "2000": 1994676,
  "2001": 1979793,
  "2002": 1973757,
  "2003": 2005167,
  "2004": 2016339,
  "2005": 2027865,
  "2006": 2088675,
  "2007": 2114380,
  "2008": 2080467,
  "2009": 2022399,
  "2010": 1957645,
  "2011": 1934276,
  "2012": 1935222,
  "2013": 1922536,
  "2014": 1949966,
  "2015": 1942833,
  "2016": 1920613
}

def CreateDB():
	male = collections.defaultdict(dict)
	female = collections.defaultdict(dict)
	gender = collections.defaultdict(dict)	
	# male_count = {}
	# female_count = {}

	# for year in range(1880,2016):
		# female_count[year] = 0
		# male_count[year] = 0

	for year in range(1880,2015+1):
		filename = 'by_year/yob' + str(year) + '.txt'
		file = open(filename)
		
		text = file.readlines()
		for line in text:
			name,sex,count = line.rstrip().split(',')
			if sex=='F':
				female[name][year] = int(count)
				# female_count[year] += int(count)
			else:
				male[name][year] = int(count)
				# male_count[year] += int(count)

	# Get probability that a name is male (out of working-age individuals)
	male_working = collections.defaultdict(dict)
	female_working = collections.defaultdict(dict)
	for name in female:
		female_working[name] = sum([v for k,v in female[name].iteritems() if k >= 1952 and k <= 1999])
	for name in male:
		male_working[name] = sum([v for k,v in male[name].iteritems() if k >= 1952 and k <= 1999])

	# remove 0 values
	female_working = dict((k, v) for k, v in female_working.iteritems() if v > 0)
	male_working = dict((k, v) for k, v in male_working.iteritems() if v > 0)	

	p_male = {}
	p_male.update({k: 1.0 for k in male_working.viewkeys() - female_working})
	p_male.update({k: 0. for k in female_working.viewkeys() - male_working})
	p_male.update({k: float(male_working[k]) / (male_working[k]+female_working[k]) for k in male_working.viewkeys() & female_working.viewkeys()})

	#print {k:v for k,v in p_male.iteritems() if v >= .45 and v <= .55}
	#print p_male
	#print male_working['Karin']
	#print female_working['Karin']
	#p_male =  {k: f(k, male_working[k], female_working[k]) for k in male_working.viewkeys() & female_working.viewkeys()}

	#p_male =  {k: f(k, male_working[k], female_working[k]) for k in male_working.viewkeys() | female_working.viewkeys()}
	#print male_working

	#print [k for k in male.viewkeys() ^ female.viewkeys()]
	#{k: f(A[k], B[k]) for k in male.viewkeys() & not female.viewkeys()}

	file.close()
	pickle.dump( male, open( "male_db.p", "wb" ), pickle.HIGHEST_PROTOCOL )
	pickle.dump( female, open( "female_db.p", "wb" ), pickle.HIGHEST_PROTOCOL )
	pickle.dump( p_male, open( "p_male.p", "wb" ), pickle.HIGHEST_PROTOCOL )		

	# pickle.dump( male_count, open( "male_count.p", "wb" ), pickle.HIGHEST_PROTOCOL )
	# pickle.dump( female_count, open( "female_count.p", "wb" ), pickle.HIGHEST_PROTOCOL )	

def LoadDB():
	return [pickle.load( open( "male_db.p", "rb" )), 
	pickle.load( open( "female_db.p", "rb" )),
	pickle.load( open( "p_male.p", "rb" )),
	# pickle.load( open( "male_count.p", "rb" )),
	# pickle.load( open( "female_count.p", "rb" )),
	]


if __name__ == "__main__":
	
	# CreateDB()
	# exit()
	
	print "Loading DB..."
	male, female, p_male = LoadDB()
	print "done."

	d = {}
	q = Q.PriorityQueue()
	for key, counts in male.iteritems():
		f_sum = 0
		m_sum = sum(counts.values())
		if key in female:
			f_sum = sum(female[key].values())
			# print key + ' ' + str(m_sum) + ' ' + str(f_sum)
			if (m_sum+f_sum) > 100000:
				q.put((100*f_sum / (m_sum+f_sum), key, m_sum, f_sum))

	for item in iter(q.get, None):
		print item
	exit()

	mNames = ['William', 'Michael', 'Noah', 'Mason', 'Leslie', 'Lauren', 'Ashley',
	'Allison', 'Meredith', 'Whitney', 'Beverly', 'Jackie', 'Dakota', 'Jessie', 'Jaime', 'Jamie', 'Adolf', 'Rory', 'Jacob'];
	fNames = ['Emma', 'Olivia', 'Isabella', 'Harper', 'Samantha', 'Madison', 'Leslie', 'Lauren', 'Ashley',
	'Allison', 'Meredith', 'Whitney', 'Beverly', 'Jackie', 'Dakota', 'Jessie', 'Jaime', 'Jamie', 'Katrina',
	'Isis', 'Hillary', 'Clara', 'Lillian', 'Amelia', 'Rory'];

# Ashley
# Allison
# Meredith
# Lindsey/Lindsay
# Whitney
# Beverly

	names = []
	for name in mNames:
		if name=='Rory':
			male[name] = {year:count for year,count in male[name].items() if year < 2010 and year > 1982}
		if name=='Jaime' or name=='Jamie':
			male[name] = {year:count for year,count in male[name].items() if year > 1980}
		print male[name]
		names.append({'name': name, 'sex': 'M', 'data': male[name]})
	for name in fNames:
		if name=='Rory':
			female[name] = {year:count for year,count in female[name].items() if year < 2010 and year > 1982}
		if name=='Jaime' or name=='Jamie':
			female[name] = {year:count for year,count in female[name].items() if year > 1980}
		if name=='Katrina':
			female[name] = {year:count for year,count in female[name].items() if year > 1950}
		if name=='Isis':
			female[name] = {year:count for year,count in female[name].items() if year > 1980}
			female[name][2016] = 53
		names.append({'name': name, 'sex': 'F', 'data': female[name]})			

	# names.append({'name': 'Michael', 'sex': 'M', 'data': male['Michael']})
	# names.append({'name': 'Noah', 'sex': 'M', 'data': male['Noah']})
	# names.append({'name': 'William', 'sex': 'M', 'data': male['William']})
	# names.append({'name': 'Mason', 'sex': 'M', 'data': male['Mason']})
	# names.append({'name': 'Leslie', 'sex': 'M', 'data': male['Leslie']})
	# names.append({'name': 'Lauren', 'sex': 'M', 'data': male['Lauren']})	

	# names.append({'name': 'Emma', 'sex': 'F', 'data': female['Emma']})
	# names.append({'name': 'Olivia', 'sex': 'F', 'data': female['Olivia']})
	# names.append({'name': 'Isabella', 'sex': 'F', 'data': female['Isabella']})
	# names.append({'name': 'Harper', 'sex': 'F', 'data': female['Harper']})
	# names.append({'name': 'Samantha', 'sex': 'F', 'data': female['Samantha']})			
	# names.append({'name': 'Madison', 'sex': 'F', 'data': female['Madison']})			
	# names.append({'name': 'Leslie', 'sex': 'F', 'data': female['Leslie']})
	# names.append({'name': 'Lauren', 'sex': 'F', 'data': female['Lauren']})

	for name in names:
		print name
		data = name['data']
		if name['sex']=='M':
			print 'male'
			for year in data:
				data[year] /= float(male_count[str(year)])
		else:
			print 'female'
			for year in data:
				data[year] /= float(female_count[str(year)])
	# print names
	with open('result.json', 'w') as fp:
		json.dump(names, fp)


	# # # a = functools.reduce(operator.add, map(collections.Counter, [female['Scarlet'], female['Scarlett']]))	
	# # # a = functools.reduce(operator.add, map(collections.Counter, [male['John'], male['Jonathan']]))	
	# a = male['Michael']
	# b = male['Noah']

	# for year in a:
	# 	a[year] /= float(male_count[str(year)])
	# 	b[year] /= float(male_count[str(year)])
	# # for year in b:
	# # 	b[year] /= float(female_count[year])

	# with open('result.json', 'w') as fp:
	# 	json.dump({'Michael': a, 'Mason': b}, fp)
	
	# print 'Scarlett:'	
	# print female['Scarlett']
	# print 'Scarlet:'
	# print female['Scarlet']
	# print 'JOINT:'
	# print functools.reduce(operator.add, map(collections.Counter, [female['Scarlet'], female['Scarlett']]))	

	# print a
	# fig1 = plt.figure();
	# plt.bar(range(len(a)), a.values(), align='center')
	# plt.xticks(range(len(a)), a.keys())
	# plt.show()

