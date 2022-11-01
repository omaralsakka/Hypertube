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
import { PageLayout } from '../../types/appTypes';
import { AiOutlineCloudUpload } from 'react-icons/ai';

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
			{/* <Card style={{ maxWidth: '300px', maxHeight: '300px' }}>
				<Card.Header> */}
			<Form.Group controlId="formFile" className="mb-3">
				{/* <Form.Control
					style={{ zIndex: '2', position: 'absolute' }}
					className="w-25"
					type="file"
					onChange={(event: React.ChangeEvent) => {
						const target = event.target as HTMLInputElement;
						if (!target.files) return;
						const file = target.files[0];
						addPhoto(file);
					}}
				/> */}
				<div
					className="d-flex justify-content-center align-items-center avatar-settings mx-auto mb-4 photo-upload"
					style={{ zIndex: '1' }}
				>
					<label
						className="custom-file-upload"
						style={{ zIndex: '2', position: 'absolute' }}
					>
						<input
							className="custom-file-input"
							type="file"
							onChange={(event: React.ChangeEvent) => {
								const target = event.target as HTMLInputElement;
								if (!target.files) return;
								const file = target.files[0];
								addPhoto(file);
							}}
						/>
						<AiOutlineCloudUpload className="display-1 iconImage" />
					</label>
					<img
						src="user-test-img.jpg"
						alt="user profile image"
						className="avatar-img rounded-circle"
					/>
				</div>
			</Form.Group>

			{/* </Card.Header> */}

			{/* {photo && <Card.Img variant="top" alt="profilepic" src={photo} />} */}
			{/* </Card> */}
		</>
	);
};

export default PhotoUpload;
