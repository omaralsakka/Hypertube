import { useState } from 'react';
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

const Login = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');

	return (
		<MDBContainer className="p-5">
			<MDBContainer className="w-75">
				<MDBCard
					className="text-black m-5 shadow-lg border-0"
					style={{ borderRadius: '25px' }}
				>
					<MDBCardBody>
						<MDBRow>
							<MDBCol
								md="10"
								lg="6"
								className="order-2 order-lg-1 d-flex flex-column align-items-center mb-3"
							>
								<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
									Login
								</p>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="envelope me-3" size="lg" />
									<MDBInput label="Your Email" id="form2" type="email" />
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="lock me-3" size="lg" />
									<MDBInput label="Password" id="form3" type={passType} />
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
									/>
								</div>

								<button
									type="button"
									className="btn btn-outline-danger btn-rounded btn-lg"
									data-mdb-ripple-color="dark"
								>
									Register
								</button>
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
