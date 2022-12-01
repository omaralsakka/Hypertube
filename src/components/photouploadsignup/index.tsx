import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

const PhotoUploadSignup = () => {
	const [photo, setPhoto] = useState('/defaultImg2.png');
	const [file, setFile] = useState<File | null>();
	const [fileAmountError, setFileAmountError] = useState(false);
	const [fileError, setFileError] = useState(false);
	const [success, setSuccess] = useState(false);
	const formData = new FormData();
	const { data: session } = useSession();
	const mutation = trpc.user.updateFirstLogin.useMutation();

	// Change firstLogin value to false
	useEffect(() => {
		const id = session?.token?.user?.id;
		if (!success || !id) return;
		// Write success to db
		mutation.mutate(id);
	}, [success]);

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
		const email = session?.user?.email
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
				setSuccess(true);
			} else {
				setFileError(true);
			}
		};
		upload();
	}, [file]);

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
					{fileAmountError && (
						<p>Please, choose one picture as a profile picture.</p>
					)}
					{fileError && <p>Unable to upload profile picture.</p>}
					{success && <p className="text-success">Profile picture uploaded</p>}
			</div>
		</>
	);
};

export default PhotoUploadSignup;
