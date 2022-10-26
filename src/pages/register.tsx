import './i18nextConf';
import type { NextPage } from 'next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Inputs = {
	email: string;
	password: string;
};

const Register: NextPage = () => {
	// console.log(watch("example")
	//	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	});
	// console.log(watch('name')); // watch input value by passing the name of it

	return (
		<div className="App">
			<div className="main">
				Register
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							{...register('email')}
							placeholder="Enter email"
						/>
						{errors.email?.message && <p>{errors.email?.message as string}</p>}
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							{...register('password')}
							placeholder="Enter password"
						/>
						{errors.password?.message && (
							<p>{errors.password?.message as string}</p>
						)}
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form.Group>
				</Form>
			</div>
		</div>
	);
};

export default Register;
