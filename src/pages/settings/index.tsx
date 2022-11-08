import { Container, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Inputs } from '../../types/appTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormCheck } from 'react-bootstrap';
import PhotoUpload from '../../components/photoupload';
import { MdAlternateEmail } from 'react-icons/md';
import { HiUser } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import LoadingLogo from '../../components/loadingLogo';

const Settings = () => {
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const [passType, setPassType] = useState('password');
	const [loader, setLoader] = useState(true);
	const schema = z.object({
		name: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
		email: z.string().min(1, { message: 'Required' }),
	});

	const notifyDefault = () => toast.success('Activation email sent');

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		notifyDefault();
		console.log(data);
	};

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});
	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 3000);
	}, []);
	return (
		<>
			{loader ? (
				<LoadingLogo />
			) : (
				<Container className="d-flex justify-content-center sm-p-3 mb-4 p-2">
					<Card className="sm-w-50 glass-background border-0 sm-m-0 mt-3">
						<Card.Body className="d-flex flex-column">
							<PhotoUpload />
							<Container className="text-center fs-3 mb-4">
								{userInStore?.userName}
							</Container>
							<Container className="d-flex justify-content-center">
								<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Group className="mb-3 d-flex flex-column">
										<div>
											<div className="d-flex align-items-center mb-4 ">
												<div className="d-flex align-items-center me-4">
													<HiUser className="me-2 fs-4" />
													<Form.Control
														id="name"
														className="border-bottom comment-form bg-transparent"
														placeholder="Test name"
														type="text"
														{...register('name')}
													></Form.Control>
												</div>
												<Form.Text>Change name</Form.Text>
											</div>
										</div>
										<div>
											<div className="d-flex align-items-center mb-4">
												<div className="d-flex align-items-center me-4">
													<MdAlternateEmail className="me-2 fs-4" />
													<Form.Control
														id="signupEmail"
														className="border-bottom comment-form bg-transparent"
														placeholder="user current email"
														type="email"
														{...register('email')}
													></Form.Control>
												</div>
												<Form.Text>Change email</Form.Text>
											</div>
											<div className="d-flex align-items-center mb-4 ">
												<div className="d-flex align-items-center me-4">
													<RiLockPasswordFill className="me-2 fs-4" />

													<Form.Control
														placeholder="password"
														className="border-bottom comment-form bg-transparent"
														id="signupPassword"
														type={passType}
														{...register('password')}
													/>
												</div>
												<Form.Text>Change password</Form.Text>
											</div>
											<div className="mb-4">
												<FormCheck
													type="checkbox"
													label="show password"
													onClick={() =>
														passType === 'password'
															? setPassType('text')
															: setPassType('password')
													}
												/>
											</div>
										</div>
										<div
											className="mb-4 d-flex align-items-center justify-content-center"
											style={{ minHeight: '5vh' }}
										>
											<button
												type="submit"
												className="btn btn-outline-danger btn-rounded btn-lg"
												data-mdb-ripple-color="dark"
												disabled={!isValid || !isDirty}
											>
												Save changes
											</button>
										</div>
									</Form.Group>
								</Form>
							</Container>
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default Settings;
