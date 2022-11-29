import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormCheck } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useSession } from 'next-auth/react';

type Inputs = {
	password: string;
};

const changePassword = () => {
	const [passType, setPassType] = useState('password');
	const { t }: i18translateType = useTranslation('common');
	const { status } = useSession();

	const onSubmit: SubmitHandler<Inputs> = (data) => {};

	const schema = z.object({
		password: z.string().min(1, { message: 'Required' }),
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

	useEffect(() => {
		if (status !== 'loading' && status !== 'unauthenticated') {
			window.location.replace('/home');
		}
	}, [status]);
	return (
		<>
			{status !== 'unauthenticated' ? (
				<></>
			) : (
				<Container className="d-flex justify-content-center p-3 mb-4">
					<Card className="w-75 glass-background">
						<Card.Body>
							<div className={`${flexColCenter} w-75 m-auto`}>
								<Card.Title className="display-6 text-dark mb-5">
									<strong>{t('form.newPass')}</strong>
								</Card.Title>
								<Card.Title className="mb-5 w-50 text-center">
									{t('form.pleaseEnterPass')}
								</Card.Title>
								<Container className="d-flex justify-content-center">
									<Form onSubmit={handleSubmit(onSubmit)}>
										<Form.Group className={`${flexColCenter} mb-3`}>
											<Container className="mb-4">
												<div className="d-flex align-items-center mb-4 ">
													<RiLockPasswordFill className="me-2 fs-4" />
													<div className="me-3">
														<Form.Control
															id="loginPassword"
															placeholder={t('form.newPass')}
															className="border-bottom comment-form bg-transparent"
															type={passType}
															{...register('password')}
															aria-invalid={errors.password ? 'true' : 'false'}
														></Form.Control>
													</div>
												</div>
											</Container>

											{errors.password?.message && (
												<p>{errors.password?.message as string}</p>
											)}
											<div className="mb-4">
												<FormCheck
													type="checkbox"
													label={t('form.showPass')}
													onClick={() =>
														passType === 'password'
															? setPassType('text')
															: setPassType('password')
													}
												/>
											</div>
											<div style={{ minHeight: '5vh' }}>
												<Button
													type="submit"
													variant="outline-warning"
													size="lg"
													disabled={!isValid || !isDirty}
												>
													{t('form.submit')}
												</Button>
											</div>
										</Form.Group>
									</Form>
								</Container>
							</div>
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default changePassword;
