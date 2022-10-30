import { Card } from 'react-bootstrap';
import { User } from '../../types/appTypes';
import Link from 'next/link';
import { motion } from 'framer-motion';
const UserCard = ({ user }: { user: User }) => {
	if (!user) {
		return <></>;
	}

	return (
		<>
			<Link href={`/profile/${user.id}`}>
				<a>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						<Card
							className="m-3 movieCard bg-transparent overflow-hidden"
							// style={style}
						>
							<Card.Img
								src={user.image}
								alt="Profile picture"
								onError={({ currentTarget }) => {
									currentTarget.onerror = null;
									currentTarget.src = '/not-found-ht.png';
								}}
							/>
						</Card>
						{user.id}
						{user.firstname}
						{user.lastname}
						{user.email}
						{user.image}
					</motion.div>
				</a>
			</Link>
		</>
	);
};

export default UserCard;
