import requests
from bs4 import BeautifulSoup
import re
import sys
import csv
import codecs
sys.stdout = codecs.getwriter('utf8')(sys.stdout)

r  = requests.get('https://www.nobelprize.org/nobel_prizes/lists/all/')
#r  = requests.get('https://en.wikipedia.org/wiki/List_of_Nobel_laureates_in_Chemistry')
data = r.text
soup = BeautifulSoup(data, 'html.parser')

winners = []
prize_text = ''
prize_desc = ''
prize_year = ''
with open('test.csv', "wb") as csv_file:
	writer = csv.writer(csv_file, delimiter=',')
	for prizes in soup.find_all('div', "by_year"):
		for prize in prizes.children:
			if prize.name=='h3':
				if 'Physics' in prize.text:
					prize_text = 'Physics'
				elif 'Chemistry' in prize.text:
					prize_text = 'Chemistry'
				elif 'Medicine' in prize.text:
					prize_text = 'Medicine'	
				else:
					prize_text = prize.text
				prize_year = re.search(r"\d{4}", prize.text).group(0)								

			if prize.name=='h6':
				winners = [winner.text for winner in prize.find_all('a')]
			if prize.name=='p':
				prize_desc = prize.text
		print "-----------------"
		if 'Literature' in prize_text or 'Peace' in prize_text or 'Economic' in prize_text:
			continue
		for winner in winners:
			writer.writerow([prize_text, prize_year, winner.encode('utf-8').strip(), prize_desc.encode('utf-8').strip()])
			#writer.writerow([prize_text,winner.encode('ascii'), prize_desc])

