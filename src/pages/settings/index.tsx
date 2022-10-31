import { Container, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Inputs } from '../../types/appTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { MDBIcon } from 'mdb-react-ui-kit';
import { FormCheck } from 'react-bootstrap';

const Settings = () => {
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const [passType, setPassType] = useState('password');
	const [consent, setConsent] = useState(false);

	const schema = z.object({
		userName: z.string().min(1, { message: 'Required' }),
		userPassword: z.string().min(1, { message: 'Required' }),
		userEmail: z.string().min(1, { message: 'Required' }),
		firstName: z.string().min(1, { message: 'Required' }),
		lastName: z.string().min(1, { message: 'Required' }),
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
	return (
		<>
			<Container className="d-flex justify-content-center">
				<Card className="w-50 glass-background">
					<Card.Body className="d-flex flex-column">
						<div className="avatar-settings mx-auto mb-4">
							<img
								src="user-test-img.jpg"
								alt="user profile image"
								className="avatar-img rounded-circle"
							/>
						</div>
						<Container className="text-center fs-3 mb-4">
							{userInStore?.userName}
						</Container>
						<Container className="d-flex justify-content-center">
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mb-3 d-flex flex-column">
									<div className="d-flex flex-row align-items-center mb-4 ">
										<MDBIcon fas icon="user me-3" size="lg" />
										<span className="has-float-label me-3">
											<Form.Control
												id="signupName"
												type="text"
												placeholder=" "
												{...register('userName')}
											/>
											<label htmlFor="signupName">Username</label>
										</span>
										<Form.Text>Change username</Form.Text>
									</div>

									<div className="d-flex flex-row align-items-center mb-4 ">
										<MDBIcon fas icon="user me-3" size="lg" />
										<span className="has-float-label me-3">
											<Form.Control
												id="firstName"
												type="text"
												placeholder=" "
												{...register('firstName')}
											/>
											<label htmlFor="firstName">First name</label>
										</span>
										<Form.Text>Change last name</Form.Text>
									</div>

									<div className="d-flex flex-row align-items-center mb-4 ">
										<MDBIcon fas icon="user me-3" size="lg" />
										<span className="has-float-label me-3">
											<Form.Control
												id="lastName"
												type="text"
												placeholder=" "
												{...register('lastName')}
											/>
											<label htmlFor="lastName">Last name</label>
										</span>
										<Form.Text>Change last name</Form.Text>
									</div>

									<div className="d-flex flex-row align-items-center mb-4">
										<MDBIcon fas icon="envelope me-3" size="lg" />
										<span className="has-float-label me-3">
											<Form.Control
												id="signupEmail"
												type="email"
												placeholder=" "
												{...register('userEmail')}
											/>
											<label htmlFor="signupEmail">Email</label>
										</span>
										<Form.Text>Change email</Form.Text>
									</div>

									<div className="d-flex flex-row align-items-center mb-4">
										<MDBIcon fas icon="lock me-3" size="lg" />
										<span className="has-float-label me-3">
											<Form.Control
												id="signupPassword"
												type={passType}
												placeholder=" "
												{...register('userPassword')}
											/>
											<label htmlFor="signupPassword">Password</label>
										</span>
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
		</>
	);
};

export default Settings;
