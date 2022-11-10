import pandas as pd

with open('movie_genres.json', encoding='utf-8') as inputfile:
    df = pd.read_json(inputfile)

df.to_csv('movie_genres.csv', encoding='utf-8', index=False)
