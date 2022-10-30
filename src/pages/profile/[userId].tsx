import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	Container,
	Image,
	Card,
	Row,
	Col,
	Collapse,
	Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { User } from '../../types/appTypes';
import UserCard from '../../components/userCard';
const ProfilePage = () => {
	// const router = useRouter();
	// const userReducer: User = useSelector(
	// 	(state: RootReducer) => state.userReducer
	// );
	const [user, setUser] = useState<User>({
		id: 1,
		username: 'donkey',
		firstname: 'Jenni',
		lastname: 'Virtanen',
		email: 'jenni@virta.com',
		image:
			'https://theviraler.com/wp-content/uploads/2019/09/pretty-cute-girls-24-2.jpg',
	});

	if (!user?.id) {
		return <></>;
	} else {
		return (
			<>

				<UserCard user={user} />
			</>
		);
	}
};

export default ProfilePage;
