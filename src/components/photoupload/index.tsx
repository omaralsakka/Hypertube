import {
	Card,
	Container,
	Navbar,
	Image,
	Nav,
	Button,
	Row,
} from 'react-bootstrap';
import { MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const PhotoUpload = () => {
	const [photo, setPhoto] = useState('');
	const formData = new FormData();

	const addPhoto = async (photo: any) => {
		const pic = URL.createObjectURL(photo);
		setPhoto(pic);
		formData.append('profileImg', photo);
	};

	return (
		<>
			<Card style={{ maxWidth: '300px', maxHeight: '300px' }}>
				<Card.Header>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Profile picture</Form.Label>
						<Form.Control
							type="file"
							onChange={(event: React.ChangeEvent) => {
								const target = event.target as HTMLInputElement;
								if (!target.files) return;
								const file = target.files[0];
								addPhoto(file);
							}}
						/>
					</Form.Group>
				</Card.Header>

				{photo && <Card.Img variant="top" alt="profilepic" src={photo} />}
			</Card>
		</>
	);
};

export default PhotoUpload;
