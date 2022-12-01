import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
var fs = require('fs');

const getLatestMovie = async () => {
	const latest = await prisma.movie.findMany({
		orderBy: {
			id: 'desc',
		},
		take: 1,
	});
	return latest[0]?.id;
};

const updateMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	const movies = await prisma.$queryRaw`COPY "Movie"(
      id,
      url,
      imdb_code,
      title,
      title_english,
      title_long,
      slug,
      year,
      rating,
      runtime,
      genres,
      summary,
      description_full,
      synopsis,
      yt_trailer_code,
      language,
      mpa_rating,
      background_image,
      background_image_original,
      small_cover_image,
      medium_cover_image,
      large_cover_image,
      state,
      date_uploaded,
      date_uploaded_unix
    )
    FROM
      '/new-torrents/new_movies.tsv' DELIMITERS E '\t' CSV header;
    `;

	const torrents = await prisma.$queryRaw`COPY "Torrent"(
      url,
      hash,
      quality,
      type,
      seeds,
      peers,
      size,
      size_bytes,
      date_uploaded,
      date_uploaded_unix,
      "movieId"
    )
    FROM
      '/new-torrents/new_torrents.tsv' DELIMITERS E '\t' CSV header;`;

	const latest = await getLatestMovie();
	console.log(latest);

	fs.writeFile('latest_movie', latest, function (err) {
		if (err) throw err;
		console.log('File is created successfully.');
	});

	return res.status(200).json({ message: 'update complete' });
};
export default updateMovie;
