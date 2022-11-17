import { Movie } from '../../types/appTypes';
import {
	Form,
	Button,
	Alert,
	Card,
	Container,
	Accordion,
} from 'react-bootstrap';
// import ListGroup from 'react-bootstrap/ListGroup';
var _ = require('lodash');

import { useState, useEffect } from 'react';

type FilterInputs = {
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
};
const FilterControls = ({
	onFilterChange,
	filterInputs,
}: {
	onFilterChange: EventTarget | any;
	filterInputs: FilterInputs;
}) => {
	const [genres, setGenres] = useState([
		'',
		'Adventure',
		'Action',
		'Comedy',
		'Documentary',
		'Drama',
		'Fantasy',
		'Family',
		'Film-Noir',
		'Horror',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Thriller',
		'War',
		'Western',
	]);
	const [languages, setLanguages] = useState([
		'',
		'en',
		'fi',
		'cn',
		'hi',
		'es',
		'fr',
		'ar',
		'jp',
		'ko',
		'it',
		'de',
		'bn',
		'ru',
		'pt',
		'ro',
		'hu',
	]);
	// A Trip to the Moon (1902) is considered the first movie released
	const [years, setYears] = useState(_.range(1902, new Date().getFullYear()));
	const [ratings, setRatings] = useState(_.range(1, 10));
	// console.log(filterInputs);
	return (
		<>
			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Advanced search</Accordion.Header>
					<Accordion.Body>
						<Form>
							<Form.Group className="mb-5">
								<Form.Label className="fs-5">Description</Form.Label>
								<input
									name="description"
									onChange={(e) => onFilterChange(e)}
									value={filterInputs.description}
								/>

								<div>
									<Form.Label className="fs-5">From year</Form.Label>
									<Form.Select
										aria-label="From year"
										// defaultValue={new Date().getFullYear() - 10}
										id="fromYear"
										name="fromYear"
										value={filterInputs.fromYear}
										onChange={(e) => onFilterChange(e)}
									>
										{years.map((year: number) => (
											<option key={year}>{year}</option>
										))}
									</Form.Select>
									<Form.Label className="fs-5">To year</Form.Label>
									<Form.Select
										aria-label="To year"
										// defaultValue={2021}
										id="toYear"
										name="toYear"
										value={filterInputs.toYear}
										onChange={(e) => onFilterChange(e)}
									>
										{years.map((year: number) => (
											<option key={year}>{year}</option>
										))}
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">From runtime</Form.Label>
									<Form.Select
										aria-label="From runtime"
										// defaultValue={5}
										id="fromRunTime"
										name="fromRunTime"
										value={filterInputs.fromRunTime}
										onChange={(e) => onFilterChange(e)}
									>
										<option value="0">0</option>
										<option value="30">30</option>
										<option value="60">60</option>
										<option value="90">90</option>
										<option value="120">120</option>
										<option value="300">300</option>
										<option value="5100">5100</option>
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">To runtime</Form.Label>
									<Form.Select
										aria-label="To runtime"
										// defaultValue={200}
										id="toRunTime"
										name="toRunTime"
										value={filterInputs.toRunTime}
										onChange={(e) => onFilterChange(e)}
									>
										<option value="0">0</option>
										<option value="30">30</option>
										<option value="60">60</option>
										<option value="90">90</option>
										<option value="120">120</option>
										<option value="300">300</option>
										<option value="5100">5100</option>
									</Form.Select>
								</div>

								<div>
									<Form.Label className="fs-5">Order By</Form.Label>
									<div>
										<Form.Select
											aria-label="Order By"
											// defaultValue="Desc"
											id="orderBy"
											name="orderBy"
											value={filterInputs.orderBy}
											onChange={(e) => onFilterChange(e)}
										>
											<option value="desc">Descending</option>
											<option value="asc">Ascending</option>
										</Form.Select>
									</div>
								</div>
								<div>
									<Form.Label className="fs-5">Sort By</Form.Label>
									<Form.Select
										aria-label="Sort By"
										// defaultValue="rating"
										id="sortBy"
										name="sortBy"
										value={filterInputs.sortBy}
										onChange={(e) => onFilterChange(e)}
									>
										<option value="title">title</option>
										<option value="year">year</option>
										<option value="rating">rating</option>
										<option value="downloads">downloads</option>
										<option value="seeds">seeds</option>
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">Quality</Form.Label>
									<div>
										<Form.Select
											aria-label="Quality"
											// defaultValue="720p"
											id="quality"
											name="quality"
											value={filterInputs.quality}
											onChange={(e) => onFilterChange(e)}
										>
											<option value="SD">SD</option>
											<option value="720p">720p</option>
											<option value="1080p">1080p</option>
											<option value="3D">3D</option>
										</Form.Select>
									</div>
								</div>
								<div>
									<Form.Label className="fs-5">Seeds</Form.Label>
									<div>
										<Form.Select
											aria-label="Seeds"
											// defaultValue="1"
											id="seeds"
											name="seeds"
											value={filterInputs.seeds}
											onChange={(e) => onFilterChange(e)}
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="5">5</option>
											<option value="10">10</option>
										</Form.Select>
									</div>
								</div>
								<div>
									<Form.Label className="fs-5">Genre</Form.Label>
									<Form.Select
										aria-label="Genre"
										id="genre"
										name="genre"
										value={filterInputs.genre}
										onChange={(e) => onFilterChange(e)}
									>
										{genres.map((genre) => (
											<option key={genre + '1'}>{genre}</option>
										))}
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">Language</Form.Label>
									<Form.Select
										aria-label="Language"
										id="language"
										name="language"
										value={filterInputs.language}
										onChange={(e) => onFilterChange(e)}
									>
										{languages.map((language) => (
											<option key={language + '1'}>{language}</option>
										))}
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">Imdb rating</Form.Label>
									<Form.Select
										aria-label="Imdb rating"
										// defaultValue={7}
										id="imdbRating"
										name="imdbRating"
										value={filterInputs.imdbRating}
										onChange={(e) => onFilterChange(e)}
									>
										{ratings.map((rating: number) => (
											<option key={rating}>{rating}</option>
										))}
									</Form.Select>
								</div>
							</Form.Group>
						</Form>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
};

export default FilterControls;
/*Rank
(2010)	Country	Number of feature films produced1
2005	2006	2007	2008	2009	2010
1	India	1,041	1,016	1,164	1,325	1,288	1,274
2	US	699	673	909	716	734	754
3	China	260	330	402	406	456	526
4	Japan	356	417	407	418	448	408
5	France	240	203	228	240	230	261
6	Spain	142	150	172	173	186	201
7	South Korea	87	110	124	113	139	152
8	Italy	98	116	121	154	131	141
9	Germany	103	122	122	125	150	119
9=	UK	131	134	117	111	144	119
11	Russian Federation	160	200	200	220	101	96
12	Argentina	60	60	80	90	98	88
13	Indonesia	50	60	77	85	102	81
14	Brazil	90	142	117	90	94	76
15	Philippines	58	56	47	58	70	73
16	Mexico	53	65	70	70	66	69
17	Turkey	30	39	43	51	68	65
18	Hong Kong	55	51	50	53	70	54
19	Netherlands	24	29	26	32	36	45
19=	Austria	24	32	32	28	34	45
21	Sweden	54	51	28	23	41	43
22	Poland	29	37	31	40	48	42
23	Taiwan	17	24	30	36	32	38
23=	Malaysia	20	28	28	28	27	38
23=	Finland	13	14	17	18	25	38
26	Czech Republic	20	22	17	38	33	37
26=	Australia	29	32	30	34	32	37
28	Belgium	28	30	58	64	51	31
28=	Denmark	41	20	24	26	28	31
30	Norway	19	19	22	23	27	27
31	Switzerland	47	50	76	58	46	25
31=	Egypt	23	40	42	45	40	25
31=	Chile	15	16	10	22	24	25
34	South Africa	11	10	15	14	24	23
35	Hungary	26	28	41	24	27	22
35=	Portugal	16	19	15	21	23	22
37	Ireland	12	12	14	22	20	21
38	Romania	20	18	11	9	18	19
39	Greece	16	21	20	23	25	18
40	Morocco	12	15	10	10	12	17
41	Israel	12	16	18	15	20	16
42	Venezuela	5	9	8	16	10	15
43	Singapore	8	10	11	14	16	14
44	Croatia	5	8	9	9	13	12
44=	Colombia	14	14	14	14	10	12
46	Bulgaria	4	7	13	10	11	11
47	Iceland	3	4	4	5	12	9
48	Slovakia	5	3	10	11	18	8
49	Uruguay	n.a.	n.a.	n.a.	n.a.	9	6
50	Estonia	4	8	10	5	7	4
*/
