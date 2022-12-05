import { useRouter } from 'next/router';
import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';

const ProfilePage = () => {
	const router = useRouter();
	const { status } = useSession();
	const userInfo: any = trpc.user.getProfile.useQuery(
		!router?.query?.userId ? '0' : (router?.query?.userId as string)
	);
	const profileImage = userInfo?.data?.user?.image as string;

	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
		image: '',
		OAuth: false,
		emailVerified: '',
	});

	useEffect(() => {
		if (status === 'unauthenticated') {
			window.location.replace('/');
		}
	}, [status]);

	useEffect(() => {
		if (userInfo?.data?.user?.id) {
			let image;
			if (profileImage) {
				profileImage.includes('http')
					? image = profileImage
					: image = `/api/userimages/${profileImage}`;
			} else {
				image = '/defaultImg2.png';
			}
			setUser({
				id: userInfo?.data?.user?.id as string,
				name: userInfo?.data?.user?.name as string,
				email: userInfo?.data?.user?.email as string,
				image: image,
				OAuth: userInfo?.data?.user?.accounts.length === 0 ? false : true,
				emailVerified:
					userInfo?.data?.user?.emailVerified?.toString() as string,
			});
		}
	}, [userInfo?.data?.user?.id]);
	if (!user?.id) {
		return <></>;
	} else {
		return (
			<Container className="d-flex justify-content-center p-3">
				<Card className="w-50 glass-background">
					<Card.Body className="d-flex flex-column">
						<div className="avatar-settings mx-auto mb-4">
							<img
								src={user.image}
								alt="user profile image"
								className="avatar-img rounded-circle"
							/>
						</div>
						<Container className="text-center fs-3 mb-4">
							{user.name.match(/^[^\s]*/)}
						</Container>
						<Container className="d-flex justify-content-center">
							<div className="d-flex flex-row align-items-center mb-4 ">
								<div className="me-3">{user.name}</div>
							</div>
						</Container>
						<Container className="text-center fs-5 mb-4">
							<div>Registered since</div>
							<div>
								<p>
									{userInfo?.data?.user?.emailVerified ? userInfo?.data?.user?.emailVerified?.toString().slice(0, 15) : 'N/A'}
								</p>
							</div>
						</Container>
					</Card.Body>
				</Card>
			</Container>
		);
	}
};

export default ProfilePage;
