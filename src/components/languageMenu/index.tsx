import { useEffect, useState } from 'react';
import {
	Container,
	Image,
	Dropdown,
	DropdownButton,
	Row,
	Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const LanguageMenu = () => {
	const { i18n } = useTranslation('common');
	const { t }: i18translateType = useTranslation('common');
	const [selectedLang, setSelectedLang] = useState('');

	const updatePageLanguage = (language: string) => {
		const userLanguage = { language };
		localStorage.setItem('selectedLanguage', JSON.stringify(userLanguage));
		setSelectedLang(language);
		i18n.changeLanguage(language);
	};
	useEffect(() => {
		const language = localStorage.getItem('selectedLanguage');
		if (language) {
			const langParsed = JSON.parse(language);
			setSelectedLang(langParsed.language);
		} else {
			setSelectedLang('en');
		}
	}, []);
	return (
		<>
			<DropdownButton
				variant="transparent"
				id="dropdown-basic-button"
				title={t(`nav.${selectedLang}`)}
				className="border-0"
				align={{ lg: 'end' }}
			>
				<Container className="p-0">
					<Dropdown.Item onClick={() => updatePageLanguage('cn')}>
						<Row className="d-flex align-items-center">
							<Col>
								<div style={{ maxWidth: '30px' }}>
									<Image src="/chinese.png" fluid />
								</div>
							</Col>
							<Col>
								<span>{t('nav.cn')}</span>
							</Col>
						</Row>
					</Dropdown.Item>
					<Dropdown.Item onClick={() => updatePageLanguage('en')}>
						<Row className="d-flex align-items-center">
							<Col>
								<div style={{ maxWidth: '30px' }}>
									<Image src="/english.png" fluid />
								</div>
							</Col>
							<Col>
								<span>{t('nav.en')}</span>
							</Col>
						</Row>
					</Dropdown.Item>
					<Dropdown.Item onClick={() => updatePageLanguage('fi')}>
						<Row className="d-flex align-items-center">
							<Col>
								<div style={{ maxWidth: '30px' }}>
									<Image src="/finnish.png" fluid />
								</div>
							</Col>
							<Col>
								<span>{t('nav.fi')}</span>
							</Col>
						</Row>
					</Dropdown.Item>
				</Container>
			</DropdownButton>
		</>
	);
};

export default LanguageMenu;
