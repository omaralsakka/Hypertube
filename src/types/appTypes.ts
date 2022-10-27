import * as z from "zod";

export type Movie = {
	background_image: string;
	background_image_original: string;
	date_uploaded: string;
	date_uploaded_unix: number;
	description_full: string;
	genres: [];
	id: number;
	imdb_code: string;
	language: string;
	large_cover_image: string;
	medium_cover_image: string;
	mpa_rating: string;
	rating: number;
	runtime: number;
	slug: string;
	small_cover_image: string;
	state: string;
	summary: string;
	synopsis: string;
	title: string;
	title_english: string;
	title_long: string;
	torrents: [];
	url: string;
	year: number;
	yt_trailer_code: string;
};

export type Movies = [Movie];

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4).max(12),
  });
  
  export type ILogin = z.infer<typeof loginSchema>;
