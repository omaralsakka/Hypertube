import './i18nextConf';
import type { NextPage } from 'next';
import LangContext, { langs } from '../langContext';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
	name: z.string().min(1, { message: 'Required' }),
	age: z.number().min(10),
});

const Login: NextPage = () => {
	const [lang, setLang] = useState(langs.en);
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	const schema = z.object({
		name: z.string().min(1, { message: 'Required' }),
		age: z.number().min(10),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	return (
		<LangContext.Provider value={lang}>
			<div className="App">
				<div className="main">
					Login
					{/* {lang.ad}
					<br />
					{lang.text} */}
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Label>Password</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Button>Submit</Button>
					</Form.Group>
					<form onSubmit={handleSubmit((d) => console.log(d))}>
						<input {...register('name')} />
						{errors.name?.message && <p>{errors.name?.message}</p>}
						<input
							type="number"
							{...register('age', { valueAsNumber: true })}
						/>
						{errors.age?.message && <p>{errors.age?.message}</p>}
						<input type="submit" />
					</form>
				</div>
			</div>
		</LangContext.Provider>
	);
};

export default Login;
