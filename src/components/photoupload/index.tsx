import { Card, Container, Navbar, Image, Nav, Button, Row } from 'react-bootstrap';
import {
MDBIcon, MDBRow
} from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
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
	<Form.Group controlId="formFile" className="mb-3">
		<Form.Label>Avatar</Form.Label>
		<Form.Control type="file" onChange={(event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
				if (!target.files) return;
        const file = (target.files[0]);
				addPhoto(file)
    }
		} />

	</Form.Group>

{photo && (
						<Card>
							 <Card.Img variant="top" alt="profilepic"  src={photo} />
					</Card>


)}
		</>
	);
};

export default PhotoUpload;

		// <MDBIcon fas camera="lock me-3" size="lg" />
		{/* <input
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
		/> */}

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
