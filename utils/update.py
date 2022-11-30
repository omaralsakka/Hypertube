import requests
import json
import pandas as pd
import csv

newMovies = []
page = 0
URL = "https://yts.mx/api/v2/list_movies.json?limit=1"
data = requests.get(URL)
dataJson = json.loads(data.content)
movieNum = dataJson['data']['movies'][0]['id']
maxLimit=50
currentMovieCount = 46423
if (movieNum > currentMovieCount):
	numOfFetches = ((movieNum - currentMovieCount)//maxLimit)
	while (page <= numOfFetches + 1):
			URL = "https://yts.mx/api/v2/list_movies.json?limit="+str(maxLimit)+"&page="+str(page)
			data = requests.get(URL)
			dataJson = json.loads(data.content)
			newMovies.extend(dataJson['data']['movies'])
			page += 1
	with open('new_movies.json', 'w') as json_file:
			json.dump(newMovies, json_file)
	with open('new_movies.json', encoding='utf-8') as inputfile:
			df = pd.read_json(inputfile)
	df.to_csv('new_movies.tsv', encoding='utf-8', index=False, sep='\t')
	mycsv = csv.reader(open('new_movies.tsv'),  delimiter='\t')
	torrents = []
	i = 0
	for row in mycsv:
			if (i > 0):
					if (row[23]):
							new_string = row[23].replace("\'", "\"" )
							jsonData = json.loads(new_string)
							jsonData[0]['movieId'] = row[0]
							torrents.append(jsonData[0])

			i += 1
	with open('new_torrents.json', 'w') as json_file:
			json.dump(torrents, json_file)
	with open('new_torrents.json', encoding='utf-8') as inputfile:
				df = pd.read_json(inputfile)
	df = df.drop_duplicates()
	df = df[df['movieId'] > currentMovieCount]
	df.to_csv('new_torrents.tsv', encoding='utf-8', index=False, sep='\t')
	df = pd.read_csv('new_movies.tsv', sep='\t')
	df['genres'] = df['genres'].str.replace(r"'", '')
	df['genres'] = df['genres'].str.replace(r"[", '{')
	df['genres'] = df['genres'].str.replace(r"]", '}')
	df = df.drop(columns=['torrents'])
	df = df.drop_duplicates()
	df = df[df['id'] > currentMovieCount]

	df.to_csv('new_movies.tsv', encoding='utf-8', index=False, sep='\t')
