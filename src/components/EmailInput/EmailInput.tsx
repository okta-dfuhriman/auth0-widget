import React from 'react';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export type EmailInputProps = TextFieldProps;

const EmailInput = (props: EmailInputProps) => (
	<TextField
		{...props}
		id='email-input'
		type='email'
		label=''
		autoCapitalize='none'
		autoComplete='email'
		margin={props?.margin}
		placeholder='Enter your email'
		variant='standard'
		autoFocus
		fullWidth
		required
		onChange={props?.onChange}
		value={props?.value}
		InputProps={{
			startAdornment: (
				<InputAdornment position='start'>
					<MailOutlineIcon />
				</InputAdornment>
			),
		}}
	/>
);

EmailInput.defaultProps = {
	margin: 'normal',
	value: '',
};

export default EmailInput;
