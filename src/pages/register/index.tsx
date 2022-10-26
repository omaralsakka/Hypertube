import '../i18nextConf';
import type { NextPage } from 'next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../../utils/trpc';
import { TRPCError } from '@trpc/server';

type Inputs = {
	name: string;
	email: string;
	password: string;
};

const Register: NextPage = () => {
	// console.log(watch("example")
	//	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

	const schema = z.object({
		name: z.string().min(1, { message: 'Required' }),
		email: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
	});

	const mutation = trpc.user.create.useMutation();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		try {
			console.log(data);
			const response = mutation.mutate({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			console.log(response);
		} catch (err) {
			if (err instanceof TRPCError) {
				console.log(err);
			}
		}
	};

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
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							{...register('name')}
							placeholder="Enter name"
						/>
						{errors.name?.message && <p>{errors.name?.message as string}</p>}
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
						<Button
							variant="primary"
							type="submit"
							disabled={mutation.isLoading}
						>
							Submit
						</Button>
						{mutation.isError && <p>{mutation.error.message}</p>}
						{mutation.isSuccess && <p>User created</p>}
					</Form.Group>
				</Form>
			</div>
		</div>
	);
};

export default Register;
