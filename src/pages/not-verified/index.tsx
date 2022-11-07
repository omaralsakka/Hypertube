import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { flexColCenter } from '../../styles/styleVariables';

const NotVerified = () => {
	const [email, setEmail] = useState('');
	const mutation = trpc.emailtoken.resend.useMutation();
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		mutation.mutate({ email: email });
	};
	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0">
					<Card.Body className="p-5">
						{mutation.isLoading ? (
							<>
								<div className={`${flexColCenter} w-75 m-auto`}>
									<Card.Title className="display-6 text-dark mb-5 ">
										<strong>Sending new verification link...</strong>
									</Card.Title>
								</div>
							</>
						) : (
							<>
								{mutation.isSuccess ? (
									<>
										<div className={`${flexColCenter} w-75 m-auto`}>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>Verification link sent successfully</strong>
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												Check your email to verify your account.
											</Card.Title>
										</div>
									</>
								) : (
									<>
										<div className={`${flexColCenter} w-75 m-auto`}>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>Your email is still unverified</strong>
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												Follow the link in your email to continue.
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												If you haven't received the verification email, request
												a new verification below.
											</Card.Title>
										</div>
										<Container className="d-flex justify-content-center">
											<Form onSubmit={handleSubmit}>
												<Form.Group className={`${flexColCenter} mb-3`}>
													<Container className="mb-4">
														<div className="d-flex align-items-center mb-4 ">
															<MdAlternateEmail className="me-2 fs-4" />
															<div className="me-3">
																<Form.Control
																	id="loginEmail"
																	className="border-bottom comment-form bg-transparent"
																	placeholder="Email"
																	type="email"
																	name="email"
																></Form.Control>
															</div>
														</div>
													</Container>
													<div style={{ minHeight: '5vh' }}>
														<Button
															type="submit"
															variant="outline-warning"
															size="lg"
														>
															Submit
														</Button>
													</div>
												</Form.Group>
											</Form>
										</Container>
									</>
								)}
								{mutation.isError && (
									<>
										<div className={`${flexColCenter} w-75 m-auto`}>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>An error occurred...</strong>
											</Card.Title>
										</div>
									</>
								)}
							</>
						)}
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default NotVerified;
