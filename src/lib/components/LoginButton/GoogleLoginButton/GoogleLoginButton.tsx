import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWidgetState } from '../../../hooks';

import GoogleIcon from './GoogleIcon';
import RootLoginButton from '../RootLoginButton';

const RootGoogleLoginButton = styled(RootLoginButton)({
	backgroundColor: 'var(--google-blue)',
	color: 'white',
	'&:hover': {
		backgroundColor: 'var(--google-blue-light)',
		borderColor: 'var(--google-blue-light)',
	},
});

const GoogleLoginButton = () => {
	const { isLoading, socialLogin } = useWidgetState();

	return (
		<RootGoogleLoginButton
			variant='contained'
			className='login-button google-button'
			onClick={() => socialLogin('google-oauth2')}
			fullWidth
			disabled={isLoading}
			startIcon={
				<div className='google-button-icon-wrapper'>
					<div className='google-button-icon'>
						<GoogleIcon />
					</div>
				</div>
			}
		>
			<Typography variant='button' className='login-button-text'>
				Sign in with Google
			</Typography>
		</RootGoogleLoginButton>
	);
};

export default GoogleLoginButton;
