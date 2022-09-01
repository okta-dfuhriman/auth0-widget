import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Apple as AppleIcon } from '@mui/icons-material';

import RootLoginButton from '../RootLoginButton';

const RootAppleLoginButton = styled(RootLoginButton)({
	backgroundColor: '#000000',
	color: 'white',
	'&:hover': {
		backgroundColor: '#3c3c3c',
		borderColor: 'unset',
	},
});

const AppleLoginButton = () => (
	<RootAppleLoginButton
		variant='contained'
		className='login-button google-button'
		onClick={() => console.log("I've been clicked!")}
		fullWidth
		startIcon={
			<div className='button-icon no-chiclet'>
				<AppleIcon />
			</div>
		}
	>
		<Typography variant='button' className='login-button-text'>
			Sign in with Apple
		</Typography>
	</RootAppleLoginButton>
);

export default AppleLoginButton;
