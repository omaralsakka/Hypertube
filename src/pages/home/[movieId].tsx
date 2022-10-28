import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie } from '../../types/appTypes';
import { FaPlay } from 'react-icons/fa';

const MoviePage = () => {
	const router = useRouter();
	const moviesReducer: Movies = useSelector(
		(state: RootReducer) => state.moviesReducer
	);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setLoading] = useState(false);

	let i = 0;
	useEffect(() => {
		i++;
		if (i >= 2 && !moviesReducer.length) {
			window.location.replace('/home');
		}
		if (moviesReducer.length) {
			setMovie(moviesReducer.find((movie) => String(movie.id) === movieId));
		}
	}, [moviesReducer]);

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
					<Container
						className="glass-background rounded d-flex flex-column p-0"
						style={{ minWidth: '60vw', minHeight: '85vh' }}
						fluid
					>
						<Container
							className="bg-danger ms-0 p-0"
							style={{
								minWidth: '140px',
								maxWidth: '1280px',
								minHeight: '720px',
								maxHeight: '720px',
							}}
							fluid
						>
							<Container className="overflow-hidden p-0">
								{!isLoading && (
									<Button
										variant="primary"
										hidden={isLoading}
										onClick={!isLoading ? handleClick : null}
										style={{
											minWidth: '1280px',
											minHeight: '720px',
										}}
									>
										<FaPlay />

										{/* <Image
											className="w-100"
											style={{
												objectFit: 'cover',
												minHeight: '720px',
												maxHeight: '60vh',
											}}
											src={movie.background_image_original}
										/> */}
									</Button>
								)}
								{
									isLoading && console.log(movie)
									// <ReactPlayer
									// 	url={props.url}
									// 	controls={true}
									// 	config={{
									// 		file: {
									// 			tracks: props.subtitles || [],
									// 			attributes: {
									// 				controlsList: 'nodownload',
									// 			},
									// 		},
									// 	}}
									// 	className={classes.reactPlayer}
									// 	playing={false}
									// 	width="100%"
									// 	height="100%"
									// 	onStart={props.onStart}
									// 	light={props.thumbnail}
									// />
								}
							</Container>
						</Container>
					</Container>
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
