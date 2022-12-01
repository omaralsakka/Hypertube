import { useState } from 'react';

const UseField = (type: string) => {
	const [value, setValue] = useState('');

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};
	return {
		type,
		onChange,
		value,
	};
};

export default UseField;
