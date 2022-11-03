import Link from 'next/link';
import React from 'react';

const SignUpFirst = () => {
	// Component
	return (
		<div>
			<h3 className="title is-3">You need to sign up first</h3>
			<p>Click the button sign up.</p>
			<Link href="/signup" passHref legacyBehavior>
				<button>Sign Up</button>
			</Link>
		</div>
	);
};

export default SignUpFirst;
