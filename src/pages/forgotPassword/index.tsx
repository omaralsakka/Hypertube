import { useState } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBIcon,
} from 'mdb-react-ui-kit';
import { FormCheck } from 'react-bootstrap';
// import UseField from '../../components/usefield';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Form from 'react-bootstrap/Form';

type Inputs = {
	email: string;
	username: string;
};

const forgotPassword = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('username');
	const [disabledButton, setDisabledButton] = useState(true);
	// const userEmail = UseField('email');
	// const userusername = UseField('username');

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
		username: z.string().min(1, { message: 'Required' }),
	});

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});
	console.log(watch());
	console.log(isDirty && isValid);
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
									Request password
								</p>
										<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Group
										className="mb-3 d-flex flex-column align-items-center justify-content-center"
										controlId="formBasicEmail"
									>
										<div className="d-flex flex-row align-items-center mb-4">
											<MDBIcon fas icon="envelope me-3" size="lg" />
											<span className="has-float-label">
												<Form.Control
													id="loginEmail"
													type="email"
													placeholder=" "
													{...register('email')}
													// {...userEmail}
													aria-invalid={errors.email ? 'true' : 'false'}
												/>
												<label htmlFor="loginEmail">Email</label>
											</span>
										</div>
										{errors.email?.message && (
											<p>{errors.email?.message as string}</p>
										)}
										<div className="d-flex flex-row align-items-center mb-4">
											<MDBIcon fas icon="lock me-3" size="lg" />
											<span className="has-float-label">
												<Form.Control
													id="loginUsername"
													type={passType}
													placeholder=" "
													{...register('username')}
													aria-invalid={errors.username ? 'true' : 'false'}
													// {...userusername}
												/>
												<label htmlFor="loginUsername">username</label>
											</span>
										</div>
										{errors.username?.message && (
											<p>{errors.username?.message as string}</p>
										)}
										<div className="mb-4">
											<FormCheck
												type="checkbox"
												label="show username"
												onClick={() =>
													passType === 'username'
														? setPassType('text')
														: setPassType('username')
												}
											/>
										</div>

										<div className="mb-4" style={{ minHeight: '5vh' }}>
											<button
												type="submit"
												className="btn btn-outline-danger btn-rounded btn-lg"
												data-mdb-ripple-color="dark"
												disabled={!isValid || !isDirty}
											>
												Submit											</button>
										</div>
										<div>
											<p className="text-muted">
												New to Hypertube? <Link href="/signup">signup</Link>
											</p>
										</div>
									</Form.Group>
								</Form>
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

export default forgotPassword;
