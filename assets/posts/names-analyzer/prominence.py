import json
import pprint
import numpy as np

states = ['MA', 'WA', 'CA', 'OR', 'WI', 'ME', 'MI', 'NV', 'NM', 'CO', 'WY', 'KS', 'NE', 'OK', 'MO', 'IL', 'IN', 'VT', 'AR', 'TX', 'RI', 'AL', 'MS', 'NC', 'VA', 'IA', 'MD', 'DE', 'PA', 'NJ', 'NY', 'ID', 'SD', 'CT', 'NH', 'KY', 'OH', 'TN', 'WV', 'DC', 'LA', 'FL', 'GA', 'SC', 'MN', 'MT', 'ND', 'AZ', 'UT', 'HI', 'AK']

# a = np.fromfile("female_data.dat",  dtype=np.int32)
# print(a[0::111])
# print(len(a[0::111]))
# # with open('female_data.dat', 'rb') as f:
# # 	print(f.read())
# # 	# print(f.tolist())

# exit()

state_prom = {s: {'male':'', 'female':''} for s in states}
min_names = 100

for state in states:
	
	max_prom = 0
	max_name = ''

	with open('male_state_data.json') as f:
		names = json.load(f)
		for n,m in names.items():
			if sum(m) < min_names:
				continue
			prom = m[states.index(state)] / sum(m)
			if prom > max_prom:
				max_prom=prom 
				max_name = n
	state_prom[state]['male'] = max_name

for state in states:
	
	max_prom = 0
	max_name = ''

	with open('female_state_data.json') as f:
		names = json.load(f)
		for n,m in names.items():
			if sum(m) < min_names:
				continue
			prom = m[states.index(state)] / sum(m)
			if prom > max_prom:
				max_prom=prom 
				max_name = n
	state_prom[state]['female'] = max_name

pprint.pprint(state_prom)

with open('prominence.json', 'w') as f:
	# arr = [{state:k, male:v.male, female:v.female} for (k,v) in state_prom.items()]
	arr = [{'state':k, 'male':v['male'], 'female':v['female']} for (k,v) in state_prom.items()]
	arr.sort(key=lambda x: x['state'])
	json_object = json.dumps(arr)
	f.write(json_object)	   
