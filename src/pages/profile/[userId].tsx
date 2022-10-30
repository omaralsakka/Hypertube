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
import { User} from '../../types/appTypes';


const ProfilePage = () => {
	// const router = useRouter();
	// const userReducer: User = useSelector(
	// 	(state: RootReducer) => state.userReducer
	// );
	const [user, setUser] = useState<User>();





	if (!user?.id) {
		return <></>;
	} else {
		return (
			<>

			</>
		);
	}
};

export default ProfilePage;
