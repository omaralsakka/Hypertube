import { useRouter } from 'next/router';
import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User } from '../../types/appTypes';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
	const router = useRouter();
	const userId = router.query.movieId;
	const { status } = useSession();

	const [user, setUser] = useState<User>({
		id: 'fasdfadsf',
		name: 'donkey',
		email: 'jenni@virta.com',
		image:
			'https://theviraler.com/wp-content/uploads/2019/09/pretty-cute-girls-24-2.jpg',
		OAuth: false,
		emailVerified: '1-1-2022',
	});
	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);
	if (!user?.id) {
		return <></>;
	} else {
		return (
			<Container className="d-flex justify-content-center p-3">
				<Card className="w-50 glass-background">
					<Card.Body className="d-flex flex-column">
						<div className="avatar-settings mx-auto mb-4">
							<img
								src="https://theviraler.com/wp-content/uploads/2019/09/pretty-cute-girls-24-2.jpg"
								alt="user profile image"
								className="avatar-img rounded-circle"
							/>
						</div>
						<Container className="text-center fs-3 mb-4">{user.name}</Container>
						<Container className="d-flex justify-content-center">
							<div className="d-flex flex-row align-items-center mb-4 ">
								<div className="me-3">
									{user.name} {user.name}
								</div>
							</div>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		);
	}
};

export default ProfilePage;
