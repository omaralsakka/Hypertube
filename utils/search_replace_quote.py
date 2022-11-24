import pandas as pd
import csv

df = pd.read_csv('test_movies.csv')
# Select column (can be A,B,C,D)


# Find and replace values in the selected column
#df['genres'] = df['genres'].str.replace('\"','') )
df['genres'] = df['genres'].str.replace(r"'", '\"')
#with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
#   print(df['genres'])
df.to_csv('test_movies_corrected.csv', encoding='utf-8', index=False,  quoting=csv.QUOTE_NONE, quotechar="",  escapechar="\\")
