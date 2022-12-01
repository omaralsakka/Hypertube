import { TOptions } from 'i18next';
import { date } from 'zod';
import { rootReducer } from '../store/store';

export type i18translateType = {
	t: (
		key: string | TemplateStringsArray | (string | TemplateStringsArray)[],
		// eslint-disable-next-line @typescript-eslint/ban-types
		options?: string | TOptions<String> | undefined
	) => string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	image: string;
	OAuth: boolean;
	firstLogin: boolean;
	emailVerified: string;
	firstLogin: number;
};
//yts data
export type Movie = {
	background_image: string;
	background_image_original: string;
	date_uploaded: string;
	date_uploaded_unix: number;
	description_full: string;
	genres: [];
	genreName: string;
	genre: [];
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
//omdb data
export type MovieData = {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: [];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
};

export type Cast = {
	adult: string;
	cast_id: string;
	character: string;
	credit_id: string;
	gender: string;
	id: string;
	known_for_department: string;
	name: string;
	order: string;
	original_name: string;
	popularity: string;
	profile_path: string;
};

export type Crew = {
	adult: string;
	credit_id: string;
	department: string;
	gender: string;
	id: string;
	job: string;
	name: string;
	original_name: string;
	popularity: string;
	profile_path: string;
};

export type MovieId = string | string[] | undefined;

export type Movies = Movie[] | [];

export type RootReducer = ReturnType<typeof rootReducer>;

export type Comment = {
	id: string;
	userId: string;
	created_at: string;
	comment_text: string;
	user: {
		id: any;
		image: string;
		name: string;
		created_at: Date;
	};
};

export type Inputs = {
	name: string;
	email: string;
	password: string;
};

export type EmailInput = Omit<Inputs, 'name' | 'password'>;

export type PageLayout = {
	children: React.ReactNode;
};

export type MoviePostInfo = {
	imdb_code: '';
	movie_path: '';
	size: 0;
};

export type WatchedMoviesUpsert = {
	id?: string;
	user_id: string;
	movies: string;
};

export type FilterInputs = {
	fromYear: string;
	toYear: string;
	genre: string;
	imdbRating: string;
	orderBy: string;
	sortBy: string;
	quality: string;
	seeds: string;
	fromRunTime: string;
	language: string;
	toRunTime: string;
	limit: string;
	description: string;
	page: number;
};
