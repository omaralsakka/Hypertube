import { Container, Card, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from '../../types/appTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormCheck } from 'react-bootstrap';
import PhotoUpload from '../../components/photoupload';
import { MdAlternateEmail } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiUser } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const Settings = () => {
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const [passType, setPassType] = useState('password');
	const [currentImage, setCurrentImage] = useState('/defaultImg2.png');
	const [accountType, setAccountType] = useState<string | undefined>('');
	const { data: session } = useSession();

	const { t }: i18translateType = useTranslation('common');
	const { isLoading, isError, data, error, isSuccess } = trpc.user.get.useQuery(
		{ id: !session?.token?.user?.id ? '0' : session?.token?.user?.id },
		{
			placeholderData: { id: '', name: 'Name', email: 'Email', password: '' },
		}
	);
	const mutation = trpc.user.update.useMutation();
	const schema = z.object({
		name: z.string().min(1, { message: 'Required' }),
		password: z
			.string()
			.regex(new RegExp('^$|.*[A-Z].*'), {
				message: 'One uppercase character required',
			})
			.regex(new RegExp('^$|.*[a-z].*'), {
				message: 'One lowercase character required',
			})
			.regex(new RegExp('^$|.*\\d.*'), { message: 'One number required' })
			.regex(new RegExp('^$|(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8}'), {
				message: 'The password must be more than 8 characters in length',
			})
			.max(255, {
				message: "The password can't be more than 255 characters in length",
			}),
		email: z.string().min(1, { message: 'Required' }),
	});

	useEffect(() => {
		if (!data) return;
		setValue('email', data.user?.email);
		setValue('name', data.user?.name);
		setCurrentImage(data.user?.image || '/defaultImg2.png');
		setAccountType(data.user?.accounts[0]?.type);
	}, [data]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		try {
			console.log(data);
			mutation.mutate({
				id: session?.token?.user?.id,
				name: data.name,
				email: data.email,
				password: data.password,
			});
			// If email was changed
			notifyDefault();
		} catch (err) {
			console.log(err);
		}
	};
	const notifyDefault = () =>
		toast.success('Changes saved successfully', { position: 'top-center' });
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	return (
		<>
			<Container className="d-flex justify-content-center sm-p-3 mb-4 p-2">
				<Card className="sm-w-50 glass-background border-0 sm-m-0 mt-3">
					<Card.Body className="d-flex flex-column">
						<PhotoUpload
							currentImage={currentImage}
							email={session?.user?.email}
						/>
						<Container className="text-center fs-3 mb-4">
							{session?.user?.name}
						</Container>
						<Container className="d-flex justify-content-center">
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mb-3 d-flex flex-column">
									<div>
										<div className="d-flex align-items-center mb-4 ">
											<div className="d-flex align-items-center me-4">
												<HiUser className="me-2 fs-4" />
												<Form.Control
													id="name"
													className="border-bottom comment-form bg-transparent"
													placeholder="Test name"
													type="text"
													{...register('name')}
												></Form.Control>
											</div>
											<Form.Text>{t('settings.changeName')}</Form.Text>
										</div>
									</div>
									<div>
										{accountType !== 'oauth' ? (
											<div className="d-flex align-items-center mb-4">
												<div className="d-flex align-items-center me-4">
													<MdAlternateEmail className="me-2 fs-4" />
													<Form.Control
														id="signupEmail"
														className="border-bottom comment-form bg-transparent"
														placeholder="user current email"
														type="email"
														{...register('email')}
													></Form.Control>
												</div>
												<Form.Text>{t('settings.changeEmail')}</Form.Text>
											</div>
										) : null}
										{accountType !== 'oauth' ? (
											<>
												<div className="d-flex align-items-center mb-4 ">
													<div className="d-flex align-items-center me-4">
														<RiLockPasswordFill className="me-2 fs-4" />

														<Form.Control
															placeholder={t('form.newPass')}
															className="border-bottom comment-form bg-transparent"
															id="signupPassword"
															type={passType}
															{...register('password')}
														/>
													</div>
													<Form.Text>{t('settings.changePass')}</Form.Text>
												</div>
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
											</>
										) : null}
										{mutation.isError && (
											<p className="text-danger text-center">
												{mutation.error.message}
											</p>
										)}
										{accountType === 'oauth' ? (
											<p className="text-center">
												{t('settings.providerMsg1')}
												<br />
												{t('settings.providerMsg2')}
											</p>
										) : null}
									</div>
									<div
										className="mb-4 d-flex align-items-center justify-content-center"
										style={{ minHeight: '5vh' }}
									>
										<button
											type="submit"
											className="btn btn-outline-warning bigBtn btn-rounded btn-lg"
											data-mdb-ripple-color="dark"
											disabled={!isValid || !isDirty || mutation.isLoading}
										>
											{t('settings.saveChange')}
										</button>
										<button
											type="submit"
											className="btn btn-outline-warning smallBtn btn-rounded"
											data-mdb-ripple-color="dark"
											disabled={!isValid || !isDirty || mutation.isLoading}
										>
											{t('settings.saveChange')}
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
