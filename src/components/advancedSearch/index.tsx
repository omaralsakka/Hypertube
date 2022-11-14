import { Offcanvas, Button, Container } from 'react-bootstrap';
import { useState } from 'react';

const AdvancedSearch = ({ children }: { children: React.ReactNode }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Button variant="warning" onClick={handleShow}>
				Advanced search
			</Button>

			<Offcanvas
				className="glass-background"
				show={show}
				onHide={handleClose}
				placement="end"
			>
				<Container className="mb-2 bg-warning px-0">
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Advanced Search</Offcanvas.Title>
					</Offcanvas.Header>
				</Container>
				<Offcanvas.Body>{children}</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default AdvancedSearch;
