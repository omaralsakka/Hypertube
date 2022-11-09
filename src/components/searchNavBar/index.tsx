import { Container, Navbar, Form } from 'react-bootstrap';

const SearchNavBar = () => {
	return (
		<>
			<Navbar
				bg="transparent"
				expand="sm"
				className="mt-5 border border-light rounded sm-w-75 mx-auto"
			>
				<Container>
					<Container className="d-flex d-sm-none align-items-center p-0 mb-2">
						<Navbar.Toggle aria-controls="home-navbar" />
						<span className="d-sm-none fs-6 ms-auto">Search</span>
					</Container>
					<Navbar.Collapse id="home-navbar">
						<Form className="m-auto w-100">
							<Form.Control
								placeholder="What would you like to watch?"
								className="me-2 border-0"
								aria-label="Search"
							/>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default SearchNavBar;
