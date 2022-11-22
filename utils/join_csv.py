
import pandas as pd

# reading two csv files
data1 = pd.read_csv('movies_1.csv')
data2 = pd.read_csv('movie_primary_genre.csv')

# using merge function by setting how='inner'
output1 = pd.merge(data1, data2,
                   on='id',
                   how='inner')

# displaying result
print(output1)
