import { Container } from 'react-bootstrap';

type PageLayout = {
	children: React.ReactNode;
};

const Layout = ({ children }: PageLayout) => {
	return (
		<Container className="app blobs-background">
			<main>{children}</main>
		</Container>
	);
};
export default Layout;
