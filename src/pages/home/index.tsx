import { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movie } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import FilterControls from '../../components/filtercontrols';
import { useSession } from 'next-auth/react';
import LoadingLogo from '../../components/loadingLogo';
import { trpc } from '../../utils/trpc';
import { flexColCenter, flexRowCenter } from '../../styles/styleVariables';

const Home = () => {
	const [loader, setLoader] = useState(true);
	const { data: session, status } = useSession();
	const [search_term, setsearch_ter] = useState('');

	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: '1',
		genre: 'Horror',
		seeds: '1',
		fromYear: '0',
		toYear: '2021',
		search_term,
		fromRunTime: '0',
		toRunTime: '300',
		limit: '50',
		description: '',
		quality: '720p',
	});
	const { data, error } = trpc.movie.search.useQuery({
		search_term,
		fromYear: parseInt(filterInputs.fromYear),
		toYear: parseInt(filterInputs.toYear),
		fromRunTime: parseInt(filterInputs.fromRunTime),
		toRunTime: parseInt(filterInputs.toRunTime),
		imdbRating: parseInt(filterInputs.imdbRating),
		orderBy: filterInputs.orderBy,
		sortBy: filterInputs.sortBy,
		quality: filterInputs.quality,
		seeds: parseInt(filterInputs.seeds),
		description: filterInputs.description,
		genre: filterInputs.genre,
	});

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
	};

	const onFilterChange = (e: any) => {
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);
	return (
		<>
			<Container className="d-flex flex-column" fluid>
				<Container
					className={`${flexColCenter} flex-sm-row border border-light rounded mb-4 mt-4`}
				>
					<div className="searchNavBar mb-sm-0 mb-3">
						<SearchNavBar
							onSearchChange={onSearchChange}
							search_term={search_term}
						/>
					</div>
					<div className="p-0 mb-sm-0 mb-3">
						<FilterControls
							onFilterChange={onFilterChange}
							filterInputs={filterInputs}
						/>
					</div>
				</Container>
				<Container className="d-flex flex-wrap justify-content-center" fluid>
					{data?.movies.map((movie: Movie) => (
						<MovieCard
							key={movie.imdb_code}
							style="homeMovieStyle"
							viewType="full"
						/>
					))}
				</Container>
			</Container>
		</>
	);
};

export default Home;
