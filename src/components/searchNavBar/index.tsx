import { Container, Navbar, Form } from 'react-bootstrap';
import { i18translateType } from '../../types/appTypes';
import { useTranslation } from 'react-i18next';

const SearchNavBar = ({
	onSearchChange,
	search_term,
}: {
	onSearchChange: EventTarget | any;
	search_term: string;
}) => {
	const { t }: i18translateType = useTranslation('common');

	return (
		<>
			<Navbar bg="transparent" expand="sm" className="sm-w-75 mx-auto">
				<Container>
					<Container className="d-flex d-sm-none align-items-center p-0 mb-2">
						<Navbar.Toggle aria-controls="home-navbar" />
						<span className="d-sm-none fs-6 ms-auto">Search</span>
					</Container>
					<Navbar.Collapse id="home-navbar">
						<Form className="w-100">
							<Form.Control
								onChange={onSearchChange}
								name="search_term"
								value={search_term}
								placeholder={t('search.searchPlace')}
								aria-label="Search"
								type="text"
								maxLength={50}
							/>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default SearchNavBar;
