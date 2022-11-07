
tail -n +2 movies.csv | split -l 25000 - split_
for file in split_*
do
    head -n 1 movies.csv > tmp_file
    cat "$file" >> tmp_file
    mv -f tmp_file "$file"
done
