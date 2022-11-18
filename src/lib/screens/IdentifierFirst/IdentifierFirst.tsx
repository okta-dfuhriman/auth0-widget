import React from 'react';
import { Box, Divider, Stack } from '@mui/material';

import {
	EmailForm,
	LoadingButton,
	LoginButton,
	PhoneForm,
} from '../../components';
import { useWidgetState } from '../../hooks';

interface IdentifierFirstProps {}

const IdentifierFirst = (props: IdentifierFirstProps) => {
	const { flow, isLoadingPassword, loginWithRedirect } = useWidgetState();

	const handleSubmitPassword: React.MouseEventHandler<
		HTMLButtonElement
	> = () => loginWithRedirect();

	const actions = (
		<>
			<LoadingButton
				variant='outlined'
				size='large'
				fullWidth
				disabled={isLoadingPassword}
				loading={isLoadingPassword}
				onClick={handleSubmitPassword}
			>
				Continue with Password
			</LoadingButton>

			<Box id='button-divider'>
				<Divider flexItem>or</Divider>
			</Box>
			<LoginButton variant='google' />
			<LoginButton variant='apple' />
		</>
	);

	return (
		<>
			{flow === 'email' && <EmailForm {...{ actions }} />}
			{flow === 'sms' && <PhoneForm {...{ actions }} />}
		</>
	);
};

export default IdentifierFirst;
