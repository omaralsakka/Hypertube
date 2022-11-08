import { Container, Image, Dropdown, DropdownButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const LanguageMenu = () => {
	const { i18n } = useTranslation('common');
	const { t }: i18translateType = useTranslation('common');

	const updatePageLanguage = (language: string) => {
		const userLanguage = { language };
		localStorage.setItem('selectedLanguage', JSON.stringify(userLanguage));
		i18n.changeLanguage(language);
	};
	return (
		<>
			<DropdownButton
				variant="transparent"
				id="dropdown-basic-button"
				title={t('nav.language')}
				className="border-0"
				align="end"
			>
				<Container fluid>
					<Dropdown.Item onClick={() => updatePageLanguage('en')}>
						<div className="d-flex align-items-center ">
							<Container>
								<Image src="/english.png" fluid />
							</Container>
							<span>{t('nav.english')}</span>
						</div>
					</Dropdown.Item>
					<Dropdown.Item onClick={() => updatePageLanguage('fi')}>
						<div className="d-flex align-items-center">
							<Container>
								<Image src="/finnish.png" fluid />
							</Container>
							<span>{t('nav.finnish')}</span>
						</div>
					</Dropdown.Item>
				</Container>
			</DropdownButton>
		</>
	);
};

export default LanguageMenu;
