import React from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';

import type { ButtonProps, StandardTextFieldProps } from '@mui/material';

export interface EmailInputProps extends StandardTextFieldProps {
	ButtonProps?: ButtonProps;
}

const EmailInput = ({ ButtonProps, ...props }: EmailInputProps) => {
	const { onClick } = ButtonProps || {};

	const editButton =
		onClick && typeof onClick === 'function' ? (
			<InputAdornment position='end'>
				<Button
					variant='text'
					size='small'
					sx={{ textTransform: 'uppercase', width: '5px !important' }}
					{...{ onClick }}
				>
					Edit
				</Button>
			</InputAdornment>
		) : undefined;

	return (
		<TextField
			{...{
				id: 'email-input',
				type: 'email',
				label: 'Email address',
				autoCapitalize: 'none',
				autoComplete: 'email',
				// placeholder: 'Enter your email',
				variant: 'outlined',
				autoFocus: true,
				fullWidth: true,
				required: true,
				...props,
			}}
			InputProps={{
				endAdornment: editButton,
			}}
		/>
	);
};

EmailInput.defaultProps = {
	margin: 'normal',
	value: '',
};

export default EmailInput;
