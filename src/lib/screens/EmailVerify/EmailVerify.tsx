import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import { Checkmark } from 'react-checkmark';

import { LoadingButton } from '../../components';
import { useSendMagicLink, useWidgetState } from '../../hooks';

const EmailVerify = () => {
	const { loginHint, goTo } = useWidgetState();
	const { mutation: sendMagicLink, isLoading } = useSendMagicLink();

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () =>
		sendMagicLink.mutate({ email: loginHint, resend: true });

	return (
		<>
			<Stack sx={{ width: '100%' }} rowGap={3}>
				<Checkmark size='xxLarge' />
				<Typography textAlign='center'>
					A login link has been sent to{' '}
					{loginHint || 'your email address'}.
				</Typography>
			</Stack>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<LoadingButton
					variant='contained'
					size='large'
					fullWidth
					disabled={isLoading}
					loading={isLoading}
					onClick={handleSubmit}
					endIcon={<LoopIcon />}
				>
					Resend
				</LoadingButton>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button
						variant='text'
						disableFocusRipple
						disableTouchRipple
						disableRipple
						size='small'
						component='a'
						onClick={() => goTo('email')}
						sx={{
							m: 0,
							p: 0,
						}}
					>
						Start Over
					</Button>
				</Box>
			</Stack>
		</>
	);
};

export default EmailVerify;
