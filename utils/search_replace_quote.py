import pandas as pd
import csv


df = pd.read_csv('movies_2.tsv', sep='\t')
# Select column (can be A,B,C,D)


# Find and replace values in the selected column
#df['genres'] = df['genres'].str.replace('\"','') )
df['genres'] = df['genres'].str.replace(r"'", '')

#column_list=["genres", "id"]

# df[column_list].set_index('id', inplace = True)
#with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
#print(df['genres'])
#df[column_list].to_csv('genres_array.csv', encoding='utf-8', index=False)
df.to_csv('movies_2_corr.tsv', encoding='utf-8', sep="\t")
