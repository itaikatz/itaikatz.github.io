import re 
import os
import json
import array 
# import functools
from functools import reduce

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

data = {}
names = []
with open('male_names.json') as n:
	names = json.load(n)
	data = {name: [0]*num_states for name in names}

k=0
for i, file in enumerate(files):
	with open(path+file) as f:
		lines = f.readlines()
		print(k)
		k+=1

		lines_ = [line.split(',') for line in lines if line.split(',')[3].lower() in names]
		for line in lines_:
			name = line[3].lower()
			val = line[4]
			data[name][i] = data[name][i] + int(val)

with open('male_state_data.json', 'w') as f:
	json_object = json.dumps(data)
	f.write(json_object)	   




data = {}
names = []
with open('female_names.json') as n:
	names = json.load(n)
	data = {name: [0]*num_states for name in names}

k=0
for i, file in enumerate(files):
	with open(path+file) as f:
		lines = f.readlines()
		print(k)
		k+=1

		lines_ = [line.split(',') for line in lines if line.split(',')[3].lower() in names]
		for line in lines_:
			name = line[3].lower()
			val = line[4]
			data[name][i] = data[name][i] + int(val)

with open('female_state_data.json', 'w') as f:
	json_object = json.dumps(data)
	f.write(json_object)	   

