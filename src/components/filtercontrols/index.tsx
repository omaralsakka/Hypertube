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
	fromYear: number;
	toYear: number;
	genre: string;
	imdbRating: number;
	orderBy: string;
	sortBy: string;
	quality: string;
	seeds: number;
	fromRunTime: number;
	toRunTime: number;
	limit: number;
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
		'Action',
		'Comedy',
		'Drama',
		'Fantasy',
		'Horror',
		'Mystery',
		'Romance',
		'Thriller',
		'Western',
	]);
	// A Trip to the Moon (1902) is considered the first movie released
	const [years, setYears] = useState(_.range(1902, new Date().getFullYear()));
	const [ratings, setRatings] = useState(_.range(1, 10));
	console.log(filterInputs);
	return (
		<>
			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>Advanced search</Accordion.Header>
					<Accordion.Body>
						<Form>
							<Form.Group className="mb-5">
								<div>
									<Form.Label className="fs-5">From year</Form.Label>
									<Form.Select
										aria-label="From year"
										defaultValue={new Date().getFullYear() - 10}
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
										defaultValue={2021}
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
										defaultValue={5}
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
										defaultValue={200}
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
											defaultValue="Desc"
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
										defaultValue="rating"
										id="sortBy"
										name="sortBy"
										value={filterInputs.sortBy}
										onChange={(e) => onFilterChange(e)}
									>
										<option value="title">title</option>
										<option value="year">year</option>
										<option value="rating">rating</option>
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">Quality</Form.Label>
									<div>
										<Form.Select
											aria-label="Quality"
											defaultValue="720p"
											id="quality"
											name="quality"
											value={filterInputs.quality}
											onChange={(e) => onFilterChange(e)}
										>
											<option value="SD">title</option>
											<option value="720p">720p</option>
											<option value="1080p">1080p</option>
											<option value="4k">4k</option>
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
									<Form.Label className="fs-5">Imdb rating</Form.Label>
									<Form.Select
										aria-label="Imdb rating"
										defaultValue={7}
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
