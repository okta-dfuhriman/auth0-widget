import React from 'react';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export type EmailInputProps = TextFieldProps;

const EmailInput = (props: EmailInputProps) => {
	return (
		<TextField
			{...{
				id: 'email-input',
				type: 'email',
				label: '',
				autoCapitalize: 'none',
				autoComplete: 'email',
				placeholder: 'Enter your email',
				variant: 'outlined',
				autoFocus: true,
				fullWidth: true,
				required: true,
				...props,
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<MailOutlineIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

EmailInput.defaultProps = {
	margin: 'normal',
	value: '',
};

export default EmailInput;
