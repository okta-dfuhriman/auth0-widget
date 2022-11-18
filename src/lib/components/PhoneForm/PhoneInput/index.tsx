import React from 'react';
import { InputAdornment } from '@mui/material';
import { TextField } from '@mui/material';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { getAsYouType } from 'awesome-phonenumber';

import type { OutlinedTextFieldProps } from '@mui/material';
import type { AsYouType } from 'awesome-phonenumber';

export interface PhoneInputProps extends OutlinedTextFieldProps {
	hideIcon?: boolean;
	inputIcon?: React.ReactNode;
}

export const formatter = (code: string) => getAsYouType(code);

export const formatPhoneNumber = (formatter: AsYouType, value: string) => {
	if (value?.length > 2) {
		return formatter.reset(value);
	}
	if (!value || value === '' || value === null) {
		return formatter.removeChar();
	} else {
		return formatter.addChar(value);
	}
};

const PhoneInput = ({ hideIcon, inputIcon, ...props }: PhoneInputProps) => {
	const startIcon = inputIcon ? (
		inputIcon
	) : (
		<InputAdornment position='start'>
			<PhoneAndroidOutlinedIcon />
		</InputAdornment>
	);

	return (
		<TextField
			id='phone-input'
			{...props}
			InputProps={{
				startAdornment: hideIcon ? undefined : startIcon,
			}}
		/>
	);
};

PhoneInput.defaultProps = {
	autoComplete: 'mobile tel',
	autoFocus: true,
	disabled: false,
	fullWidth: true,
	id: 'phone-input',
	hideIcon: false,
	inputMode: 'numeric',
	label: '',
	margin: 'normal',
	placeholder: 'Enter your phone number',
	required: true,
	variant: 'outlined',
};

export default PhoneInput;
