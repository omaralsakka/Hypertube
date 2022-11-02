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
import PhotoUpload from '../../components/photoupload';
import { MdOutlinePersonalVideo } from 'react-icons/md';
import { HiUser } from 'react-icons/hi';
const Settings = () => {
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const [passType, setPassType] = useState('password');

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
			<Container className="d-flex justify-content-center p-3 mb-4">
				<Card className="w-50 glass-background">
					<Card.Body className="d-flex flex-column">
						<PhotoUpload />
						<Container className="text-center fs-3 mb-4">
							{userInStore?.userName}
						</Container>
						<Container className="d-flex justify-content-center">
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mb-3 d-flex flex-column">
									<div className="mb-3">
										<div className="mb-3">
											<Card.Title>
												<HiUser className="me-2" />
												Personal Info
											</Card.Title>
										</div>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<div className="me-3">
												<Form.Control
													id="firstName"
													className="border-bottom comment-form bg-transparent"
													placeholder="first name"
													type="text"
													{...register('firstName')}
												></Form.Control>
											</div>
											<Form.Text>Change first name</Form.Text>
										</div>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<div className="me-3">
												<Form.Control
													id="lastName"
													className="border-bottom comment-form bg-transparent"
													placeholder="last name"
													type="text"
													{...register('lastName')}
												></Form.Control>
											</div>
											<Form.Text>Change last name</Form.Text>
										</div>
									</div>
									<div>
										<div className="mb-3">
											<Card.Title>
												<MdOutlinePersonalVideo className="me-2" />
												Account info
											</Card.Title>
										</div>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<div className="me-3">
												<Form.Control
													id="signupName"
													className="border-bottom comment-form bg-transparent"
													placeholder="username"
													type="text"
													{...register('userName')}
												></Form.Control>
											</div>
											<Form.Text>Change username</Form.Text>
										</div>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<div className="me-3">
												<Form.Control
													id="signupEmail"
													className="border-bottom comment-form bg-transparent"
													placeholder="email"
													type="email"
													{...register('userEmail')}
												></Form.Control>
											</div>
											<Form.Text>Change email</Form.Text>
										</div>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<div className="me-3">
												<Form.Control
													placeholder="password"
													className="border-bottom comment-form bg-transparent"
													id="signupPassword"
													type={passType}
													{...register('userPassword')}
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
		</>
	);
};

export default Settings;
