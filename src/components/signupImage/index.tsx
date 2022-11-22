import { Container, Card } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import PhotoUpload from '../../components/photoupload';
import LoadingLogo from '../../components/loadingLogo';

const SignupImage = ({
	currentImage,
	email,
}: {
	currentImage: string;
	email: string;
}) => {
	const { t }: i18translateType = useTranslation('common');

	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0 p-5">
					<Card.Body>
						<div className={`${flexColCenter} w-75 m-auto`}>
							<Card.Title className="display-6 text-dark mb-5">
								<strong>{t('signupImage.title')}</strong>
							</Card.Title>
							<PhotoUpload currentImage={currentImage} email={email} />
							<Card.Title className="mb-5 w-50 text-center">
								{t('signupImage.body')}
							</Card.Title>
						</div>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default SignupImage;
