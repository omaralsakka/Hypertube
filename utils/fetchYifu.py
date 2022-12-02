import requests
import json,urllib.request
movies = []
page = 1
URL = "https://yts.mx/api/v2/list_movies.json?limit=1"
data = requests.get(URL)
dataJson = json.loads(data.content)
numOfMovies = dataJson['data']['movie_count']
maxLimit=50
numOfFetches = (numOfMovies//maxLimit)

while (page < numOfFetches):
    URL = "https://yts.mx/api/v2/list_movies.json?limit="+str(maxLimit)+"&page="+str(page)
    data = requests.get(URL)
    dataJson = json.loads(data.content)
    movies.extend(dataJson['data']['movies'])
    page+=1

with open('movies.json', 'w') as json_file:
    json.dump(movies, json_file)
