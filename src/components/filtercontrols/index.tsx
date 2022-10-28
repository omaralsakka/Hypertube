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
import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
import { useState } from 'react';

type Inputs = {
	fromYear: number;
	toYear: number;
	genre: string;
	imdbRating: string;
	orderBy: string;
	sortBy: string;
	quality: string;
};

const FilterControls = ({ movie }: { movie: Movie }) => {
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
	// A Trip to the Moon (1902) is consired the first movie released
	const [years, setYears] = useState(_.range(1902, new Date().getFullYear()));
	const [ratings, setRatings] = useState(_.range(1, 10));
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		mode: 'onChange',
	});

	return (
		<>
			<Accordion
				defaultActiveKey="0"
				style={{
					maxWidth: '300px',
				}}
			>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Filters</Accordion.Header>
					<Accordion.Body>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-5">
								<div>
									<Form.Label className="fs-5">From year</Form.Label>
									<Form.Select
										aria-label="From year"
										defaultValue={new Date().getFullYear() - 10}
										{...register('fromYear')}
									>
										{years.map((year: number) => (
											<option key={year}>{year}</option>
										))}
									</Form.Select>
									<Form.Label className="fs-5">To year</Form.Label>
									<Form.Select
										aria-label="To year"
										defaultValue={2021}
										{...register('toYear')}
									>
										{years.map((year: number) => (
											<option key={year}>{year}</option>
										))}
									</Form.Select>
								</div>
								<div>
									<Form.Label className="fs-5">Order By</Form.Label>
									<div>
										<Form.Select
											aria-label="Order By"
											defaultValue="Desc"
											{...register('orderBy')}
										>
											<option value="Desc">Descending</option>
											<option value="Asc">Ascending</option>
										</Form.Select>
									</div>
								</div>
								<div>
									<Form.Label className="fs-5">Sort By</Form.Label>
									<Form.Select
										aria-label="Sort By"
										defaultValue="rating"
										{...register('sortBy')}
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
											{...register('quality')}
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
									<Form.Select aria-label="Genre" {...register('genre')}>
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
										{...register('imdbRating')}
									>
										{ratings.map((rating: number) => (
											<option key={rating}>{rating}</option>
										))}
									</Form.Select>
								</div>
								<div>
									<Button type="submit">Apply filter</Button>
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
/*
sort_by		String ()	date_added	Sorts the results by choosen value
order_by		String (desc, asc)
						title, year, rating, peers, seeds, download_count, like_count,
						date_added
quality		String (720p, 1080p, 2160p, 3D)
limit		Integer between 1 - 50 (inclusive)
The page will be sortable and filtered according to criteria such as name, genre, the
IMDb grade, the gap of production year etc...

name
genre
imdb grade
gap of production year
					<ListGroup horizontal {...register('quality')}>
								<ListGroup.Item>SD</ListGroup.Item>
								<ListGroup.Item active>720p</ListGroup.Item>
								<ListGroup.Item>1080p</ListGroup.Item>
								<ListGroup.Item action onClick=>4k</ListGroup.Item>
															<ListGroup horizontal {...register('orderBy')}>
								<ListGroup.Item>Asc</ListGroup.Item>
								<ListGroup.Item>Desc</ListGroup.Item>
							</ListGroup>
*/
