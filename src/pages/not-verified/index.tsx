import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

// Users are redirected to this site if they try to login before verifying their email
const NotVerified = () => {
	const [email, setEmail] = useState('');
	const mutation = trpc.emailtoken.resend.useMutation();
	const { t }: i18translateType = useTranslation('common');

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		mutation.mutate({ email: email });
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value)
			setEmail(event.target.value);
	}
	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0">
					<Card.Body className="p-5">
						{mutation.isLoading ? (
							<>
								<div className={`${flexColCenter} w-75 m-auto`}>
									<Card.Title className="display-6 text-dark mb-5 ">
										<strong>{t('form.sendNewLink')}</strong>
									</Card.Title>
								</div>
							</>
						) : (
							<>
								{mutation.isSuccess ? (
									<>
										<div className={`${flexColCenter} w-75 m-auto`}>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>{t('form.linkSent')}</strong>
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												{t('form.checkYourEmail')}
											</Card.Title>
										</div>
									</>
								) : (
									<>
										<div className={`${flexColCenter} w-75 m-auto`}>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>{t('form.emailUnverified')}</strong>
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												{t('form.followLink')}
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												{t('form.requestLink')}
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
																	placeholder={t('form.email')}
																	type="email"
																	name="email"
																	onChange={handleChange}
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
															{t('form.submit')}
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
												<strong>{t('form.errorOccurred')}</strong>
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
