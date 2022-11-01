import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md="auto">
					&nbsp;&nbsp; Hypertube by &nbsp;
					<a
						style={{ textDecoration: 'none', color: 'inherit' }}
						href="https://github.com/omaralsakka/"
						target="_blank"
						rel="noreferrer"
					>
						<b>oabdelfa</b>
					</a>
					,&nbsp;
					<a
						style={{ textDecoration: 'none', color: 'inherit' }}
						href="https://github.com/Jukkay"
						target="_blank"
						rel="noreferrer"
					>
						<b>jylimaul</b>
					</a>
					,&nbsp;
					<a
						style={{ textDecoration: 'none', color: 'inherit' }}
						href="https://github.com/Microsmosis"
						target="_blank"
						rel="noreferrer"
					>
						<b>llonnrot</b>
					</a>
					,&nbsp;
					<a
						style={{ textDecoration: 'none', color: 'inherit' }}
						href="https://gitlab.com/vilniemi"
						target="_blank"
						rel="noreferrer"
					>
						<b>vniemi</b>
					</a>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
