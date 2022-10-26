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
	MDBCheckbox,
} from 'mdb-react-ui-kit';
import { FormCheck } from 'react-bootstrap';
import UseField from '../../components/usefield';
import Link from 'next/link';

const Signup = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	const [disabledButton, setDisabledButton] = useState(true);
	const [consent, setConsent] = useState(false);
	const userName = UseField('text');
	const userEmail = UseField('email');
	const userPassword = UseField('password');
	useEffect(() => {
		if (consent) {
			if (
				userName.value.length &&
				userEmail.value.length &&
				userPassword.value.length
			) {
				setDisabledButton(false);
			} else {
				setDisabledButton(true);
			}
		} else {
			setDisabledButton(true);
		}
	}, [consent, userName.value, userEmail.value, userPassword.value]);

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

								<div className="d-flex flex-row align-items-center mb-4 ">
									<MDBIcon fas icon="user me-3" size="lg" />
									<MDBInput
										label="Your Name"
										id="form1"
										className="w-100"
										{...userName}
									/>
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="envelope me-3" size="lg" />
									<MDBInput label="Your Email" id="form2" {...userEmail} />
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="lock me-3" size="lg" />
									<MDBInput
										label="Password"
										id="form3"
										{...userPassword}
										type={passType}
									/>
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
										disabled={disabledButton}
									>
										Register
									</button>
								</div>
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
