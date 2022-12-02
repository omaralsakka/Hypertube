import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import NavigationBar from '../navbar';
import Footer from '../footer';
import { ToastContainer } from 'react-toastify';
import { PageLayout } from '../../types/appTypes';
import SSRProvider from 'react-bootstrap/SSRProvider';

const Layout = ({ children }: PageLayout) => {
	const loggedUser = useSelector((state: RootReducer) => state.userReducer);

	if (loggedUser.userEmail) {
		return (
			<>
				<SSRProvider>
					<div className="app blobs-background">
						<Container className="p-0 m-0 " fluid>
							<ToastContainer />

							<NavigationBar />
							<main>{children}</main>
						</Container>
					</div>
					<Footer />
				</SSRProvider>
			</>
		);
	}
	return (
		<>
			<SSRProvider>
				<div className="app blobs-background">
					<Container className="p-0 m-0" fluid>
						<NavigationBar />
						<main>{children}</main>
					</Container>
				</div>
				<Footer />
			</SSRProvider>
		</>
	);
};
export default Layout;
