import json
import csv
mycsv = csv.reader(open('movies.csv'))


#id and categories
i = 0
genres = {}
genresList = []
found = False
for row in mycsv:
    if (i > 0):
        if (i > 0):
            if (row[10]): 
                new_string = (row[10].replace(",", ""))
                new_string = (new_string.replace("'", ""))
                new_string = (new_string.strip("[]"))
                genreSplit = new_string.split(" ")
                for g in genreSplit:
                    genres['name'] = g
                    # print(genres)
                    for listGen in genresList:
                        if (listGen['name'] == g):
                            found = True

                    if (not found):
                        genresList.append(genres.copy())
                found = False

            
    i+=1
with open('genres.json', 'w') as json_file:
    json.dump(genresList, json_file)


# print(genresList)
with open('genres.json', 'w') as json_file:
    json.dump(genres, json_file)
# move categories
i = 0
mycsv = csv.reader(open('movies.csv'))
movieGenres = []
for row in mycsv:
    if (i > 0):
        if (row[10]): 
            new_string = (row[10].replace(",", ""))
            new_string = (new_string.replace("'", ""))
            new_string = (new_string.strip("[]"))
            genreSplit = new_string.split(" ")
            movieGenre = {}

            for g in genreSplit:
                movieGenre['movieId'] = row[0];
                movieGenre['genre'] = g;
                movieGenres.append(movieGenre.copy())


    i+=1

# print(movieGenres)


with open('movie_genres.json', 'w') as json_file:
    json.dump(movieGenres, json_file)

# #id and torrents
# torrents = []
# i = 0
# for row in mycsv:
#     if (i > 0):
#         if (row[23]):
#             new_string = row[23].replace("\'", "\"" )
#             jsonData = json.loads(new_string)
#             jsonData[0]['movieId'] = row[0]
#             torrents.append(jsonData[0])

#     i += 1
# with open('torrents.json', 'w') as json_file:
#     json.dump(torrents, json_file)