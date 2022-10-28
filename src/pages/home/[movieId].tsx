import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	Container,
	Image,
	Card,
	Row,
	Col,
	Collapse,
	Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie, MovieData } from '../../types/appTypes';
import axios from 'axios';
import MovieCard from '../../components/moviecard';
import { FaPlay } from 'react-icons/fa';

const MoviePage = () => {
	const router = useRouter();
	const moviesReducer: Movies = useSelector(
		(state: RootReducer) => state.moviesReducer
	);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setLoading] = useState(false);
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const getOmdb = async (movie: Movie) => {
		const baseUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=3412b01c&t=${movie.title_english}&y=${movie.year}`;
		const resp = await axios.get(baseUrl);
		return resp.data;
	};
	let i = 0;
	const suggestedMovieStyle = {
		maxWidth: '10vw',
		width: '150px',
		minWidth: '5vw',
	};

	const movieRate = (rating: string | undefined) => {
		switch (rating) {
			case 'G':
				return 'All ages';
			case 'PG 12':
				return '12+';
			case 'PG 13':
				return '13+';
			case 'R':
				return '16+';
			case 'NC-17':
				return '18+';
			default:
				return '16+';
		}
	};
	useEffect(() => {
		i++;
		if (i >= 2 && !moviesReducer.length) {
			window.location.replace('/home');
		}
		if (moviesReducer.length) {
			setMovie(moviesReducer.find((movie) => String(movie.id) === movieId));
		}
	}, [moviesReducer]);

	useEffect(() => {
		if (movie?.id) {
			getOmdb(movie).then((resp) => setMovieData(resp));
			setSuggestedMovies(moviesReducer.slice(0, 6));
		}
	}, [movie]);
	const handleClick = () => {
		setLoading(true);
		streamMovie();
	};
	const streamMovie = () => {
		const response = fetch('/api/video/', {
			method: 'POST',
			body: JSON.stringify(movie),
		});
	};
	if (!movie?.id) {
		return <></>;
	} else {
		return (
			<>
				<Container className=" p-sm-4 rounded " fluid>
					<Card
						className="glass-background rounded d-flex flex-column p-0"
						style={{ minWidth: '60vw', minHeight: '85vh' }}
					>
						<Card.Body className="p-0">
							<Container className="p-0" fluid>
								<Row className="d-flex g-0 m-auto justify-content-center">
									<Col sm={7}>
										<Container className="overflow-hidden p-0">
											<Image
												className="w-100"
												style={{
													objectFit: 'cover',
													minHeight: '720px',
													maxHeight: '60vh',
												}}
												src={movie.background_image_original}
											/>
										</Container>

										{!isLoading && (
											<Button
												variant="primary"
												hidden={isLoading}
												onClick={!isLoading && handleClick}
												style={{
													minWidth: '1280px',
													minHeight: '720px',
												}}
											>
												<FaPlay />
											</Button>
										)}
									</Col>
									<Col className="p-3">
										<Container className="d-flex flex-column justify-content-center align-items-center w-75">
											<Card.Title className="fs-2 mb-5 text-dark">
												Suggested movies
											</Card.Title>
											<Container className="d-flex flex-wrap justify-content-center">
												{suggestedMovies?.map((movie) => (
													<div key={movie.id} className="fadeInAnimated">
														<MovieCard
															movie={movie}
															style={suggestedMovieStyle}
														/>
													</div>
												))}
											</Container>
										</Container>
									</Col>
								</Row>
							</Container>
							<Container className="text-dark" fluid>
								<Card.Title className="display-6 mt-3 ">
									<strong>{movieData?.Title}</strong>
								</Card.Title>
								<Container className="mt-2" fluid>
									<Row className="mb-3">
										<Col>
											<Card.Title className="mb-4 fs-5 d-flex align-items-center p-0">
												{movieData?.Year}
												<span className="mx-3 border b-1 p-1 rounded border-dark fs-6">
													{movieRate(movieData?.Rated)}
												</span>
											</Card.Title>
											<Card.Title className="mb-4">
												{movieData?.Runtime}
											</Card.Title>
											<Card.Title className="fs-3">Plot</Card.Title>
											{movieData?.Plot}
											<br />
										</Col>
										<Col>
											<Card.Title>
												<span>Actors:</span>{' '}
												<strong>{movieData?.Actors}</strong>
											</Card.Title>
											<Card.Title>
												<span>Director:</span>{' '}
												<strong>{movieData?.Director}</strong>
											</Card.Title>{' '}
											<Card.Title>
												<span>Category:</span>{' '}
												<strong>{movieData?.Genre}</strong>
											</Card.Title>
										</Col>
									</Row>
								</Container>
							</Container>
						</Card.Body>
					</Card>
				</Container>
			</>
		);
	}
};

export default MoviePage;

/*

								<Overlay
											target={target.current}
											show={show}
											placement="right"
										>
											{({
												placement,
												arrowProps,
												show: _show,
												popper,
												...props
											}) => (
												<div
													{...props}
													style={{
														position: 'absolute',
														backgroundColor: 'rgba(255, 100, 100, 0.85)',
														padding: '2px 10px',
														color: 'white',
														borderRadius: 3,
														...props.style,
													}}
												>
													Simple tooltip
												</div>
											)}
										</Overlay>
										*/
/*
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axiosApiInstance from '../hooks/axiosPrivate';

const PhotoDropBox = (props) => {
  const shapeStyles = { bgcolor: 'default', opacity: 0.4, height: 240 };
  // const [photo_id, setPhoto_id] = useState[props.id];
  const [photo, setPhoto] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '25px',
      height: '25px',
      right: 13,
      bottom: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const removeImage = async (event) => {
    try {
      await axiosApiInstance.delete('/photo/' + props.id);
      setPhoto('');
    } catch (err) {
      // console.log('err');
    }
  };
  const remove = (
    <CancelIcon
      onClick={(event) => {
        removeImage(event);
      }}
    />
  );

  useEffect(() => {
    return setPhoto(props.old_photo?.uri);
  }, [props.old_photo]);

  const uploadPhoto = async (photo) => {
    const formData = new FormData();
    formData.append('profileImg', photo, props.id);
    try {
      const resp = await axiosApiInstance.post('/photo/upload', formData);
      if (resp.data.status === 'success') {
        const pic = URL.createObjectURL(photo);
        setPhoto(pic);
        const response3 = await axiosApiInstance.get('/users/profile');
        const newuser = response3.data.data.user;
        // console.log(newuser);
        localStorage.setItem('user', JSON.stringify(newuser));
      }
    } catch (err) {}
  };

  return (
    <>
      <ImageListItem>
        {!photo && (
          <Button variant="contained" component="label" style={shapeStyles}>
            <AddAPhotoIcon />

            <input
              type="file"
              hidden
              name="myImage"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => {
                //setPhotos(event.target.files[0]);

                uploadPhoto(event.target.files[0]);
              }}
            />
          </Button>
        )}

        <Stack spacing={3} direction="row">
          <Box>
            {photo && (
              <StyledBadge
                color="warning"
                badgeContent={remove}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Box component="span" sx={{ border: '1px' }}>
                  <Card>
                    <CardMedia component="img" alt="pic" height="240" image={photo} />
                  </Card>
                </Box>
              </StyledBadge>
            )}
          </Box>
        </Stack>
      </ImageListItem>
    </>
  );
};

export default PhotoDropBox;

*/
