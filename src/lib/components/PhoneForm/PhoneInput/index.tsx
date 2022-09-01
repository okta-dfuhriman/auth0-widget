import React from 'react';
import { InputAdornment } from '@mui/material';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { getAsYouType, AsYouType } from 'awesome-phonenumber';

export interface PhoneInputProps extends StandardTextFieldProps {}

export const formatter = (code: string) => getAsYouType(code);

export const formatPhoneNumber = (formatter: AsYouType, value: string) => {
	if (!value || value === '') {
		formatter.removeChar();
	} else {
		return formatter.addChar(value);
	}
};

const PhoneInput = (props: PhoneInputProps) => (
	<TextField
		{...props}
		InputProps={{
			startAdornment: (
				<InputAdornment position='start'>
					<PhoneAndroidOutlinedIcon />
				</InputAdornment>
			),
		}}
	/>
);

PhoneInput.defaultProps = {
	autoComplete: 'mobile tel',
	autoFocus: true,
	disabled: false,
	fullWidth: true,
	id: 'phone-input',
	inputMode: 'numeric',
	label: '',
	margin: 'normal',
	placeholder: 'Enter your phone number',
	required: true,
	value: '',
	variant: 'standard',
};

export default PhoneInput;
