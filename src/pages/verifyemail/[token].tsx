import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '../../utils/trpc';

const VerifyEmail = () => {
	const router = useRouter();
	const mutation = trpc.emailtoken.verify.useMutation();

	useEffect(() => {
		const { token } = router.query;
		mutation.mutate({ token: token as string });
	}, [router.query]);

	// Component
	return (
		<div>
			{mutation.isLoading ? (
				<h3>Verifying email address...</h3>
			) : (
				<>
					{mutation.isError ? (
						<div>An error occurred: {mutation.error.message}</div>
					) : null}

					{mutation.isSuccess ? (
						<>
							<h3>Email address verified. Login to continue!</h3>
							<button onClick={() => signIn()}>Login</button>
						</>
					) : null}
				</>
			)}
		</div>
	);
};

export default VerifyEmail;
