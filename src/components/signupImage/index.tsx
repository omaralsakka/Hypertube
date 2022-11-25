import { Container, Card, Button } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import PhotoUpload from '../../components/photoupload';
import { trpc } from '../../utils/trpc';
import { useEffect, useState } from 'react';

const SignupImage = ({
	currentImage,
	email,
	userId,
}: {
	currentImage: string;
	email: string;
	userId: string;
}) => {
	const { t }: i18translateType = useTranslation('common');
	const updateFirstLoginMutation = trpc.user.updateFirstLogin.useMutation();
	const [success, setSuccess] = useState(0);

	const handleSkip = () => {
		updateFirstLoginMutation.mutate(userId);
		window.location.replace('/home');
	};
	useEffect(() => {
		if (success) {
			updateFirstLoginMutation.mutate(userId);
			window.location.replace('/home');
		}
	}, [success]);
	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0 p-5">
					<Card.Body>
						<div className={`${flexColCenter} w-75 m-auto`}>
							<Card.Title className="display-6 text-dark mb-5">
								<strong>{t('signupImage.title')}</strong>
							</Card.Title>
							<PhotoUpload
								currentImage={currentImage}
								email={email}
								setSuccess={setSuccess}
							/>
							<Card.Title className="mb-5 w-50 text-center">
								{t('signupImage.body')}
							</Card.Title>
						</div>
						<Container className="d-flex justify-content-center">
							<Button variant="outline-warning" onClick={handleSkip}>
								Skip
							</Button>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default SignupImage;
