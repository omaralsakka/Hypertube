
import pandas as pd


df = pd.read_csv('movies_2.csv')
df = df.drop(columns=['torrents'])
df = df.set_index('id')
df['genres'] = df['genres'].str.replace(r"'", '')
df['genres'] = df['genres'].str.replace(r"[", '{')
df['genres'] = df['genres'].str.replace(r"]", '}')
df.to_csv('movies_2.tsv', encoding='utf-8', sep='\t')




#df.to_csv('new_movies_corr.tsv', encoding='utf-8', index=False, sep='\t')
