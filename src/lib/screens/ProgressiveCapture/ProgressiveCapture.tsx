import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '../../components';
import { useWidgetState } from '../../hooks';

const ProgressiveCapture = () => {
	const { getUser, updateUser, user } = useWidgetState();
	const { pathname, search } = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(search);

	navigate(pathname, { replace: true });

	const userId = params.get('userId');

	if (userId) {
		getUser();

		if (user) {
			return (
				<>
					<Box sx={{ width: '100%' }}>
						{!user?.given_name && (
							<TextField
								id='given-name'
								autoCapitalize='words'
								autoComplete='given-name'
								label='First name'
								fullWidth
								value={user?.given_name}
								autoFocus
								required
								variant='outlined'
							/>
						)}
						{!user?.family_name && (
							<TextField
								id='family-name'
								autoCapitalize='words'
								autoComplete='family-name'
								label='Last name'
								fullWidth
								autoFocus
								required
								variant='outlined'
							/>
						)}
					</Box>
					<Stack sx={{ width: '100%' }}>
						<LoadingButton
							variant='contained'
							size='large'
							fullWidth
						>
							Continue
						</LoadingButton>
					</Stack>
				</>
			);
		}
	}
	return <></>;
};

export default ProgressiveCapture;
