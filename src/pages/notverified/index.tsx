import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const NotVerified = () => {
	const [email, setEmail] = useState('');
	const mutation = trpc.emailtoken.resend.useMutation();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		mutation.mutate({ email: email });
	};
	// Component
	return (
		<div>
			{mutation.isLoading ? (
				<h3>Sending new verification link...</h3>
			) : (
				<>
					{mutation.isSuccess ? (
						<>
							<h3>Verification link was sent successfully</h3>
							<p>Check your email to verify your account.</p>
						</>
					) : (
						<>
							<h3 className="title is-3">Your email is still unverified</h3>
							<p>
								Follow the link in your email to continue. If you haven't
								received the verification email, request a new verification
								below.
							</p>
							<form onSubmit={handleSubmit}>
								<input
									type="email"
									name="email"
									value={email}
									onChange={onChange}
									required
								/>
								<button type="submit">Submit</button>
							</form>
						</>
					)}
					{mutation.isError ? (
						<div>An error occurred: {mutation.error.message}</div>
					) : null}
				</>
			)}
		</div>
	);
};

export default NotVerified;
