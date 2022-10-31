import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import NavigationBar from '../navbar';
import Footer from '../footer';
type PageLayout = {
	children: React.ReactNode;
};

const Layout = ({ children }: PageLayout) => {
	const loggedUser = useSelector((state: RootReducer) => state.userReducer);

	if (loggedUser.userEmail) {
		return (
			<>
				<Container className="app blobs-background">
					<NavigationBar />
					<main>{children}</main>
					<Footer />
				</Container>
			</>
		);
	}
	return (
		<Container className="app blobs-background">
			<main>{children}</main>
		</Container>
	);
};
export default Layout;
