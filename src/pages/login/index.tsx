import { useEffect, useState } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBInput,
	MDBIcon,
} from 'mdb-react-ui-kit';
import { FormCheck } from 'react-bootstrap';
import UseField from '../../components/usefield';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Form from 'react-bootstrap/Form';

type Inputs = {
	email: string;
	password: string;
};

const Login = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	const [disabledButton, setDisabledButton] = useState(true);
	const userEmail = UseField('email');
	const userPassword = UseField('password');

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		if (userEmail.value.length && userPassword.value.length) {
			setDisabledButton(false);
		} else {
			setDisabledButton(false); // true
		}
	}, [userEmail.value, userPassword.value]);

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
									Login
								</p>
								<Form onSubmit={handleSubmit(onSubmit)}>
									<div className="d-flex flex-row align-items-center mb-4">
										<MDBIcon fas icon="envelope me-3" size="lg" />
										<MDBInput
											label="Your Email"
											id="form2"
											{...register('email')}
											// {...userEmail}
										/>
										{errors.email?.message && (
											<p>{errors.email?.message as string}</p>
										)}
									</div>

									<div className="d-flex flex-row align-items-center mb-4">
										<MDBIcon fas icon="lock me-3" size="lg" />
										<MDBInput
											label="Password"
											id="form3"
											{...register('password')}
											// {...userPassword}
											type={passType}
										/>
										{errors.password?.message && (
											<p>{errors.password?.message as string}</p>
										)}
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

									<div className="mb-4" style={{ minHeight: '5vh' }}>
										<button
											type="submit"
											className="btn btn-outline-danger btn-rounded btn-lg"
											data-mdb-ripple-color="dark"
											// disabled={disabledButton}
										>
											Login
										</button>
									</div>
									<div>
										<p className="text-muted">
											New to Hypertube? <Link href="/signup">signup</Link>
										</p>
									</div>
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

export default Login;
