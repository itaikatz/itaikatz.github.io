import os
import json
import array 

target_name = 'katherine'
target_sex = 'f'

start_year = 1910
end_year = 2020
path = 'namesbystate\\'

# !!N.B. order of these states must mach the order in topo file
states = ['MA', 'WA', 'CA', 'OR', 'WI', 'ME', 'MI', 'NV', 'NM', 'CO', 'WY', 'KS', 'NE', 'OK', 'MO', 'IL', 'IN', 'VT', 'AR', 'TX', 'RI', 'AL', 'MS', 'NC', 'VA', 'IA', 'MD', 'DE', 'PA', 'NJ', 'NY', 'ID', 'SD', 'CT', 'NH', 'KY', 'OH', 'TN', 'WV', 'DC', 'LA', 'FL', 'GA', 'SC', 'MN', 'MT', 'ND', 'AZ', 'UT', 'HI', 'AK']

num_states = len(states)
num_years = end_year - start_year + 1

files = [state+'.txt' for state in states]
data = [[0]*num_states for _ in range(num_years) ]

m = 0
# for filename in files:
for i, file in enumerate(files):	
	with open(path+file) as f:
		for line in f:
			[state, sex, year, name, count] = line.split(',')
			if sex.lower()==target_sex.lower() and name.lower()==target_name.lower():				
				data[int(year)-start_year][i] = int(count)
				if int(count) > m:
					m = int(count)

# with open('rachel_f.json', 'w') as f:
#     json.dump(data, f)				

with open(target_name + '_' + target_sex + '.dat', 'wb') as f:
	# print(data)
	flat = sum([v for v in data], []) # concat into one long array
	packed = array.array('H', flat) # pack data in 2-byte unsigned ints	
	f.write(packed)	