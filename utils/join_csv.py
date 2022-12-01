
import pandas as pd

# reading two csv files
data1 = pd.read_csv('test_movies.csv')
data2 = pd.read_csv('genres_array.csv')

# using merge function by setting how='inner'
output1 = pd.merge(data1, data2,
                   on='id',
                   how='inner')
output1.set_index('id', inplace = True)

# displaying result
#print(output1)
output1.to_csv('movies_with_arraygenre.csv', encoding='utf-8')

