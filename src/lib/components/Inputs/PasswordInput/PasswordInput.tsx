import React from 'react';
import TextField from '@mui/material/TextField';

import type { TextFieldProps } from '@mui/material';

export type PasswordInputProps = TextFieldProps;

const PasswordInput = (props: PasswordInputProps) => {
	return (
		<TextField
			{...{
				id: 'password-input',
				type: 'password',
				label: 'Password',
				autoCapitalize: 'none',
				autoComplete: 'current-password',
				variant: 'outlined',
				autoFocus: true,
				fullWidth: true,
				required: true,
				...props,
			}}
		/>
	);
};

export default PasswordInput;
