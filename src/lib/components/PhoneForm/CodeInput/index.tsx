import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type PhoneInputProps = TextFieldProps;

const CodeInput = (props: PhoneInputProps) => <TextField {...props} />;

CodeInput.defaultProps = {
	autoComplete: 'one-time-code',
	autoFocus: true,
	disabled: false,
	fullWidth: true,
	id: 'phone-code',
	inputMode: 'numeric',
	label: '',
	margin: 'normal',
	placeholder: 'Enter the code',
	required: true,
	value: '',
	variant: 'standard',
};

export default CodeInput;
