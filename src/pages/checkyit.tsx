import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
var { spawn } = require('child_process');

import axios from 'axios';

const checkyit = () => {
	const [numOfMovies, setNumOfMovies] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/api/latest-movie`);
			console.log(response.data);
			setNumOfMovies(response.data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/api/update-movie`);
			console.log(response.data);
		};

		fetchData();
	}, [numOfMovies]);

	return (
		<Container className="d-flex justify-content-center p-3">
			<b>{numOfMovies && numOfMovies}</b>
		</Container>
	);
};

export default checkyit;
