import { useState } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBIcon,
	MDBCheckbox,
} from 'mdb-react-ui-kit';
import { FormCheck } from 'react-bootstrap';
import UseField from '../../components/usefield';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Form from 'react-bootstrap/Form';

type Inputs = {
	userName: string;
	userEmail: string;
	userPassword: string;
};

const Signup = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	// const [disabledButton, setDisabledButton] = useState(true);
	const [consent, setConsent] = useState(false);
	// const userName = UseField('text');
	// const userEmail = UseField('email');
	// const userPassword = UseField('password');

	const schema = z.object({
		userName: z.string().min(1, { message: 'Required' }),
		userPassword: z.string().min(1, { message: 'Required' }),
		userEmail: z.string().min(1, { message: 'Required' }),
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	// useEffect(() => {
	// 	if (consent) {
	// 		if (
	// 			userName.value.length &&
	// 			userEmail.value.length &&
	// 			userPassword.value.length
	// 		) {
	// 			setDisabledButton(false);
	// 		} else {
	// 			setDisabledButton(true);
	// 		}
	// 	} else {
	// 		setDisabledButton(true);
	// 	}
	// }, [consent, userName.value, userEmail.value, userPassword.value]);

	return (
		<MDBContainer className="p-5">
			<MDBContainer className="w-100">
				<MDBCard
					className="text-black m-5 shadow-lg border-0 p-3 bg-0 bg-transparent glass-background"
					style={{ borderRadius: '25px' }}
				>
					<MDBCardBody>
						<MDBRow style={{ minHeight: '50vh' }}>
							<MDBCol
								md="10"
								lg="6"
								className="order-2 order-lg-1 d-flex flex-column align-items-center mb-3"
							>
								<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
									Sign up
								</p>
								<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Group
										className="mb-3 d-flex flex-column align-items-center justify-content-center"
										controlId="register"
									>
										<div className="d-flex flex-row align-items-center mb-4 ">
											<MDBIcon fas icon="user me-3" size="lg" />
											<span className="has-float-label">
												<Form.Control
													id="signupName"
													type="text"
													placeholder=" "
													{...register('userName')}
												/>
												<label htmlFor="signupName">Name</label>
											</span>
										</div>

										<div className="d-flex flex-row align-items-center mb-4">
											<MDBIcon fas icon="envelope me-3" size="lg" />
											<span className="has-float-label">
												<Form.Control
													id="signupEmail"
													type="email"
													placeholder=" "
													{...register('userEmail')}
												/>
												<label htmlFor="signupEmail">Email</label>
											</span>
										</div>

										<div className="d-flex flex-row align-items-center mb-4">
											<MDBIcon fas icon="lock me-3" size="lg" />
											<span className="has-float-label">
												<Form.Control
													id="signupPassword"
													type={passType}
													placeholder=" "
													{...register('userPassword')}
												/>
												<label htmlFor="signupPassword">Password</label>
											</span>
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

										<div className="mb-4">
											<MDBCheckbox
												name="flexCheck"
												value=""
												id="flexCheckDefault"
												label="Agree to our terms and conditions"
												onClick={() =>
													consent ? setConsent(false) : setConsent(true)
												}
											/>
										</div>
										<div className="mb-4" style={{ minHeight: '5vh' }}>
											<button
												type="button"
												className="btn btn-outline-danger btn-rounded btn-lg"
												data-mdb-ripple-color="dark"
												disabled={!isValid || !isDirty}
											>
												Register
											</button>
										</div>
									</Form.Group>
								</Form>

								<div>
									<p className="text-muted">
										Have an account? <Link href="/login">login</Link>
									</p>
								</div>
							</MDBCol>
							<MDBCol
								md="10"
								lg="6"
								className="order-1 order-lg-2 d-flex align-items-center justify-content-center"
							>
								<MDBCardImage src={LogoPng} className="w-75" />
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBContainer>
		</MDBContainer>
	);
};

export default Signup;
