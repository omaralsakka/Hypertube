import { Offcanvas, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';


const AdvancedSearch = ({ children }: { children: React.ReactNode }) => {
	const [show, setShow] = useState(false);
	const { t }: i18translateType = useTranslation('common');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Button variant="warning" onClick={handleShow}>
				{t('search.advancedSearch')}
			</Button>

			<Offcanvas
				className="glass-background"
				show={show}
				onHide={handleClose}
				placement="end"
			>
				<Container className="mb-2 bg-warning px-0">
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>{t('search.advancedSearch')}</Offcanvas.Title>
					</Offcanvas.Header>
				</Container>
				<Offcanvas.Body>{children}</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default AdvancedSearch;
