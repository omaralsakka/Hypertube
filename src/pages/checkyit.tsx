import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Checkyit = () => {
	const [numOfMovies, setNumOfMovies] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/api/latest-movie`);
			setNumOfMovies(response.data);
		};
		fetchData();
	}, []);

	return (
		<Container className="d-flex justify-content-center p-3">
			<b>{numOfMovies && numOfMovies}</b>
		</Container>
	);
};

export default Checkyit;
