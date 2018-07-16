import re
import json
import cPickle as pickle
import colorama
import sys
import os
import locale 
import collections

if __name__ == "__main__":
	colorama.init(strip=False, convert=True)
	pMale = pickle.load( open( "p_male.p", "rb" ))
	locale.setlocale(locale.LC_ALL, '')

	r = re.compile('([A-Z\'-.]+),+[-\s]*([A-Z\']+)', re.UNICODE)

	# data = pickle.load( open( "salary/salary.p", "rb" ))
	# salary = json.loads(data)

	mSal = 0
	fSal = 0
	mCount = 0
	fCount = 0
	xCount = 0
	mScale = collections.defaultdict(dict)
	fScale = collections.defaultdict(dict)
	mOcc = collections.defaultdict(dict)
	fOcc = collections.defaultdict(dict)

	occupations = ['GENERAL PHYSICAL SCIENCE', 
					'NURSE', 
					'COMPUTER SCIENCE', 
					'MISCELLANEOUS CLERK AND ASSISTANT', 
					'MANAGEMENT AND PROGRAM ANALYSIS', 
					'GENERAL ATTORNEY',
					'MEDICAL OFFICER',
					'ACCOUNTING',
					'AIR TRAFFIC CONTROL']
	for occ in occupations:
		mOcc[occ] = {'sum': 0, 'count': 0}
		fOcc[occ] = {'sum': 0, 'count': 0}

	i=0
	files = [j for j in os.listdir('salary') if 'salary_' in j]
	print files
	for file in files:
		print file
		salary = json.loads(pickle.load( open( 'salary/' + file, "rb" )))

		print len(salary['aaData'])
		for employee in salary['aaData']:
			match = r.search(employee[0])
			if not match:
				# print employee[0]
				xCount += 1
				continue
			firstName = (match.group(2)[0] + match.group(2)[1:].lower()).encode('ascii')
			if not firstName in pMale:
				xCount += 1
				continue
			pay = locale.atof(employee[3][1:]) + locale.atof(employee[4][1:])
			mSal += pMale[firstName] * pay
			fSal += (1.0-pMale[firstName]) * pay
			mCount += pMale[firstName]
			fCount += (1.0-pMale[firstName])

			if employee[7] in occupations:
				occupation = employee[7]
				mOcc[occupation]['sum'] += pMale[firstName] * pay
				fOcc[occupation]['sum'] += (1.0-pMale[firstName]) * pay
				mOcc[occupation]['count'] += pMale[firstName]
				fOcc[occupation]['count'] += (1 - pMale[firstName])


			if employee[2]=='GS':
				scale = employee[2] + '-' + employee[1]
				if scale not in mScale:
					mScale[scale]['sum'] = 0;
					mScale[scale]['count'] = 0;				
					fScale[scale]['sum'] = 0;
					fScale[scale]['count'] = 0;				
				mScale[scale]['sum'] += pMale[firstName] * pay
				fScale[scale]['sum'] += (1.0-pMale[firstName]) * pay
				mScale[scale]['count'] += pMale[firstName]
				fScale[scale]['count'] += (1 - pMale[firstName])

			i+=1 
	mSal /= mCount
	fSal /= fCount	
	print 'mCount: ' + str(mCount)	
	print 'fCount: ' + str(fCount)	
	print 'num unknown: ' + str(xCount)	
	print 'mSal: ' + str(mSal)
	print 'fSal: ' + str(fSal)
	gap = (mSal - fSal) / fSal;
	print 'male premium: ' + str(gap)
	print '------------------------'
	for scale in mScale.iteritems():
		if mScale[scale[0]]['count']==0 or fScale[scale[0]]['count']==0:
			continue
		
		mCount = mScale[scale[0]]['count']
		fCount = fScale[scale[0]]['count']		
		mPay = mScale[scale[0]]['sum'] / mCount
		fPay = fScale[scale[0]]['sum'] / fCount
		
		print scale[0] + ': ' + str(mCount) + '/' + str(fCount) + ': ' + str(mPay) + '/' + str(fPay)
	print '------------------------'
	for occ in occupations:
		mCount = mOcc[occ]['count']
		fCount = fOcc[occ]['count']		
		mPay = mOcc[occ]['sum'] / mCount
		fPay = fOcc[occ]['sum'] / fCount
		print occ + ': ' + str(mCount) + '/' + str(fCount) + ': ' + str(mPay) + '/' + str(fPay)






		# print mScale[scale[0]]
		# print fScale[scale[0]]
		# mPay = scale[1]['sum'] / scale[1]['count']
		# print scale + ': ' + mPay

	# i = 0
	# for employee in salary['aaData']:
	# 	match = r.search(employee[0])
	# 	firstName = (match.group(2)[0] + match.group(2)[1:].lower()).encode('ascii')
	# 	if not firstName in pMale:
	# 		color = colorama.Back.RED
	# 	elif pMale[firstName] > 0.5:
	# 		color = colorama.Fore.CYAN
	# 	else:
	# 		color = colorama.Fore.MAGENTA

	# 	start = match.span(2)[0]
	# 	end = match.span(2)[1]
	# 	fullName = employee[0][:start] + color + employee[0][start:end] + colorama.Style.RESET_ALL + employee[0][end:] 
	# 	print(color + firstName + colorama.Style.RESET_ALL + ": " + fullName)
	# 	i+=1
	# 	if (i%20==0):
	# 		os.system("pause")
