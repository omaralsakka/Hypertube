import { Card, Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import {
MDBIcon,
} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';


const PhotoUpload = () => {
	const [photo, setPhoto] = useState('');
	const formData = new FormData();

	const addPhoto = async (photo : any) => {
		const pic = URL.createObjectURL(photo);
		setPhoto(pic);
    formData.append('profileImg', photo);
  };



	return (
		<>
{!photo && (
		<Button variant="contained">
		<MDBIcon fas camera="lock me-3" size="lg" />
		<input
			type="file"
			hidden
			name="myImage"
			accept=".jpg, .jpeg, .png"
			onChange={(event) => {
				addPhoto(event.target.files?.[0] || null);
			}
			// onChange={(event: ChangeEvent<HTMLInputElement>) => {
			// 	if (!event.target.files) return
			// 	addPhoto()
			// }
		}
		/>
	</Button>
)}
{photo && (
						<Card>
							 <Card.Img variant="top" alt="profilepic" height="240" src={photo} />
					</Card>
)}
		</>
	);
};

export default PhotoUpload;



{/* <ImageListItem>
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
</ImageListItem> */}
