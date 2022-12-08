import { Card } from 'react-bootstrap';
import { User } from '../../types/appTypes';
import { motion } from 'framer-motion';

const UserCard = ({ user }: { user: User }) => {
	if (!user) {
		return <></>;
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					ease: [0, 0.71, 0.2, 1.01],
				}}
			>
				<Card
					className="m-3  bg-transparent overflow-hidden"
					style={{ maxWidth: '400px' }}
				>
					<Card.Img
						src={user.image}
						alt="Profile picture"
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src = '/not-found-ht.png';
						}}
					/>
					<Card.Body>
						<Card.Title>
							<b>{user.name}</b>
						</Card.Title>
					</Card.Body>
				</Card>
			</motion.div>
		</>
	);
};

export default UserCard;
