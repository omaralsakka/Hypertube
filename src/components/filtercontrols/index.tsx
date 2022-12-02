import { Form, Container } from 'react-bootstrap';
import { FilterInputs } from '../../types/appTypes';
import { range } from 'lodash';
import { useTranslation } from 'react-i18next';
import AdvancedSearch from '../advancedSearch';
import { i18translateType } from '../../types/appTypes';

const FilterControls = ({
	onFilterChange,
	filterInputs,
}: {
	onFilterChange: EventTarget | any;
	filterInputs: FilterInputs;
}) => {
	const { t }: i18translateType = useTranslation('common');
	const genres = [
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
	];
	const languages = [
		'',
		'en',
		'fi',
		'cn',
		'hi',
		'es',
		'fr',
		'ar',
		'ja',
		'ko',
		'it',
		'de',
		'bn',
		'ru',
		'pt',
		'ro',
		'hu',
	];
	// A Trip to the Moon (1902) is considered the first movie released
	const years = range(1902 - 1, new Date().getFullYear() + 2);
	const ratings = range(0, 10);
	return (
		<>
			<AdvancedSearch>
				<Form className="bg-transparent">
					<Form.Group className="d-flex flex-column mb-4 bg-transparent">
						<Form.Label className="text-white">
							{t('filterControls.genre.title')}
						</Form.Label>
						<Form.Select
							aria-label="Genre"
							id="genre"
							name="genre"
							value={filterInputs.genre}
							onChange={(e) => onFilterChange(e)}
						>
							{genres.map((genre) => {
								return (
									<option key={genre + '1'} value={genre}>
										{t('filterControls.genre.' + genre)}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group className="d-flex flex-column mb-4">
						<Form.Label className="text-white">
							{t('filterControls.description')}
						</Form.Label>
						<Form.Control
							name="description"
							onChange={(e) => onFilterChange(e)}
							value={filterInputs.description}
							type="text"
							maxLength={50}
						/>
					</Form.Group>
					<Form.Group className="d-flex flex-column mb-4">
						<Form.Label className="text-white">
							{t('filterControls.language.title')}
						</Form.Label>
						<Form.Select
							aria-label="Language"
							id="language"
							name="language"
							value={filterInputs.language}
							onChange={(e) => onFilterChange(e)}
						>
							{languages.map((language) => (
								<option key={language + '1'} value={language}>
									{t('filterControls.language.' + language)}
									{/* {language} */}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label className="text-white">
							{t('filterControls.rating')}
						</Form.Label>
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
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.fromYear')}
							</Form.Label>
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
						</Container>
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.toYear')}
							</Form.Label>
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
						</Container>
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.fromRunTime')}
							</Form.Label>
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
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.toRunTime')}
							</Form.Label>
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
							</Form.Select>
						</Container>
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.orderBy')}
							</Form.Label>
							<Form.Select
								aria-label="Order By"
								// defaultValue="Desc"
								id="orderBy"
								name="orderBy"
								value={filterInputs.orderBy}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="desc"> {t('filterControls.descending')}</option>
								<option value="asc"> {t('filterControls.ascending')}</option>
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.sortBy')}
							</Form.Label>
							<Form.Select
								aria-label="Sort By"
								// defaultValue="rating"
								id="sortBy"
								name="sortBy"
								value={filterInputs.sortBy}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="title"> {t('filterControls.title')}</option>
								<option value="year"> {t('filterControls.year')}</option>
								<option value="rating"> {t('filterControls.rating')}</option>
								{/* <option value="dateUploaded">
									{t('filterControls.dateUploaded')}
								</option> */}
								{/* <option value="seeds">seeds</option> */}
							</Form.Select>
						</Container>
					</Form.Group>
					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.quality')}
							</Form.Label>

							<Form.Select
								aria-label="Quality"
								// defaultValue="720p"
								id="quality"
								name="quality"
								value={filterInputs.quality}
								onChange={(e) => onFilterChange(e)}
							>
								<option value=""></option>
								<option value="SD">SD</option>
								<option value="720p">720p</option>
								<option value="1080p">1080p</option>
								{/* <option value="3D">3D</option> */}
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">
								{t('filterControls.seeds')}
							</Form.Label>
							<Form.Select
								aria-label="Seeds"
								// defaultValue="1"
								id="seeds"
								name="seeds"
								value={filterInputs.seeds}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="5">5</option>
								<option value="10">10</option>
							</Form.Select>
						</Container>
						{/* <Container>
							<Form.Label className="text-white">Page</Form.Label>
							<Form.Select
								aria-label="Page"
								// defaultValue="1"
								id="page"
								name="page"
								value={filterInputs.page}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="10">10</option>
							</Form.Select>
						</Container> */}
					</Form.Group>
				</Form>
			</AdvancedSearch>
		</>
	);
};

export default FilterControls;
