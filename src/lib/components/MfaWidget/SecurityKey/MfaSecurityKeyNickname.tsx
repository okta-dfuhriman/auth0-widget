import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { InputAdornment, TextField } from '@mui/material';
import { Usb as UsbIcon } from '@mui/icons-material';

import WidgetContent from '../../WidgetContent/WidgetContent';

export interface MfaSecurityKeyNicknameProps {
	isLoading?: boolean;
	step?: number;
	action?: 'Continue' | 'Save';
}

const MfaSecurityKeyNickname = (props: MfaSecurityKeyNicknameProps) => {
	const { isLoading, step } = props;

	const isSuccess = step === 3;

	const title = isSuccess ? 'Security Key Added!' : 'Name Your Security Key';
	const subtitle = isSuccess
		? 'You have successfully enrolled your Security Key.'
		: 'If you own multiple keys, this alias will help you identify the right one.';
	const action = isSuccess ? 'Continue' : 'Save';

	return (
		<WidgetContent title={title} content={subtitle}>
			<TextField
				placeholder='Name your key'
				variant='standard'
				margin='normal'
				fullWidth
				autoFocus
				disabled={isSuccess}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<UsbIcon />
						</InputAdornment>
					),
				}}
			/>
			<LoadingButton
				variant='contained'
				size='large'
				fullWidth
				loading={isLoading}
			>
				{action}
			</LoadingButton>
		</WidgetContent>
	);
};

MfaSecurityKeyNickname.defaultProps = {
	isLoading: false,
	action: 'Continue',
};

export default MfaSecurityKeyNickname;
