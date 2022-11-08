import { signOut } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import { i18translateType } from '../../types/appTypes';
import { MdLogout } from 'react-icons/md';

const LogoutBtn = ({ t }: { t: i18translateType | any }) => {
	return (
		<>
			<div className="bigBtn">
				<Button
					className="d-flex justify-content-center align-items-center"
					onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
					variant="outline-dark"
				>
					<p className="p-0 m-0 me-1 ">{t('nav.logout')}</p>
					<MdLogout className="fs-5 p-0 m-0" />
				</Button>
			</div>
			<div className="smallBtn">
				<Button
					className="d-flex justify-content-center align-items-center"
					onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
					variant="outline-dark"
					size="sm"
				>
					<p className="p-0 m-0 me-1 ">{t('nav.logout')}</p>
					<MdLogout className="fs-5 p-0 m-0" />
				</Button>
			</div>
		</>
	);
};

export default LogoutBtn;
