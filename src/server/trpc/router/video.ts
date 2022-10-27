import { router, publicProcedure } from "../trpc";
import { string, z } from "zod";

interface torrentDataInter { 
	url: string,
	hash: string,
	quality: string,
	type: string,
	seeds: number,
	peers: number,
	size: string,
	size_bytes: number,
	date_uploaded: string,
	date_uploaded_unix: number
};

const torrentData = { 
	url: z.string(),
	hash: z.string(),
	quality: z.string(),
	type: z.string(),
	seeds: z.number(),
	peers: z.number(),
	size: z.string(),
	size_bytes: z.number(),
	date_uploaded: z.string(),
	date_uploaded_unix: z.number()
};

const requestData = z.object({
	id: z.number(),
	imdbCode: z.string(),
	titleLong: z.string(),
	torrents: z.array(z.object(torrentData))
})

const createMagnetLink = (torrents: torrentDataInter[], movieTitle: string): string => {
	let infoHash: torrentDataInter | string = torrents.reduce((curr , prev) => prev.size_bytes < curr.size_bytes ? prev : curr);
	infoHash = infoHash.hash;
	const magnetLink: string = encodeURI(`magnet:?xt=urn:btih:${infoHash}` + `&dn=${movieTitle}`);
	
	return magnetLink;
}

export const videoRouter = router({
  stream: publicProcedure
	.input(requestData)
	.query(({ input }) => {
		const id: number = input.id;
		const imdbCode: string = input.imdbCode;
		const movieTitle: string = input.titleLong;
		const torrents: torrentDataInter[] = input.torrents; // type this, had some issues because of the multidimensions
		
		const uri: string = createMagnetLink(torrents, movieTitle);
		
		return {};
	})
});
