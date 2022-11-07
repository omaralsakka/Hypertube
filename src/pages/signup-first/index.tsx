import Link from 'next/link';
import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';

const SignUpFirst = () => {
	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0 p-5">
					<Card.Body>
						<div className={`${flexColCenter} w-75 m-auto`}>
							<Card.Title className="display-6 text-dark mb-5">
								<strong>You need to sign up first</strong>
							</Card.Title>
							<Link href="/signup" passHref legacyBehavior>
								<Button variant="outline-warning" size="lg">
									Sign Up
								</Button>
							</Link>
						</div>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default SignUpFirst;
