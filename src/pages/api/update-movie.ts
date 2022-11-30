import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
var { spawn } = require('child_process');
const path = require('path');

const updateMovie = async (req: NextApiRequest, res: NextApiResponse) => {
// 	const result = await prisma.$queryRaw(
// 		Prisma.sql`COPY"Movie"(id ,url,imdb_code,title,title_english,title_long,slug,year,rating,runtime,genres,summary,description_full,synopsis,yt_trailer_code,language,mpa_rating,background_image,background_image_original,small_cover_image,medium_cover_image,large_cover_image,state,date_uploaded,date_uploaded_unix)
// 		FROM'/new_movies_uniq.tsv'
// 		DELIMITERS  E'\t' CSV header;`
// 	);

// 	const result = await prisma.$queryRaw(`
// 	COPY"Torrent"(url,hash,quality,type,seeds,peers,size,size_bytes,date_uploaded,date_uploaded_unix,"movieId")
// FROM '/new_torrents.tsv'
// DELIMITERS E'\t' CSV header;`);
// 	return res.status(200).json({ message: dataToSend });
// };
export default updateMovie;
