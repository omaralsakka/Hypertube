import { useRouter } from 'next/router';
import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User } from '../../types/appTypes';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

const ProfilePage = () => {
	const router = useRouter();
	const { status } = useSession();

	let userInfo;
	userInfo = trpc.user.getProfile.useQuery(router.query.userId as string);
	// userInfo = trpc.user.getProfile.useQuery(!router?.query?.userId ? '0' : router?.query?.userId as string);
	const profileImage = '/images/' + userInfo?.data?.user?.image as string;

	console.log('PROFILE PAGE WILL GIVE TRPC ERROR !! the next router is not fast enough to give us the users id, but apparently this will be fixed with the build/production mode');

	const [user, setUser] = useState({
		id: userInfo?.data?.user?.id as string,
		name: userInfo?.data?.user?.name as string,
		email: userInfo?.data?.user?.email as string,
		image: profileImage,
		OAuth: userInfo?.data?.user?.accounts.length === 0 ? false : true,
		emailVerified: userInfo?.data?.user?.emailVerified?.toString() as string,
	});

	useEffect(() => {
		if (status === 'unauthenticated') {
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
								src={profileImage}
								alt="user profile image"
								className="avatar-img rounded-circle"
							/>
						</div>
						<Container className="text-center fs-3 mb-4">{user.name.match(/^[^\s]*/)}</Container>
						<Container className="d-flex justify-content-center">
							<div className="d-flex flex-row align-items-center mb-4 ">
								<div className="me-3">
									{user.name}
								</div>
							</div>
						</Container>
						<Container className="text-center fs-5 mb-4">
						<div>Registered since</div>
						<div>{userInfo?.data?.user?.emailVerified?.toString().slice(0, 15)}</div>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		);
	}
};

export default ProfilePage;
