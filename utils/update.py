import requests
import json,urllib.request
import pandas as pd
import csv

newMovies = []
page = 1
URL = "https://yts.mx/api/v2/list_movies.json?limit=1"
data = requests.get(URL)
dataJson = json.loads(data.content)
numOfMovies = dataJson['data']['movie_count']
maxLimit=50
currentMovieCount = 45671
if (numOfMovies is not currentMovieCount):
	numOfFetches = ((numOfMovies - currentMovieCount)//maxLimit)
	while (page < numOfFetches):
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
	# movieGenres = []
	# i = 0
	# for row in mycsv:
	# 		if (i > 0):
	# 				if (row[10]): 
	# 						new_string = (row[10].replace(",", ""))
	# 						new_string = (new_string.replace("'", ""))
	# 						new_string = (new_string.strip("[]"))
	# 						genreSplit = new_string.split(" ")
	# 						movieGenre = {}
	# 						for g in genreSplit:
	# 								movieGenre['movieId'] = row[0];
	# 								movieGenre['genre'] = g;
	# 								movieGenres.append(movieGenre.copy())
	# 		i+=1
	# with open('new_movie_genres.json', 'w') as json_file:
	# 	json.dump(movieGenres, json_file)
	# with open('new_movie_genres.json', encoding='utf-8') as inputfile:
	# 		df = pd.read_json(inputfile)
	# df.to_csv('new_movie_genres.csv', encoding='utf-8', index=False)
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
	df.to_csv('new_torrents.tsv', encoding='utf-8', index=False, sep='\t')
	df = pd.read_csv('new_movies.tsv', sep='\t')
	df['genres'] = df['genres'].str.replace(r"'", '')
	df['genres'] = df['genres'].str.replace(r"[", '{')
	df['genres'] = df['genres'].str.replace(r"]", '}')
	df = df.drop(columns=['torrents'])

	df.to_csv('new_movies_corr.tsv', encoding='utf-8', index=False, sep='\t')
