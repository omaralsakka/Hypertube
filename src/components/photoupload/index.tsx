import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

const PhotoUpload = ({
	currentImage,
	email,
	setSuccess,
}: {
	currentImage: string | null | undefined;
	email: string | null | undefined;
	setSuccess: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [photo, setPhoto] = useState('');
	const [file, setFile] = useState<File | null>();
	const [fileAmountError, setFileAmountError] = useState(false);
	const [fileError, setFileError] = useState(false);
	const formData = new FormData();
	const selectImgError = () => {
		toast.error('Please, choose one picture as a profile picture.', {
			position: 'top-center',
		});
	};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length !== 1) {
			setFileAmountError(true);
			return;
		}
		setFileError(false);
		setFileAmountError(false);
		setFile(event.target.files[0]);
	};

	useEffect(() => {
		if (!file || !email) return;
		formData.append('files', file, file.name);
		formData.append('email', email);
		const upload = async () => {
			const response = await fetch('/api/image', {
				method: 'POST',
				body: formData,
			});
			if (response.status === 201) {
				const data = await response.json();
				if (data.filename) setPhoto(`/images/${data.filename}`);
				setSuccess(1);
			} else {
				setFileError(true);
			}
		};
		upload();
	}, [file]);

	useEffect(() => {
		let filepath: string = '';
		if (
			!currentImage ||
			currentImage.length < 1 ||
			currentImage === '/defaultImg2.png'
		)
			filepath = '/defaultImg2.png';
		else if (currentImage && currentImage.search('http') > -1)
			filepath = currentImage;
		else filepath = `/images/${currentImage}`;
		setPhoto(filepath);
	}, [currentImage]);

	useEffect(() => {
		fileAmountError &&
			toast.error('Please, choose one picture as a profile picture.', {
				position: 'top-center',
			});
	}, [fileAmountError]);

	useEffect(() => {
		fileError &&
			toast.error('Unable to upload profile picture.', {
				position: 'top-center',
			});
	}, [fileError]);
	return (
		<>
			<div className="mb-3">
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
							accept=".jpg, .png, .jpeg"
							onChange={onChange}
						/>
						<AiOutlineCloudUpload className="display-1 iconImage" />
					</label>
					<img
						src={`${photo}`}
						alt="user profile image"
						className="avatar-img rounded-circle"
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src = '/defaultImg2.png';
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default PhotoUpload;
