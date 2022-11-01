import Link from 'next/link';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	return (
		<>
			<Container
				className="glass-background"
				style={{ minHeight: '5vh' }}
				fluid
			>
				<Container className="p-3" fluid>
					<Row>
						<Col className="d-flex align-items-center justify-content-center ">
							<div>
								<Container>
									<Image
										src={LogoPng}
										className="d-inline-block align-top"
										style={{ filter: 'grayscale(100%)', maxWidth: '200px' }}
									/>
								</Container>
							</div>
						</Col>
						<Col className="d-flex align-items-center border border-top-0 border-bottom-0">
							<Container className="d-flex flex-column justify-content-center align-items-center">
								<p className="fs-5">
									<strong>Developed by</strong>
								</p>
								<div className="d-flex">
									<div className="me-5">
										<a target="__blank" href="https://gitlab.com/vilniemi">
											<p>Villealfa Niemi</p>
										</a>
										<a target="__blank" href="https://github.com/Jukkay">
											<p>Jukka Ylimaula</p>
										</a>
									</div>
									<div>
										<a target="__blank" href="https://github.com/Microsmosis">
											<p>Luke Lönnroth</p>
										</a>
										<a target="__blank" href="https://github.com/omaralsakka/">
											<p>Omar Abdelfattah</p>
										</a>
									</div>
								</div>
							</Container>
						</Col>
						<Col className="d-flex align-items-center">
							<Container className="d-flex flex-column justify-content-center align-items-center">
								<p className="fs-5 m-0">
									<strong>Project by</strong>
								</p>
								<div className="d-flex align-items-center justify-content-center">
									<Container className="p-0">
										<a target="__blank" href="https://www.hive.fi/">
											<Image
												src="/hive.png"
												className="d-inline-block align-top w-100"
												style={{ filter: 'grayscale(100%)', maxWidth: '300px' }}
											/>
										</a>
									</Container>
									<Container className="p-0 text-center">
										<a target="__blank" href="https://42.fr/en/homepage/">
											<Image
												src="/42.png"
												className="d-inline-block align-top"
												style={{ filter: 'grayscale(100%)', maxWidth: '100px' }}
												fluid
											/>
										</a>
									</Container>
								</div>
							</Container>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

{
	/* <Container>
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
</Container> */
}
export default Footer;
