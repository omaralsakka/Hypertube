import pandas as pd



# Select column (can be A,B,C,D)
col = 'genres';

# Find and replace values in the selected column
df[col] = df[col].replace(''', '"')
